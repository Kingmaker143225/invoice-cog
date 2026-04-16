import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

    const full_name = String(formData.get("full_name") || "").trim();
    const designation = String(formData.get("designation") || "").trim();
    const signatureFile = formData.get("signature");

    if (!full_name) {
      return NextResponse.json(
        { success: false, message: "Full name is required" },
        { status: 400 }
      );
    }

    if (!designation) {
      return NextResponse.json(
        { success: false, message: "Designation is required" },
        { status: 400 }
      );
    }

    let signature_url = null;

    if (signatureFile && typeof signatureFile === "object" && signatureFile.size > 0) {
      const fileExt = signatureFile.name.split(".").pop()?.toLowerCase() || "png";
      const filePath = `${user.id}/signature-${Date.now()}.${fileExt}`;

      const arrayBuffer = await signatureFile.arrayBuffer();
      const fileBuffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from("signatures")
        .upload(filePath, fileBuffer, {
          contentType: signatureFile.type || "image/png",
          upsert: true,
        });

      if (uploadError) {
        return NextResponse.json(
          {
            success: false,
            message: uploadError.message || "Failed to upload signature",
          },
          { status: 500 }
        );
      }

      const { data: publicUrlData } = supabase.storage
        .from("signatures")
        .getPublicUrl(filePath);

      signature_url = publicUrlData?.publicUrl || null;
    }

    const updatePayload = {
      full_name,
      designation,
    };

    if (signature_url) {
      updatePayload.signature_url = signature_url;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update(updatePayload)
      .eq("id", user.id)
      .select("id, full_name, email, role, designation, signature_url")
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message || "Failed to update profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}