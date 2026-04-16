import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CompanySettingsForm from "@/components/invoice/CompanySettingsForm";

export default async function CompanySettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: settings } = await supabase
    .from("company_settings")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  return <CompanySettingsForm settings={settings} />;
}