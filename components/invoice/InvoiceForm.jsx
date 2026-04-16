// "use client";

// import { useMemo, useState } from "react";
// import {
//   calcInvoiceTotals,
//   calcItemAmount,
//   formatCurrency,
// } from "@/utils/calc";

// const emptyItem = {
//   description: "",
//   delivery_date: "",
//   quantity: 1,
//   rate: 0,
// };

// const initialForm = {
//   invoice_date: new Date().toISOString().split("T")[0],

//   bill_to_name: "",
//   bill_to_address: "",
//   bill_to_pan: "",
//   bill_to_gstin: "",
//   bill_to_cin: "",

//   ship_to_name: "",
//   ship_to_address: "",
//   ship_to_pan: "",
//   ship_to_gstin: "",
//   ship_to_cin: "",

//   gst_percent: 18,
//   items: [{ ...emptyItem }],
// };

// export default function InvoiceForm() {
//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const totals = useMemo(() => {
//     return calcInvoiceTotals(form.items, form.gst_percent);
//   }, [form.items, form.gst_percent]);

//   function updateField(field, value) {
//     setForm((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   }

//   function updateItem(index, field, value) {
//     setForm((prev) => {
//       const updatedItems = [...prev.items];
//       updatedItems[index] = {
//         ...updatedItems[index],
//         [field]: value,
//       };
//       return {
//         ...prev,
//         items: updatedItems,
//       };
//     });
//   }

//   function addItem() {
//     setForm((prev) => ({
//       ...prev,
//       items: [...prev.items, { ...emptyItem }],
//     }));
//   }

//   function removeItem(index) {
//     setForm((prev) => {
//       if (prev.items.length === 1) return prev;
//       const updatedItems = prev.items.filter((_, i) => i !== index);
//       return {
//         ...prev,
//         items: updatedItems,
//       };
//     });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch("/api/invoices/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to create invoice");
//       }

//       setMessage(
//         `Invoice created successfully. Invoice No: ${data?.data?.invoice?.invoice_number || ""}`
//       );

//       setForm(initialForm);
//     } catch (error) {
//       setMessage(error.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="mx-auto max-w-7xl p-6">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold">Create Invoice</h1>
//         <p className="mt-2 text-sm text-gray-600">
//           Fill invoice details, add line items, GST will be calculated automatically.
//         </p>
//       </div>

//       {message ? (
//         <div className="mb-4 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm">
//           {message}
//         </div>
//       ) : null}

//       <form onSubmit={handleSubmit} className="space-y-8">
//         <section className="rounded-2xl border p-5 shadow-sm">
//           <h2 className="mb-4 text-xl font-semibold">Invoice Header</h2>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//             <div>
//               <label className="mb-1 block text-sm font-medium">Invoice Date</label>
//               <input
//                 type="date"
//                 value={form.invoice_date}
//                 onChange={(e) => updateField("invoice_date", e.target.value)}
//                 className="w-full rounded-lg border px-3 py-2 outline-none"
//                 required
//               />
//             </div>

//             <div>
//               <label className="mb-1 block text-sm font-medium">GST %</label>
//               <input
//                 type="number"
//                 min="0"
//                 step="0.01"
//                 value={form.gst_percent}
//                 onChange={(e) => updateField("gst_percent", e.target.value)}
//                 className="w-full rounded-lg border px-3 py-2 outline-none"
//               />
//             </div>
//           </div>
//         </section>

