import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 90,
    paddingBottom: 90,
    paddingHorizontal: 28,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.25,
    color: "#111",
  },

  topImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 78,
  },

  bottomImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 78,
  },

  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  headerTable: {
    borderWidth: 1,
    borderColor: "#000",
  },

  headerRow: {
    flexDirection: "row",
  },

  billCol: {
    width: "32%",
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#000",
    minHeight: 130,
  },

  shipCol: {
    width: "32%",
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#000",
    minHeight: 130,
  },

  invoiceNoCol: {
    width: "18%",
    borderRightWidth: 1,
    borderRightColor: "#000",
  },

  dateCol: {
    width: "18%",
  },

  metaHead: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    padding: 6,
    minHeight: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  metaBody: {
    padding: 6,
    minHeight: 92,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 11,
    textAlign: "center",
  },

  sectionHeading: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  partyName: {
    fontWeight: "bold",
    marginBottom: 2,
  },

  smallGap: {
    marginBottom: 2,
  },

  itemsTable: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
  },

  itemsHeaderRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    fontWeight: "bold",
  },

  itemRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    minHeight: 46,
  },

  colDesc: {
    width: "36%",
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#000",
  },

  colDelivery: {
    width: "20%",
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "center",
  },

  colQty: {
    width: "14%",
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "center",
  },

  colRate: {
    width: "15%",
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "right",
  },

  colAmount: {
    width: "15%",
    padding: 6,
    textAlign: "right",
  },

  totalsWrap: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
  },

  totalRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    minHeight: 28,
  },

  totalLabelWide: {
    width: "85%",
    paddingHorizontal: 8,
    paddingVertical: 6,
    textAlign: "right",
    fontWeight: "bold",
    borderRightWidth: 1,
    borderRightColor: "#000",
    justifyContent: "center",
  },

  totalValueNarrow: {
    width: "15%",
    paddingHorizontal: 8,
    paddingVertical: 6,
    textAlign: "right",
    fontWeight: "bold",
    justifyContent: "center",
  },

  summaryRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    minHeight: 28,
  },

  summaryLabel: {
    width: "70%",
    paddingHorizontal: 8,
    paddingVertical: 6,
    textAlign: "right",
    borderRightWidth: 1,
    borderRightColor: "#000",
    fontWeight: "bold",
  },

  summaryValue: {
    width: "30%",
    paddingHorizontal: 8,
    paddingVertical: 6,
    textAlign: "right",
    fontWeight: "bold",
  },

  inWordsRow: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    textAlign: "center",
    fontWeight: "bold",
  },

  bottomSection: {
    flexDirection: "row",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    minHeight: 220,
  },

  leftBox: {
    width: "50%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 8,
  },

  rightBox: {
    width: "50%",
    padding: 8,
  },

  detailSection: {
    marginBottom: 10,
  },

  detailTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  detailRow: {
    flexDirection: "row",
    marginBottom: 2,
  },

  detailLabel: {
    width: 70,
    fontWeight: "bold",
  },

  detailColon: {
    width: 10,
    fontWeight: "bold",
  },

  detailValue: {
    flex: 1,
  },

  paragraph: {
    marginBottom: 8,
  },

  companyLine: {
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 6,
  },

  signature: {
    width: 120,
    height: 55,
    objectFit: "contain",
    marginVertical: 8,
  },

  signName: {
    fontWeight: "bold",
    marginTop: 2,
  },

  signRole: {
    fontWeight: "bold",
  },
});

function money(value) {
  const num = Number(value || 0);
  return num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatInvoiceDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

function quantityDisplay(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "-";
  if (num === 0) return "-";
  if (Number.isInteger(num)) return String(num);
  return String(num);
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

  function belowThousand(n) {
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

  function indian(n) {
    if (n === 0) return "";

    let result = "";

    const crore = Math.floor(n / 10000000);
    n %= 10000000;

    const lakh = Math.floor(n / 100000);
    n %= 100000;

    const thousand = Math.floor(n / 1000);
    n %= 1000;

    if (crore > 0) result += `${belowThousand(crore)} Crore`;
    if (lakh > 0) result += `${result ? " " : ""}${belowThousand(lakh)} Lakh`;
    if (thousand > 0) result += `${result ? " " : ""}${belowThousand(thousand)} Thousand`;
    if (n > 0) result += `${result ? " " : ""}${belowThousand(n)}`;

    return result.trim();
  }

  const integerPart = Math.floor(num);
  const decimalPart = Math.round((num - integerPart) * 100);

  let words = `${indian(integerPart)} Rupees`;

  if (decimalPart > 0) {
    words += ` and ${indian(decimalPart)} Paise`;
  }

  return `${words} Only`;
}

function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailColon}>:</Text>
      <Text style={styles.detailValue}>{value || "-"}</Text>
    </View>
  );
}

