// chatgpt code

// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";

// /* ===================== LAYOUT CONTROL ===================== */

// const PAGE_PADDING_X = 36;

// const HEADER_TOP = 0;
// const HEADER_HEIGHT = 250;

// const FIRST_PAGE_CONTENT_TOP = 45;
// const MIDDLE_PAGE_CONTENT_TOP = 40;

// const FOOTER_BOTTOM = 0;
// const FOOTER_HEIGHT = 250;
// const LAST_PAGE_CONTENT_BOTTOM = 70;

// /*
//   Pagination units:
//   - first page has invoice header/meta, so fewer item units
//   - middle pages can hold more item units
//   - last page needs totals + declaration + footer section + footer PNG,
//     so fewer item units again
// */
// const FIRST_PAGE_ITEM_UNITS = 11;
// const MIDDLE_PAGE_ITEM_UNITS = 22;
// const LAST_PAGE_ITEM_UNITS = 8;

// /* ===================== STYLES ===================== */

// const styles = StyleSheet.create({
//   page: {
//     position: "relative",
//     paddingTop: 0,
//     paddingBottom: 0,
//     paddingHorizontal: 0,
//     fontSize: 10,
//     fontFamily: "Helvetica",
//     color: "#111",
//     backgroundColor: "#fff",
//   },

//   firstPageInner: {
//     paddingTop: FIRST_PAGE_CONTENT_TOP,
//     paddingBottom: 30,
//     paddingLeft: PAGE_PADDING_X,
//     paddingRight: PAGE_PADDING_X,
//   },

//   middlePageInner: {
//     paddingTop: MIDDLE_PAGE_CONTENT_TOP,
//     paddingBottom: 30,
//     paddingLeft: PAGE_PADDING_X,
//     paddingRight: PAGE_PADDING_X,
//   },

//   lastPageInner: {
//     paddingTop: MIDDLE_PAGE_CONTENT_TOP,
//     paddingBottom: LAST_PAGE_CONTENT_BOTTOM,
//     paddingLeft: PAGE_PADDING_X,
//     paddingRight: PAGE_PADDING_X,
//   },

//   title: {
//     textAlign: "center",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 12,
//   },

//   headerTable: {
//     borderWidth: 1,
//     borderColor: "#000",
//     marginBottom: 0,
//   },

//   headerRow: {
//     flexDirection: "row",
//   },

//   billCol: {
//     width: "32%",
//     padding: 7,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     minHeight: 122,
//   },

//   shipCol: {
//     width: "32%",
//     padding: 7,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     minHeight: 122,
//   },

//   invoiceNoCol: {
//     width: "18%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//   },

//   dateCol: {
//     width: "18%",
//   },

//   metaHead: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 34,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 5,
//     fontWeight: "bold",
//   },

//   metaBody: {
//     minHeight: 88,
//     alignItems: "center",
//     justifyContent: "center",
//     textAlign: "center",
//     padding: 6,
//     fontWeight: "bold",
//     fontSize: 11,
//   },

//   sectionHeading: {
//     fontWeight: "bold",
//     marginBottom: 4,
//   },

//   partyName: {
//     fontWeight: "bold",
//     marginBottom: 2,
//   },

//   smallGap: {
//     marginBottom: 2,
//   },

//   itemsTable: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: "#000",
//   },

//   itemsHeaderRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 32,
//     alignItems: "center",
//   },

//   itemRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 34,
//     alignItems: "center",
//   },

//   colDesc: {
//     width: "36%",
//     padding: 6,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//   },

//   colDelivery: {
//     width: "20%",
//     padding: 6,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     textAlign: "center",
//   },

//   colQty: {
//     width: "14%",
//     padding: 6,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     textAlign: "center",
//   },

//   colRate: {
//     width: "15%",
//     padding: 6,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     textAlign: "right",
//   },

//   colAmount: {
//     width: "15%",
//     padding: 6,
//     textAlign: "right",
//   },

//   headerCellText: {
//     fontWeight: "bold",
//     textAlign: "center",
//   },

//   totalsWrap: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: "#000",
//     marginTop: 0,
//   },

//   totalRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 28,
//     alignItems: "center",
//   },

//   totalLabelWide: {
//     width: "85%",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     textAlign: "right",
//     fontWeight: "bold",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//   },

//   totalValueNarrow: {
//     width: "15%",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     textAlign: "right",
//     fontWeight: "bold",
//   },

//   summaryRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 26,
//     alignItems: "center",
//   },

//   summaryLabel: {
//     width: "70%",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     textAlign: "right",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     fontWeight: "bold",
//   },

//   summaryValue: {
//     width: "30%",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     textAlign: "right",
//     fontWeight: "bold",
//   },

//   inWordsRow: {
//     paddingHorizontal: 8,
//     paddingVertical: 8,
//     textAlign: "center",
//     fontWeight: "bold",
//   },

//   footerWrap: {
//     marginTop: 10,
//   },

//   bottomSection: {
//     flexDirection: "row",
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: "#000",
//     minHeight: 170,
//   },

//   leftBox: {
//     width: "50%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 8,
//   },

//   rightBox: {
//     width: "50%",
//     padding: 8,
//   },

//   detailSection: {
//     marginBottom: 10,
//   },

//   detailTitle: {
//     fontWeight: "bold",
//     marginBottom: 4,
//   },

//   detailRow: {
//     flexDirection: "row",
//     marginBottom: 2,
//   },

//   detailLabel: {
//     width: 72,
//     fontWeight: "bold",
//   },

//   detailColon: {
//     width: 8,
//     fontWeight: "bold",
//   },

//   detailValue: {
//     flex: 1,
//   },

//   paragraph: {
//     marginBottom: 8,
//     lineHeight: 1.35,
//   },

//   companyLine: {
//     fontWeight: "bold",
//     marginTop: 8,
//     marginBottom: 6,
//   },

//   signature: {
//     width: 120,
//     height: 50,
//     objectFit: "contain",
//     marginVertical: 8,
//   },

//   signName: {
//     fontWeight: "bold",
//     marginTop: 2,
//   },

//   signRole: {
//     fontWeight: "bold",
//   },

//   continuedTitle: {
//     textAlign: "center",
//     fontSize: 13,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
// });

// /* ===================== HELPERS ===================== */

// function money(value) {
//   const num = Number(value || 0);
//   return num.toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
// }

// function formatInvoiceDate(value) {
//   if (!value) return "";
//   const d = new Date(value);
//   if (Number.isNaN(d.getTime())) return String(value);
//   const dd = String(d.getDate()).padStart(2, "0");
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const yyyy = d.getFullYear();
//   return `${dd}.${mm}.${yyyy}`;
// }

// function quantityDisplay(value) {
//   const num = Number(value);
//   if (!Number.isFinite(num)) return "-";
//   if (num === 0) return "-";
//   if (Number.isInteger(num)) return String(num);
//   return String(num);
// }

// function numberToWords(num) {
//   if (!Number.isFinite(num) || num < 0) return "Zero Rupees Only";
//   if (num === 0) return "Zero Rupees Only";

//   const ones = [
//     "",
//     "One",
//     "Two",
//     "Three",
//     "Four",
//     "Five",
//     "Six",
//     "Seven",
//     "Eight",
//     "Nine",
//     "Ten",
//     "Eleven",
//     "Twelve",
//     "Thirteen",
//     "Fourteen",
//     "Fifteen",
//     "Sixteen",
//     "Seventeen",
//     "Eighteen",
//     "Nineteen",
//   ];

//   const tens = [
//     "",
//     "",
//     "Twenty",
//     "Thirty",
//     "Forty",
//     "Fifty",
//     "Sixty",
//     "Seventy",
//     "Eighty",
//     "Ninety",
//   ];

//   function belowThousand(n) {
//     let result = "";

//     if (n >= 100) {
//       result += `${ones[Math.floor(n / 100)]} Hundred`;
//       n %= 100;
//       if (n > 0) result += " ";
//     }

//     if (n >= 20) {
//       result += tens[Math.floor(n / 10)];
//       n %= 10;
//       if (n > 0) result += ` ${ones[n]}`;
//     } else if (n > 0) {
//       result += ones[n];
//     }

//     return result.trim();
//   }

//   function indian(n) {
//     if (n === 0) return "";

//     let result = "";

//     const crore = Math.floor(n / 10000000);
//     n %= 10000000;

//     const lakh = Math.floor(n / 100000);
//     n %= 100000;

//     const thousand = Math.floor(n / 1000);
//     n %= 1000;

//     if (crore > 0) result += `${belowThousand(crore)} Crore`;
//     if (lakh > 0) result += `${result ? " " : ""}${belowThousand(lakh)} Lakh`;
//     if (thousand > 0) result += `${result ? " " : ""}${belowThousand(thousand)} Thousand`;
//     if (n > 0) result += `${result ? " " : ""}${belowThousand(n)}`;

//     return result.trim();
//   }

//   const integerPart = Math.floor(num);
//   const decimalPart = Math.round((num - integerPart) * 100);

//   let words = `${indian(integerPart)} Rupees`;

//   if (decimalPart > 0) {
//     words += ` and ${indian(decimalPart)} Paise`;
//   }

//   return `${words} Only`;
// }

// function estimateRowUnits(item) {
//   const desc = String(item?.description || "");
//   const delivery = String(item?.delivery_date || "");
//   const textLength = Math.max(desc.length, delivery.length);

//   if (textLength > 120) return 3;
//   if (textLength > 55) return 2;
//   return 1;
// }

// function paginateItems(items = []) {
//   const safeItems = Array.isArray(items) ? items : [];
//   if (!safeItems.length) {
//     return [{ type: "last", rows: [] }];
//   }

//   const pages = [];
//   let currentRows = [];
//   let currentUnits = 0;
//   let currentCapacity = FIRST_PAGE_ITEM_UNITS;
//   let isFirstPhysicalPage = true;

//   for (let i = 0; i < safeItems.length; i += 1) {
//     const item = safeItems[i];
//     const itemUnits = estimateRowUnits(item);
//     const remainingItems = safeItems.length - i - 1;

//     const nextPageNeedsLastPage = remainingItems > 0;
//     const effectiveUnits = Math.min(itemUnits, currentCapacity);

//     if (currentRows.length > 0 && currentUnits + effectiveUnits > currentCapacity) {
//       pages.push({
//         type: isFirstPhysicalPage ? "first" : "middle",
//         rows: currentRows,
//       });

//       currentRows = [];
//       currentUnits = 0;
//       currentCapacity = MIDDLE_PAGE_ITEM_UNITS;
//       isFirstPhysicalPage = false;
//     }

//     currentRows.push(item);
//     currentUnits += effectiveUnits;

//     const unitsNeededForRemainingAsLastPage = (() => {
//       if (remainingItems <= 0) return 0;
//       let units = 0;
//       for (let j = i + 1; j < safeItems.length; j += 1) {
//         units += estimateRowUnits(safeItems[j]);
//       }
//       return units;
//     })();

//     if (
//       nextPageNeedsLastPage &&
//       unitsNeededForRemainingAsLastPage <= LAST_PAGE_ITEM_UNITS
//     ) {
//       pages.push({
//         type: isFirstPhysicalPage ? "first" : "middle",
//         rows: currentRows,
//       });

//       const lastRows = safeItems.slice(i + 1);
//       pages.push({
//         type: "last",
//         rows: lastRows,
//       });

//       return pages;
//     }
//   }

//   pages.push({
//     type: "last",
//     rows: currentRows,
//   });

//   return pages;
// }

// /* ===================== UI SECTIONS ===================== */

// function DetailRow({ label, value }) {
//   return (
//     <View style={styles.detailRow}>
//       <Text style={styles.detailLabel}>{label}</Text>
//       <Text style={styles.detailColon}>:</Text>
//       <Text style={styles.detailValue}>{value || "-"}</Text>
//     </View>
//   );
// }

// function ItemsTable({ rows = [], showHeader = true }) {
//   return (
//     <View style={styles.itemsTable}>
//       {showHeader && (
//         <View style={styles.itemsHeaderRow}>
//           <Text style={[styles.colDesc, styles.headerCellText]}>
//             Description of Service / Goods
//           </Text>
//           <Text style={[styles.colDelivery, styles.headerCellText]}>
//             Delivery Date
//           </Text>
//           <Text style={[styles.colQty, styles.headerCellText]}>
//             Quantity
//           </Text>
//           <Text style={[styles.colRate, styles.headerCellText]}>
//             Rate
//           </Text>
//           <Text style={[styles.colAmount, styles.headerCellText]}>
//             Amount (INR)
//           </Text>
//         </View>
//       )}

