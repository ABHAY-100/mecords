"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFDocument } from "@/template/left_page";
import { ExperimentPDFDocument } from "@/template/right_page";
import { IndexPDFDocument } from "@/template/index_page";
import { Download, FileDown } from "lucide-react";

interface AlgorithmStep {
  text: string;
  hasCode: boolean;
  code: string;
}

interface SimplePDFProps {
  program: string;
  output?: string;
  image?: string;
  resetTrigger?: string | number | Record<string, unknown>;
}

export function PDFDownloadButton({
  program,
  output,
  image,
  resetTrigger,
}: SimplePDFProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (resetTrigger) {
      setIsActive(false);
    }
  }, [resetTrigger]);

  const safeImage =
    typeof image === "string" && image.startsWith("data:image/")
      ? image
      : undefined;

  const safeOutput = output && output.trim() !== "" ? output : undefined;

  if (!isActive) {
    return (
      <Button
        onClick={() => {
          console.log("Button clicked, activating PDF generation");
          setIsActive(true);
        }}
        className="flex items-center gap-2"
        variant="outline"
      >
        <Download size={16} />
        Generate PDF
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
      <div className="inline-block">
        <PDFDownloadLink
          document={
            <PDFDocument
              program={program}
              output={safeOutput}
              image={safeImage}
            />
          }
          fileName="leftside.pdf"
          className="inline-block"
        >
          {({ loading, error, url }) => {
            console.log("PDFDownloadLink state:", {
              loading,
              error,
              hasUrl: !!url,
            });

            if (error) {
              console.error("PDF generation error:", error);
              return (
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                  onClick={() => setIsActive(false)}
                >
                  <Download size={16} />
                  Error - Try Again
                </Button>
              );
            }

            return (
              <Button
                disabled={loading}
                className="flex items-center gap-2"
                variant={loading ? "secondary" : "default"}
              >
                <FileDown size={16} />
                {loading ? "Preparing PDF..." : "Download PDF"}
              </Button>
            );
          }}
        </PDFDownloadLink>
      </div>
    </div>
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
  resetTrigger?: string | number | Record<string, unknown>;
}

export function ExperimentPDFDownloadButton({
  experimentData,
  resetTrigger,
}: ExperimentPDFProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (resetTrigger) {
      setIsActive(false);
    }
  }, [resetTrigger]);

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

  if (!isActive) {
    return (
      <Button
        onClick={() => {
          console.log("Button clicked, activating PDF generation");
          setIsActive(true);
        }}
        className="flex items-center gap-2"
        variant="outline"
      >
        <Download size={16} />
        Generate PDF
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
      <div className="inline-block">
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
          {({ loading, error, url }) => {
            console.log("PDFDownloadLink state:", {
              loading,
              error,
              hasUrl: !!url,
            });

            if (error) {
              console.error("PDF generation error:", error);
              return (
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                  onClick={() => setIsActive(false)}
                >
                  <Download size={16} />
                  Error - Try Again
                </Button>
              );
            }

            return (
              <Button
                disabled={loading}
                className="flex items-center gap-2"
                variant={loading ? "secondary" : "default"}
              >
                <FileDown size={16} />
                {loading ? "Preparing PDF..." : "Download PDF"}
              </Button>
            );
          }}
        </PDFDownloadLink>
      </div>
    </div>
  );
}

interface IndexPDFProps {
  entries: Array<{
    sno?: string;
    date?: string;
    topic?: string;
    pageNo?: string;
    sign?: string;
  }>;
  rowCount?: number;
  resetTrigger?: string | number | Record<string, unknown>;
}

export function IndexPDFDownloadButton({
  entries,
  rowCount,
  resetTrigger,
}: IndexPDFProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (resetTrigger) {
      setIsActive(false);
    }
  }, [resetTrigger]);

  if (!isActive) {
    return (
      <Button
        onClick={() => {
          console.log("Button clicked, activating PDF generation");
          setIsActive(true);
        }}
        className="flex items-center gap-2"
        variant="outline"
      >
        <Download size={16} />
        Generate PDF
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
      <div className="inline-block">
        <PDFDownloadLink
          document={<IndexPDFDocument entries={entries} rowCount={rowCount} />}
          fileName="index.pdf"
          className="inline-block"
        >
          {({ loading, error, url }) => {
            console.log("PDFDownloadLink state:", {
              loading,
              error,
              hasUrl: !!url,
            });

            if (error) {
              console.error("PDF generation error:", error);
              return (
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                  onClick={() => setIsActive(false)}
                >
                  <Download size={16} />
                  Error - Try Again
                </Button>
              );
            }

            return (
              <Button
                disabled={loading}
                className="flex items-center gap-2"
                variant={loading ? "secondary" : "default"}
              >
                <FileDown size={16} />
                {loading ? "Preparing PDF..." : "Download PDF"}
              </Button>
            );
          }}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
