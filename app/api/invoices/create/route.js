// import { NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";

// function isNonEmptyString(value) {
//   return typeof value === "string" && value.trim().length > 0;
// }

// function toNumber(value) {
//   const num = Number(value);
//   return Number.isFinite(num) ? num : 0;
// }

// function validateItems(items) {
//   if (!Array.isArray(items) || items.length === 0) {
//     return "At least one invoice item is required";
//   }

//   for (let i = 0; i < items.length; i++) {
//     const item = items[i];

//     if (!isNonEmptyString(item.description)) {
//       return `Item ${i + 1}: description is required`;
//     }

//     const quantity = toNumber(item.quantity);
//     const rate = toNumber(item.rate);

//     if (quantity < 0) {
//       return `Item ${i + 1}: quantity must be 0 or greater`;
//     }

//     if (rate < 0) {
//       return `Item ${i + 1}: rate must be 0 or greater`;
//     }
//   }

//   return null;
// }

// export async function POST(request) {
//   try {
//     const supabase = await createClient();

//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser();

//     if (userError || !user) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const body = await request.json();

//     const {
//       invoice_date,
//       bill_to_name,
//       bill_to_address,
//       bill_to_pan,
//       bill_to_gstin,
//       bill_to_cin,
//       ship_to_name,
//       ship_to_address,
//       ship_to_pan,
//       ship_to_gstin,
//       ship_to_cin,
//       gst_percent,
//       items,
//     } = body;

//     if (!isNonEmptyString(invoice_date)) {
//       return NextResponse.json(
//         { success: false, message: "Invoice date is required" },
//         { status: 400 }
//       );
//     }

//     if (!isNonEmptyString(bill_to_name)) {
//       return NextResponse.json(
//         { success: false, message: "Bill To name is required" },
//         { status: 400 }
//       );
//     }

//     if (!isNonEmptyString(bill_to_address)) {
//       return NextResponse.json(
//         { success: false, message: "Bill To address is required" },
//         { status: 400 }
//       );
//     }

//     if (!isNonEmptyString(ship_to_name)) {
//       return NextResponse.json(
//         { success: false, message: "Ship To name is required" },
//         { status: 400 }
//       );
//     }

//     if (!isNonEmptyString(ship_to_address)) {
//       return NextResponse.json(
//         { success: false, message: "Ship To address is required" },
//         { status: 400 }
//       );
//     }

//     const gstPercentNumber = toNumber(gst_percent);
//     if (gstPercentNumber < 0) {
//       return NextResponse.json(
//         { success: false, message: "GST percent must be 0 or greater" },
//         { status: 400 }
//       );
//     }

//     const itemsError = validateItems(items);
//     if (itemsError) {
//       return NextResponse.json(
//         { success: false, message: itemsError },
//         { status: 400 }
//       );
//     }

//     const sanitizedItems = items.map((item) => ({
//       description: String(item.description || "").trim(),
//       delivery_date: item.delivery_date ? String(item.delivery_date) : null,
//       quantity: toNumber(item.quantity),
//       rate: toNumber(item.rate),
//     }));

//     const { data: invoiceId, error: rpcError } = await supabase.rpc(
//       "create_invoice",
//       {
//         p_invoice_date: invoice_date,
//         p_generated_by: user.id,

//         p_bill_to_name: bill_to_name,
//         p_bill_to_address: bill_to_address,
//         p_bill_to_pan: bill_to_pan || null,
//         p_bill_to_gstin: bill_to_gstin || null,
//         p_bill_to_cin: bill_to_cin || null,

//         p_ship_to_name: ship_to_name,
//         p_ship_to_address: ship_to_address,
//         p_ship_to_pan: ship_to_pan || null,
//         p_ship_to_gstin: ship_to_gstin || null,
//         p_ship_to_cin: ship_to_cin || null,

//         p_gst_percent: gstPercentNumber,
//         p_items: sanitizedItems,
//       }
//     );

//     if (rpcError) {
//   console.error("RPC ERROR:", rpcError);

//   return NextResponse.json(
//     {
//       success: false,
//       message: rpcError.message,
//       details: rpcError,
//     },
//     { status: 500 }
//   );
// }

//     const { data: invoice, error: invoiceError } = await supabase
//       .from("invoices")
//       .select("*")
//       .eq("id", invoiceId)
//       .single();

