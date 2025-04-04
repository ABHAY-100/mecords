"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Latin Modern Roman",
  src: "https://cdn.jsdelivr.net/npm/@fontsource/eb-garamond@4.5.0/files/eb-garamond-latin-400-normal.woff",
});

interface IndexEntry {
  sno?: string;
  date?: string;
  topic?: string;
  pageNo?: string;
  sign?: string;
}

interface IndexPDFDocumentProps {
  entries?: IndexEntry[];
  rowCount?: number;
}

const styles = StyleSheet.create({
  page: {
    padding: "1cm",
    fontFamily: "Latin Modern Roman",
    fontSize: 12,
    lineHeight: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Latin Modern Roman",
    fontWeight: "bold",
    marginTop: "1cm",
    marginBottom: "2cm",
    textTransform: "uppercase",
  },
  table: {
    // display: "table",
    width: "100%",
    marginBottom: "2cm",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
    fontSize: 14,
  },
  tableCell: {
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
  },
  snoCell: {
    width: "8%",
    textAlign: "center",
  },
  dateCell: {
    width: "15%",
    textAlign: "center",
  },
  topicCell: {
    width: "52%",
    textAlign: "center",
  },
  pageCell: {
    width: "10%",
    textAlign: "center",
  },
  signCell: {
    width: "15%",
    textAlign: "center",
  },
});

export const IndexPDFDocument = ({
  entries = [],
  rowCount = 20,
}: IndexPDFDocumentProps) => {
  const filledEntries = [...entries];

  while (filledEntries.length < rowCount) {
    filledEntries.push({
      sno: (filledEntries.length + 1).toString(),
      date: "",
      topic: "",
      pageNo: "",
      sign: "",
    });
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.title}>
          <Text>INDEX</Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={[styles.tableCell, styles.snoCell]}>
              <Text>S.NO</Text>
            </View>
            <View style={[styles.tableCell, styles.dateCell]}>
              <Text>DATE</Text>
            </View>
            <View style={[styles.tableCell, styles.topicCell]}>
              <Text>TOPIC</Text>
            </View>
            <View style={[styles.tableCell, styles.pageCell]}>
              <Text>PAGE NO.</Text>
            </View>
            <View style={[styles.tableCell, styles.signCell]}>
              <Text>SIGN</Text>
            </View>
          </View>

          {filledEntries.map((entry, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={[styles.tableCell, styles.snoCell]}>
                <Text>{entry.sno || (index + 1).toString()}</Text>
              </View>
              <View style={[styles.tableCell, styles.dateCell]}>
                <Text>{entry.date || ""}</Text>
              </View>
              <View style={[styles.tableCell, styles.topicCell]}>
                <Text>{entry.topic || ""}</Text>
              </View>
              <View style={[styles.tableCell, styles.pageCell]}>
                <Text>{entry.pageNo || ""}</Text>
              </View>
              <View style={[styles.tableCell, styles.signCell]}>
                <Text>{entry.sign || ""}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
