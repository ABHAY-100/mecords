"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";

const PDFDownloadButton = dynamic(
  () =>
    import("@/components/custom-button").then((mod) => mod.PDFDownloadButton),
  {
    ssr: false,
    loading: () => <Button disabled>Loading PDF...</Button>,
  }
);

const ExperimentPDFDownloadButton = dynamic(
  () =>
    import("@/components/custom-button").then(
      (mod) => mod.ExperimentPDFDownloadButton
    ),
  {
    ssr: false,
    loading: () => <Button disabled>Loading PDF...</Button>,
  }
);

interface AlgorithmStep {
  id: string;
  text: string;
  hasCode: boolean;
  code: string;
}

export default function Home() {
  const [templateType, setTemplateType] = useState<"simple" | "experiment">(
    "experiment"
  );

  const [program, setProgram] = useState("");
  const [output, setOutput] = useState("");

  const [experimentNumber, setExperimentNumber] = useState("");
  const [experimentDate, setExperimentDate] = useState("");
  const [experimentTitle, setExperimentTitle] = useState("");
  const [experimentAim, setExperimentAim] = useState("");
  const [algorithmSteps, setAlgorithmSteps] = useState<AlgorithmStep[]>(() => [
    { id: crypto.randomUUID(), text: "Start", hasCode: false, code: "" },
    { id: crypto.randomUUID(), text: "Stop", hasCode: false, code: "" },
  ]);
  const [experimentResult, setExperimentResult] = useState(
    "Program has been executed successfully and obtained the output."
  );

  const addAlgorithmStep = (index: number) => {
    setAlgorithmSteps((prev) => {
      const newSteps = [...prev];
      newSteps.splice(index + 1, 0, {
        id: crypto.randomUUID(),
        text: "",
        hasCode: false,
        code: "",
      });
      return newSteps;
    });
  };

  const removeAlgorithmStep = (index: number) => {
    if (algorithmSteps.length <= 2) return;
    
    // Create a completely new array excluding the item at the specified index
    const newSteps = algorithmSteps
      .filter((_, i) => i !== index)
      .map(step => ({
        id: step.id,
        text: step.text,
        hasCode: Boolean(step.hasCode),
        code: step.code
      }));
    
    setAlgorithmSteps(newSteps);
  };

  const updateAlgorithmStep = (
    index: number,
    field: keyof AlgorithmStep,
    value: string | boolean
  ) => {
    setAlgorithmSteps((prev) => {
      const newSteps = [...prev];
      newSteps[index] = { ...newSteps[index], [field]: value };
      return newSteps;
    });
  };

  const handleExperimentPDFDownload = () => {
    if (typeof window === 'undefined') return null; 
    
    try {
      // Use a try/catch inside the validation as well
      let validatedSteps;
      try {
        validatedSteps = algorithmSteps.map(step => ({
          text: String(step.text || ''),
          hasCode: Boolean(step.hasCode),
          code: String(step.code || '')
        }));
      } catch (e) {
        console.error("Step validation error:", e);
        validatedSteps = [{ text: "Error in steps", hasCode: false, code: "" }];
      }
  
      return (
        <ExperimentPDFDownloadButton
          key={`pdf-${algorithmSteps.length}-${Date.now()}`}
          experimentData={{
            experimentNumber: experimentNumber || '',
            experimentDate: experimentDate || '',
            experimentTitle: experimentTitle || '',
            experimentAim: experimentAim || '',
            algorithmSteps: validatedSteps,
            experimentResult: experimentResult || ''
          }}
        />
      );
    } catch (error) {
      console.error("PDF Generation Error:", error);
      return <Button variant="destructive">Failed to generate PDF</Button>;
    }
  };

  return (
    <div className="container mx-auto py-12 max-w-7xl font-clashgrotesk px-[120px]">
      <div className="mb-6 gap-3 flex flex-col">
        <Label htmlFor="template-select">
          <p className="text-[14px] pl-2">Select Template :</p>
        </Label>
        <Select
          value={templateType}
          onValueChange={(value: "simple" | "experiment") =>
            setTemplateType(value)
          }
        >
          <SelectTrigger
            id="template-select"
            className="w-full max-w-xs font-normal font-clashgrotesk"
          >
            <SelectValue placeholder="Select template type" />
          </SelectTrigger>
          <SelectContent className="font-normal font-clashgrotesk">
            <SelectItem value="experiment">Aim, Algorithm & Result</SelectItem>
            <SelectItem value="simple">Program & Output</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="editor">
          {templateType === "simple" ? (
            <div className="grid gap-6 mb-6">
              <div>
                <Label
                  htmlFor="program"
                  className="block text-sm font-medium mb-2"
                >
                  <p className="text-[14px] pl-2">Program :</p>
                </Label>
                <Textarea
                  id="program"
                  placeholder="Paste your program code here..."
                  className="min-h-[200px] font-mono"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                />
              </div>

              <div>
                <Label
                  htmlFor="output"
                  className="block text-sm font-medium mb-2"
                >
                  <p className="text-[14px] pl-2">Output :</p>
                </Label>
                <Textarea
                  id="output"
                  placeholder="Paste your program output here..."
                  className="min-h-[200px] font-mono"
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="exp-number"
                    className="block text-sm font-medium mb-2"
                  >
                    <p className="text-[14px] pl-2">Exp. No. : </p>
                  </Label>
                  <Input
                    id="exp-number"
                    placeholder="e.g., 1"
                    value={experimentNumber}
                    onChange={(e) => setExperimentNumber(e.target.value)}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="exp-date"
                    className="block text-sm font-medium mb-2"
                  >
                    <p className="text-[14px] pl-2">Date : </p>
                  </Label>
                  <Input
                    id="exp-date"
                    type="date"
                    value={experimentDate}
                    onChange={(e) => setExperimentDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="exp-title"
                  className="block text-sm font-medium mb-2"
                >
                  <p className="text-[14px] pl-2">Title : </p>
                </Label>
                <Input
                  id="exp-title"
                  placeholder="e.g., POLYNOMIAL ADDITION"
                  value={experimentTitle}
                  onChange={(e) => setExperimentTitle(e.target.value)}
                />
              </div>

              <div>
                <Label
                  htmlFor="exp-aim"
                  className="block text-sm font-medium mb-2"
                >
                  <p className="text-[14px] pl-2">Aim : </p>
                </Label>
                <Textarea
                  id="exp-aim"
                  placeholder="e.g., To read two polynomials and store them in an array. Calculate the sum of the two polynomials."
                  className="min-h-[100px]"
                  value={experimentAim}
                  onChange={(e) => setExperimentAim(e.target.value)}
                />
              </div>

              <div>
                <Label className="block text-sm font-medium mb-2">
                  <p className="text-[14px] pl-2">Algorithm : </p>
                </Label>
                <div className="border rounded-md p-4 space-y-4">
                  {algorithmSteps.map((step, index) => (
                    <div
                      key={index}
                      className="space-y-2 pb-4 border-b last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{index + 1}.</span>
                        <Input
                          placeholder="Step description"
                          value={step.text}
                          onChange={(e) =>
                            updateAlgorithmStep(index, "text", e.target.value)
                          }
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => addAlgorithmStep(index)}
                          title="Add step after this"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        {algorithmSteps.length > 2 && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeAlgorithmStep(index)}
                            title="Remove this step"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="flex items-center gap-2 ml-6">
                        <input
                          type="checkbox"
                          id={`has-code-${index}`}
                          checked={step.hasCode}
                          onChange={(e) =>
                            updateAlgorithmStep(
                              index,
                              "hasCode",
                              e.target.checked
                            )
                          }
                          className="mr-2"
                        />
                        <Label
                          htmlFor={`has-code-${index}`}
                          className="text-sm"
                        >
                          Include code block
                        </Label>
                      </div>

                      {step.hasCode && (
                        <Textarea
                          placeholder="Enter code or pseudo-code here..."
                          value={step.code}
                          onChange={(e) =>
                            updateAlgorithmStep(index, "code", e.target.value)
                          }
                          className="ml-6 font-mono min-h-[100px]"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label
                  htmlFor="exp-result"
                  className="block text-sm font-medium mb-2"
                >
                  <p className="text-[14px] pl-2">Result : </p>
                </Label>
                <Textarea
                  id="exp-result"
                  placeholder="Describe the result of the experiment..."
                  className="min-h-[100px]"
                  value={experimentResult}
                  onChange={(e) => setExperimentResult(e.target.value)}
                />
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="preview">
          <Card className="p-6 mb-6 mx-auto bg-zinc-100">
            {templateType === "simple" ? (
              <div className="a4-preview simple-template">
                <div className="section-title font-clashgrotesk font-medium">
                  Program :
                </div>
                <pre className="code mt-1 font-normal text-zinc-700">
                  {program || "% paste program here"}
                </pre>

                <div className="section-title font-clashgrotesk font-medium mt-5">
                  Output :{" "}
                </div>
                <pre className="code mt-1 font-normal text-zinc-700">
                  {output || "% paste output here"}
                </pre>
              </div>
            ) : (
              <div className="a4-preview experiment-template">
                <div className="header gap-1 flex flex-col">
                  <p className="section-title font-clashgrotesk font-medium">
                    Experiment No. : {experimentNumber || ""}
                  </p>
                  <p className="section-title font-clashgrotesk font-medium">
                    Date : {experimentDate || ""}
                  </p>
                </div>

                <div className="title font-clashgrotesk font-medium mt-1">
                  {experimentTitle || "Title : "}
                </div>

                <div className="section-header font-clashgrotesk font-medium mt-1">
                  Aim :{" "}
                </div>
                <div className="content">{experimentAim || ""}</div>

                <div className="section-header font-clashgrotesk font-medium mt-1">
                  Algorithm :{" "}
                </div>
                <div className="content">
                  <ol>
                    {algorithmSteps.map((step, index) => (
                      <li key={step.id}>
                        {`${index + 1}. `} {step.text}
                        {step.hasCode && (
                          <div className="code-block">
                            {step.code || "% Enter the Pseudo Code here"}
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="section-header font-clashgrotesk font-medium mt-1">
                  Result :{" "}
                </div>
                <div className="content">
                  {experimentResult ||
                    "Program has been executed successfully and obtained the output."}
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        {templateType === "simple" ? (
          <PDFDownloadButton program={program} output={output} />
        ) : (
          handleExperimentPDFDownload()
        )}
      </div>
    </div>
  );
}
