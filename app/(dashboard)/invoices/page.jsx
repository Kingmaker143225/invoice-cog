// import Link from "next/link";
// import { createClient } from "@/lib/supabase/server";

// export default async function InvoicesPage() {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return (
//       <div className="p-6">
//         <h1 className="text-2xl font-bold">Invoices</h1>
//         <p className="mt-2 text-red-600">You must be logged in.</p>
//       </div>
//     );
//   }

//   const { data: invoices, error } = await supabase
//     .from("invoices")
//     .select("id, invoice_number, invoice_date, subtotal, gst_amount, grand_total, status, created_at")
//     .order("created_at", { ascending: false });

//   return (
//     <div className="mx-auto max-w-7xl p-6">
//       <div className="mb-6 flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Invoices</h1>
//           <p className="mt-2 text-sm text-gray-600">
//             View and manage generated invoices.
//           </p>
//         </div>

//         <Link
//           href="/invoices/create"
//           className="rounded-xl bg-black px-5 py-3 text-white"
//         >
//           + Create Invoice
//         </Link>
//       </div>

//       {error ? (
//         <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
//           Failed to load invoices.
//         </div>
//       ) : !invoices || invoices.length === 0 ? (
//         <div className="rounded-xl border bg-white p-6">
//           <p className="text-gray-600">No invoices found.</p>
//         </div>
//       ) : (
//         <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
//           <table className="min-w-full">
//             <thead>
//               <tr className="bg-gray-50 text-left text-sm">
//                 <th className="px-4 py-3">Invoice No</th>
//                 <th className="px-4 py-3">Date</th>
//                 <th className="px-4 py-3">Subtotal</th>
//                 <th className="px-4 py-3">GST</th>
//                 <th className="px-4 py-3">Grand Total</th>
//                 <th className="px-4 py-3">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {invoices.map((invoice) => (
//                 <tr key={invoice.id} className="border-t">
//                   <td className="px-4 py-3 font-medium">{invoice.invoice_number}</td>
//                   <td className="px-4 py-3">{invoice.invoice_date}</td>
//                   <td className="px-4 py-3">₹{invoice.subtotal}</td>
//                   <td className="px-4 py-3">₹{invoice.gst_amount}</td>
//                   <td className="px-4 py-3 font-semibold">₹{invoice.grand_total}</td>
//                   <td className="px-4 py-3">{invoice.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }









// import Link from "next/link";
// import { createClient } from "@/lib/supabase/server";
// import LogoutButton from "@/components/invoice/LogoutButton";


// export default async function InvoicesPage() {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return (
//       <div className="p-6">
//         <h1 className="text-2xl font-bold">Invoices</h1>
//         <p className="mt-2 text-red-600">You must be logged in.</p>
//       </div>
//     );
//   }

//   const { data: invoices, error } = await supabase
//     .from("invoices")
//     .select(
//       "id, invoice_number, invoice_date, subtotal, gst_amount, grand_total, status, created_at"
//     )
//     .order("created_at", { ascending: false });

//   return (
//     <div className="mx-auto max-w-7xl p-6">
//       <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Invoices</h1>
//           <p className="mt-2 text-sm text-gray-600">
//             View and manage generated invoices.
//           </p>
//         </div>
// <Link
//   href="/settings/company"
//   className="rounded-xl border px-5 py-3"
// >
//   Company Settings
// </Link>
//         <div className="flex items-center gap-3">
//           <Link
//             href="/invoices/create"
//             className="rounded-xl bg-black px-5 py-3 text-white"
//           >
//             + Create Invoice
//           </Link>
//           <LogoutButton />
//         </div>
//       </div>

//       {error ? (
//         <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
//           Failed to load invoices.
//         </div>
//       ) : !invoices || invoices.length === 0 ? (
//         <div className="rounded-xl border bg-white p-6">
//           <p className="text-gray-600">No invoices found.</p>
//         </div>
//       ) : (
//         <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
//           <table className="min-w-full">
//             <thead>
//               <tr className="bg-gray-50 text-left text-sm">
//                 <th className="px-4 py-3">Invoice No</th>
//                 <th className="px-4 py-3">Date</th>
//                 <th className="px-4 py-3">Subtotal</th>
//                 <th className="px-4 py-3">GST</th>
//                 <th className="px-4 py-3">Grand Total</th>
//                 <th className="px-4 py-3">Status</th>
//                 <th className="px-4 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {invoices.map((invoice) => (
//                 <tr key={invoice.id} className="border-t">
//                   <td className="px-4 py-3 font-medium">
//                     {invoice.invoice_number}
//                   </td>
//                   <td className="px-4 py-3">{invoice.invoice_date}</td>
//                   <td className="px-4 py-3">₹{invoice.subtotal}</td>
//                   <td className="px-4 py-3">₹{invoice.gst_amount}</td>
//                   <td className="px-4 py-3 font-semibold">
//                     ₹{invoice.grand_total}
//                   </td>
//                   <td className="px-4 py-3">{invoice.status}</td>
//                   <td className="px-4 py-3">
//   <Link
//     href={`/invoices/${invoice.id}/preview`}
//     className="rounded-lg border px-3 py-2 text-sm"
//   >
//     Preview
//   </Link>
// </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }





import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/invoice/LogoutButton";
import InvoicesToolbar from "@/components/invoice/InvoicesToolbar";

function currency(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB");
}