//         <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <div className="rounded-2xl border p-5 shadow-sm">
//             <h2 className="mb-4 text-xl font-semibold">Bill To</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="mb-1 block text-sm font-medium">Company Name</label>
//                 <input
//                   type="text"
//                   value={form.bill_to_name}
//                   onChange={(e) => updateField("bill_to_name", e.target.value)}
//                   className="w-full rounded-lg border px-3 py-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium">Address</label>
//                 <textarea
//                   rows={4}
//                   value={form.bill_to_address}
//                   onChange={(e) => updateField("bill_to_address", e.target.value)}
//                   className="w-full rounded-lg border px-3 py-2"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                 <div>
//                   <label className="mb-1 block text-sm font-medium">PAN</label>
//                   <input
//                     type="text"
//                     value={form.bill_to_pan}
//                     onChange={(e) => updateField("bill_to_pan", e.target.value)}
//                     className="w-full rounded-lg border px-3 py-2"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-sm font-medium">GSTIN</label>
//                   <input
//                     type="text"
//                     value={form.bill_to_gstin}
//                     onChange={(e) => updateField("bill_to_gstin", e.target.value)}
//                     className="w-full rounded-lg border px-3 py-2"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-sm font-medium">CIN</label>
//                   <input
//                     type="text"
//                     value={form.bill_to_cin}
//                     onChange={(e) => updateField("bill_to_cin", e.target.value)}
//                     className="w-full rounded-lg border px-3 py-2"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl border p-5 shadow-sm">
//             <h2 className="mb-4 text-xl font-semibold">Ship To</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="mb-1 block text-sm font-medium">Company Name</label>
//                 <input
//                   type="text"
//                   value={form.ship_to_name}
//                   onChange={(e) => updateField("ship_to_name", e.target.value)}
//                   className="w-full rounded-lg border px-3 py-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium">Address</label>
//                 <textarea
//                   rows={4}
//                   value={form.ship_to_address}
//                   onChange={(e) => updateField("ship_to_address", e.target.value)}
//                   className="w-full rounded-lg border px-3 py-2"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                 <div>
//                   <label className="mb-1 block text-sm font-medium">PAN</label>
//                   <input
//                     type="text"
//                     value={form.ship_to_pan}
//                     onChange={(e) => updateField("ship_to_pan", e.target.value)}
//                     className="w-full rounded-lg border px-3 py-2"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-sm font-medium">GSTIN</label>
//                   <input
//                     type="text"
//                     value={form.ship_to_gstin}
//                     onChange={(e) => updateField("ship_to_gstin", e.target.value)}
//                     className="w-full rounded-lg border px-3 py-2"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-sm font-medium">CIN</label>
//                   <input
//                     type="text"
//                     value={form.ship_to_cin}
//                     onChange={(e) => updateField("ship_to_cin", e.target.value)}
//                     className="w-full rounded-lg border px-3 py-2"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="rounded-2xl border p-5 shadow-sm">
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="text-xl font-semibold">Invoice Items</h2>
//             <button
//               type="button"
//               onClick={addItem}
//               className="rounded-lg border px-4 py-2 text-sm font-medium"
//             >
//               + Add Item
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full border-collapse">
//               <thead>
//                 <tr className="border-b bg-gray-50 text-left text-sm">
//                   <th className="px-3 py-3">Description of Service</th>
//                   <th className="px-3 py-3">Delivery Date</th>
//                   <th className="px-3 py-3">Quantity</th>
//                   <th className="px-3 py-3">Rate</th>
//                   <th className="px-3 py-3">Amount</th>
//                   <th className="px-3 py-3">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {form.items.map((item, index) => {
//                   const amount = calcItemAmount(item.quantity, item.rate);

//                   return (
//                     <tr key={index} className="border-b align-top">
//                       <td className="px-3 py-3">
//                         <textarea
//                           rows={2}
//                           value={item.description}
//                           onChange={(e) =>
//                             updateItem(index, "description", e.target.value)
//                           }
//                           className="w-full rounded-lg border px-3 py-2"
//                           required
//                         />
//                       </td>

//                       <td className="px-3 py-3">
//                         <input
//                           type="text"
//                           value={item.delivery_date}
//                           onChange={(e) =>
//                             updateItem(index, "delivery_date", e.target.value)
//                           }
//                           placeholder="e.g. February'26"
//                           className="w-full rounded-lg border px-3 py-2"
//                         />
//                       </td>