//       {rows.map((item, idx) => (
//         <View
//           key={item.id || `${item.description || "item"}-${item.sort_order || idx}-${idx}`}
//           style={styles.itemRow}
//         >
//           <Text style={styles.colDesc}>{item.description || "-"}</Text>
//           <Text style={styles.colDelivery}>{item.delivery_date || "-"}</Text>
//           <Text style={styles.colQty}>{quantityDisplay(item.quantity)}</Text>
//           <Text style={styles.colRate}>{money(item.rate)}</Text>
//           <Text style={styles.colAmount}>{money(item.amount)}</Text>
//         </View>
//       ))}
//     </View>
//   );
// }

// function TotalsSection({ invoice, amountInWords }) {
//   return (
//     <View style={styles.totalsWrap}>
//       <View style={styles.totalRow}>
//         <Text style={styles.totalLabelWide}>Total Amount</Text>
//         <Text style={styles.totalValueNarrow}>{money(invoice.grand_total)}</Text>
//       </View>

//       <View style={styles.summaryRow}>
//         <Text style={styles.summaryLabel}>Subtotal</Text>
//         <Text style={styles.summaryValue}>{money(invoice.subtotal)}</Text>
//       </View>

//       <View style={styles.summaryRow}>
//         <Text style={styles.summaryLabel}>Add GST ({invoice.gst_percent || 0}%)</Text>
//         <Text style={styles.summaryValue}>{money(invoice.gst_amount)}</Text>
//       </View>

//       <View style={styles.summaryRow}>
//         <Text style={styles.summaryLabel}>Grand Total</Text>
//         <Text style={styles.summaryValue}>{money(invoice.grand_total)}</Text>
//       </View>

//       <Text style={styles.inWordsRow}>({amountInWords})</Text>
//     </View>
//   );
// }

// function FooterSection({ invoice, company }) {
//   return (
//     <View style={styles.footerWrap}>
//       <View style={styles.bottomSection}>
//         <View style={styles.leftBox}>
//           <View style={styles.detailSection}>
//             <Text style={styles.detailTitle}>Contact Details:</Text>
//             <DetailRow
//               label="Mob"
//               value={
//                 company?.mobile_2
//                   ? `${company?.mobile_1 || "-"} / ${company.mobile_2}`
//                   : company?.mobile_1 || "-"
//               }
//             />
//             <DetailRow label="Email" value={company?.email || "-"} />
//           </View>

//           <View style={styles.detailSection}>
//             <Text style={styles.detailTitle}>Address Details:</Text>
//             <Text>{company?.address || "-"}</Text>
//           </View>

//           <View style={styles.detailSection}>
//             <Text style={styles.detailTitle}>Bank Details:</Text>
//             <DetailRow label="Name" value={company?.bank_account_name || "-"} />
//             <DetailRow label="Acc. No" value={company?.account_number || "-"} />
//             <DetailRow label="Bank" value={company?.bank_name || "-"} />
//             <DetailRow label="Branch" value={company?.branch || "-"} />
//             <DetailRow label="IFSC" value={company?.ifsc_code || "-"} />
//             <DetailRow label="CIF ID" value={company?.cif_id || "-"} />
//             <DetailRow label="PAN" value={company?.pan_number || "-"} />
//             <DetailRow label="TAN" value={company?.tan_number || "-"} />
//           </View>
//         </View>

//         <View style={styles.rightBox}>
//           <Text style={styles.detailTitle}>Declaration:</Text>
//           <Text style={styles.paragraph}>
//             {invoice.declaration_text ||
//               "This is to certify that all the details furnished above are true and genuine to the best of our knowledge."}
//           </Text>

//           <Text style={styles.companyLine}>
//             For {company?.company_name || "Company"}
//           </Text>

//           {invoice.signatory_signature_url ? (
//             <Image src={invoice.signatory_signature_url} style={styles.signature} />
//           ) : null}

//           <Text style={styles.signName}>{invoice.signatory_name || ""}</Text>
//           <Text style={styles.signRole}>{invoice.signatory_title || ""}</Text>
//           <Text>(Authorized Signatory)</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// function FirstPageHeader({ invoice }) {
//   return (
//     <>
//       <Text style={styles.title}>TAX INVOICE</Text>

//       <View style={styles.headerTable}>
//         <View style={styles.headerRow}>
//           <View style={styles.billCol}>
//             <Text style={styles.sectionHeading}>Bill To:</Text>
//             <Text style={styles.partyName}>{invoice.bill_to_name}</Text>
//             <Text style={styles.smallGap}>{invoice.bill_to_address}</Text>
//             {invoice.bill_to_pan ? (
//               <Text style={styles.smallGap}>PAN - {invoice.bill_to_pan}</Text>
//             ) : null}
//             {invoice.bill_to_gstin ? (
//               <Text style={styles.smallGap}>GSTIN: {invoice.bill_to_gstin}</Text>
//             ) : null}
//             {invoice.bill_to_cin ? <Text>CIN: {invoice.bill_to_cin}</Text> : null}
//           </View>

//           <View style={styles.shipCol}>
//             <Text style={styles.sectionHeading}>Ship To:</Text>
//             <Text style={styles.partyName}>{invoice.ship_to_name}</Text>
//             <Text style={styles.smallGap}>{invoice.ship_to_address}</Text>
//             {invoice.ship_to_pan ? (
//               <Text style={styles.smallGap}>PAN - {invoice.ship_to_pan}</Text>
//             ) : null}
//             {invoice.ship_to_gstin ? (
//               <Text style={styles.smallGap}>GSTIN: {invoice.ship_to_gstin}</Text>
//             ) : null}
//             {invoice.ship_to_cin ? <Text>CIN: {invoice.ship_to_cin}</Text> : null}
//           </View>

//           <View style={styles.invoiceNoCol}>
//             <View style={styles.metaHead}>
//               <Text>Invoice No</Text>
//             </View>
//             <View style={styles.metaBody}>
//               <Text>{invoice.invoice_number}</Text>
//             </View>
//           </View>

//           <View style={styles.dateCol}>
//             <View style={styles.metaHead}>
//               <Text>Date</Text>
//             </View>
//             <View style={styles.metaBody}>
//               <Text>{formatInvoiceDate(invoice.invoice_date)}</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </>
//   );
// }

// /* ===================== MAIN ===================== */

// export default function InvoicePdfDocument({ invoice, items = [], company }) {
//   const grandTotal = Number(invoice?.grand_total || 0);

//   const amountInWords =
//     invoice?.amount_in_words &&
//     !String(invoice.amount_in_words).includes(".00 Only")
//       ? invoice.amount_in_words
//       : numberToWords(grandTotal);

//   const pages = paginateItems(items);

//   return (
//     <Document>
//       {pages.map((pageData, pageIndex) => {
//         const isFirstPage = pageIndex === 0;
//         const isLastPage = pageIndex === pages.length - 1;

//         return (
//           <Page key={`page-${pageIndex}`} size="A4" style={styles.page}>
//             {isFirstPage && company?.top_image_url && (
//               <Image
//                 src={company.top_image_url}
//                 style={{
//                   position: "absolute",
//                   top: HEADER_TOP,
//                   left: 0,
//                   width: "100%",
//                   height: HEADER_HEIGHT,
//                 }}
//               />
//             )}

//             {isLastPage && company?.bottom_image_url && (
//               <Image
//                 src={company.bottom_image_url}
//                 style={{
//                   position: "absolute",
//                   bottom: FOOTER_BOTTOM,
//                   left: 0,
//                   width: "100%",
//                   height: FOOTER_HEIGHT,
//                 }}
//               />
//             )}

//             <View
//               style={
//                 isFirstPage
//                   ? styles.firstPageInner
//                   : isLastPage
//                   ? styles.lastPageInner
//                   : styles.middlePageInner
//               }
//             >
//               {isFirstPage && <FirstPageHeader invoice={invoice} />}

//               {!isFirstPage && (
//                 <Text style={styles.continuedTitle}>TAX INVOICE - Continued</Text>
//               )}

//               <ItemsTable rows={pageData.rows} showHeader />

//               {isLastPage && (
//                 <>
//                   <TotalsSection
//                     invoice={invoice}
//                     amountInWords={amountInWords}
//                   />
//                   <FooterSection invoice={invoice} company={company} />
//                 </>
//               )}
//             </View>
//           </Page>
//         );
//       })}
//     </Document>
//   );
// }



// deepcode generated code

// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";

// /* ===================== LAYOUT CONTROL ===================== */

// const PAGE_PADDING_X = 36;

// const HEADER_TOP = 0;
// const HEADER_HEIGHT = 250;

// const FIRST_PAGE_CONTENT_TOP = 45;
// const MIDDLE_PAGE_CONTENT_TOP = 40;

// const FOOTER_BOTTOM = 0;
// const FOOTER_HEIGHT = 250;
// const LAST_PAGE_CONTENT_BOTTOM = 70;

// // Adjusted units for better space calculation
// const FIRST_PAGE_ITEM_UNITS = 14;  // Increased from 11
// const MIDDLE_PAGE_ITEM_UNITS = 28; // Increased from 22
// const LAST_PAGE_ITEM_UNITS = 10;   // Increased from 8

// /* ===================== STYLES ===================== */

// const styles = StyleSheet.create({
//   page: {
//     position: "relative",
//     paddingTop: 0,
//     paddingBottom: 0,
//     paddingHorizontal: 0,
//     fontSize: 10,
//     fontFamily: "Helvetica",
//     color: "#111",
//     backgroundColor: "#fff",
//   },

//   firstPageInner: {
//     paddingTop: FIRST_PAGE_CONTENT_TOP,
//     paddingBottom: 30,
//     paddingLeft: PAGE_PADDING_X,
//     paddingRight: PAGE_PADDING_X,
//   },

//   middlePageInner: {
//     paddingTop: MIDDLE_PAGE_CONTENT_TOP,
//     paddingBottom: 30,
//     paddingLeft: PAGE_PADDING_X,
//     paddingRight: PAGE_PADDING_X,
//   },

//   lastPageInner: {
//     paddingTop: MIDDLE_PAGE_CONTENT_TOP,
//     paddingBottom: LAST_PAGE_CONTENT_BOTTOM,
//     paddingLeft: PAGE_PADDING_X,
//     paddingRight: PAGE_PADDING_X,
//   },

//   title: {
//     textAlign: "center",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 12,
//   },

//   headerTable: {
//     borderWidth: 1,
//     borderColor: "#000",
//     marginBottom: 0,
//   },

//   headerRow: {
//     flexDirection: "row",
//   },

//   billCol: {
//     width: "32%",
//     padding: 7,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     minHeight: 122,
//   },

//   shipCol: {
//     width: "32%",
//     padding: 7,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     minHeight: 122,
//   },

//   invoiceNoCol: {
//     width: "18%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//   },

//   dateCol: {
//     width: "18%",
//   },

//   metaHead: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 34,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 5,
//     fontWeight: "bold",
//   },

//   metaBody: {
//     minHeight: 88,
//     alignItems: "center",
//     justifyContent: "center",
//     textAlign: "center",
//     padding: 6,
//     fontWeight: "bold",
//     fontSize: 11,
//   },

//   sectionHeading: {
//     fontWeight: "bold",
//     marginBottom: 4,
//   },

//   partyName: {
//     fontWeight: "bold",
//     marginBottom: 2,
//   },

//   smallGap: {
//     marginBottom: 2,
//   },

//   itemsTable: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: "#000",
//   },

//   itemsHeaderRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 32,
//     alignItems: "center",
//   },

//   itemRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     // Remove fixed minHeight to allow dynamic height based on content
//     alignItems: "flex-start", // Changed from "center" to "flex-start"
//   },

//   colDesc: {
//     width: "36%",
//     padding: 6,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     // Add text wrapping properties
//     flexWrap: "wrap",
//     wordBreak: "break-word",
//   },

//   colDelivery: {
//     width: "20%",
//     padding: 6,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     textAlign: "center",
//     flexWrap: "wrap",
//     wordBreak: "break-word",
//   },

//   colQty: {
//     width: "14%",
//     padding: 6,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     textAlign: "center",
//   },

