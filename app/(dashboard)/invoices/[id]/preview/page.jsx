// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { PDFViewer } from "@react-pdf/renderer";
// import { createClient } from "@/lib/supabase/server";
// import InvoicePdfDocument from "@/components/pdf/InvoicePdfDocument";

// export default async function InvoicePreviewPage({ params }) {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     redirect("/login");
//   }

//   const { id } = await params;

//   const { data: invoice } = await supabase
//     .from("invoices")
//     .select("*")
//     .eq("id", id)
//     .eq("generated_by", user.id)
//     .single();

//   if (!invoice) {
//     return <div className="p-6">Invoice not found.</div>;
//   }

//   const { data: items } = await supabase
//     .from("invoice_items")
//     .select("*")
//     .eq("invoice_id", id)
//     .order("sort_order", { ascending: true });

//   const { data: company } = await supabase
//     .from("company_settings")
//     .select("*")
//     .order("created_at", { ascending: true })
//     .limit(1)
//     .maybeSingle();

//   return (
//     <div className="h-screen w-full">
//       <div className="flex items-center justify-between border-b bg-white px-4 py-3">
//         <div>
//           <h1 className="text-lg font-semibold">Invoice Preview</h1>
//           <p className="text-sm text-gray-500">{invoice.invoice_number}</p>
//         </div>

//         <div className="flex gap-3">
//           <Link
//             href={`/api/invoices/${invoice.id}/pdf`}
//             target="_blank"
//             className="rounded-lg bg-black px-4 py-2 text-white"
//           >
//             Open PDF
//           </Link>

//           <Link
//             href="/invoices"
//             className="rounded-lg border px-4 py-2"
//           >
//             Back
//           </Link>
//         </div>
//       </div>

//       <PDFViewer width="100%" height="100%">
//         <InvoicePdfDocument
//           invoice={invoice}
//           items={items || []}
//           company={company}
//         />
//       </PDFViewer>
//     </div>
//   );
// }











// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { createClient } from "@/lib/supabase/server";
// import InvoicePdfViewer from "@/components/pdf/InvoicePdfViewer";

// export default async function InvoicePreviewPage({ params }) {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     redirect("/login");
//   }

//   const { id } = await params;

//   const { data: invoice } = await supabase
//     .from("invoices")
//     .select("*")
//     .eq("id", id)
//     .eq("generated_by", user.id)
//     .single();

//   if (!invoice) {
//     return <div className="p-6">Invoice not found.</div>;
//   }

//   const { data: items } = await supabase
//     .from("invoice_items")
//     .select("*")
//     .eq("invoice_id", id)
//     .order("sort_order", { ascending: true });

//   const { data: company } = await supabase
//     .from("company_settings")
//     .select("*")
//     .order("created_at", { ascending: true })
//     .limit(1)
//     .maybeSingle();

//   return (
//     <div className="h-screen w-full">
//       <div className="flex items-center justify-between border-b bg-white px-4 py-3">
//         <div>
//           <h1 className="text-lg font-semibold">Invoice Preview</h1>
//           <p className="text-sm text-gray-500">{invoice.invoice_number}</p>
//         </div>

//         <div className="flex gap-3">
//           <Link
//             href={`/api/invoices/${invoice.id}/pdf`}
//             target="_blank"
//             className="rounded-lg bg-black px-4 py-2 text-white"
//           >
//             Open PDF
//           </Link>

//           <Link
//             href="/invoices"
//             className="rounded-lg border px-4 py-2"
//           >
//             Back
//           </Link>
//         </div>
//       </div>

//       <InvoicePdfViewer
//         invoice={invoice}
//         items={items || []}
//         company={company}
//       />
//     </div>
//   );
// }














import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import InvoicePdfViewer from "@/components/pdf/InvoicePdfViewer";

export default async function InvoicePreviewPage({ params }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const { data: invoice } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .eq("generated_by", user.id)
    .single();

  if (!invoice) {
    return <div className="p-6">Invoice not found.</div>;
  }

  const { data: items } = await supabase
    .from("invoice_items")
    .select("*")
    .eq("invoice_id", id)
    .order("sort_order", { ascending: true });

  const { data: company } = await supabase
    .from("company_settings")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  return (
    <div className="h-screen w-full">
      <div className="flex items-center justify-between border-b bg-white px-4 py-3">
        <div>
          <h1 className="text-lg font-semibold">Invoice Preview</h1>
          <p className="text-sm text-gray-500">{invoice.invoice_number}</p>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/api/invoices/${invoice.id}/pdf`}
            target="_blank"
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Open PDF
          </Link>

          <Link
            href="/invoices"
            className="rounded-lg border px-4 py-2"
          >
            Back
          </Link>
        </div>
      </div>

      <InvoicePdfViewer
        invoice={invoice}
        items={items || []}
        company={company}
      />
    </div>
  );
}