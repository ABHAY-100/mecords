"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from 'next/dynamic'

// Dynamically import the PDFDownloadButton with SSR disabled
const PDFDownloadButton = dynamic(
  () => import('@/components/pdf-download-button').then(mod => mod.PDFDownloadButton),
  { ssr: false }
)

export default function Home() {
  const [program, setProgram] = useState("")
  const [output, setOutput] = useState("")

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">PDF Content Generator</h1>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="editor">
          <div className="grid gap-6 mb-6">
            <div>
              <label htmlFor="program" className="block text-sm font-medium mb-2">
                Program
              </label>
              <Textarea
                id="program"
                placeholder="Paste your program code here..."
                className="min-h-[200px] font-mono"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="output" className="block text-sm font-medium mb-2">
                Output
              </label>
              <Textarea
                id="output"
                placeholder="Paste your program output here..."
                className="min-h-[200px] font-mono"
                value={output}
                onChange={(e) => setOutput(e.target.value)}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card className="p-6 mb-6 w-full max-w-[210mm] mx-auto bg-white shadow-md">
            <div className="a4-preview">
              <div className="section-title">Program</div>
              <pre className="code">{program || "% paste program here"}</pre>

              <div className="section-title">Output</div>
              <pre className="code">{output || "% paste output here"}</pre>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-6">
        <PDFDownloadButton program={program} output={output} />
      </div>
    </div>
  )
}