//                       <td className="px-3 py-3">
//                         <input
//                           type="number"
//                           min="0"
//                           step="0.01"
//                           value={item.quantity}
//                           onChange={(e) =>
//                             updateItem(index, "quantity", e.target.value)
//                           }
//                           className="w-28 rounded-lg border px-3 py-2"
//                         />
//                       </td>

//                       <td className="px-3 py-3">
//                         <input
//                           type="number"
//                           min="0"
//                           step="0.01"
//                           value={item.rate}
//                           onChange={(e) => updateItem(index, "rate", e.target.value)}
//                           className="w-32 rounded-lg border px-3 py-2"
//                         />
//                       </td>

//                       <td className="px-3 py-3 font-medium">
//                         {formatCurrency(amount)}
//                       </td>

//                       <td className="px-3 py-3">
//                         <button
//                           type="button"
//                           onClick={() => removeItem(index)}
//                           className="rounded-lg border px-3 py-2 text-sm"
//                         >
//                           Remove
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </section>

//         <section className="rounded-2xl border p-5 shadow-sm">
//           <h2 className="mb-4 text-xl font-semibold">Totals Preview</h2>

//           <div className="ml-auto max-w-md space-y-3">
//             <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
//               <span className="text-sm font-medium">Subtotal</span>
//               <span className="font-semibold">{formatCurrency(totals.subtotal)}</span>
//             </div>

//             <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
//               <span className="text-sm font-medium">GST ({form.gst_percent || 0}%)</span>
//               <span className="font-semibold">{formatCurrency(totals.gst)}</span>
//             </div>

//             <div className="flex items-center justify-between rounded-lg bg-black px-4 py-3 text-white">
//               <span className="text-sm font-medium">Grand Total</span>
//               <span className="text-lg font-bold">
//                 {formatCurrency(totals.grandTotal)}
//               </span>
//             </div>
//           </div>
//         </section>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={loading}
//             className="rounded-xl bg-black px-6 py-3 text-white disabled:opacity-50"
//           >
//             {loading ? "Creating Invoice..." : "Create Invoice"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }






// "use client";

// import { useEffect, useMemo, useState } from "react";
// import {
//   calcInvoiceTotals,
//   calcItemAmount,
//   formatCurrency,
// } from "@/utils/calc";

// const emptyItem = {
//   description: "",
//   delivery_date: "",
//   quantity: 1,
//   rate: 0,
// };

// const initialForm = {
//   invoice_date: new Date().toISOString().split("T")[0],

//   bill_to_name: "",
//   bill_to_address: "",
//   bill_to_pan: "",
//   bill_to_gstin: "",
//   bill_to_cin: "",

//   ship_to_name: "",
//   ship_to_address: "",
//   ship_to_pan: "",
//   ship_to_gstin: "",
//   ship_to_cin: "",

//   gst_percent: 18,
//   items: [{ ...emptyItem }],
// };

// export default function InvoiceForm() {
//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [profile, setProfile] = useState(null);
//   const [profileLoading, setProfileLoading] = useState(true);

//   const totals = useMemo(() => {
//     return calcInvoiceTotals(form.items, form.gst_percent);
//   }, [form.items, form.gst_percent]);

//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const res = await fetch("/api/profile/me");
//         const data = await res.json();

//         if (res.ok && data?.success) {
//           setProfile(data.data);
//         }
//       } catch (error) {
//         console.error("Failed to load profile", error);
//       } finally {
//         setProfileLoading(false);
//       }
//     }

//     fetchProfile();
//   }, []);

//   function updateField(field, value) {
//     setForm((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   }

//   function updateItem(index, field, value) {
//     setForm((prev) => {
//       const updatedItems = [...prev.items];
//       updatedItems[index] = {
//         ...updatedItems[index],
//         [field]: value,
//       };
//       return {
//         ...prev,
//         items: updatedItems,
//       };
//     });
//   }

