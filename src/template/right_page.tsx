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
    padding: "1.5cm",
    fontFamily: "Latin Modern Roman",
    fontSize: 12,
    lineHeight: 1.5,
  },
  header: {
    textAlign: "right",
    marginBottom: "1.5cm",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Latin Modern Roman",
    marginBottom: "1.5cm",
  },
  sectionHeader: {
    fontSize: 14,
    fontFamily: "Latin Modern Roman",
    marginTop: "1cm",
    marginBottom: "0.5cm",
  },
  content: {
    marginBottom: "1cm",
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
    marginBottom: 10,
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
      {/* Header */}
      <View style={styles.header}>
        <Text>Experiment No: {experimentNumber || "_____"}</Text>
        <Text>Date: {experimentDate || "_________"}</Text>
      </View>

      {/* Title */}
      <View style={styles.title}>
        <Text>{experimentTitle || "EXPERIMENT TITLE"}</Text>
      </View>

      {/* Aim */}
      <View style={styles.sectionHeader}>
        <Text>Aim:</Text>
      </View>
      <View style={styles.content}>
        <Text>{experimentAim || "To be specified..."}</Text>
      </View>

      {/* Algorithm */}
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

      {/* Result */}
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