//   colRate: {
//     width: "15%",
//     padding: 6,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     textAlign: "right",
//   },

//   colAmount: {
//     width: "15%",
//     padding: 6,
//     textAlign: "right",
//   },

//   headerCellText: {
//     fontWeight: "bold",
//     textAlign: "center",
//   },

//   totalsWrap: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: "#000",
//     marginTop: 0,
//   },

//   totalRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 28,
//     alignItems: "center",
//   },

//   totalLabelWide: {
//     width: "85%",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     textAlign: "right",
//     fontWeight: "bold",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//   },

//   totalValueNarrow: {
//     width: "15%",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     textAlign: "right",
//     fontWeight: "bold",
//   },

//   summaryRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 26,
//     alignItems: "center",
//   },

//   summaryLabel: {
//     width: "70%",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     textAlign: "right",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     fontWeight: "bold",
//   },

//   summaryValue: {
//     width: "30%",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     textAlign: "right",
//     fontWeight: "bold",
//   },

//   inWordsRow: {
//     paddingHorizontal: 8,
//     paddingVertical: 8,
//     textAlign: "center",
//     fontWeight: "bold",
//   },

//   footerWrap: {
//     marginTop: 10,
//   },

//   bottomSection: {
//     flexDirection: "row",
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: "#000",
//     minHeight: 170,
//   },

//   leftBox: {
//     width: "50%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 8,
//   },

//   rightBox: {
//     width: "50%",
//     padding: 8,
//   },

//   detailSection: {
//     marginBottom: 10,
//   },

//   detailTitle: {
//     fontWeight: "bold",
//     marginBottom: 4,
//   },

//   detailRow: {
//     flexDirection: "row",
//     marginBottom: 2,
//   },

//   detailLabel: {
//     width: 72,
//     fontWeight: "bold",
//   },

//   detailColon: {
//     width: 8,
//     fontWeight: "bold",
//   },

//   detailValue: {
//     flex: 1,
//   },

//   paragraph: {
//     marginBottom: 8,
//     lineHeight: 1.35,
//   },

//   companyLine: {
//     fontWeight: "bold",
//     marginTop: 8,
//     marginBottom: 6,
//   },

//   signature: {
//     width: 120,
//     height: 50,
//     objectFit: "contain",
//     marginVertical: 8,
//   },

//   signName: {
//     fontWeight: "bold",
//     marginTop: 2,
//   },

//   signRole: {
//     fontWeight: "bold",
//   },

//   continuedTitle: {
//     textAlign: "center",
//     fontSize: 13,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
// });

// /* ===================== HELPERS ===================== */

// function money(value) {
//   const num = Number(value || 0);
//   return num.toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
// }

// function formatInvoiceDate(value) {
//   if (!value) return "";
//   const d = new Date(value);
//   if (Number.isNaN(d.getTime())) return String(value);
//   const dd = String(d.getDate()).padStart(2, "0");
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const yyyy = d.getFullYear();
//   return `${dd}.${mm}.${yyyy}`;
// }

// function quantityDisplay(value) {
//   const num = Number(value);
//   if (!Number.isFinite(num)) return "-";
//   if (num === 0) return "-";
//   if (Number.isInteger(num)) return String(num);
//   return String(num);
// }

// function numberToWords(num) {
//   if (!Number.isFinite(num) || num < 0) return "Zero Rupees Only";
//   if (num === 0) return "Zero Rupees Only";

//   const ones = [
//     "",
//     "One",
//     "Two",
//     "Three",
//     "Four",
//     "Five",
//     "Six",
//     "Seven",
//     "Eight",
//     "Nine",
//     "Ten",
//     "Eleven",
//     "Twelve",
//     "Thirteen",
//     "Fourteen",
//     "Fifteen",
//     "Sixteen",
//     "Seventeen",
//     "Eighteen",
//     "Nineteen",
//   ];

//   const tens = [
//     "",
//     "",
//     "Twenty",
//     "Thirty",
//     "Forty",
//     "Fifty",
//     "Sixty",
//     "Seventy",
//     "Eighty",
//     "Ninety",
//   ];

//   function belowThousand(n) {
//     let result = "";

//     if (n >= 100) {
//       result += `${ones[Math.floor(n / 100)]} Hundred`;
//       n %= 100;
//       if (n > 0) result += " ";
//     }

//     if (n >= 20) {
//       result += tens[Math.floor(n / 10)];
//       n %= 10;
//       if (n > 0) result += ` ${ones[n]}`;
//     } else if (n > 0) {
//       result += ones[n];
//     }

//     return result.trim();
//   }

//   function indian(n) {
//     if (n === 0) return "";

//     let result = "";

//     const crore = Math.floor(n / 10000000);
//     n %= 10000000;

//     const lakh = Math.floor(n / 100000);
//     n %= 100000;

//     const thousand = Math.floor(n / 1000);
//     n %= 1000;

//     if (crore > 0) result += `${belowThousand(crore)} Crore`;
//     if (lakh > 0) result += `${result ? " " : ""}${belowThousand(lakh)} Lakh`;
//     if (thousand > 0) result += `${result ? " " : ""}${belowThousand(thousand)} Thousand`;
//     if (n > 0) result += `${result ? " " : ""}${belowThousand(n)}`;

//     return result.trim();
//   }

//   const integerPart = Math.floor(num);
//   const decimalPart = Math.round((num - integerPart) * 100);

//   let words = `${indian(integerPart)} Rupees`;

//   if (decimalPart > 0) {
//     words += ` and ${indian(decimalPart)} Paise`;
//   }

//   return `${words} Only`;
// }

// // IMPROVED: Better estimation of row height based on text content
// function estimateRowUnits(item) {
//   const desc = String(item?.description || "");
//   const delivery = String(item?.delivery_date || "");
  
//   // Calculate approximate lines needed for description (36% width)
//   // Assuming ~40 characters per line at font size 10
//   const descLines = Math.ceil(desc.length / 40);
  
//   // Calculate approximate lines needed for delivery date (20% width)
//   const deliveryLines = Math.ceil(delivery.length / 22);
  
//   // Take the maximum lines needed between description and delivery date
//   const maxLines = Math.max(descLines, deliveryLines, 1);
  
//   // Each line consumes about 0.5 units (adjust as needed)
//   // Minimum 1 unit for single line
//   return Math.max(1, Math.ceil(maxLines * 0.6));
// }

// function paginateItems(items = []) {
//   const safeItems = Array.isArray(items) ? items : [];
//   if (!safeItems.length) {
//     return [{ type: "last", rows: [] }];
//   }

//   const pages = [];
//   let currentRows = [];
//   let currentUnits = 0;
//   let currentCapacity = FIRST_PAGE_ITEM_UNITS;
//   let isFirstPhysicalPage = true;

//   for (let i = 0; i < safeItems.length; i += 1) {
//     const item = safeItems[i];
//     const itemUnits = estimateRowUnits(item);
    
//     // Check if adding this item would exceed capacity
//     if (currentRows.length > 0 && currentUnits + itemUnits > currentCapacity) {
//       // Start a new page
//       pages.push({
//         type: isFirstPhysicalPage ? "first" : "middle",
//         rows: currentRows,
//       });

//       currentRows = [];
//       currentUnits = 0;
//       currentCapacity = MIDDLE_PAGE_ITEM_UNITS;
//       isFirstPhysicalPage = false;
//     }

//     currentRows.push(item);
//     currentUnits += itemUnits;

//     // Check if remaining items can fit on last page
//     const remainingItems = safeItems.slice(i + 1);
//     const remainingUnits = remainingItems.reduce((sum, remItem) => 
//       sum + estimateRowUnits(remItem), 0);
    
//     // If remaining items plus current can fit on last page, end here
//     if (remainingUnits > 0 && remainingUnits <= LAST_PAGE_ITEM_UNITS) {
//       // Add current page if it has items
//       if (currentRows.length > 0) {
//         pages.push({
//           type: isFirstPhysicalPage ? "first" : "middle",
//           rows: currentRows,
//         });
//       }
      
//       // Add remaining items as last page
//       if (remainingItems.length > 0) {
//         pages.push({
//           type: "last",
//           rows: remainingItems,
//         });
//       }
      
//       return pages;
//     }
//   }

//   // Add the last page with remaining items
//   if (currentRows.length > 0) {
//     pages.push({
//       type: "last",
//       rows: currentRows,
//     });
//   }

//   return pages;
// }

// /* ===================== UI SECTIONS ===================== */

// function DetailRow({ label, value }) {
//   return (
//     <View style={styles.detailRow}>
//       <Text style={styles.detailLabel}>{label}</Text>
//       <Text style={styles.detailColon}>:</Text>
//       <Text style={styles.detailValue}>{value || "-"}</Text>
//     </View>
//   );
// }

// // IMPROVED: ItemsTable with better text wrapping support
// function ItemsTable({ rows = [], showHeader = true }) {
//   return (
//     <View style={styles.itemsTable}>
//       {showHeader && (
//         <View style={styles.itemsHeaderRow}>
//           <Text style={[styles.colDesc, styles.headerCellText]}>
//             Description of Service / Goods
//           </Text>
//           <Text style={[styles.colDelivery, styles.headerCellText]}>
//             Delivery Date
//           </Text>
//           <Text style={[styles.colQty, styles.headerCellText]}>
//             Quantity
//           </Text>
//           <Text style={[styles.colRate, styles.headerCellText]}>
//             Rate
//           </Text>
//           <Text style={[styles.colAmount, styles.headerCellText]}>
//             Amount (INR)
//           </Text>
//         </View>
//       )}

//       {rows.map((item, idx) => (
//         <View
//           key={item.id || `${item.description || "item"}-${item.sort_order || idx}-${idx}`}
//           style={styles.itemRow}
//         >
//           <Text style={styles.colDesc}>
//             {item.description || "-"}
//           </Text>
//           <Text style={styles.colDelivery}>
//             {item.delivery_date || "-"}
//           </Text>
//           <Text style={styles.colQty}>
//             {quantityDisplay(item.quantity)}
//           </Text>
//           <Text style={styles.colRate}>
//             {money(item.rate)}
//           </Text>
//           <Text style={styles.colAmount}>
//             {money(item.amount)}
//           </Text>
//         </View>
//       ))}
//     </View>
//   );
// }

// function TotalsSection({ invoice, amountInWords }) {
//   return (
//     <View style={styles.totalsWrap}>
//       <View style={styles.totalRow}>
//         <Text style={styles.totalLabelWide}>Total Amount</Text>
//         <Text style={styles.totalValueNarrow}>{money(invoice.grand_total)}</Text>
//       </View>

//       <View style={styles.summaryRow}>
//         <Text style={styles.summaryLabel}>Subtotal</Text>
//         <Text style={styles.summaryValue}>{money(invoice.subtotal)}</Text>
//       </View>

//       <View style={styles.summaryRow}>
//         <Text style={styles.summaryLabel}>Add GST ({invoice.gst_percent || 0}%)</Text>
//         <Text style={styles.summaryValue}>{money(invoice.gst_amount)}</Text>
//       </View>

//       <View style={styles.summaryRow}>
//         <Text style={styles.summaryLabel}>Grand Total</Text>
//         <Text style={styles.summaryValue}>{money(invoice.grand_total)}</Text>
//       </View>

//       <Text style={styles.inWordsRow}>({amountInWords})</Text>
//     </View>
//   );
// }

// function FooterSection({ invoice, company }) {
//   return (
//     <View style={styles.footerWrap}>
//       <View style={styles.bottomSection}>
//         <View style={styles.leftBox}>
//           <View style={styles.detailSection}>
//             <Text style={styles.detailTitle}>Contact Details:</Text>
//             <DetailRow
//               label="Mob"
//               value={
//                 company?.mobile_2
//                   ? `${company?.mobile_1 || "-"} / ${company.mobile_2}`
//                   : company?.mobile_1 || "-"
//               }
//             />
//             <DetailRow label="Email" value={company?.email || "-"} />
//           </View>

//           <View style={styles.detailSection}>
//             <Text style={styles.detailTitle}>Address Details:</Text>
//             <Text>{company?.address || "-"}</Text>
//           </View>