//   function addItem() {
//     setForm((prev) => ({
//       ...prev,
//       items: [...prev.items, { ...emptyItem }],
//     }));
//   }

//   function removeItem(index) {
//     setForm((prev) => {
//       if (prev.items.length === 1) return prev;
//       const updatedItems = prev.items.filter((_, i) => i !== index);
//       return {
//         ...prev,
//         items: updatedItems,
//       };
//     });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch("/api/invoices/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to create invoice");
//       }

//       setMessage(
//         `Invoice created successfully. Invoice No: ${data?.data?.invoice?.invoice_number || ""}`
//       );

//       setForm({
//         ...initialForm,
//         invoice_date: new Date().toISOString().split("T")[0],
//         items: [{ ...emptyItem }],
//       });
//     } catch (error) {
//       setMessage(error.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="mx-auto max-w-7xl p-6">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold">Create Invoice</h1>
//         <p className="mt-2 text-sm text-gray-600">
//           Fill invoice details, add line items, GST will be calculated automatically.
//         </p>
//       </div>

//       {message ? (
//         <div className="mb-4 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm">
//           {message}
//         </div>
//       ) : null}

//       <div className="mb-6 rounded-2xl border p-5 shadow-sm">
//         <h2 className="mb-4 text-xl font-semibold">Current Signatory</h2>

//         {profileLoading ? (
//           <p className="text-sm text-gray-500">Loading signatory details...</p>
//         ) : profile ? (
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//             <div className="rounded-xl bg-gray-50 p-4">
//               <p className="text-xs text-gray-500">Name</p>
//               <p className="mt-1 font-semibold">
//                 {profile.full_name || "Not set"}
//               </p>
//             </div>

//             <div className="rounded-xl bg-gray-50 p-4">
//               <p className="text-xs text-gray-500">Designation</p>
//               <p className="mt-1 font-semibold">
//                 {profile.designation || "Not set"}
//               </p>
//             </div>

//             <div className="rounded-xl bg-gray-50 p-4">
//               <p className="text-xs text-gray-500">Signature</p>
//               {profile.signature_url ? (
//                 <img
//                   src={profile.signature_url}
//                   alt="Signature"
//                   className="mt-2 h-16 object-contain"
//                 />
//               ) : (
//                 <p className="mt-1 text-sm text-gray-500">No signature uploaded</p>
//               )}
//             </div>
//           </div>
//         ) : (
//           <p className="text-sm text-red-600">
//             Could not load signatory details.
//           </p>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         <section className="rounded-2xl border p-5 shadow-sm">
//           <h2 className="mb-4 text-xl font-semibold">Invoice Header</h2>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//             <div>
//               <label className="mb-1 block text-sm font-medium">Invoice Date</label>
//               <input
//                 type="date"
//                 value={form.invoice_date}
//                 onChange={(e) => updateField("invoice_date", e.target.value)}
//                 className="w-full rounded-lg border px-3 py-2 outline-none"
//                 required
//               />
//             </div>

//             <div>
//               <label className="mb-1 block text-sm font-medium">GST %</label>
//               <input
//                 type="number"
//                 min="0"
//                 step="0.01"
//                 value={form.gst_percent}
//                 onChange={(e) => updateField("gst_percent", e.target.value)}
//                 className="w-full rounded-lg border px-3 py-2 outline-none"
//               />
//             </div>
//           </div>
//         </section>