//     if (invoiceError) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invoice created but failed to fetch invoice",
//         },
//         { status: 500 }
//       );
//     }

//     const { data: invoiceItems, error: itemsErrorFetch } = await supabase
//       .from("invoice_items")
//       .select("*")
//       .eq("invoice_id", invoiceId)
//       .order("sort_order", { ascending: true });

//     if (itemsErrorFetch) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invoice created but failed to fetch invoice items",
//         },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Invoice created successfully",
//         data: {
//           invoice,
//           items: invoiceItems,
//         },
//       },
//       { status: 201 }
//     );
// //   } catch (error) {
// //     return NextResponse.json(
// //       {
// //         success: false,
// //         message: error.message || "Unexpected server error",
// //       },
// //       { status: 500 }
// //     );
// //   }
// } catch (error) {
//   console.error("API ERROR:", error);

//   return NextResponse.json(
//     {
//       success: false,
//       message: error.message || "Unexpected server error",
//       details: String(error),
//     },
//     { status: 500 }
//   );
// }
// }








// import { NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";


// function isNonEmptyString(value) {
//   return typeof value === "string" && value.trim().length > 0;
// }

// function toNumber(value) {
//   const num = Number(value);
//   return Number.isFinite(num) ? num : 0;
// }

// function validateItems(items) {
//   if (!Array.isArray(items) || items.length === 0) {
//     return "At least one invoice item is required";
//   }

//   for (let i = 0; i < items.length; i++) {
//     const item = items[i];

//     if (!isNonEmptyString(item.description)) {
//       return `Item ${i + 1}: description is required`;
//     }

//     const quantity = toNumber(item.quantity);
//     const rate = toNumber(item.rate);

//     if (quantity < 0) {
//       return `Item ${i + 1}: quantity must be 0 or greater`;
//     }

//     if (rate < 0) {
//       return `Item ${i + 1}: rate must be 0 or greater`;
//     }
//   }

//   return null;
// }

// export async function POST(request) {
//   try {
//     const supabase = await createClient();

//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser();

//     if (userError || !user) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const body = await request.json();

//     const {
//       invoice_date,
//       bill_to_name,
//       bill_to_address,
//       bill_to_pan,
//       bill_to_gstin,
//       bill_to_cin,
//       ship_to_name,
//       ship_to_address,
//       ship_to_pan,
//       ship_to_gstin,
//       ship_to_cin,
//       gst_percent,
//       items,
//     } = body;

//     if (!isNonEmptyString(invoice_date)) {
//       return NextResponse.json(
//         { success: false, message: "Invoice date is required" },
//         { status: 400 }
//       );
//     }

//     if (!isNonEmptyString(bill_to_name)) {
//       return NextResponse.json(
//         { success: false, message: "Bill To name is required" },
//         { status: 400 }
//       );
//     }

//     if (!isNonEmptyString(bill_to_address)) {
//       return NextResponse.json(
//         { success: false, message: "Bill To address is required" },
//         { status: 400 }
//       );
//     }

//     if (!isNonEmptyString(ship_to_name)) {
//       return NextResponse.json(
//         { success: false, message: "Ship To name is required" },
//         { status: 400 }
//       );
//     }

//     if (!isNonEmptyString(ship_to_address)) {
//       return NextResponse.json(
//         { success: false, message: "Ship To address is required" },
//         { status: 400 }
//       );
//     }

//     const gstPercentNumber = toNumber(gst_percent);

//     if (gstPercentNumber < 0) {
//       return NextResponse.json(
//         { success: false, message: "GST percent must be 0 or greater" },
//         { status: 400 }
//       );
//     }

//     const itemsError = validateItems(items);

//     if (itemsError) {
//       return NextResponse.json(
//         { success: false, message: itemsError },
//         { status: 400 }
//       );
//     }

//     const sanitizedItems = items.map((item) => ({
//       description: String(item.description || "").trim(),
//       delivery_date: item.delivery_date ? String(item.delivery_date) : null,
//       quantity: toNumber(item.quantity),
//       rate: toNumber(item.rate),
//     }));

//     const { data: invoiceId, error: rpcError } = await supabase.rpc(
//       "create_invoice",
//       {
//         p_invoice_date: invoice_date,
//         p_generated_by: user.id,

//         p_bill_to_name: bill_to_name,
//         p_bill_to_address: bill_to_address,
//         p_bill_to_pan: bill_to_pan || null,
//         p_bill_to_gstin: bill_to_gstin || null,
//         p_bill_to_cin: bill_to_cin || null,

