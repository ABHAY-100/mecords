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

interface AlgorithmStep {
  text: string;
  hasCode: boolean;
  code: string;
}

interface ExperimentPDFDocumentProps {
  experimentNumber: string;
  experimentDate: string;
  experimentTitle: string;
  experimentAim: string;
  algorithmSteps: AlgorithmStep[];
  experimentResult: string;
}

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: "1cm",
    fontFamily: "Latin Modern Roman",
    fontSize: 12,
    lineHeight: 0.7,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    fontSize: "13px",
    marginBottom: "1.5cm",
  },
  title: {
    textAlign: "center",
    fontSize: 19,
    fontFamily: "Latin Modern Roman",
    marginBottom: "1.5cm",
    textTransform: "uppercase",
  },
  sectionHeader: {
    fontSize: 14,
    fontFamily: "Latin Modern Roman",
    textDecoration: "underline",
    marginTop: "1cm",
    marginBottom: "0.5cm",
  },
  content: {
    marginBottom: "-0.2cm",
  },
  codeBlock: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    fontFamily: "Courier",
    fontSize: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  listNumber: {
    width: 20,
  },
  listContent: {
    flex: 1,
  },
});

export const ExperimentPDFDocument = ({
  experimentNumber,
  experimentDate,
  experimentTitle,
  experimentAim,
  algorithmSteps,
  experimentResult,
}: ExperimentPDFDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Experiment No.: {experimentNumber || "_____"}</Text>
        <Text>Date: {experimentDate || "_________"}</Text>
      </View>

      <View style={styles.title}>
        <Text>{experimentTitle || "EXPERIMENT TITLE"}</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text>Aim:</Text>
      </View>
      <View style={styles.content}>
        <Text>{experimentAim || "To be specified..."}</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text>Algorithm:</Text>
      </View>
      <View style={styles.content}>
        {algorithmSteps.map((step, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.listNumber}>
              <Text>{index + 1}.</Text>
            </View>
            <View style={styles.listContent}>
              <Text>{step.text || `Step ${index + 1}`}</Text>
              {step.hasCode && (
                <View style={styles.codeBlock}>
                  <Text>{step.code || "% Enter the Pseudo Code here"}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text>Result:</Text>
      </View>
      <View style={styles.content}>
        <Text>
          {experimentResult ||
            "Program has been executed successfully and obtained the output"}
        </Text>
      </View>
    </Page>
  </Document>
);