//           <View style={styles.detailSection}>
//             <Text style={styles.detailTitle}>Bank Details:</Text>
//             <DetailRow label="Name" value={company?.bank_account_name || "-"} />
//             <DetailRow label="Acc. No" value={company?.account_number || "-"} />
//             <DetailRow label="Bank" value={company?.bank_name || "-"} />
//             <DetailRow label="Branch" value={company?.branch || "-"} />
//             <DetailRow label="IFSC" value={company?.ifsc_code || "-"} />
//             <DetailRow label="CIF ID" value={company?.cif_id || "-"} />
//             <DetailRow label="PAN" value={company?.pan_number || "-"} />
//             <DetailRow label="TAN" value={company?.tan_number || "-"} />
//           </View>
//         </View>

//         <View style={styles.rightBox}>
//           <Text style={styles.detailTitle}>Declaration:</Text>
//           <Text style={styles.paragraph}>
//             {invoice.declaration_text ||
//               "This is to certify that all the details furnished above are true and genuine to the best of our knowledge."}
//           </Text>

//           <Text style={styles.companyLine}>
//             For {company?.company_name || "Company"}
//           </Text>

//           {invoice.signatory_signature_url ? (
//             <Image src={invoice.signatory_signature_url} style={styles.signature} />
//           ) : null}

//           <Text style={styles.signName}>{invoice.signatory_name || ""}</Text>
//           <Text style={styles.signRole}>{invoice.signatory_title || ""}</Text>
//           <Text>(Authorized Signatory)</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// function FirstPageHeader({ invoice }) {
//   return (
//     <>
//       <Text style={styles.title}>TAX INVOICE</Text>

//       <View style={styles.headerTable}>
//         <View style={styles.headerRow}>
//           <View style={styles.billCol}>
//             <Text style={styles.sectionHeading}>Bill To:</Text>
//             <Text style={styles.partyName}>{invoice.bill_to_name}</Text>
//             <Text style={styles.smallGap}>{invoice.bill_to_address}</Text>
//             {invoice.bill_to_pan ? (
//               <Text style={styles.smallGap}>PAN - {invoice.bill_to_pan}</Text>
//             ) : null}
//             {invoice.bill_to_gstin ? (
//               <Text style={styles.smallGap}>GSTIN: {invoice.bill_to_gstin}</Text>
//             ) : null}
//             {invoice.bill_to_cin ? <Text>CIN: {invoice.bill_to_cin}</Text> : null}
//           </View>

//           <View style={styles.shipCol}>
//             <Text style={styles.sectionHeading}>Ship To:</Text>
//             <Text style={styles.partyName}>{invoice.ship_to_name}</Text>
//             <Text style={styles.smallGap}>{invoice.ship_to_address}</Text>
//             {invoice.ship_to_pan ? (
//               <Text style={styles.smallGap}>PAN - {invoice.ship_to_pan}</Text>
//             ) : null}
//             {invoice.ship_to_gstin ? (
//               <Text style={styles.smallGap}>GSTIN: {invoice.ship_to_gstin}</Text>
//             ) : null}
//             {invoice.ship_to_cin ? <Text>CIN: {invoice.ship_to_cin}</Text> : null}
//           </View>

//           <View style={styles.invoiceNoCol}>
//             <View style={styles.metaHead}>
//               <Text>Invoice No</Text>
//             </View>
//             <View style={styles.metaBody}>
//               <Text>{invoice.invoice_number}</Text>
//             </View>
//           </View>

//           <View style={styles.dateCol}>
//             <View style={styles.metaHead}>
//               <Text>Date</Text>
//             </View>
//             <View style={styles.metaBody}>
//               <Text>{formatInvoiceDate(invoice.invoice_date)}</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </>
//   );
// }

// /* ===================== MAIN ===================== */

// export default function InvoicePdfDocument({ invoice, items = [], company }) {
//   const grandTotal = Number(invoice?.grand_total || 0);

//   const amountInWords =
//     invoice?.amount_in_words &&
//     !String(invoice.amount_in_words).includes(".00 Only")
//       ? invoice.amount_in_words
//       : numberToWords(grandTotal);

//   const pages = paginateItems(items);

//   return (
//     <Document>
//       {pages.map((pageData, pageIndex) => {
//         const isFirstPage = pageIndex === 0;
//         const isLastPage = pageIndex === pages.length - 1;

//         return (
//           <Page key={`page-${pageIndex}`} size="A4" style={styles.page}>
//             {isFirstPage && company?.top_image_url && (
//               <Image
//                 src={company.top_image_url}
//                 style={{
//                   position: "absolute",
//                   top: HEADER_TOP,
//                   left: 0,
//                   width: "100%",
//                   height: HEADER_HEIGHT,
//                 }}
//               />
//             )}

//             {isLastPage && company?.bottom_image_url && (
//               <Image
//                 src={company.bottom_image_url}
//                 style={{
//                   position: "absolute",
//                   bottom: FOOTER_BOTTOM,
//                   left: 0,
//                   width: "100%",
//                   height: FOOTER_HEIGHT,
//                 }}
//               />
//             )}

//             <View
//               style={
//                 isFirstPage
//                   ? styles.firstPageInner
//                   : isLastPage
//                   ? styles.lastPageInner
//                   : styles.middlePageInner
//               }
//             >
//               {isFirstPage && <FirstPageHeader invoice={invoice} />}

//               {!isFirstPage && (
//                 <Text style={styles.continuedTitle}>TAX INVOICE - Continued</Text>
//               )}

//               <ItemsTable rows={pageData.rows} showHeader />

//               {isLastPage && (
//                 <>
//                   <TotalsSection
//                     invoice={invoice}
//                     amountInWords={amountInWords}
//                   />
//                   <FooterSection invoice={invoice} company={company} />
//                 </>
//               )}
//             </View>
//           </Page>
//         );
//       })}
//     </Document>
//   );
// }











// deepcode generated code v2

// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";

// /* ===================== LAYOUT CONTROL ===================== */

// const PAGE_PADDING_X = 36;

// const HEADER_TOP = 0;
// const HEADER_HEIGHT = 250;

// const FIRST_PAGE_CONTENT_TOP = 45;
// const MIDDLE_PAGE_CONTENT_TOP = 40;

// const FOOTER_BOTTOM = 0;
// const FOOTER_HEIGHT = 250;
// const LAST_PAGE_CONTENT_BOTTOM = 70;

// // Ultra conservative row limits for heavy content
// const ROWS_PER_FIRST_PAGE = 5;
// const ROWS_PER_MIDDLE_PAGE = 10;
// const ROWS_PER_LAST_PAGE = 3;

// /* ===================== STYLES ===================== */

// const styles = StyleSheet.create({
//   page: {
//     position: "relative",
//     paddingTop: 0,
//     paddingBottom: 0,
//     paddingHorizontal: 0,
//     fontSize: 10,
//     fontFamily: "Helvetica",
//     color: "#111",
//     backgroundColor: "#fff",
//   },

//   firstPageInner: {
//     paddingTop: FIRST_PAGE_CONTENT_TOP,
//     paddingBottom: 30,
//     paddingLeft: PAGE_PADDING_X,
//     paddingRight: PAGE_PADDING_X,
//   },

//   middlePageInner: {
//     paddingTop: MIDDLE_PAGE_CONTENT_TOP,
//     paddingBottom: 30,
//     paddingLeft: PAGE_PADDING_X,
//     paddingRight: PAGE_PADDING_X,
//   },

//   lastPageInner: {
//     paddingTop: MIDDLE_PAGE_CONTENT_TOP,
//     paddingBottom: LAST_PAGE_CONTENT_BOTTOM,
//     paddingLeft: PAGE_PADDING_X,
//     paddingRight: PAGE_PADDING_X,
//   },

//   title: {
//     textAlign: "center",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 12,
//   },

//   headerTable: {
//     borderWidth: 1,
//     borderColor: "#000",
//     marginBottom: 0,
//   },

//   headerRow: {
//     flexDirection: "row",
//   },

//   billCol: {
//     width: "32%",
//     padding: 7,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     minHeight: 122,
//   },

//   shipCol: {
//     width: "32%",
//     padding: 7,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     minHeight: 122,
//   },

//   invoiceNoCol: {
//     width: "18%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//   },

//   dateCol: {
//     width: "18%",
//   },

//   metaHead: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 34,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 5,
//     fontWeight: "bold",
//   },

//   metaBody: {
//     minHeight: 88,
//     alignItems: "center",
//     justifyContent: "center",
//     textAlign: "center",
//     padding: 6,
//     fontWeight: "bold",
//     fontSize: 11,
//   },

//   sectionHeading: {
//     fontWeight: "bold",
//     marginBottom: 4,
//   },

//   partyName: {
//     fontWeight: "bold",
//     marginBottom: 2,
//   },

//   smallGap: {
//     marginBottom: 2,
//   },

//   itemsTable: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: "#000",
//   },

//   itemsHeaderRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 32,
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },

//   itemRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     alignItems: "flex-start", // Changed from center to flex-start for proper alignment
//   },

//   colDesc: {
//     width: "36%",
//     padding: 6,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     // Critical text wrapping properties
//     flexWrap: "wrap",
//     wordBreak: "break-word",
//     whiteSpace: "normal",
//   },

//   colDelivery: {
//     width: "20%",
//     padding: 6,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     textAlign: "center",
//     flexWrap: "wrap",
//     wordBreak: "break-word",
//     whiteSpace: "normal",
//   },

//   colQty: {
//     width: "14%",
//     padding: 6,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     textAlign: "center",
//   },

//   colRate: {
//     width: "15%",
//     padding: 6,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     textAlign: "right",
//   },

//   colAmount: {
//     width: "15%",
//     padding: 6,
//     textAlign: "right",
//   },

//   headerCellText: {
//     fontWeight: "bold",
//     textAlign: "center",
//   },

//   totalsWrap: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: "#000",
//     marginTop: 0,
//   },

//   totalRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 28,
//     alignItems: "center",
//   },

//   totalLabelWide: {
//     width: "85%",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     textAlign: "right",
//     fontWeight: "bold",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//   },

//   totalValueNarrow: {
//     width: "15%",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     textAlign: "right",
//     fontWeight: "bold",
//   },

//   summaryRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 26,
//     alignItems: "center",
//   },

//   summaryLabel: {
//     width: "70%",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     textAlign: "right",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     fontWeight: "bold",
//   },

//   summaryValue: {
//     width: "30%",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     textAlign: "right",
//     fontWeight: "bold",
//   },

//   inWordsRow: {
//     paddingHorizontal: 8,
//     paddingVertical: 8,
//     textAlign: "center",
//     fontWeight: "bold",
//   },

//   footerWrap: {
//     marginTop: 10,
//   },

//   bottomSection: {
//     flexDirection: "row",
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: "#000",
//     minHeight: 170,
//   },

//   leftBox: {
//     width: "50%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 8,
//   },

//   rightBox: {
//     width: "50%",
//     padding: 8,
//   },

//   detailSection: {
//     marginBottom: 10,
//   },

//   detailTitle: {
//     fontWeight: "bold",
//     marginBottom: 4,
//   },

//   detailRow: {
//     flexDirection: "row",
//     marginBottom: 2,
//   },

//   detailLabel: {
//     width: 72,
//     fontWeight: "bold",
//   },

//   detailColon: {
//     width: 8,
//     fontWeight: "bold",
//   },

//   detailValue: {
//     flex: 1,
//   },

//   paragraph: {
//     marginBottom: 8,
//     lineHeight: 1.35,
//   },

//   companyLine: {
//     fontWeight: "bold",
//     marginTop: 8,
//     marginBottom: 6,
//   },

//   signature: {
//     width: 120,
//     height: 50,
//     objectFit: "contain",
//     marginVertical: 8,
//   },

//   signName: {
//     fontWeight: "bold",
//     marginTop: 2,
//   },

//   signRole: {
//     fontWeight: "bold",
//   },
// });

// /* ===================== HELPERS ===================== */

// function money(value) {
//   const num = Number(value || 0);
//   return num.toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
// }

// function formatInvoiceDate(value) {
//   if (!value) return "";
//   const d = new Date(value);
//   if (Number.isNaN(d.getTime())) return String(value);
//   const dd = String(d.getDate()).padStart(2, "0");
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const yyyy = d.getFullYear();
//   return `${dd}.${mm}.${yyyy}`;
// }

// function quantityDisplay(value) {
//   const num = Number(value);
//   if (!Number.isFinite(num)) return "-";
//   if (num === 0) return "-";
//   if (Number.isInteger(num)) return String(num);
//   return String(num);
// }