export default function InvoicePdfDocument({ invoice, items = [], company }) {
  const grandTotal = Number(invoice?.grand_total || 0);
  const amountInWords =
    invoice?.amount_in_words &&
    !String(invoice.amount_in_words).includes(".00 Only")
      ? invoice.amount_in_words
      : numberToWords(grandTotal);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {invoice?.top_image_url ? (
          <Image src={invoice.top_image_url} style={styles.topImage} fixed />
        ) : null}

        {invoice?.bottom_image_url ? (
          <Image src={invoice.bottom_image_url} style={styles.bottomImage} fixed />
        ) : null}

        <Text style={styles.title}>TAX INVOICE</Text>

        <View style={styles.headerTable}>
          <View style={styles.headerRow}>
            <View style={styles.billCol}>
              <Text style={styles.sectionHeading}>Bill To:</Text>
              <Text style={styles.partyName}>{invoice.bill_to_name}</Text>
              <Text style={styles.smallGap}>{invoice.bill_to_address}</Text>
              {invoice.bill_to_pan ? <Text style={styles.smallGap}>PAN - {invoice.bill_to_pan}</Text> : null}
              {invoice.bill_to_gstin ? <Text style={styles.smallGap}>GSTIN: {invoice.bill_to_gstin}</Text> : null}
              {invoice.bill_to_cin ? <Text>CIN: {invoice.bill_to_cin}</Text> : null}
            </View>

            <View style={styles.shipCol}>
              <Text style={styles.sectionHeading}>Ship To:</Text>
              <Text style={styles.partyName}>{invoice.ship_to_name}</Text>
              <Text style={styles.smallGap}>{invoice.ship_to_address}</Text>
              {invoice.ship_to_pan ? <Text style={styles.smallGap}>PAN - {invoice.ship_to_pan}</Text> : null}
              {invoice.ship_to_gstin ? <Text style={styles.smallGap}>GSTIN: {invoice.ship_to_gstin}</Text> : null}
              {invoice.ship_to_cin ? <Text>CIN: {invoice.ship_to_cin}</Text> : null}
            </View>

            <View style={styles.invoiceNoCol}>
              <View style={styles.metaHead}>
                <Text>Invoice No</Text>
              </View>
              <View style={styles.metaBody}>
                <Text>{invoice.invoice_number}</Text>
              </View>
            </View>

            <View style={styles.dateCol}>
              <View style={styles.metaHead}>
                <Text>Date</Text>
              </View>
              <View style={styles.metaBody}>
                <Text>{formatInvoiceDate(invoice.invoice_date)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.itemsTable}>
          <View style={styles.itemsHeaderRow}>
            <Text style={styles.colDesc}>Description of Service / Goods</Text>
            <Text style={styles.colDelivery}>Delivery Date</Text>
            <Text style={styles.colQty}>Quantity</Text>
            <Text style={styles.colRate}>Rate</Text>
            <Text style={styles.colAmount}>Amount (INR)</Text>
          </View>

          {items.map((item) => (
            <View key={item.id || `${item.description}-${item.sort_order}`} style={styles.itemRow}>
              <Text style={styles.colDesc}>{item.description || "-"}</Text>
              <Text style={styles.colDelivery}>{item.delivery_date || "-"}</Text>
              <Text style={styles.colQty}>{quantityDisplay(item.quantity)}</Text>
              <Text style={styles.colRate}>{money(item.rate)}</Text>
              <Text style={styles.colAmount}>{money(item.amount)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsWrap}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabelWide}>Total Amount</Text>
            <Text style={styles.totalValueNarrow}>{money(invoice.grand_total)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{money(invoice.subtotal)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Add GST ({invoice.gst_percent || 0}%)</Text>
            <Text style={styles.summaryValue}>{money(invoice.gst_amount)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Grand Total</Text>
            <Text style={styles.summaryValue}>{money(invoice.grand_total)}</Text>
          </View>

          <Text style={styles.inWordsRow}>({amountInWords})</Text>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.leftBox}>
            <View style={styles.detailSection}>
              <Text style={styles.detailTitle}>Contact Details:</Text>
              <DetailRow
                label="Mob"
                value={
                  company?.mobile_2
                    ? `${company?.mobile_1 || "-"} / ${company.mobile_2}`
                    : company?.mobile_1 || "-"
                }
              />
              <DetailRow label="Email" value={company?.email || "-"} />
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.detailTitle}>Address Details:</Text>
              <Text>{company?.address || "-"}</Text>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.detailTitle}>Bank Details:</Text>
              <DetailRow label="Name" value={company?.bank_account_name || "-"} />
              <DetailRow label="Acc. No" value={company?.account_number || "-"} />
              <DetailRow label="Bank" value={company?.bank_name || "-"} />
              <DetailRow label="Branch" value={company?.branch || "-"} />
              <DetailRow label="IFSC" value={company?.ifsc_code || "-"} />
              <DetailRow label="CIF ID" value={company?.cif_id || "-"} />
              <DetailRow label="PAN" value={company?.pan_number || "-"} />
              <DetailRow label="TAN" value={company?.tan_number || "-"} />
            </View>
          </View>

          <View style={styles.rightBox}>
            <Text style={styles.detailTitle}>Declaration:</Text>
            <Text style={styles.paragraph}>
              {invoice.declaration_text ||
                "This is to certify that all the details furnished above are true and genuine to the best of our knowledge."}
            </Text>

            <Text style={styles.companyLine}>
              For {company?.company_name || "Company"}
            </Text>

            {invoice.signatory_signature_url ? (
              <Image
                src={invoice.signatory_signature_url}
                style={styles.signature}
              />
            ) : null}

            <Text style={styles.signName}>{invoice.signatory_name || ""}</Text>
            <Text style={styles.signRole}>{invoice.signatory_title || ""}</Text>
            <Text>(Authorized Signatory)</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}