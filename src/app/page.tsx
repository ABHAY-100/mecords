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
  }
);

const ExperimentPDFDownloadButton = dynamic(
  () =>
    import("@/components/custom-button").then(
      (mod) => mod.ExperimentPDFDownloadButton
    ),
  { ssr: false }
);

interface AlgorithmStep {
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
  const [algorithmSteps, setAlgorithmSteps] = useState<AlgorithmStep[]>([
    { text: "Start", hasCode: false, code: "" },
    { text: "Stop", hasCode: false, code: "" },
  ]);
  const [experimentResult, setExperimentResult] = useState(
    "Program has been executed successfully and obtained the output."
  );

  const addAlgorithmStep = (index: number) => {
    const newSteps = [...algorithmSteps];
    newSteps.splice(index + 1, 0, { text: "", hasCode: false, code: "" });
    setAlgorithmSteps(newSteps);
  };

  const removeAlgorithmStep = (index: number) => {
    if (algorithmSteps.length <= 2) return;
    const newSteps = [...algorithmSteps];
    newSteps.splice(index, 1);
    setAlgorithmSteps(newSteps);
  };

  const updateAlgorithmStep = (
    index: number,
    field: keyof AlgorithmStep,
    value: string | boolean
  ) => {
    const newSteps = [...algorithmSteps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setAlgorithmSteps(newSteps);
  };

  return (
    <div className="container mx-auto py-12 max-w-7xl font-clashgrotesk px-[120px]">
      <div className="mb-6 gap-3 flex flex-col">
        <Label htmlFor="template-select"><p className="text-[14px] pl-2">Select Template :</p></Label>
        <Select
          value={templateType}
          onValueChange={(value: "simple" | "experiment") =>
            setTemplateType(value)
          }
        >
          <SelectTrigger id="template-select" className="w-full max-w-xs font-normal font-clashgrotesk">
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
                    <p className="text-[14px] pl-2">Exp. Date : </p>
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
                  placeholder="Describe the aim of the experiment..."
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
          <Card className="p-6 mb-6 mx-auto bg-white shadow-md">
            {templateType === "simple" ? (
              <div className="a4-preview simple-template">
                <div className="section-title">Program</div>
                <pre className="code">{program || "% paste program here"}</pre>

                <div className="section-title">Output</div>
                <pre className="code">{output || "% paste output here"}</pre>
              </div>
            ) : (
              <div className="a4-preview experiment-template">
                <div className="header">
                  <p>Experiment No: {experimentNumber || "_____"}</p>
                  <p>Date: {experimentDate || "_________"}</p>
                </div>

                <div className="title">
                  {experimentTitle || "EXPERIMENT TITLE"}
                </div>

                <div className="section-header">Aim:</div>
                <div className="content">
                  {experimentAim || "To be specified..."}
                </div>

                <div className="section-header">Algorithm:</div>
                <div className="content">
                  <ol>
                    {algorithmSteps.map((step, index) => (
                      <li key={index}>
                        {step.text || `Step ${index + 1}`}
                        {step.hasCode && (
                          <div className="code-block">
                            {step.code || "% Enter the Pseudo Code here"}
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="section-header">Result:</div>
                <div className="content">
                  {experimentResult ||
                    "Program has been executed successfully and obtained the output."}
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex mt-6">
        {templateType === "simple" ? (
          <PDFDownloadButton program={program} output={output} />
        ) : (
          <ExperimentPDFDownloadButton
            experimentNumber={experimentNumber}
            experimentDate={experimentDate}
            experimentTitle={experimentTitle}
            experimentAim={experimentAim}
            algorithmSteps={algorithmSteps}
            experimentResult={experimentResult}
          />
        )}
      </div>
    </div>
  );
}
