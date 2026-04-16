"use client";

import { PDFViewer } from "@react-pdf/renderer";
import InvoicePdfDocument from "@/components/pdf/InvoicePdfDocument";

export default function InvoicePdfViewer({ invoice, items, company }) {
  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <PDFViewer width="100%" height="100%">
        <InvoicePdfDocument
          invoice={invoice}
          items={items || []}
          company={company}
        />
      </PDFViewer>
    </div>
  );
}