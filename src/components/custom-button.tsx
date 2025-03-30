"use client"

import { Button } from "@/components/ui/button"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { PDFDocument } from "@/template/left_page"
import { Download } from "lucide-react"

interface PDFDownloadButtonProps {
  program: string
  output: string
}

export function PDFDownloadButton({ program, output }: PDFDownloadButtonProps) {
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
  )
}