// function numberToWords(num) {
//   if (!Number.isFinite(num) || num < 0) return "Zero Rupees Only";
//   if (num === 0) return "Zero Rupees Only";

//   const ones = [
//     "",
//     "One",
//     "Two",
//     "Three",
//     "Four",
//     "Five",
//     "Six",
//     "Seven",
//     "Eight",
//     "Nine",
//     "Ten",
//     "Eleven",
//     "Twelve",
//     "Thirteen",
//     "Fourteen",
//     "Fifteen",
//     "Sixteen",
//     "Seventeen",
//     "Eighteen",
//     "Nineteen",
//   ];

//   const tens = [
//     "",
//     "",
//     "Twenty",
//     "Thirty",
//     "Forty",
//     "Fifty",
//     "Sixty",
//     "Seventy",
//     "Eighty",
//     "Ninety",
//   ];

//   function belowThousand(n) {
//     let result = "";

//     if (n >= 100) {
//       result += `${ones[Math.floor(n / 100)]} Hundred`;
//       n %= 100;
//       if (n > 0) result += " ";
//     }

//     if (n >= 20) {
//       result += tens[Math.floor(n / 10)];
//       n %= 10;
//       if (n > 0) result += ` ${ones[n]}`;
//     } else if (n > 0) {
//       result += ones[n];
//     }

//     return result.trim();
//   }

//   function indian(n) {
//     if (n === 0) return "";

//     let result = "";

//     const crore = Math.floor(n / 10000000);
//     n %= 10000000;

//     const lakh = Math.floor(n / 100000);
//     n %= 100000;

//     const thousand = Math.floor(n / 1000);
//     n %= 1000;

//     if (crore > 0) result += `${belowThousand(crore)} Crore`;
//     if (lakh > 0) result += `${result ? " " : ""}${belowThousand(lakh)} Lakh`;
//     if (thousand > 0) result += `${result ? " " : ""}${belowThousand(thousand)} Thousand`;
//     if (n > 0) result += `${result ? " " : ""}${belowThousand(n)}`;

//     return result.trim();
//   }

//   const integerPart = Math.floor(num);
//   const decimalPart = Math.round((num - integerPart) * 100);

//   let words = `${indian(integerPart)} Rupees`;

//   if (decimalPart > 0) {
//     words += ` and ${indian(decimalPart)} Paise`;
//   }

//   return `${words} Only`;
// }

// // Calculate row height factor based on text length
// function getEstimatedRowHeight(item) {
//   const desc = String(item?.description || "");
//   const delivery = String(item?.delivery_date || "");
  
//   // Estimate lines needed (approx 35-40 chars per line for description column)
//   const descLines = Math.max(1, Math.ceil(desc.length / 35));
//   const deliveryLines = Math.max(1, Math.ceil(delivery.length / 20));
  
//   // Return the maximum lines needed
//   return Math.max(descLines, deliveryLines);
// }

// // Smart pagination based on content height
// function paginateItems(items = []) {
//   if (!items || !Array.isArray(items) || items.length === 0) {
//     return [{ type: "last", rows: [] }];
//   }
  
//   try {
//     const pages = [];
//     let remainingItems = [...items];
    
//     // First page - calculate based on content
//     let currentPageRows = [];
//     let currentPageHeight = 0;
    
//     // First page items
//     for (let i = 0; i < remainingItems.length; i++) {
//       const item = remainingItems[i];
//       const rowHeight = getEstimatedRowHeight(item);
      
//       if (currentPageRows.length >= ROWS_PER_FIRST_PAGE) {
//         break;
//       }
      
//       currentPageRows.push(item);
//       currentPageHeight += rowHeight;
//     }
    
//     if (currentPageRows.length > 0) {
//       pages.push({
//         type: "first",
//         rows: [...currentPageRows],
//       });
//       remainingItems = remainingItems.slice(currentPageRows.length);
//     }
    
//     // Middle pages
//     while (remainingItems.length > ROWS_PER_LAST_PAGE) {
//       const middleRows = [];
//       let middleHeight = 0;
      
//       for (let i = 0; i < Math.min(ROWS_PER_MIDDLE_PAGE, remainingItems.length); i++) {
//         const item = remainingItems[i];
//         const rowHeight = getEstimatedRowHeight(item);
        
//         if (middleRows.length >= ROWS_PER_MIDDLE_PAGE) {
//           break;
//         }
        
//         middleRows.push(item);
//         middleHeight += rowHeight;
//       }
      
//       if (middleRows.length > 0) {
//         pages.push({
//           type: "middle",
//           rows: [...middleRows],
//         });
//         remainingItems = remainingItems.slice(middleRows.length);
//       } else {
//         break;
//       }
      
//       // Safety break
//       if (pages.length > 50) break;
//     }
    
//     // Last page
//     if (remainingItems.length > 0) {
//       pages.push({
//         type: "last",
//         rows: remainingItems,
//       });
//     }
    
//     return pages;
    
//   } catch (error) {
//     console.error("Pagination error:", error);
//     return [{ type: "last", rows: items }];
//   }
// }

// /* ===================== UI SECTIONS ===================== */

// function DetailRow({ label, value }) {
//   return (
//     <View style={styles.detailRow}>
//       <Text style={styles.detailLabel}>{label}</Text>
//       <Text style={styles.detailColon}>:</Text>
//       <Text style={styles.detailValue}>{value || "-"}</Text>
//     </View>
//   );
// }

// function ItemsTable({ rows = [], showHeader = true }) {
//   if (!rows || rows.length === 0) {
//     return null;
//   }

//   return (
//     <View style={styles.itemsTable}>
//       {showHeader && (
//         <View style={styles.itemsHeaderRow}>
//           <Text style={[styles.colDesc, styles.headerCellText]}>
//             Description of Service / Goods
//           </Text>
//           <Text style={[styles.colDelivery, styles.headerCellText]}>
//             Delivery Date
//           </Text>
//           <Text style={[styles.colQty, styles.headerCellText]}>
//             Quantity
//           </Text>
//           <Text style={[styles.colRate, styles.headerCellText]}>
//             Rate
//           </Text>
//           <Text style={[styles.colAmount, styles.headerCellText]}>
//             Amount (INR)
//           </Text>
//         </View>
//       )}

//       {rows.map((item, idx) => (
//         <View
//           key={item.id || `${item.description || "item"}-${idx}`}
//           style={styles.itemRow}
//         >
//           <Text style={styles.colDesc}>
//             {item.description || "-"}
//           </Text>
//           <Text style={styles.colDelivery}>
//             {item.delivery_date || "-"}
//           </Text>
//           <Text style={styles.colQty}>
//             {quantityDisplay(item.quantity)}
//           </Text>
//           <Text style={styles.colRate}>
//             {money(item.rate)}
//           </Text>
//           <Text style={styles.colAmount}>
//             {money(item.amount)}
//           </Text>
//         </View>
//       ))}
//     </View>
//   );
// }

// function TotalsSection({ invoice, amountInWords }) {
//   return (
//     <View style={styles.totalsWrap}>
//       <View style={styles.totalRow}>
//         <Text style={styles.totalLabelWide}>Total Amount</Text>
//         <Text style={styles.totalValueNarrow}>{money(invoice.grand_total)}</Text>
//       </View>

//       <View style={styles.summaryRow}>
//         <Text style={styles.summaryLabel}>Subtotal</Text>
//         <Text style={styles.summaryValue}>{money(invoice.subtotal)}</Text>
//       </View>

//       <View style={styles.summaryRow}>
//         <Text style={styles.summaryLabel}>Add GST ({invoice.gst_percent || 0}%)</Text>
//         <Text style={styles.summaryValue}>{money(invoice.gst_amount)}</Text>
//       </View>

//       <View style={styles.summaryRow}>
//         <Text style={styles.summaryLabel}>Grand Total</Text>
//         <Text style={styles.summaryValue}>{money(invoice.grand_total)}</Text>
//       </View>

//       <Text style={styles.inWordsRow}>({amountInWords})</Text>
//     </View>
//   );
// }

// function FooterSection({ invoice, company }) {
//   return (
//     <View style={styles.footerWrap}>
//       <View style={styles.bottomSection}>
//         <View style={styles.leftBox}>
//           <View style={styles.detailSection}>
//             <Text style={styles.detailTitle}>Contact Details:</Text>
//             <DetailRow
//               label="Mob"
//               value={
//                 company?.mobile_2
//                   ? `${company?.mobile_1 || "-"} / ${company.mobile_2}`
//                   : company?.mobile_1 || "-"
//               }
//             />
//             <DetailRow label="Email" value={company?.email || "-"} />
//           </View>

//           <View style={styles.detailSection}>
//             <Text style={styles.detailTitle}>Address Details:</Text>
//             <Text>{company?.address || "-"}</Text>
//           </View>

//           <View style={styles.detailSection}>
//             <Text style={styles.detailTitle}>Bank Details:</Text>
//             <DetailRow label="Name" value={company?.bank_account_name || "-"} />
//             <DetailRow label="Acc. No" value={company?.account_number || "-"} />
//             <DetailRow label="Bank" value={company?.bank_name || "-"} />
//             <DetailRow label="Branch" value={company?.branch || "-"} />
//             <DetailRow label="IFSC" value={company?.ifsc_code || "-"} />
//             <DetailRow label="CIF ID" value={company?.cif_id || "-"} />
//             <DetailRow label="PAN" value={company?.pan_number || "-"} />
//             <DetailRow label="TAN" value={company?.tan_number || "-"} />
//           </View>
//         </View>

//         <View style={styles.rightBox}>
//           <Text style={styles.detailTitle}>Declaration:</Text>
//           <Text style={styles.paragraph}>
//             {invoice.declaration_text ||
//               "This is to certify that all the details furnished above are true and genuine to the best of our knowledge."}
//           </Text>

//           <Text style={styles.companyLine}>
//             For {company?.company_name || "Company"}
//           </Text>

//           {invoice.signatory_signature_url ? (
//             <Image src={invoice.signatory_signature_url} style={styles.signature} />
//           ) : null}

//           <Text style={styles.signName}>{invoice.signatory_name || ""}</Text>
//           <Text style={styles.signRole}>{invoice.signatory_title || ""}</Text>
//           <Text>(Authorized Signatory)</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// function FirstPageHeader({ invoice }) {
//   return (
//     <>
//       <Text style={styles.title}>TAX INVOICE</Text>

//       <View style={styles.headerTable}>
//         <View style={styles.headerRow}>
//           <View style={styles.billCol}>
//             <Text style={styles.sectionHeading}>Bill To:</Text>
//             <Text style={styles.partyName}>{invoice.bill_to_name}</Text>
//             <Text style={styles.smallGap}>{invoice.bill_to_address}</Text>
//             {invoice.bill_to_pan ? (
//               <Text style={styles.smallGap}>PAN - {invoice.bill_to_pan}</Text>
//             ) : null}
//             {invoice.bill_to_gstin ? (
//               <Text style={styles.smallGap}>GSTIN: {invoice.bill_to_gstin}</Text>
//             ) : null}
//             {invoice.bill_to_cin ? <Text>CIN: {invoice.bill_to_cin}</Text> : null}
//           </View>

//           <View style={styles.shipCol}>
//             <Text style={styles.sectionHeading}>Ship To:</Text>
//             <Text style={styles.partyName}>{invoice.ship_to_name}</Text>
//             <Text style={styles.smallGap}>{invoice.ship_to_address}</Text>
//             {invoice.ship_to_pan ? (
//               <Text style={styles.smallGap}>PAN - {invoice.ship_to_pan}</Text>
//             ) : null}
//             {invoice.ship_to_gstin ? (
//               <Text style={styles.smallGap}>GSTIN: {invoice.ship_to_gstin}</Text>
//             ) : null}
//             {invoice.ship_to_cin ? <Text>CIN: {invoice.ship_to_cin}</Text> : null}
//           </View>

//           <View style={styles.invoiceNoCol}>
//             <View style={styles.metaHead}>
//               <Text>Invoice No</Text>
//             </View>
//             <View style={styles.metaBody}>
//               <Text>{invoice.invoice_number}</Text>
//             </View>
//           </View>

//           <View style={styles.dateCol}>
//             <View style={styles.metaHead}>
//               <Text>Date</Text>
//             </View>
//             <View style={styles.metaBody}>
//               <Text>{formatInvoiceDate(invoice.invoice_date)}</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </>
//   );
// }

