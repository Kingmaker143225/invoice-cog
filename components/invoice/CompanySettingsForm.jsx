"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompanySettingsForm({ settings }) {
  const router = useRouter();

  const [form, setForm] = useState({
    company_name: settings?.company_name || "",
    mobile_1: settings?.mobile_1 || "",
    mobile_2: settings?.mobile_2 || "",
    email: settings?.email || "",
    address: settings?.address || "",
    bank_account_name: settings?.bank_account_name || "",
    account_number: settings?.account_number || "",
    bank_name: settings?.bank_name || "",
    branch: settings?.branch || "",
    ifsc_code: settings?.ifsc_code || "",
    cif_id: settings?.cif_id || "",
    pan_number: settings?.pan_number || "",
    tan_number: settings?.tan_number || "",
    default_declaration: settings?.default_declaration || "",
  });

  const [topImage, setTopImage] = useState(null);
  const [bottomImage, setBottomImage] = useState(null);
  const [topPreview, setTopPreview] = useState(settings?.top_image_url || "");
  const [bottomPreview, setBottomPreview] = useState(settings?.bottom_image_url || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleTopImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setTopImage(file);
    setTopPreview(URL.createObjectURL(file));
  }

  function handleBottomImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBottomImage(file);
    setBottomPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value ?? "");
      });

      if (topImage) formData.append("top_image", topImage);
      if (bottomImage) formData.append("bottom_image", bottomImage);

      const res = await fetch("/api/company-settings/update", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save company settings");
      }

      setMessage("Company settings saved successfully.");
      router.refresh();
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Company Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage common invoice details, bank info, declaration, and top/bottom images.
        </p>
      </div>

      {message ? (
        <div className="mb-4 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm">
          {message}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="rounded-2xl border p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Company Info</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input className="rounded-lg border px-3 py-2" placeholder="Company Name" value={form.company_name} onChange={(e) => updateField("company_name", e.target.value)} />
            <input className="rounded-lg border px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
            <input className="rounded-lg border px-3 py-2" placeholder="Mobile 1" value={form.mobile_1} onChange={(e) => updateField("mobile_1", e.target.value)} />
            <input className="rounded-lg border px-3 py-2" placeholder="Mobile 2" value={form.mobile_2} onChange={(e) => updateField("mobile_2", e.target.value)} />
            <input className="rounded-lg border px-3 py-2" placeholder="PAN Number" value={form.pan_number} onChange={(e) => updateField("pan_number", e.target.value)} />
            <input className="rounded-lg border px-3 py-2" placeholder="TAN Number" value={form.tan_number} onChange={(e) => updateField("tan_number", e.target.value)} />
          </div>

          <div className="mt-4">
            <textarea
              rows={4}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Address"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
            />
          </div>
        </section>

        <section className="rounded-2xl border p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Bank Details</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input className="rounded-lg border px-3 py-2" placeholder="Account Name" value={form.bank_account_name} onChange={(e) => updateField("bank_account_name", e.target.value)} />
            <input className="rounded-lg border px-3 py-2" placeholder="Account Number" value={form.account_number} onChange={(e) => updateField("account_number", e.target.value)} />
            <input className="rounded-lg border px-3 py-2" placeholder="Bank Name" value={form.bank_name} onChange={(e) => updateField("bank_name", e.target.value)} />
            <input className="rounded-lg border px-3 py-2" placeholder="Branch" value={form.branch} onChange={(e) => updateField("branch", e.target.value)} />
            <input className="rounded-lg border px-3 py-2" placeholder="IFSC Code" value={form.ifsc_code} onChange={(e) => updateField("ifsc_code", e.target.value)} />
            <input className="rounded-lg border px-3 py-2" placeholder="CIF ID" value={form.cif_id} onChange={(e) => updateField("cif_id", e.target.value)} />
          </div>
        </section>

        <section className="rounded-2xl border p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Declaration</h2>
          <textarea
            rows={5}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Default declaration text"
            value={form.default_declaration}
            onChange={(e) => updateField("default_declaration", e.target.value)}
          />
        </section>

        <section className="rounded-2xl border p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Invoice Images</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Top Image</label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleTopImageChange}
                className="w-full rounded-lg border px-3 py-2"
              />
              {topPreview ? (
                <img src={topPreview} alt="Top preview" className="mt-3 max-h-40 rounded border object-contain" />
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Bottom Image</label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleBottomImageChange}
                className="w-full rounded-lg border px-3 py-2"
              />
              {bottomPreview ? (
                <img src={bottomPreview} alt="Bottom preview" className="mt-3 max-h-40 rounded border object-contain" />
              ) : null}
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-black px-6 py-3 text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Company Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}