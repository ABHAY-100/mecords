"use client";

import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFDocument } from "@/template/left_page";
import { ExperimentPDFDocument } from "@/template/right_page";
import { Download } from "lucide-react";

interface AlgorithmStep {
  text: string;
  hasCode: boolean;
  code: string;
}

interface SimplePDFProps {
  program: string;
  output?: string;
  image?: string;
}

export function PDFDownloadButton({ program, output, image }: SimplePDFProps) {
  const safeImage =
    typeof image === "string" && image.startsWith("data:image/")
      ? image
      : undefined;

  // Make sure output is only passed if it has content
  const safeOutput = output && output.trim() !== "" ? output : undefined;

  return (
    <PDFDownloadLink
      document={
        <PDFDocument program={program} output={safeOutput} image={safeImage} />
      }
      fileName="leftside.pdf"
      className="inline-block"
    >
      {({ loading, error }) => {
        if (error) {
          console.error("PDF generation error:", error);
          return (
            <Button variant="destructive" className="flex items-center gap-2">
              <Download size={16} />
              Error generating PDF
            </Button>
          );
        }
        return (
          <Button disabled={loading} className="flex items-center gap-2">
            <Download size={16} />
            {loading ? "Generating PDF..." : "Download PDF"}
          </Button>
        );
      }}
    </PDFDownloadLink>
  );
}

interface ExperimentPDFProps {
  experimentData: {
    experimentNumber: string;
    experimentDate: string;
    experimentTitle: string;
    experimentAim: string;
    algorithmSteps: AlgorithmStep[];
    experimentResult: string;
    resultOnNewPage: boolean;
  };
}

export function ExperimentPDFDownloadButton({
  experimentData,
}: ExperimentPDFProps) {
  const safeData = {
    experimentNumber: experimentData.experimentNumber || "",
    experimentDate: experimentData.experimentDate || "",
    experimentTitle: experimentData.experimentTitle || "",
    experimentAim: experimentData.experimentAim || "",
    algorithmSteps: (experimentData.algorithmSteps || []).map((step) => ({
      text: String(step.text || ""),
      hasCode: Boolean(step.hasCode),
      code: String(step.code || ""),
    })),
    experimentResult: experimentData.experimentResult || "",
    resultOnNewPage: Boolean(experimentData.resultOnNewPage),
  };

  return (
    <PDFDownloadLink
      document={
        <ExperimentPDFDocument
          experimentNumber={safeData.experimentNumber}
          experimentDate={safeData.experimentDate}
          experimentTitle={safeData.experimentTitle}
          experimentAim={safeData.experimentAim}
          algorithmSteps={safeData.algorithmSteps}
          experimentResult={safeData.experimentResult}
          resultOnNewPage={safeData.resultOnNewPage}
        />
      }
      fileName="rightside.pdf"
      className="inline-block"
    >
      {({ loading }) => (
        <Button disabled={loading} className="flex items-center gap-2">
          <Download size={16} />
          {loading ? "Generating PDF..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