// /* ===================== MAIN ===================== */

// export default function InvoicePdfDocument({ invoice, items = [], company }) {
//   if (!invoice) {
//     console.error("Invoice data is missing");
//     return null;
//   }
  
//   const grandTotal = Number(invoice?.grand_total || 0);

//   const amountInWords =
//     invoice?.amount_in_words &&
//     !String(invoice.amount_in_words).includes(".00 Only")
//       ? invoice.amount_in_words
//       : numberToWords(grandTotal);

//   let pages = [];
//   try {
//     pages = items && items.length > 0 ? paginateItems(items) : [{ type: "last", rows: [] }];
//   } catch (error) {
//     console.error("Error creating pages:", error);
//     pages = [{ type: "last", rows: items || [] }];
//   }

//   if (!pages || pages.length === 0) {
//     pages = [{ type: "last", rows: [] }];
//   }

//   return (
//     <Document>
//       {pages.map((pageData, pageIndex) => {
//         const isFirstPage = pageIndex === 0;
//         const isLastPage = pageIndex === pages.length - 1;

//         return (
//           <Page key={`page-${pageIndex}`} size="A4" style={styles.page}>
//             {isFirstPage && company?.top_image_url && (
//               <Image
//                 src={company.top_image_url}
//                 style={{
//                   position: "absolute",
//                   top: HEADER_TOP,
//                   left: 0,
//                   width: "100%",
//                   height: HEADER_HEIGHT,
//                 }}
//               />
//             )}

//             {isLastPage && company?.bottom_image_url && (
//               <Image
//                 src={company.bottom_image_url}
//                 style={{
//                   position: "absolute",
//                   bottom: FOOTER_BOTTOM,
//                   left: 0,
//                   width: "100%",
//                   height: FOOTER_HEIGHT,
//                 }}
//               />
//             )}

//             <View
//               style={
//                 isFirstPage
//                   ? styles.firstPageInner
//                   : isLastPage
//                   ? styles.lastPageInner
//                   : styles.middlePageInner
//               }
//             >
//               {/* Show header only on first page - no continued title on other pages */}
//               {isFirstPage && <FirstPageHeader invoice={invoice} />}
              
//               {/* Show table with header on every page */}
//               {pageData.rows && pageData.rows.length > 0 && (
//                 <ItemsTable rows={pageData.rows} showHeader={true} />
//               )}

//               {/* Show totals and footer only on last page */}
//               {isLastPage && (
//                 <>
//                   <TotalsSection
//                     invoice={invoice}
//                     amountInWords={amountInWords}
//                   />
//                   <FooterSection invoice={invoice} company={company} />
//                 </>
//               )}
//             </View>
//           </Page>
//         );
//       })}
//     </Document>
//   );
// }






//deepcode generated code v2

// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";

// /* ===================== LAYOUT CONTROL ===================== */

// const PAGE_PADDING_X = 36;

// const HEADER_TOP = 0;
// const HEADER_HEIGHT = 250;

// const FIRST_PAGE_CONTENT_TOP = 45;
// const MIDDLE_PAGE_CONTENT_TOP = 40;

// const FOOTER_BOTTOM = 0;
// const FOOTER_HEIGHT = 250;
// const LAST_PAGE_CONTENT_BOTTOM = 70;

// // Conservative row limits for heavy content
// const ROWS_PER_FIRST_PAGE = 5;
// const ROWS_PER_MIDDLE_PAGE = 10;
// const ROWS_PER_LAST_PAGE = 3;

// /* ===================== STYLES ===================== */

// const styles = StyleSheet.create({
//   page: {
//     position: "relative",
//     paddingTop: 0,
//     paddingBottom: 0,
//     paddingHorizontal: 0,
//     fontSize: 10,
//     fontFamily: "Helvetica",
//     color: "#111",
//     backgroundColor: "#fff",
//   },

//   firstPageInner: {
//     paddingTop: FIRST_PAGE_CONTENT_TOP,
//     paddingBottom: 30,
//     paddingLeft: PAGE_PADDING_X,
//     paddingRight: PAGE_PADDING_X,
//   },

//   middlePageInner: {
//     paddingTop: MIDDLE_PAGE_CONTENT_TOP,
//     paddingBottom: 30,
//     paddingLeft: PAGE_PADDING_X,
//     paddingRight: PAGE_PADDING_X,
//   },

//   lastPageInner: {
//     paddingTop: MIDDLE_PAGE_CONTENT_TOP,
//     paddingBottom: LAST_PAGE_CONTENT_BOTTOM,
//     paddingLeft: PAGE_PADDING_X,
//     paddingRight: PAGE_PADDING_X,
//   },

//   title: {
//     textAlign: "center",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 12,
//   },

//   headerTable: {
//     borderWidth: 1,
//     borderColor: "#000",
//     marginBottom: 0,
//   },

//   headerRow: {
//     flexDirection: "row",
//   },

//   billCol: {
//     width: "32%",
//     padding: 7,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     minHeight: 122,
//   },

//   shipCol: {
//     width: "32%",
//     padding: 7,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     minHeight: 122,
//   },

//   invoiceNoCol: {
//     width: "18%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//   },

//   dateCol: {
//     width: "18%",
//   },

//   metaHead: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 34,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 5,
//     fontWeight: "bold",
//   },

//   metaBody: {
//     minHeight: 88,
//     alignItems: "center",
//     justifyContent: "center",
//     textAlign: "center",
//     padding: 6,
//     fontWeight: "bold",
//     fontSize: 11,
//   },

//   sectionHeading: {
//     fontWeight: "bold",
//     marginBottom: 4,
//   },

//   partyName: {
//     fontWeight: "bold",
//     marginBottom: 2,
//   },

//   smallGap: {
//     marginBottom: 2,
//   },

//   itemsTable: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: "#000",
//   },

//   itemsHeaderRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 32,
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },

//   // KEY FIX: Row container that will determine the height
//   itemRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     alignItems: "stretch", // This makes all children stretch to same height
//   },

//   // All columns now have consistent padding and no fixed heights
//   colDesc: {
//     width: "36%",
//     padding: 6,
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     flexWrap: "wrap",
//     wordBreak: "break-word",
//     whiteSpace: "normal",
//   },

//   colDelivery: {
//     width: "16%",
//     padding: 6, // Same padding as description
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     textAlign: "center",
//     flexWrap: "wrap",
//     wordBreak: "break-word",
//     whiteSpace: "normal",
//   },

//   colQty: {
//     width: "16%",
//     padding: 6, // Same padding as description
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     textAlign: "center",
//   },

//   colRate: {
//     width: "18%",
//     padding: 6, // Same padding as description
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     textAlign: "right",
//   },

//   colAmount: {
//     width: "18%",
//     padding: 6, // Same padding as description
//     textAlign: "right",
//   },

//   headerCellText: {
//     fontWeight: "bold",
//     textAlign: "center",
//   },

//   totalsWrap: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: "#000",
//     marginTop: 0,
//   },

//   totalRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 28,
//     alignItems: "center",
//   },

//   totalLabelWide: {
//     width: "85%",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     textAlign: "right",
//     fontWeight: "bold",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//   },

//   totalValueNarrow: {
//     width: "15%",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     textAlign: "right",
//     fontWeight: "bold",
//   },

//   summaryRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     minHeight: 26,
//     alignItems: "center",
//   },

//   summaryLabel: {
//     width: "70%",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     textAlign: "right",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     fontWeight: "bold",
//   },

//   summaryValue: {
//     width: "30%",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     textAlign: "right",
//     fontWeight: "bold",
//   },

//   inWordsRow: {
//     paddingHorizontal: 8,
//     paddingVertical: 8,
//     textAlign: "center",
//     fontWeight: "bold",
//   },

//   footerWrap: {
//     marginTop: 10,
//   },

//   bottomSection: {
//     flexDirection: "row",
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: "#000",
//     minHeight: 170,
//   },

//   leftBox: {
//     width: "50%",
//     borderRightWidth: 1,
//     borderRightColor: "#000",
//     padding: 8,
//   },

//   rightBox: {
//     width: "50%",
//     padding: 8,
//   },

//   detailSection: {
//     marginBottom: 10,
//   },

//   detailTitle: {
//     fontWeight: "bold",
//     marginBottom: 4,
//   },

//   detailRow: {
//     flexDirection: "row",
//     marginBottom: 2,
//   },

//   detailLabel: {
//     width: 72,
//     fontWeight: "bold",
//   },

//   detailColon: {
//     width: 8,
//     fontWeight: "bold",
//   },

//   detailValue: {
//     flex: 1,
//   },

//   paragraph: {
//     marginBottom: 8,
//     lineHeight: 1.35,
//   },

//   companyLine: {
//     fontWeight: "bold",
//     marginTop: 8,
//     marginBottom: 6,
//   },

//   signature: {
//     width: 120,
//     height: 50,
//     objectFit: "contain",
//     marginVertical: 8,
//   },

//   signName: {
//     fontWeight: "bold",
//     marginTop: 2,
//   },

//   signRole: {
//     fontWeight: "bold",
//   },
// });

// /* ===================== HELPERS ===================== */

// function money(value) {
//   const num = Number(value || 0);
//   return num.toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
// }

// function formatInvoiceDate(value) {
//   if (!value) return "";
//   const d = new Date(value);
//   if (Number.isNaN(d.getTime())) return String(value);
//   const dd = String(d.getDate()).padStart(2, "0");
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const yyyy = d.getFullYear();
//   return `${dd}.${mm}.${yyyy}`;
// }

// function quantityDisplay(value) {
//   const num = Number(value);
//   if (!Number.isFinite(num)) return "-";
//   if (num === 0) return "-";
//   if (Number.isInteger(num)) return String(num);
//   return String(num);
// }

// function numberToWords(num) {
//   if (!Number.isFinite(num) || num < 0) return "Zero Rupees Only";
//   if (num === 0) return "Zero Rupees Only";

//   const ones = [
//     "",
//     "One",
//     "Two",
//     "Three",
//     "Four",
//     "Five",
//     "Six",
//     "Seven",
//     "Eight",
//     "Nine",
//     "Ten",
//     "Eleven",
//     "Twelve",
//     "Thirteen",
//     "Fourteen",
//     "Fifteen",
//     "Sixteen",
//     "Seventeen",
//     "Eighteen",
//     "Nineteen",
//   ];

//   const tens = [
//     "",
//     "",
//     "Twenty",
//     "Thirty",
//     "Forty",
//     "Fifty",
//     "Sixty",
//     "Seventy",
//     "Eighty",
//     "Ninety",
//   ];

//   function belowThousand(n) {
//     let result = "";

//     if (n >= 100) {
//       result += `${ones[Math.floor(n / 100)]} Hundred`;
//       n %= 100;
//       if (n > 0) result += " ";
//     }

//     if (n >= 20) {
//       result += tens[Math.floor(n / 10)];
//       n %= 10;
//       if (n > 0) result += ` ${ones[n]}`;
//     } else if (n > 0) {
//       result += ones[n];
//     }

//     return result.trim();
//   }

//   function indian(n) {
//     if (n === 0) return "";

//     let result = "";

//     const crore = Math.floor(n / 10000000);
//     n %= 10000000;

//     const lakh = Math.floor(n / 100000);
//     n %= 100000;

//     const thousand = Math.floor(n / 1000);
//     n %= 1000;

//     if (crore > 0) result += `${belowThousand(crore)} Crore`;
//     if (lakh > 0) result += `${result ? " " : ""}${belowThousand(lakh)} Lakh`;
//     if (thousand > 0) result += `${result ? " " : ""}${belowThousand(thousand)} Thousand`;
//     if (n > 0) result += `${result ? " " : ""}${belowThousand(n)}`;

//     return result.trim();
//   }

//   const integerPart = Math.floor(num);
//   const decimalPart = Math.round((num - integerPart) * 100);

//   let words = `${indian(integerPart)} Rupees`;

//   if (decimalPart > 0) {
//     words += ` and ${indian(decimalPart)} Paise`;
//   }

//   return `${words} Only`;
// }

// // Calculate row height factor based on text length
// function getEstimatedRowHeight(item) {
//   const desc = String(item?.description || "");
//   const delivery = String(item?.delivery_date || "");
  