//         <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <div className="rounded-2xl border p-5 shadow-sm">
//             <h2 className="mb-4 text-xl font-semibold">Bill To</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="mb-1 block text-sm font-medium">Company Name</label>
//                 <input
//                   type="text"
//                   value={form.bill_to_name}
//                   onChange={(e) => updateField("bill_to_name", e.target.value)}
//                   className="w-full rounded-lg border px-3 py-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium">Address</label>
//                 <textarea
//                   rows={4}
//                   value={form.bill_to_address}
//                   onChange={(e) => updateField("bill_to_address", e.target.value)}
//                   className="w-full rounded-lg border px-3 py-2"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                 <div>
//                   <label className="mb-1 block text-sm font-medium">PAN</label>
//                   <input
//                     type="text"
//                     value={form.bill_to_pan}
//                     onChange={(e) => updateField("bill_to_pan", e.target.value)}
//                     className="w-full rounded-lg border px-3 py-2"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-sm font-medium">GSTIN</label>
//                   <input
//                     type="text"
//                     value={form.bill_to_gstin}
//                     onChange={(e) => updateField("bill_to_gstin", e.target.value)}
//                     className="w-full rounded-lg border px-3 py-2"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-sm font-medium">CIN</label>
//                   <input
//                     type="text"
//                     value={form.bill_to_cin}
//                     onChange={(e) => updateField("bill_to_cin", e.target.value)}
//                     className="w-full rounded-lg border px-3 py-2"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl border p-5 shadow-sm">
//             <h2 className="mb-4 text-xl font-semibold">Ship To</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="mb-1 block text-sm font-medium">Company Name</label>
//                 <input
//                   type="text"
//                   value={form.ship_to_name}
//                   onChange={(e) => updateField("ship_to_name", e.target.value)}
//                   className="w-full rounded-lg border px-3 py-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium">Address</label>
//                 <textarea
//                   rows={4}
//                   value={form.ship_to_address}
//                   onChange={(e) => updateField("ship_to_address", e.target.value)}
//                   className="w-full rounded-lg border px-3 py-2"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                 <div>
//                   <label className="mb-1 block text-sm font-medium">PAN</label>
//                   <input
//                     type="text"
//                     value={form.ship_to_pan}
//                     onChange={(e) => updateField("ship_to_pan", e.target.value)}
//                     className="w-full rounded-lg border px-3 py-2"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-sm font-medium">GSTIN</label>
//                   <input
//                     type="text"
//                     value={form.ship_to_gstin}
//                     onChange={(e) => updateField("ship_to_gstin", e.target.value)}
//                     className="w-full rounded-lg border px-3 py-2"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-sm font-medium">CIN</label>
//                   <input
//                     type="text"
//                     value={form.ship_to_cin}
//                     onChange={(e) => updateField("ship_to_cin", e.target.value)}
//                     className="w-full rounded-lg border px-3 py-2"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="rounded-2xl border p-5 shadow-sm">
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="text-xl font-semibold">Invoice Items</h2>
//             <button
//               type="button"
//               onClick={addItem}
//               className="rounded-lg border px-4 py-2 text-sm font-medium"
//             >
//               + Add Item
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full border-collapse">
//               <thead>
//                 <tr className="border-b bg-gray-50 text-left text-sm">
//                   <th className="px-3 py-3">Description of Service</th>
//                   <th className="px-3 py-3">Delivery Date</th>
//                   <th className="px-3 py-3">Quantity</th>
//                   <th className="px-3 py-3">Rate</th>
//                   <th className="px-3 py-3">Amount</th>
//                   <th className="px-3 py-3">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {form.items.map((item, index) => {
//                   const amount = calcItemAmount(item.quantity, item.rate);

//                   return (
//                     <tr key={index} className="border-b align-top">
//                       <td className="px-3 py-3">
//                         <textarea
//                           rows={2}
//                           value={item.description}
//                           onChange={(e) =>
//                             updateItem(index, "description", e.target.value)
//                           }
//                           className="w-full rounded-lg border px-3 py-2"
//                           required
//                         />
//                       </td>

//                       <td className="px-3 py-3">
//                         <input
//                           type="text"
//                           value={item.delivery_date}
//                           onChange={(e) =>
//                             updateItem(index, "delivery_date", e.target.value)
//                           }
//                           placeholder="e.g. February'26"
//                           className="w-full rounded-lg border px-3 py-2"
//                         />
//                       </td>

