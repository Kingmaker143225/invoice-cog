"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function InvoicesToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [dateFrom, setDateFrom] = useState(searchParams.get("from") || "");
  const [dateTo, setDateTo] = useState(searchParams.get("to") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");

  function applyFilters(e) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) params.set("q", search.trim());
    if (dateFrom) params.set("from", dateFrom);
    if (dateTo) params.set("to", dateTo);
    if (status) params.set("status", status);
    if (sort) params.set("sort", sort);

    router.push(`/invoices?${params.toString()}`);
  }

  function clearFilters() {
    setSearch("");
    setDateFrom("");
    setDateTo("");
    setStatus("");
    setSort("newest");
    router.push("/invoices");
  }

  return (
    <form
      onSubmit={applyFilters}
      className="rounded-2xl border bg-white p-4 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
        <div className="xl:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            type="text"
            placeholder="Invoice no / Bill To / Ship To"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            From Date
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            To Date
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
          >
            <option value="">All</option>
            <option value="draft">Draft</option>
            <option value="final">Final</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Sort
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="amount_desc">Amount High to Low</option>
            <option value="amount_asc">Amount Low to High</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-xl bg-black px-5 py-2.5 text-white"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={clearFilters}
          className="rounded-xl border px-5 py-2.5"
        >
          Clear
        </button>
      </div>
    </form>
  );
}