//   // Estimate lines needed (approx 35-40 chars per line for description column)
//   const descLines = Math.max(1, Math.ceil(desc.length / 35));
//   const deliveryLines = Math.max(1, Math.ceil(delivery.length / 20));
  
//   // Return the maximum lines needed
//   return Math.max(descLines, deliveryLines);
// }

// // Smart pagination based on content height
// function paginateItems(items = []) {
//   if (!items || !Array.isArray(items) || items.length === 0) {
//     return [{ type: "last", rows: [] }];
//   }
  
//   try {
//     const pages = [];
//     let remainingItems = [...items];
    
//     // First page items
//     let currentPageRows = [];
    
//     for (let i = 0; i < remainingItems.length; i++) {
//       if (currentPageRows.length >= ROWS_PER_FIRST_PAGE) {
//         break;
//       }
//       currentPageRows.push(remainingItems[i]);
//     }
    
//     if (currentPageRows.length > 0) {
//       pages.push({
//         type: "first",
//         rows: [...currentPageRows],
//       });
//       remainingItems = remainingItems.slice(currentPageRows.length);
//     }
    
//     // Middle pages
//     while (remainingItems.length > ROWS_PER_LAST_PAGE) {
//       const middleRows = [];
      
//       for (let i = 0; i < Math.min(ROWS_PER_MIDDLE_PAGE, remainingItems.length); i++) {
//         middleRows.push(remainingItems[i]);
//       }
      
//       if (middleRows.length > 0) {
//         pages.push({
//           type: "middle",
//           rows: [...middleRows],
//         });
//         remainingItems = remainingItems.slice(middleRows.length);
//       } else {
//         break;
//       }
      
//       // Safety break
//       if (pages.length > 50) break;
//     }
    
//     // Last page
//     if (remainingItems.length > 0) {
//       pages.push({
//         type: "last",
//         rows: remainingItems,
//       });
//     }
    
//     return pages;
    
//   } catch (error) {
//     console.error("Pagination error:", error);
//     return [{ type: "last", rows: items }];
//   }
// }

// /* ===================== UI SECTIONS ===================== */

// function DetailRow({ label, value }) {
//   return (
//     <View style={styles.detailRow}>
//       <Text style={styles.detailLabel}>{label}</Text>
//       <Text style={styles.detailColon}>:</Text>
//       <Text style={styles.detailValue}>{value || "-"}</Text>
//     </View>
//   );
// }

// function ItemsTable({ rows = [], showHeader = true }) {
//   if (!rows || rows.length === 0) {
//     return null;
//   }

//   return (
//     <View style={styles.itemsTable}>
//       {showHeader && (
//         <View style={styles.itemsHeaderRow}>
//           <Text style={[styles.colDesc, styles.headerCellText]}>
//             Description of Service / Goods
//           </Text>
//           <Text style={[styles.colDelivery, styles.headerCellText]}>
//             Delivery Date
//           </Text>
//           <Text style={[styles.colQty, styles.headerCellText]}>
//             Quantity
//           </Text>
//           <Text style={[styles.colRate, styles.headerCellText]}>
//             Rate
//           </Text>
//           <Text style={[styles.colAmount, styles.headerCellText]}>
//             Amount (INR)
//           </Text>
//         </View>
//       )}

//       {rows.map((item, idx) => (
//         <View
//           key={item.id || `${item.description || "item"}-${idx}`}
//           style={styles.itemRow}
//         >
//           <Text style={styles.colDesc}>
//             {item.description || "-"}
//           </Text>
//           <Text style={styles.colDelivery}>
//             {item.delivery_date || "-"}
//           </Text>
//           <Text style={styles.colQty}>
//             {quantityDisplay(item.quantity)}
//           </Text>
//           <Text style={styles.colRate}>
//             {money(item.rate)}
//           </Text>
//           <Text style={styles.colAmount}>
//             {money(item.amount)}
//           </Text>
//         </View>
//       ))}
//     </View>
//   );
// }

// function TotalsSection({ invoice, amountInWords }) {
//   return (
//     <View style={styles.totalsWrap}>
//       <View style={styles.totalRow}>
//         <Text style={styles.totalLabelWide}>Total Amount</Text>
//         <Text style={styles.totalValueNarrow}>{money(invoice.grand_total)}</Text>
//       </View>

//       <View style={styles.summaryRow}>
//         <Text style={styles.summaryLabel}>Subtotal</Text>
//         <Text style={styles.summaryValue}>{money(invoice.subtotal)}</Text>
//       </View>

//       <View style={styles.summaryRow}>
//         <Text style={styles.summaryLabel}>Add GST ({invoice.gst_percent || 0}%)</Text>
//         <Text style={styles.summaryValue}>{money(invoice.gst_amount)}</Text>
//       </View>

//       <View style={styles.summaryRow}>
//         <Text style={styles.summaryLabel}>Grand Total</Text>
//         <Text style={styles.summaryValue}>{money(invoice.grand_total)}</Text>
//       </View>

//       <Text style={styles.inWordsRow}>({amountInWords})</Text>
//     </View>
//   );
// }

// function FooterSection({ invoice, company }) {
//   return (
//     <View style={styles.footerWrap}>
//       <View style={styles.bottomSection}>
//         <View style={styles.leftBox}>
//           <View style={styles.detailSection}>
//             <Text style={styles.detailTitle}>Contact Details:</Text>
//             <DetailRow
//               label="Mob"
//               value={
//                 company?.mobile_2
//                   ? `${company?.mobile_1 || "-"} / ${company.mobile_2}`
//                   : company?.mobile_1 || "-"
//               }
//             />
//             <DetailRow label="Email" value={company?.email || "-"} />
//           </View>

//           <View style={styles.detailSection}>
//             <Text style={styles.detailTitle}>Address Details:</Text>
//             <Text>{company?.address || "-"}</Text>
//           </View>

//           <View style={styles.detailSection}>
//             <Text style={styles.detailTitle}>Bank Details:</Text>
//             <DetailRow label="Name" value={company?.bank_account_name || "-"} />
//             <DetailRow label="Acc. No" value={company?.account_number || "-"} />
//             <DetailRow label="Bank" value={company?.bank_name || "-"} />
//             <DetailRow label="Branch" value={company?.branch || "-"} />
//             <DetailRow label="IFSC" value={company?.ifsc_code || "-"} />
//             <DetailRow label="CIF ID" value={company?.cif_id || "-"} />
//             <DetailRow label="PAN" value={company?.pan_number || "-"} />
//             <DetailRow label="TAN" value={company?.tan_number || "-"} />
//           </View>
//         </View>

//         <View style={styles.rightBox}>
//           <Text style={styles.detailTitle}>Declaration:</Text>
//           <Text style={styles.paragraph}>
//             {invoice.declaration_text ||
//               "This is to certify that all the details furnished above are true and genuine to the best of our knowledge."}
//           </Text>

//           <Text style={styles.companyLine}>
//             For {company?.company_name || "Company"}
//           </Text>

//           {invoice.signatory_signature_url ? (
//             <Image src={invoice.signatory_signature_url} style={styles.signature} />
//           ) : null}

//           <Text style={styles.signName}>{invoice.signatory_name || ""}</Text>
//           <Text style={styles.signRole}>{invoice.signatory_title || ""}</Text>
//           <Text>(Authorized Signatory)</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// function FirstPageHeader({ invoice }) {
//   return (
//     <>
//       <Text style={styles.title}>TAX INVOICE</Text>

//       <View style={styles.headerTable}>
//         <View style={styles.headerRow}>
//           <View style={styles.billCol}>
//             <Text style={styles.sectionHeading}>Bill To:</Text>
//             <Text style={styles.partyName}>{invoice.bill_to_name}</Text>
//             <Text style={styles.smallGap}>{invoice.bill_to_address}</Text>
//             {invoice.bill_to_pan ? (
//               <Text style={styles.smallGap}>PAN - {invoice.bill_to_pan}</Text>
//             ) : null}
//             {invoice.bill_to_gstin ? (
//               <Text style={styles.smallGap}>GSTIN: {invoice.bill_to_gstin}</Text>
//             ) : null}
//             {invoice.bill_to_cin ? <Text>CIN: {invoice.bill_to_cin}</Text> : null}
//           </View>

//           <View style={styles.shipCol}>
//             <Text style={styles.sectionHeading}>Ship To:</Text>
//             <Text style={styles.partyName}>{invoice.ship_to_name}</Text>
//             <Text style={styles.smallGap}>{invoice.ship_to_address}</Text>
//             {invoice.ship_to_pan ? (
//               <Text style={styles.smallGap}>PAN - {invoice.ship_to_pan}</Text>
//             ) : null}
//             {invoice.ship_to_gstin ? (
//               <Text style={styles.smallGap}>GSTIN: {invoice.ship_to_gstin}</Text>
//             ) : null}
//             {invoice.ship_to_cin ? <Text>CIN: {invoice.ship_to_cin}</Text> : null}
//           </View>

//           <View style={styles.invoiceNoCol}>
//             <View style={styles.metaHead}>
//               <Text>Invoice No</Text>
//             </View>
//             <View style={styles.metaBody}>
//               <Text>{invoice.invoice_number}</Text>
//             </View>
//           </View>

//           <View style={styles.dateCol}>
//             <View style={styles.metaHead}>
//               <Text>Date</Text>
//             </View>
//             <View style={styles.metaBody}>
//               <Text>{formatInvoiceDate(invoice.invoice_date)}</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </>
//   );
// }

// /* ===================== MAIN ===================== */

// export default function InvoicePdfDocument({ invoice, items = [], company }) {
//   if (!invoice) {
//     console.error("Invoice data is missing");
//     return null;
//   }
  
//   const grandTotal = Number(invoice?.grand_total || 0);

//   const amountInWords =
//     invoice?.amount_in_words &&
//     !String(invoice.amount_in_words).includes(".00 Only")
//       ? invoice.amount_in_words
//       : numberToWords(grandTotal);

//   let pages = [];
//   try {
//     pages = items && items.length > 0 ? paginateItems(items) : [{ type: "last", rows: [] }];
//   } catch (error) {
//     console.error("Error creating pages:", error);
//     pages = [{ type: "last", rows: items || [] }];
//   }

//   if (!pages || pages.length === 0) {
//     pages = [{ type: "last", rows: [] }];
//   }

//   return (
//     <Document>
//       {pages.map((pageData, pageIndex) => {
//         const isFirstPage = pageIndex === 0;
//         const isLastPage = pageIndex === pages.length - 1;

//         return (
//           <Page key={`page-${pageIndex}`} size="A4" style={styles.page}>
//             {isFirstPage && company?.top_image_url && (
//               <Image
//                 src={company.top_image_url}
//                 style={{
//                   position: "absolute",
//                   top: HEADER_TOP,
//                   left: 0,
//                   width: "100%",
//                   height: HEADER_HEIGHT,
//                 }}
//               />
//             )}

//             {isLastPage && company?.bottom_image_url && (
//               <Image
//                 src={company.bottom_image_url}
//                 style={{
//                   position: "absolute",
//                   bottom: FOOTER_BOTTOM,
//                   left: 0,
//                   width: "100%",
//                   height: FOOTER_HEIGHT,
//                 }}
//               />
//             )}

//             <View
//               style={
//                 isFirstPage
//                   ? styles.firstPageInner
//                   : isLastPage
//                   ? styles.lastPageInner
//                   : styles.middlePageInner
//               }
//             >
//               {/* Show header only on first page */}
//               {isFirstPage && <FirstPageHeader invoice={invoice} />}
              
//               {/* Show table with header on every page */}
//               {pageData.rows && pageData.rows.length > 0 && (
//                 <ItemsTable rows={pageData.rows} showHeader={true} />
//               )}

//               {/* Show totals and footer only on last page */}
//               {isLastPage && (
//                 <>
//                   <TotalsSection
//                     invoice={invoice}
//                     amountInWords={amountInWords}
//                   />
//                   <FooterSection invoice={invoice} company={company} />
//                 </>
//               )}
//             </View>
//           </Page>
//         );
//       })}
//     </Document>
//   );
// }











import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

/* ===================== LAYOUT CONTROL ===================== */

const PAGE_PADDING_X = 36;

const HEADER_TOP = 0;
const HEADER_HEIGHT = 200;

const FIRST_PAGE_CONTENT_TOP = 80;
const MIDDLE_PAGE_CONTENT_TOP = 70;