//                       <td className="px-3 py-3">
//                         <input
//                           type="number"
//                           min="0"
//                           step="0.01"
//                           value={item.quantity}
//                           onChange={(e) =>
//                             updateItem(index, "quantity", e.target.value)
//                           }
//                           className="w-28 rounded-lg border px-3 py-2"
//                         />
//                       </td>

//                       <td className="px-3 py-3">
//                         <input
//                           type="number"
//                           min="0"
//                           step="0.01"
//                           value={item.rate}
//                           onChange={(e) => updateItem(index, "rate", e.target.value)}
//                           className="w-32 rounded-lg border px-3 py-2"
//                         />
//                       </td>

//                       <td className="px-3 py-3 font-medium">
//                         {formatCurrency(amount)}
//                       </td>

//                       <td className="px-3 py-3">
//                         <button
//                           type="button"
//                           onClick={() => removeItem(index)}
//                           className="rounded-lg border px-3 py-2 text-sm"
//                         >
//                           Remove
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </section>

//         <section className="rounded-2xl border p-5 shadow-sm">
//           <h2 className="mb-4 text-xl font-semibold">Totals Preview</h2>

//           <div className="ml-auto max-w-md space-y-3">
//             <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
//               <span className="text-sm font-medium">Subtotal</span>
//               <span className="font-semibold">{formatCurrency(totals.subtotal)}</span>
//             </div>

//             <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
//               <span className="text-sm font-medium">GST ({form.gst_percent || 0}%)</span>
//               <span className="font-semibold">{formatCurrency(totals.gst)}</span>
//             </div>

//             <div className="flex items-center justify-between rounded-lg bg-black px-4 py-3 text-white">
//               <span className="text-sm font-medium">Grand Total</span>
//               <span className="text-lg font-bold">
//                 {formatCurrency(totals.grandTotal)}
//               </span>
//             </div>
//           </div>
//         </section>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={loading}
//             className="rounded-xl bg-black px-6 py-3 text-white disabled:opacity-50"
//           >
//             {loading ? "Creating Invoice..." : "Create Invoice"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }










"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  calcInvoiceTotals,
  calcItemAmount,
  formatCurrency,
} from "@/utils/calc";

const emptyItem = {
  description: "",
  delivery_date: "",
  quantity: 1,
  rate: 0,
};

const getInitialForm = () => ({
  invoice_date: new Date().toISOString().split("T")[0],

  bill_to_name: "",
  bill_to_address: "",
  bill_to_pan: "",
  bill_to_gstin: "",
  bill_to_cin: "",

  ship_to_name: "",
  ship_to_address: "",
  ship_to_pan: "",
  ship_to_gstin: "",
  ship_to_cin: "",

  gst_percent: 18,
  items: [{ ...emptyItem }],
});

function copyBillToToShipTo(form) {
  return {
    ...form,
    ship_to_name: form.bill_to_name,
    ship_to_address: form.bill_to_address,
    ship_to_pan: form.bill_to_pan,
    ship_to_gstin: form.bill_to_gstin,
    ship_to_cin: form.bill_to_cin,
  };
}

