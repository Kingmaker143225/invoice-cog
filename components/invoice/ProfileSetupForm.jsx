"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileSetupForm({ profile }) {
  const router = useRouter();

  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [designation, setDesignation] = useState(
    profile?.designation || "Authorized Signatory"
  );
  const [signature, setSignature] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(profile?.signature_url || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSignature(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("designation", designation);

      if (signature) {
        formData.append("signature", signature);
      }

      const res = await fetch("/api/profile/update", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      setMessage("Profile saved successfully.");
      router.push("/invoices");
      router.refresh();
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">Complete Your Profile</h1>
        <p className="mt-2 text-sm text-gray-600">
          Add your name, designation, and signature. This will be used in invoice declaration.
        </p>

        {message ? (
          <div className="mt-4 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm">
            {message}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="mb-1 block text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Designation</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Enter your designation"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Signature</label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleFileChange}
              className="w-full rounded-lg border px-3 py-2"
            />
            <p className="mt-2 text-xs text-gray-500">
              Upload your signature image. PNG with transparent background is best.
            </p>
          </div>

          {previewUrl ? (
            <div className="rounded-xl border bg-gray-50 p-4">
              <p className="mb-2 text-sm font-medium">Signature Preview</p>
              <img
                src={previewUrl}
                alt="Signature preview"
                className="h-24 object-contain"
              />
            </div>
          ) : null}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-black px-6 py-3 text-white disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}