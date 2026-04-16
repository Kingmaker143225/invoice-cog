import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileSetupForm from "@/components/invoice/ProfileSetupForm";

export default async function ProfileSetupPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, designation, signature_url")
    .eq("id", user.id)
    .single();

  return <ProfileSetupForm profile={profile} />;
}