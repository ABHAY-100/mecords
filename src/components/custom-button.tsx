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
  output: string;
}

export function PDFDownloadButton({ program, output }: SimplePDFProps) {
  return (
    <PDFDownloadLink
      document={<PDFDocument program={program} output={output} />}
      fileName="document.pdf"
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

interface ExperimentPDFProps {
  experimentNumber: string;
  experimentDate: string;
  experimentTitle: string;
  experimentAim: string;
  algorithmSteps: AlgorithmStep[];
  experimentResult: string;
}

export function ExperimentPDFDownloadButton({
  experimentNumber,
  experimentDate,
  experimentTitle,
  experimentAim,
  algorithmSteps,
  experimentResult,
}: ExperimentPDFProps) {
  return (
    <PDFDownloadLink
      document={
        <ExperimentPDFDocument
          experimentNumber={experimentNumber}
          experimentDate={experimentDate}
          experimentTitle={experimentTitle}
          experimentAim={experimentAim}
          algorithmSteps={algorithmSteps}
          experimentResult={experimentResult}
        />
      }
      fileName="experiment-report.pdf"
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
