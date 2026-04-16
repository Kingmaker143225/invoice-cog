import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
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

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("id, full_name, email, role, designation, signature_url")
      .eq("id", user.id)
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message || "Failed to fetch profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}