function buildSort(sort) {
  switch (sort) {
    case "oldest":
      return { column: "created_at", ascending: true };
    case "amount_desc":
      return { column: "grand_total", ascending: false };
    case "amount_asc":
      return { column: "grand_total", ascending: true };
    case "newest":
    default:
      return { column: "created_at", ascending: false };
  }
}

function StatusBadge({ status }) {
  const value = (status || "").toLowerCase();

  const styles =
    value === "paid"
      ? "bg-green-100 text-green-700"
      : value === "draft"
      ? "bg-yellow-100 text-yellow-700"
      : value === "cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-blue-100 text-blue-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {status || "-"}
    </span>
  );
}

export default async function InvoicesPage({ searchParams }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <p className="mt-2 text-red-600">You must be logged in.</p>
      </div>
    );
  }

  const resolvedParams = await searchParams;

  const q = resolvedParams?.q || "";
  const from = resolvedParams?.from || "";
  const to = resolvedParams?.to || "";
  const status = resolvedParams?.status || "";
  const sort = resolvedParams?.sort || "newest";

  const sortConfig = buildSort(sort);

  let query = supabase
    .from("invoices")
    .select(
      "id, invoice_number, invoice_date, bill_to_name, ship_to_name, subtotal, gst_amount, grand_total, status, created_at",
      { count: "exact" }
    );

  if (q) {
    query = query.or(
      `invoice_number.ilike.%${q}%,bill_to_name.ilike.%${q}%,ship_to_name.ilike.%${q}%`
    );
  }

  if (from) {
    query = query.gte("invoice_date", from);
  }

  if (to) {
    query = query.lte("invoice_date", to);
  }

  if (status) {
    query = query.eq("status", status);
  }

  query = query.order(sortConfig.column, { ascending: sortConfig.ascending });

  const { data: invoices, error, count } = await query;

  const invoiceList = invoices || [];

  const totalInvoices = invoiceList.length;
  const totalAmount = invoiceList.reduce(
    (sum, item) => sum + Number(item.grand_total || 0),
    0
  );
  const totalGst = invoiceList.reduce(
    (sum, item) => sum + Number(item.gst_amount || 0),
    0
  );
  const finalCount = count ?? totalInvoices;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
            <p className="mt-1 text-sm text-gray-600">
              View, filter, and manage all generated invoices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/invoices/create"
              className="rounded-xl bg-black px-5 py-3 text-white shadow-sm"
            >
              + Create Invoice
            </Link>

            <Link
              href="/settings/company"
              className="rounded-xl border bg-white px-5 py-3 shadow-sm"
            >
              Company Settings
            </Link>

            <LogoutButton />
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Filtered Invoices</p>
            <p className="mt-2 text-3xl font-bold">{finalCount}</p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Invoice Amount</p>
            <p className="mt-2 text-3xl font-bold">{currency(totalAmount)}</p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total GST</p>
            <p className="mt-2 text-3xl font-bold">{currency(totalGst)}</p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Default Sort</p>
            <p className="mt-2 text-lg font-semibold">
              {sort === "oldest"
                ? "Oldest First"
                : sort === "amount_desc"
                ? "Amount High to Low"
                : sort === "amount_asc"
                ? "Amount Low to High"
                : "Newest First"}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <InvoicesToolbar />
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
            Failed to load invoices.
          </div>
        ) : invoiceList.length === 0 ? (
          <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold">No invoices found</h2>
            <p className="mt-2 text-sm text-gray-600">
              Try changing filters or create a new invoice.
            </p>
            <div className="mt-5">
              <Link
                href="/invoices/create"
                className="rounded-xl bg-black px-5 py-3 text-white"
              >
                Create Invoice
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                    <th className="px-4 py-3">Invoice No</th>
                    <th className="px-4 py-3">Invoice Date</th>
                    <th className="px-4 py-3">Bill To</th>
                    <th className="px-4 py-3">Ship To</th>
                    <th className="px-4 py-3 text-right">Subtotal</th>
                    <th className="px-4 py-3 text-right">GST</th>
                    <th className="px-4 py-3 text-right">Grand Total</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {invoiceList.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-t text-sm hover:bg-gray-50"
                    >
                      <td className="px-4 py-4 font-semibold">
                        {invoice.invoice_number}
                      </td>

                      <td className="px-4 py-4">
                        {formatDate(invoice.invoice_date)}
                      </td>

                      <td className="px-4 py-4">
                        <div className="max-w-[220px]">
                          <p className="font-medium">{invoice.bill_to_name}</p>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="max-w-[220px]">
                          <p className="font-medium">{invoice.ship_to_name}</p>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-right">
                        {currency(invoice.subtotal)}
                      </td>

                      <td className="px-4 py-4 text-right">
                        {currency(invoice.gst_amount)}
                      </td>

                      <td className="px-4 py-4 text-right font-semibold">
                        {currency(invoice.grand_total)}
                      </td>

                      <td className="px-4 py-4">
                        <StatusBadge status={invoice.status} />
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/invoices/${invoice.id}/preview`}
                            className="rounded-lg border px-3 py-2 text-xs font-medium"
                          >
                            Preview
                          </Link>

                          <Link
                            href={`/api/invoices/${invoice.id}/pdf`}
                            target="_blank"
                            className="rounded-lg bg-black px-3 py-2 text-xs font-medium text-white"
                          >
                            PDF
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}