const FOOTER_BOTTOM = 0;
const FOOTER_HEIGHT = 200;
const LAST_PAGE_CONTENT_BOTTOM = 70;

// Conservative row limits for heavy content
const ROWS_PER_FIRST_PAGE = 5;
const ROWS_PER_MIDDLE_PAGE = 10;
const ROWS_PER_LAST_PAGE = 3;

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  page: {
    position: "relative",
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#111",
    backgroundColor: "#fff",
  },

  firstPageInner: {
    paddingTop: FIRST_PAGE_CONTENT_TOP,
    paddingBottom: 30,
    paddingLeft: PAGE_PADDING_X,
    paddingRight: PAGE_PADDING_X,
  },

  middlePageInner: {
    paddingTop: MIDDLE_PAGE_CONTENT_TOP,
    paddingBottom: 30,
    paddingLeft: PAGE_PADDING_X,
    paddingRight: PAGE_PADDING_X,
  },

  lastPageInner: {
    paddingTop: MIDDLE_PAGE_CONTENT_TOP,
    paddingBottom: LAST_PAGE_CONTENT_BOTTOM,
    paddingLeft: PAGE_PADDING_X,
    paddingRight: PAGE_PADDING_X,
  },

  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },

  headerTable: {
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 0,
  },

  headerRow: {
    flexDirection: "row",
  },

  billCol: {
    width: "32%",
    padding: 7,
    borderRightWidth: 1,
    borderRightColor: "#000",
    minHeight: 122,
  },

  shipCol: {
    width: "32%",
    padding: 7,
    borderRightWidth: 1,
    borderRightColor: "#000",
    minHeight: 122,
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
    minHeight: 34,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    fontWeight: "bold",
  },

  metaBody: {
    minHeight: 88,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 6,
    fontWeight: "bold",
    fontSize: 11,
  },

  sectionHeading: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  partyName: {
    fontWeight: "normal",
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
    minHeight: 32,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  // Row container that makes all children stretch to same height
  itemRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    alignItems: "stretch",
  },

  // UPDATED COLUMN WIDTHS FOR ITEMS TABLE
  colDesc: {
    width: "32%", // Changed from 36% to match Bill To (32%)
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#000",
    flexWrap: "wrap",
    wordBreak: "break-word",
    whiteSpace: "normal",
  },

  colDelivery: {
    width: "16%", // Changed from 20% 
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "center",
    flexWrap: "wrap",
    wordBreak: "break-word",
    whiteSpace: "normal",
  },

  colQty: {
    width: "16%", // Changed from 14%
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "center",
  },

  colRate: {
    width: "18%", // Changed from 15% to match Invoice No (18%)
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "right",
  },

  colAmount: {
    width: "18%", // Changed from 15% to match Date (18%)
    padding: 6,
    textAlign: "right",
  },

  headerCellText: {
    fontWeight: "bold",
    textAlign: "center",
  },

  totalsWrap: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    marginTop: 0,
  },

  totalRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    minHeight: 28,
    alignItems: "center",
  },

  totalLabelWide: {
    width: "85%",
    paddingHorizontal: 8,
    paddingVertical: 6,
    textAlign: "right",
    fontWeight: "bold",
    borderRightWidth: 1,
    borderRightColor: "#000",
  },

  totalValueNarrow: {
    width: "15%",
    paddingHorizontal: 8,
    paddingVertical: 6,
    textAlign: "right",
    fontWeight: "bold",
  },

  summaryRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    minHeight: 26,
    alignItems: "center",
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

  footerWrap: {
    marginTop: 10,
  },

  bottomSection: {
    flexDirection: "row",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    minHeight: 170,
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
    width: 72,
    fontWeight: "bold",
  },

  detailColon: {
    width: 8,
    fontWeight: "bold",
  },

  detailValue: {
    flex: 1,
  },

  paragraph: {
    marginBottom: 8,
    lineHeight: 1.35,
  },

  companyLine: {
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 6,
  },

  signature: {
    width: 120,
    height: 50,
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

/* ===================== HELPERS ===================== */

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

// Calculate row height factor based on text length
function getEstimatedRowHeight(item) {
  const desc = String(item?.description || "");
  const delivery = String(item?.delivery_date || "");
  
  // Estimate lines needed (approx 35-40 chars per line for description column)
  const descLines = Math.max(1, Math.ceil(desc.length / 35));
  const deliveryLines = Math.max(1, Math.ceil(delivery.length / 20));
  
  // Return the maximum lines needed
  return Math.max(descLines, deliveryLines);
}

// Smart pagination based on content height
function paginateItems(items = []) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return [{ type: "last", rows: [] }];
  }
  
  try {
    const pages = [];
    let remainingItems = [...items];
    
    // First page items
    let currentPageRows = [];
    
    for (let i = 0; i < remainingItems.length; i++) {
      if (currentPageRows.length >= ROWS_PER_FIRST_PAGE) {
        break;
      }
      currentPageRows.push(remainingItems[i]);
    }
    
    if (currentPageRows.length > 0) {
      pages.push({
        type: "first",
        rows: [...currentPageRows],
      });
      remainingItems = remainingItems.slice(currentPageRows.length);
    }
    
    // Middle pages
    while (remainingItems.length > ROWS_PER_LAST_PAGE) {
      const middleRows = [];
      
      for (let i = 0; i < Math.min(ROWS_PER_MIDDLE_PAGE, remainingItems.length); i++) {
        middleRows.push(remainingItems[i]);
      }
      
      if (middleRows.length > 0) {
        pages.push({
          type: "middle",
          rows: [...middleRows],
        });
        remainingItems = remainingItems.slice(middleRows.length);
      } else {
        break;
      }
      
      // Safety break
      if (pages.length > 50) break;
    }
    
    // Last page
    if (remainingItems.length > 0) {
      pages.push({
        type: "last",
        rows: remainingItems,
      });
    }
    
    return pages;
    
  } catch (error) {
    console.error("Pagination error:", error);
    return [{ type: "last", rows: items }];
  }
}

/* ===================== UI SECTIONS ===================== */

function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailColon}>:</Text>
      <Text style={styles.detailValue}>{value || "-"}</Text>
    </View>
  );
}

function ItemsTable({ rows = [], showHeader = true }) {
  if (!rows || rows.length === 0) {
    return null;
  }

  return (
    <View style={styles.itemsTable}>
      {showHeader && (
        <View style={styles.itemsHeaderRow}>
          <Text style={[styles.colDesc, styles.headerCellText]}>
            Description of Service / Goods
          </Text>
          <Text style={[styles.colDelivery, styles.headerCellText]}>
            Delivery Date
          </Text>
          <Text style={[styles.colQty, styles.headerCellText]}>
            Quantity
          </Text>
          <Text style={[styles.colRate, styles.headerCellText]}>
            Rate
          </Text>
          <Text style={[styles.colAmount, styles.headerCellText]}>
            Amount (INR)
          </Text>
        </View>
      )}

      {rows.map((item, idx) => (
        <View
          key={item.id || `${item.description || "item"}-${idx}`}
          style={styles.itemRow}
        >
          <Text style={styles.colDesc}>
            {item.description || "-"}
          </Text>
          <Text style={styles.colDelivery}>
            {item.delivery_date || "-"}
          </Text>
          <Text style={styles.colQty}>
            {quantityDisplay(item.quantity)}
          </Text>
          <Text style={styles.colRate}>
            {money(item.rate)}
          </Text>
          <Text style={styles.colAmount}>
            {money(item.amount)}
          </Text>
        </View>
      ))}
    </View>
  );
}

function TotalsSection({ invoice, amountInWords }) {
  return (
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
        <Text style={styles.summaryLabel}>GST ({invoice.gst_percent || 0}%)</Text>
        <Text style={styles.summaryValue}>{money(invoice.gst_amount)}</Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Grand Total</Text>
        <Text style={styles.summaryValue}>{money(invoice.grand_total)}</Text>
      </View>

      <Text style={styles.inWordsRow}>({amountInWords})</Text>
    </View>
  );
}

function FooterSection({ invoice, company }) {
  return (
    <View style={styles.footerWrap}>
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
            <Image src={invoice.signatory_signature_url} style={styles.signature} />
          ) : null}

          <Text style={styles.signName}>{invoice.signatory_name || ""}</Text>
          <Text style={styles.signRole}>{invoice.signatory_title || ""}</Text>
          <Text>(Authorized Signatory)</Text>
        </View>
      </View>
    </View>
  );
}

function FirstPageHeader({ invoice }) {
  return (
    <>
      <Text style={styles.title}>TAX INVOICE</Text>

      <View style={styles.headerTable}>
        <View style={styles.headerRow}>
          <View style={styles.billCol}>
            <Text style={styles.sectionHeading}>Bill To:</Text>
            <Text style={styles.partyName}>{invoice.bill_to_name}</Text>
            <Text style={styles.smallGap}>{invoice.bill_to_address}</Text>
            {invoice.bill_to_pan ? (
              <Text style={styles.smallGap}>PAN - {invoice.bill_to_pan}</Text>
            ) : null}
            {invoice.bill_to_gstin ? (
              <Text style={styles.smallGap}>GSTIN: {invoice.bill_to_gstin}</Text>
            ) : null}
            {invoice.bill_to_cin ? <Text>CIN: {invoice.bill_to_cin}</Text> : null}
          </View>

          <View style={styles.shipCol}>
            <Text style={styles.sectionHeading}>Ship To:</Text>
            <Text style={styles.partyName}>{invoice.ship_to_name}</Text>
            <Text style={styles.smallGap}>{invoice.ship_to_address}</Text>
            {invoice.ship_to_pan ? (
              <Text style={styles.smallGap}>PAN - {invoice.ship_to_pan}</Text>
            ) : null}
            {invoice.ship_to_gstin ? (
              <Text style={styles.smallGap}>GSTIN: {invoice.ship_to_gstin}</Text>
            ) : null}
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
    </>
  );
}

/* ===================== MAIN ===================== */

export default function InvoicePdfDocument({ invoice, items = [], company }) {
  if (!invoice) {
    console.error("Invoice data is missing");
    return null;
  }
  
  const grandTotal = Number(invoice?.grand_total || 0);

  const amountInWords =
    invoice?.amount_in_words &&
    !String(invoice.amount_in_words).includes(".00 Only")
      ? invoice.amount_in_words
      : numberToWords(grandTotal);

  let pages = [];
  try {
    pages = items && items.length > 0 ? paginateItems(items) : [{ type: "last", rows: [] }];
  } catch (error) {
    console.error("Error creating pages:", error);
    pages = [{ type: "last", rows: items || [] }];
  }

  if (!pages || pages.length === 0) {
    pages = [{ type: "last", rows: [] }];
  }

  return (
    <Document>
      {pages.map((pageData, pageIndex) => {
        const isFirstPage = pageIndex === 0;
        const isLastPage = pageIndex === pages.length - 1;

        return (
          <Page key={`page-${pageIndex}`} size="A4" style={styles.page}>
            {isFirstPage && company?.top_image_url && (
              <Image
                src={company.top_image_url}
                style={{
                  position: "absolute",
                  top: HEADER_TOP,
                  left: 0,
                  width: "100%",
                  height: HEADER_HEIGHT,
                }}
              />
            )}

            {isLastPage && company?.bottom_image_url && (
              <Image
                src={company.bottom_image_url}
                style={{
                  position: "absolute",
                  bottom: FOOTER_BOTTOM,
                  left: 0,
                  width: "100%",
                  height: FOOTER_HEIGHT,
                }}
              />
            )}

            <View
              style={
                isFirstPage
                  ? styles.firstPageInner
                  : isLastPage
                  ? styles.lastPageInner
                  : styles.middlePageInner
              }
            >
              {/* Show header only on first page */}
              {isFirstPage && <FirstPageHeader invoice={invoice} />}
              
              {/* Show table with header on every page */}
              {pageData.rows && pageData.rows.length > 0 && (
                <ItemsTable rows={pageData.rows} showHeader={true} />
              )}

              {/* Show totals and footer only on last page */}
              {isLastPage && (
                <>
                  <TotalsSection
                    invoice={invoice}
                    amountInWords={amountInWords}
                  />
                  <FooterSection invoice={invoice} company={company} />
                </>
              )}
            </View>
          </Page>
        );
      })}
    </Document>
  );
}