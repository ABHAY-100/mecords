"use client"

import { Button } from "@/components/ui/button"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { ExperimentPDFDocument } from "@/template/right_page"
import { Download } from "lucide-react"

interface AlgorithmStep {
  text: string
  hasCode: boolean
  code: string
}

interface ExperimentPDFDownloadButtonProps {
  experimentNumber: string
  experimentDate: string
  experimentTitle: string
  experimentAim: string
  algorithmSteps: AlgorithmStep[]
  experimentResult: string
}

export function ExperimentPDFDownloadButton({
  experimentNumber,
  experimentDate,
  experimentTitle,
  experimentAim,
  algorithmSteps,
  experimentResult,
}: ExperimentPDFDownloadButtonProps) {
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
  )
}

