"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

Font.register({
  family: "Latin Modern Roman",
  src: "https://cdn.jsdelivr.net/npm/@fontsource/eb-garamond@4.5.0/files/eb-garamond-latin-400-normal.woff",
});

const styles = StyleSheet.create({
  page: {
    padding: "1cm",
    fontFamily: "Latin Modern Roman",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "semibold",
    marginTop: 6,
    marginBottom: 5,
    borderBottom: "1pt solid black",
    paddingBottom: 2,
  },
  code: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    fontFamily: "Courier",
    fontSize: 10,
    marginBottom: 10,
    whiteSpace: "pre-wrap",
  },
  imageContainer: {
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  image: {
    width: "210px",
    marginHorizontal: "auto",
  },
});

interface PDFDocumentProps {
  program: string;
  output: string;
  image?: string;
}

export const PDFDocument = ({ program, output, image }: PDFDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.sectionTitle}>
        <Text>Program</Text>
      </View>
      <View style={styles.code}>
        <Text>{program || "% paste program here"}</Text>
      </View>

      <View style={styles.sectionTitle}>
        <Text>Output</Text>
      </View>
      {image && (
        <>
          <View style={styles.imageContainer}>
            <Image src={image} style={styles.image} />
          </View>
        </>
      )}
      <View style={styles.code}>
        <Text>{output || "% paste output here"}</Text>
      </View>
    </Page>
  </Document>
);