//         p_ship_to_name: ship_to_name,
//         p_ship_to_address: ship_to_address,
//         p_ship_to_pan: ship_to_pan || null,
//         p_ship_to_gstin: ship_to_gstin || null,
//         p_ship_to_cin: ship_to_cin || null,

//         p_gst_percent: gstPercentNumber,
//         p_items: sanitizedItems,
//       }
//     );

//     if (rpcError) {
//       console.error("RPC create_invoice error:", rpcError);

//       return NextResponse.json(
//         {
//           success: false,
//           message: rpcError.message || "Failed to create invoice",
//           details: rpcError,
//         },
//         { status: 500 }
//       );
//     }

//     const { data: invoice, error: invoiceError } = await supabase
//       .from("invoices")
//       .select("*")
//       .eq("id", invoiceId)
//       .single();

//     if (invoiceError) {
//       console.error("Invoice fetch error:", invoiceError);

//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invoice created but failed to fetch invoice",
//           details: invoiceError,
//         },
//         { status: 500 }
//       );
//     }

//     const { data: invoiceItems, error: itemsErrorFetch } = await supabase
//       .from("invoice_items")
//       .select("*")
//       .eq("invoice_id", invoiceId)
//       .order("sort_order", { ascending: true });

//     if (itemsErrorFetch) {
//       console.error("Invoice items fetch error:", itemsErrorFetch);

//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invoice created but failed to fetch invoice items",
//           details: itemsErrorFetch,
//         },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Invoice created successfully",
//         data: {
//           invoice,
//           items: invoiceItems,
//         },
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Create invoice API error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message || "Unexpected server error",
//         details: String(error),
//       },
//       { status: 500 }
//     );
//   }
// }








import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function calcItemAmount(quantity, rate) {
  return toNumber(quantity) * toNumber(rate);
}

function calcTotals(items, gstPercent) {
  const subtotal = items.reduce((sum, item) => {
    return sum + calcItemAmount(item.quantity, item.rate);
  }, 0);

  const gst = (subtotal * toNumber(gstPercent)) / 100;
  const grandTotal = subtotal + gst;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    gst: Number(gst.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2)),
  };
}

function validateItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return "At least one invoice item is required";
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (!isNonEmptyString(item.description)) {
      return `Item ${i + 1}: description is required`;
    }

    const quantity = toNumber(item.quantity);
    const rate = toNumber(item.rate);

    if (quantity < 0) {
      return `Item ${i + 1}: quantity must be 0 or greater`;
    }

    if (rate < 0) {
      return `Item ${i + 1}: rate must be 0 or greater`;
    }
  }

  return null;
}

function numberToWords(num) {
  if (!Number.isFinite(num) || num < 0) return "Zero Rupees Only";
  if (num === 0) return "Zero Rupees Only";

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function convertBelowThousand(n) {
    let result = "";

    if (n >= 100) {
      result += `${ones[Math.floor(n / 100)]} Hundred`;
      n %= 100;
      if (n > 0) result += " ";
    }

    if (n >= 20) {
      result += tens[Math.floor(n / 10)];
      n %= 10;
      if (n > 0) result += ` ${ones[n]}`;
    } else if (n > 0) {
      result += ones[n];
    }

    return result.trim();
  }

  function convertIndian(n) {
    if (n === 0) return "";

    let result = "";

    const crore = Math.floor(n / 10000000);
    n %= 10000000;

    const lakh = Math.floor(n / 100000);
    n %= 100000;

    const thousand = Math.floor(n / 1000);
    n %= 1000;

    const hundredPart = n;

    if (crore > 0) {
      result += `${convertBelowThousand(crore)} Crore`;
    }

    if (lakh > 0) {
      if (result) result += " ";
      result += `${convertBelowThousand(lakh)} Lakh`;
    }

    if (thousand > 0) {
      if (result) result += " ";
      result += `${convertBelowThousand(thousand)} Thousand`;
    }

    if (hundredPart > 0) {
      if (result) result += " ";
      result += convertBelowThousand(hundredPart);
    }

    return result.trim();
  }

  const integerPart = Math.floor(num);
  const decimalPart = Math.round((num - integerPart) * 100);

  let words = `${convertIndian(integerPart)} Rupees`;

  if (decimalPart > 0) {
    words += ` and ${convertIndian(decimalPart)} Paise`;
  }

  return `${words} Only`;
}

