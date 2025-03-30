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
      fileName="leftside.pdf"
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
  experimentData: {
    experimentNumber: string;
    experimentDate: string;
    experimentTitle: string;
    experimentAim: string;
    algorithmSteps: AlgorithmStep[];
    experimentResult: string;
  };
}

export function ExperimentPDFDownloadButton({experimentData}: ExperimentPDFProps) {
  // Create a deep copy of the data to avoid reference issues
  const safeData = {
    experimentNumber: experimentData.experimentNumber || '',
    experimentDate: experimentData.experimentDate || '',
    experimentTitle: experimentData.experimentTitle || '',
    experimentAim: experimentData.experimentAim || '',
    // Create a completely new array with only the needed properties
    algorithmSteps: (experimentData.algorithmSteps || []).map(step => ({
      text: String(step.text || ''),
      hasCode: Boolean(step.hasCode),
      code: String(step.code || '')
    })),
    experimentResult: experimentData.experimentResult || ''
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
        />
      }
      fileName="rightside.pdf"
      className="inline-block"
    >
      {({loading}) => (
        <Button disabled={loading} className="flex items-center gap-2">
          <Download size={16}/>
          {loading ? "Generating PDF..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}