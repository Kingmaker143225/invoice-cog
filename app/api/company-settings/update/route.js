import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function uploadAsset(supabase, file, userId, fieldName) {
  if (!file || typeof file !== "object" || file.size === 0) {
    return null;
  }

  const fileExt = file.name.split(".").pop()?.toLowerCase() || "png";
  const filePath = `${userId}/${fieldName}-${Date.now()}.${fileExt}`;
  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabase.storage
    .from("invoice-assets")
    .upload(filePath, fileBuffer, {
      contentType: file.type || "image/png",
      upsert: true,
    });

  if (uploadError) {
    throw new Error(uploadError.message || `Failed to upload ${fieldName}`);
  }

  const { data } = supabase.storage.from("invoice-assets").getPublicUrl(filePath);
  return data?.publicUrl || null;
}

export async function POST(request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const payload = {
      company_name: String(formData.get("company_name") || "").trim(),
      mobile_1: String(formData.get("mobile_1") || "").trim(),
      mobile_2: String(formData.get("mobile_2") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      address: String(formData.get("address") || "").trim(),
      bank_account_name: String(formData.get("bank_account_name") || "").trim(),
      account_number: String(formData.get("account_number") || "").trim(),
      bank_name: String(formData.get("bank_name") || "").trim(),
      branch: String(formData.get("branch") || "").trim(),
      ifsc_code: String(formData.get("ifsc_code") || "").trim(),
      cif_id: String(formData.get("cif_id") || "").trim(),
      pan_number: String(formData.get("pan_number") || "").trim(),
      tan_number: String(formData.get("tan_number") || "").trim(),
      default_declaration: String(formData.get("default_declaration") || "").trim(),
    };

    if (!payload.company_name) {
      return NextResponse.json(
        { success: false, message: "Company name is required" },
        { status: 400 }
      );
    }

    const topImageFile = formData.get("top_image");
    const bottomImageFile = formData.get("bottom_image");

    const topImageUrl = await uploadAsset(supabase, topImageFile, user.id, "top-image");
    const bottomImageUrl = await uploadAsset(supabase, bottomImageFile, user.id, "bottom-image");

    if (topImageUrl) payload.top_image_url = topImageUrl;
    if (bottomImageUrl) payload.bottom_image_url = bottomImageUrl;

    const { data: existing } = await supabase
      .from("company_settings")
      .select("id")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    let result;
    let error;

    if (existing?.id) {
      const response = await supabase
        .from("company_settings")
        .update(payload)
        .eq("id", existing.id)
        .select("*")
        .single();

      result = response.data;
      error = response.error;
    } else {
      const response = await supabase
        .from("company_settings")
        .insert(payload)
        .select("*")
        .single();

      result = response.data;
      error = response.error;
    }

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message || "Failed to save company settings" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Company settings saved successfully",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}