export async function POST(request) {
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

    const body = await request.json();

    const {
      invoice_date,
      bill_to_name,
      bill_to_address,
      bill_to_pan,
      bill_to_gstin,
      bill_to_cin,
      ship_to_name,
      ship_to_address,
      ship_to_pan,
      ship_to_gstin,
      ship_to_cin,
      gst_percent,
      items,
    } = body;

    if (!isNonEmptyString(invoice_date)) {
      return NextResponse.json(
        { success: false, message: "Invoice date is required" },
        { status: 400 }
      );
    }

    if (!isNonEmptyString(bill_to_name)) {
      return NextResponse.json(
        { success: false, message: "Bill To name is required" },
        { status: 400 }
      );
    }

    if (!isNonEmptyString(bill_to_address)) {
      return NextResponse.json(
        { success: false, message: "Bill To address is required" },
        { status: 400 }
      );
    }

    if (!isNonEmptyString(ship_to_name)) {
      return NextResponse.json(
        { success: false, message: "Ship To name is required" },
        { status: 400 }
      );
    }

    if (!isNonEmptyString(ship_to_address)) {
      return NextResponse.json(
        { success: false, message: "Ship To address is required" },
        { status: 400 }
      );
    }

    const gstPercentNumber = toNumber(gst_percent);

    if (gstPercentNumber < 0) {
      return NextResponse.json(
        { success: false, message: "GST percent must be 0 or greater" },
        { status: 400 }
      );
    }

    const itemsError = validateItems(items);

    if (itemsError) {
      return NextResponse.json(
        { success: false, message: itemsError },
        { status: 400 }
      );
    }

    const sanitizedItems = items.map((item) => ({
      description: String(item.description || "").trim(),
      delivery_date: item.delivery_date ? String(item.delivery_date) : null,
      quantity: toNumber(item.quantity),
      rate: toNumber(item.rate),
    }));

    const totals = calcTotals(sanitizedItems, gstPercentNumber);
    const amountInWords = numberToWords(totals.grandTotal);

    const { data: invoiceId, error: rpcError } = await supabase.rpc(
      "create_invoice",
      {
        p_invoice_date: invoice_date,
        p_generated_by: user.id,

        p_bill_to_name: bill_to_name,
        p_bill_to_address: bill_to_address,
        p_bill_to_pan: bill_to_pan || null,
        p_bill_to_gstin: bill_to_gstin || null,
        p_bill_to_cin: bill_to_cin || null,

        p_ship_to_name: ship_to_name,
        p_ship_to_address: ship_to_address,
        p_ship_to_pan: ship_to_pan || null,
        p_ship_to_gstin: ship_to_gstin || null,
        p_ship_to_cin: ship_to_cin || null,

        p_gst_percent: gstPercentNumber,
        p_items: sanitizedItems,

        // add this only if your SQL function supports it
        p_amount_in_words: amountInWords,
      }
    );

    if (rpcError) {
      console.error("RPC create_invoice error:", rpcError);

      return NextResponse.json(
        {
          success: false,
          message: rpcError.message || "Failed to create invoice",
          details: rpcError,
        },
        { status: 500 }
      );
    }

    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", invoiceId)
      .single();

    if (invoiceError) {
      console.error("Invoice fetch error:", invoiceError);

      return NextResponse.json(
        {
          success: false,
          message: "Invoice created but failed to fetch invoice",
          details: invoiceError,
        },
        { status: 500 }
      );
    }

    const { data: invoiceItems, error: itemsErrorFetch } = await supabase
      .from("invoice_items")
      .select("*")
      .eq("invoice_id", invoiceId)
      .order("sort_order", { ascending: true });

    if (itemsErrorFetch) {
      console.error("Invoice items fetch error:", itemsErrorFetch);

      return NextResponse.json(
        {
          success: false,
          message: "Invoice created but failed to fetch invoice items",
          details: itemsErrorFetch,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Invoice created successfully",
        data: {
          invoice,
          items: invoiceItems,
          computed: {
            subtotal: totals.subtotal,
            gst_amount: totals.gst,
            grand_total: totals.grandTotal,
            amount_in_words: amountInWords,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create invoice API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Unexpected server error",
        details: String(error),
      },
      { status: 500 }
    );
  }
}