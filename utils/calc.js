export function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

export function calcItemAmount(quantity, rate) {
  return toNumber(quantity) * toNumber(rate);
}

export function calcInvoiceTotals(items, gstPercent) {
  const subtotal = items.reduce((sum, item) => {
    return sum + calcItemAmount(item.quantity, item.rate);
  }, 0);

  const gst = (subtotal * toNumber(gstPercent)) / 100;
  const grandTotal = subtotal + gst;

  return {
    subtotal,
    gst,
    grandTotal,
  };
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(toNumber(value));
}