export default function InvoiceForm() {
  const router = useRouter();

  const [form, setForm] = useState(getInitialForm());
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const totals = useMemo(() => {
    return calcInvoiceTotals(form.items, form.gst_percent);
  }, [form.items, form.gst_percent]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile/me");
        const data = await res.json();

        if (res.ok && data?.success) {
          setProfile(data.data);
        } else {
          setMessage(data?.message || "Failed to load profile");
        }
      } catch (error) {
        console.error("Failed to load profile", error);
        setMessage("Failed to load signatory details");
      } finally {
        setProfileLoading(false);
      }
    }

    fetchProfile();
  }, []);

  useEffect(() => {
    if (sameAsBilling) {
      setForm((prev) => copyBillToToShipTo(prev));
    }
  }, [sameAsBilling]);

  function updateField(field, value) {
    setForm((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };

      if (
        sameAsBilling &&
        [
          "bill_to_name",
          "bill_to_address",
          "bill_to_pan",
          "bill_to_gstin",
          "bill_to_cin",
        ].includes(field)
      ) {
        return copyBillToToShipTo(updated);
      }

      return updated;
    });
  }

  function updateItem(index, field, value) {
    setForm((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };

      return {
        ...prev,
        items: updatedItems,
      };
    });
  }

  function addItem() {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { ...emptyItem }],
    }));
  }

  function removeItem(index) {
    setForm((prev) => {
      if (prev.items.length === 1) return prev;

      return {
        ...prev,
        items: prev.items.filter((_, i) => i !== index),
      };
    });
  }

  function handleSameAsBillingChange(e) {
    const checked = e.target.checked;
    setSameAsBilling(checked);

    if (checked) {
      setForm((prev) => copyBillToToShipTo(prev));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = sameAsBilling ? copyBillToToShipTo(form) : form;

      const res = await fetch("/api/invoices/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Create invoice failed:", data);
        throw new Error(
          data.message ||
            data.details?.message ||
            JSON.stringify(data.details) ||
            "Failed to create invoice"
        );
      }

      const createdInvoiceId = data?.data?.invoice?.id;

      if (!createdInvoiceId) {
        throw new Error("Invoice created but invoice id not returned");
      }

      setForm(getInitialForm());
      setSameAsBilling(false);
      router.push(`/invoices/${createdInvoiceId}/preview`);
      router.refresh();
    } catch (error) {
      console.error("Create invoice submit error:", error);
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create Invoice</h1>
        <p className="mt-2 text-sm text-gray-600">
          Fill invoice details, add line items, GST will be calculated
          automatically.
        </p>
      </div>

      {message ? (
        <div className="mb-4 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm">
          {message}
        </div>
      ) : null}

      <div className="mb-6 rounded-2xl border p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Current Signatory</h2>

        {profileLoading ? (
          <p className="text-sm text-gray-500">Loading signatory details...</p>
        ) : profile ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Name</p>
              <p className="mt-1 font-semibold">
                {profile.full_name || "Not set"}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Designation</p>
              <p className="mt-1 font-semibold">
                {profile.designation || "Not set"}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Signature</p>
              {profile.signature_url ? (
                <img
                  src={profile.signature_url}
                  alt="Signature"
                  className="mt-2 h-16 object-contain"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-500">
                  No signature uploaded
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-red-600">
            Could not load signatory details.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="rounded-2xl border p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Invoice Header</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Invoice Date
              </label>
              <input
                type="date"
                value={form.invoice_date}
                onChange={(e) => updateField("invoice_date", e.target.value)}
                className="w-full rounded-lg border px-3 py-2 outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">GST %</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.gst_percent}
                onChange={(e) => updateField("gst_percent", e.target.value)}
                className="w-full rounded-lg border px-3 py-2 outline-none"
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Bill To</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Company Name
                </label>
                <input
                  type="text"
                  value={form.bill_to_name}
                  onChange={(e) => updateField("bill_to_name", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Address
                </label>
                <textarea
                  rows={4}
                  value={form.bill_to_address}
                  onChange={(e) =>
                    updateField("bill_to_address", e.target.value)
                  }
                  className="w-full rounded-lg border px-3 py-2"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">PAN</label>
                  <input
                    type="text"
                    value={form.bill_to_pan}
                    onChange={(e) => updateField("bill_to_pan", e.target.value)}
                    className="w-full rounded-lg border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    GSTIN
                  </label>
                  <input
                    type="text"
                    value={form.bill_to_gstin}
                    onChange={(e) =>
                      updateField("bill_to_gstin", e.target.value)
                    }
                    className="w-full rounded-lg border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">CIN</label>
                  <input
                    type="text"
                    value={form.bill_to_cin}
                    onChange={(e) => updateField("bill_to_cin", e.target.value)}
                    className="w-full rounded-lg border px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">Ship To</h2>

              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={sameAsBilling}
                  onChange={handleSameAsBillingChange}
                />
                Same as Bill To
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Company Name
                </label>
                <input
                  type="text"
                  value={form.ship_to_name}
                  onChange={(e) => updateField("ship_to_name", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2"
                  required
                  disabled={sameAsBilling}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Address
                </label>
                <textarea
                  rows={4}
                  value={form.ship_to_address}
                  onChange={(e) =>
                    updateField("ship_to_address", e.target.value)
                  }
                  className="w-full rounded-lg border px-3 py-2"
                  required
                  disabled={sameAsBilling}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">PAN</label>
                  <input
                    type="text"
                    value={form.ship_to_pan}
                    onChange={(e) => updateField("ship_to_pan", e.target.value)}
                    className="w-full rounded-lg border px-3 py-2"
                    disabled={sameAsBilling}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    GSTIN
                  </label>
                  <input
                    type="text"
                    value={form.ship_to_gstin}
                    onChange={(e) =>
                      updateField("ship_to_gstin", e.target.value)
                    }
                    className="w-full rounded-lg border px-3 py-2"
                    disabled={sameAsBilling}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">CIN</label>
                  <input
                    type="text"
                    value={form.ship_to_cin}
                    onChange={(e) => updateField("ship_to_cin", e.target.value)}
                    className="w-full rounded-lg border px-3 py-2"
                    disabled={sameAsBilling}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Invoice Items</h2>

            <button
              type="button"
              onClick={addItem}
              className="rounded-lg border px-4 py-2 text-sm font-medium"
            >
              + Add Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-sm">
                  <th className="px-3 py-3">Description of Service</th>
                  <th className="px-3 py-3">Delivery Date</th>
                  <th className="px-3 py-3">Quantity</th>
                  <th className="px-3 py-3">Rate</th>
                  <th className="px-3 py-3">Amount</th>
                  <th className="px-3 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {form.items.map((item, index) => {
                  const amount = calcItemAmount(item.quantity, item.rate);

                  return (
                    <tr key={index} className="border-b align-top">
                      <td className="px-3 py-3">
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) =>
                            updateItem(index, "description", e.target.value)
                          }
                          className="w-full rounded-lg border px-3 py-2"
                          required
                        />
                      </td>

                      <td className="px-3 py-3">
                        <input
                          type="text"
                          value={item.delivery_date}
                          onChange={(e) =>
                            updateItem(index, "delivery_date", e.target.value)
                          }
                          placeholder="e.g. February'26"
                          className="w-full rounded-lg border px-3 py-2"
                        />
                      </td>

                      <td className="px-3 py-3">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(index, "quantity", e.target.value)
                          }
                          className="w-28 rounded-lg border px-3 py-2"
                        />
                      </td>

                      <td className="px-3 py-3">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) =>
                            updateItem(index, "rate", e.target.value)
                          }
                          className="w-32 rounded-lg border px-3 py-2"
                        />
                      </td>

                      <td className="px-3 py-3 font-medium">
                        {formatCurrency(amount)}
                      </td>

                      <td className="px-3 py-3">
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="rounded-lg border px-3 py-2 text-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Totals Preview</h2>

          <div className="ml-auto max-w-md space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
              <span className="text-sm font-medium">Subtotal</span>
              <span className="font-semibold">
                {formatCurrency(totals.subtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
              <span className="text-sm font-medium">
                GST ({form.gst_percent || 0}%)
              </span>
              <span className="font-semibold">
                {formatCurrency(totals.gst)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-black px-4 py-3 text-white">
              <span className="text-sm font-medium">Grand Total</span>
              <span className="text-lg font-bold">
                {formatCurrency(totals.grandTotal)}
              </span>
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-black px-6 py-3 text-white disabled:opacity-50"
          >
            {loading ? "Creating Invoice..." : "Create Invoice"}
          </button>
        </div>
      </form>
    </div>
  );
}