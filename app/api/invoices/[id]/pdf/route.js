import { NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import InvoicePdfDocument from "@/components/pdf/InvoicePdfDocument";

export async function GET(request, { params }) {
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

    const { id } = await params;

    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", id)
      .eq("generated_by", user.id)
      .single();

    if (invoiceError || !invoice) {
      return NextResponse.json(
        { success: false, message: "Invoice not found" },
        { status: 404 }
      );
    }

    const { data: items, error: itemsError } = await supabase
      .from("invoice_items")
      .select("*")
      .eq("invoice_id", id)
      .order("sort_order", { ascending: true });

    if (itemsError) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch invoice items" },
        { status: 500 }
      );
    }

    const { data: company } = await supabase
      .from("company_settings")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    const stream = await renderToStream(
      <InvoicePdfDocument invoice={invoice} items={items || []} company={company} />
    );

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${invoice.invoice_number}.pdf"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to generate PDF",
      },
      { status: 500 }
    );
  }
}