"use client";

import type React from "react";

import { useState, useRef, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  X,
  FileText,
  Binary,
  FileCode,
  Calendar,
  Hash,
  FileOutput,
  Target,
  ListOrdered,
  CheckCircle2,
  ImageIcon,
  BookOpen,
  ListChecks,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const PDFDownloadButton = dynamic(
  () =>
    import("@/components/custom-button").then((mod) => mod.PDFDownloadButton),
  {
    ssr: false,
    // loading: () => <Button disabled>Loading PDF...</Button>,
  }
);

const ExperimentPDFDownloadButton = dynamic(
  () =>
    import("@/components/custom-button").then(
      (mod) => mod.ExperimentPDFDownloadButton
    ),
  {
    ssr: false,
    // loading: () => <Button disabled>Loading PDF...</Button>,
  }
);

const IndexPDFDownloadButton = dynamic(
  () =>
    import("@/components/custom-button").then(
      (mod) => mod.IndexPDFDownloadButton
    ),
  {
    ssr: false,
  }
);

interface AlgorithmStep {
  id: string;
  text: string;
  hasCode: boolean;
  code: string;
}

interface IndexEntry {
  id: string;
  sno?: string;
  date?: string;
  topic?: string;
  pageNo?: string;
  sign?: string;
}

export default function Home() {
  const [templateType, setTemplateType] = useState<
    "simple" | "experiment" | "index"
  >("experiment");

  const [program, setProgram] = useState("");
  const [output, setOutput] = useState("");
  const [outputImage, setOutputImage] = useState<string | undefined | null>(
    undefined
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const [resultOnNewPage, setResultOnNewPage] = useState(false);

  const [indexEntries, setIndexEntries] = useState<IndexEntry[]>(() => [
    {
      id: crypto.randomUUID(),
      sno: "1",
      date: "",
      topic: "",
      pageNo: "",
      sign: "",
    },
  ]);
  const [indexRowCount, setIndexRowCount] = useState(20);

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

    const newSteps = algorithmSteps
      .filter((_, i) => i !== index)
      .map((step) => ({
        id: step.id,
        text: step.text,
        hasCode: Boolean(step.hasCode),
        code: step.code,
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

  const addIndexEntry = () => {
    setIndexEntries((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sno: (prev.length + 1).toString(),
        date: "",
        topic: "",
        pageNo: "",
        sign: "",
      },
    ]);
  };

  const removeIndexEntry = (id: string) => {
    setIndexEntries((prev) => {
      const newEntries = prev.filter((entry) => entry.id !== id);
      return newEntries.map((entry, index) => ({
        ...entry,
        sno: (index + 1).toString(),
      }));
    });
  };

  const updateIndexEntry = (
    id: string,
    field: keyof Omit<IndexEntry, "id" | "sign">,
    value: string
  ) => {
    setIndexEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleExperimentPDFDownload = () => {
    if (typeof window === "undefined") return null;

    try {
      let validatedSteps;
      try {
        validatedSteps = algorithmSteps.map((step) => ({
          text: String(step.text || ""),
          hasCode: Boolean(step.hasCode),
          code: String(step.code || ""),
        }));
      } catch (e) {
        console.error("Step validation error:", e);
        validatedSteps = [{ text: "Error in steps", hasCode: false, code: "" }];
      }

      // Create a resetTrigger based on experiment data
      const resetTrigger = JSON.stringify({
        experimentNumber,
        experimentDate,
        experimentTitle,
        experimentAim,
        stepsLength: algorithmSteps.length,
        experimentResult,
        resultOnNewPage,
      });

      return (
        <Suspense fallback={<Button disabled>Loading PDF...</Button>}>
          <ExperimentPDFDownloadButton
            key={`pdf-${algorithmSteps.length}-${Date.now()}`}
            experimentData={{
              experimentNumber: experimentNumber || "",
              experimentDate: experimentDate || "",
              experimentTitle: experimentTitle || "",
              experimentAim: experimentAim || "",
              algorithmSteps: validatedSteps,
              experimentResult: experimentResult || "",
              resultOnNewPage: resultOnNewPage,
            }}
            resetTrigger={resetTrigger}
          />
        </Suspense>
      );
    } catch (error) {
      console.error("PDF Generation Error:", error);
      return <Button variant="destructive">Failed to generate PDF</Button>;
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        console.error("File is not an image:", file.type);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const result = reader.result as string;
          console.log("Image loaded successfully, size:", result.length);
          setOutputImage(result);
        } catch (error) {
          console.error("Error loading image:", error);
        }
      };
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setOutputImage(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleIndexPDFDownload = () => {
    if (typeof window === "undefined") return null;

    try {
      const formattedEntries = indexEntries.map((entry) => ({
        sno: entry.sno,
        date: entry.date,
        topic: entry.topic,
        pageNo: entry.pageNo,
        sign: "",
      }));

      // Create a resetTrigger based on index entries data
      const resetTrigger = JSON.stringify({
        entriesCount: indexEntries.length,
        rowCount: indexRowCount,
      });

      return (
        <Suspense fallback={<Button disabled>Loading PDF...</Button>}>
          <IndexPDFDownloadButton
            key={`pdf-index-${indexEntries.length}-${Date.now()}`}
            entries={formattedEntries}
            rowCount={indexRowCount}
            resetTrigger={resetTrigger}
          />
        </Suspense>
      );
    } catch (error) {
      console.error("PDF Generation Error:", error);
      return <Button variant="destructive">Failed to generate PDF</Button>;
    }
  };

  return (
    <div className="container mx-auto min-h-screen py-10 max-w-4xl px-4 sm:px-6">
      <Card className="mb-8 shadow-sm border-slate-200">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
            <div className="flex-1">
              <Label
                htmlFor="template-select"
                className="text-sm font-medium mb-1.5"
              >
                Select Experiment Component
              </Label>
              <Select
                value={templateType}
                onValueChange={(value: "simple" | "experiment" | "index") =>
                  setTemplateType(value)
                }
              >
                <SelectTrigger
                  id="template-select"
                  className="w-full mt-1 bg-slate-50"
                >
                  <SelectValue placeholder="Select template type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="index" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Index Page</span>
                  </SelectItem>
                  <SelectItem
                    value="experiment"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Aim, Algorithm & Result</span>
                  </SelectItem>
                  <SelectItem
                    value="simple"
                    className="flex items-center gap-2"
                  >
                    <FileCode className="h-4 w-4" />
                    <span>Program & Output</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid grid-cols-2 w-[200px] mb-6">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="editor">
          <Card className="shadow-sm border-slate-200">
            <CardContent className="pt-6">
              {templateType === "simple" ? (
                <div className="grid gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Binary className="h-4 w-4 text-slate-500" />
                      <Label htmlFor="program" className="font-medium">
                        Program
                      </Label>
                    </div>
                    <Textarea
                      id="program"
                      placeholder="Paste your program code here..."
                      className="min-h-[200px] font-mono bg-slate-50"
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileOutput className="h-4 w-4 text-slate-500" />
                      <Label htmlFor="output" className="font-medium">
                        Output (optional)
                      </Label>
                    </div>
                    <Textarea
                      id="output"
                      placeholder="Paste your program output here..."
                      className="min-h-[150px] font-mono bg-slate-50"
                      value={output}
                      onChange={(e) => setOutput(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ImageIcon className="h-4 w-4 text-slate-500" />
                      <Label htmlFor="output-image" className="font-medium">
                        Output Image (optional)
                      </Label>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-slate-50"
                        >
                          Choose Image
                        </Button>
                        <Input
                          ref={fileInputRef}
                          id="output-image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <p className="text-sm text-muted-foreground">
                          {outputImage ? "Image selected" : "No image selected"}
                        </p>
                      </div>

                      {outputImage && (
                        <div className="relative border rounded-md p-4 mt-2 bg-slate-50">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/80 rounded-full hover:bg-red-50 hover:text-red-500"
                            onClick={removeImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Image
                            src={outputImage || "/placeholder.svg"}
                            alt="Output Preview"
                            className="max-h-[200px] object-contain mx-auto"
                            width={400}
                            height={200}
                            style={{ objectFit: "contain", maxHeight: "200px" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : templateType === "experiment" ? (
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Hash className="h-4 w-4 text-slate-500" />
                        <Label htmlFor="exp-number" className="font-medium">
                          Experiment Number
                        </Label>
                      </div>
                      <Input
                        id="exp-number"
                        placeholder="e.g., 1"
                        value={experimentNumber}
                        onChange={(e) => setExperimentNumber(e.target.value)}
                        className="bg-slate-50"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        <Label htmlFor="exp-date" className="font-medium">
                          Date
                        </Label>
                      </div>
                      <Input
                        id="exp-date"
                        type="date"
                        value={experimentDate}
                        onChange={(e) => setExperimentDate(e.target.value)}
                        className="bg-slate-50"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-slate-500" />
                      <Label htmlFor="exp-title" className="font-medium">
                        Title
                      </Label>
                    </div>
                    <Input
                      id="exp-title"
                      placeholder="e.g., Polynomial Addition"
                      value={experimentTitle}
                      onChange={(e) => setExperimentTitle(e.target.value)}
                      className="bg-slate-50"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-slate-500" />
                      <Label htmlFor="exp-aim" className="font-medium">
                        Aim
                      </Label>
                    </div>
                    <Textarea
                      id="exp-aim"
                      placeholder="e.g., To read two polynomials and store them in an array. Calculate the sum of the two polynomials."
                      className="min-h-[100px] bg-slate-50"
                      value={experimentAim}
                      onChange={(e) => setExperimentAim(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ListOrdered className="h-4 w-4 text-slate-500" />
                      <Label className="font-medium">Algorithm</Label>
                    </div>
                    <Card className="border border-slate-200 bg-slate-50 shadow-none">
                      <CardContent className="p-4 space-y-4">
                        {algorithmSteps.map((step, index) => (
                          <div
                            key={index}
                            className="space-y-3 pb-4 border-b last:border-b-0 last:pb-0"
                          >
                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-medium text-sm">
                                {index + 1}
                              </div>
                              <Input
                                placeholder="Step description"
                                value={step.text}
                                onChange={(e) =>
                                  updateAlgorithmStep(
                                    index,
                                    "text",
                                    e.target.value
                                  )
                                }
                                className="flex-1 bg-white"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => addAlgorithmStep(index)}
                                title="Add step after this"
                                className="h-8 w-8"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              {algorithmSteps.length > 2 && (
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => removeAlgorithmStep(index)}
                                  title="Remove this step"
                                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>

                            <div className="flex items-center gap-2 ml-8">
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id={`has-code-${index}`}
                                  checked={step.hasCode}
                                  onCheckedChange={(checked) =>
                                    updateAlgorithmStep(
                                      index,
                                      "hasCode",
                                      checked
                                    )
                                  }
                                />
                                <Label
                                  htmlFor={`has-code-${index}`}
                                  className="text-sm"
                                >
                                  Include code block
                                </Label>
                              </div>
                            </div>

                            {step.hasCode && (
                              <div className="ml-8 relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 rounded-full"></div>
                                <Textarea
                                  placeholder="Enter code or pseudo-code here..."
                                  value={step.code}
                                  onChange={(e) =>
                                    updateAlgorithmStep(
                                      index,
                                      "code",
                                      e.target.value
                                    )
                                  }
                                  className="pl-4 font-mono min-h-[100px] bg-white"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-slate-500" />
                      <Label htmlFor="exp-result" className="font-medium">
                        Result
                      </Label>
                    </div>
                    <Textarea
                      id="exp-result"
                      placeholder="e.g., Program has been executed successfully and obtained the output."
                      className="min-h-[100px] bg-slate-50"
                      value={experimentResult}
                      onChange={(e) => setExperimentResult(e.target.value)}
                    />

                    <div className="flex items-center gap-4 mt-4">
                      <Label
                        htmlFor="result-new-page"
                        className="text-sm font-medium"
                      >
                        Start Result on a New Page
                      </Label>
                      <Switch
                        id="result-new-page"
                        checked={resultOnNewPage}
                        onCheckedChange={setResultOnNewPage}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ListChecks className="h-4 w-4 text-slate-500" />
                      <Label className="font-medium">Index Entries</Label>
                    </div>
                    <Card className="border border-slate-200 bg-slate-50 shadow-none">
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-12 gap-2 pb-2 border-b text-sm font-medium text-slate-500">
                          <div className="col-span-1">S.NO</div>
                          <div className="col-span-3">DATE</div>
                          <div className="col-span-5">TOPIC</div>
                          <div className="col-span-2">PAGE.NO</div>
                          <div className="col-span-1"></div>
                        </div>

                        {indexEntries.map((entry) => (
                          <div
                            key={entry.id}
                            className="grid grid-cols-12 gap-2 items-center"
                          >
                            <div className="col-span-1">
                              <Input
                                value={entry.sno || ""}
                                onChange={(e) =>
                                  updateIndexEntry(
                                    entry.id,
                                    "sno",
                                    e.target.value
                                  )
                                }
                                className="bg-white text-center p-2"
                              />
                            </div>
                            <div className="col-span-3">
                              <Input
                                value={entry.date || ""}
                                onChange={(e) =>
                                  updateIndexEntry(
                                    entry.id,
                                    "date",
                                    e.target.value
                                  )
                                }
                                className="bg-white p-2"
                              />
                            </div>
                            <div className="col-span-5">
                              <Input
                                value={entry.topic || ""}
                                onChange={(e) =>
                                  updateIndexEntry(
                                    entry.id,
                                    "topic",
                                    e.target.value
                                  )
                                }
                                className="bg-white p-2"
                              />
                            </div>
                            <div className="col-span-2">
                              <Input
                                value={entry.pageNo || ""}
                                onChange={(e) =>
                                  updateIndexEntry(
                                    entry.id,
                                    "pageNo",
                                    e.target.value
                                  )
                                }
                                className="bg-white text-center p-2"
                              />
                            </div>
                            <div className="col-span-1 flex justify-center">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => removeIndexEntry(entry.id)}
                                title="Remove this entry"
                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}

                        <div className="pt-2">
                          <Button
                            variant="outline"
                            onClick={addIndexEntry}
                            className="flex items-center gap-2 w-full border-dashed"
                          >
                            <Plus className="h-4 w-4" /> Add Entry
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="index-row-count" className="font-medium">
                        Total Rows in Index (Including Empty Rows) :
                      </Label>
                      <Input
                        id="index-row-count"
                        type="number"
                        min="5"
                        max="50"
                        value={indexRowCount}
                        onChange={(e) =>
                          setIndexRowCount(Number(e.target.value) || 20)
                        }
                        className="w-24 text-center"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-6">
              <div className="bg-white border border-slate-200 rounded-md p-8 shadow-sm max-w-[800px] mx-auto">
                {templateType === "simple" ? (
                  <div className="a4-preview simple-template">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Binary className="h-4.5 w-4.5 text-slate-500" />
                        Program
                      </h3>
                      <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                        <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800">
                          {program || "// program"}
                        </pre>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <FileOutput className="h-4.5 w-4.5 text-slate-500" />
                        Output
                      </h3>
                      <div className="flex flex-col gap-2.5">
                        {outputImage && (
                          <div>
                            <div className="bg-slate-50 p-4 rounded-md border border-slate-200 flex justify-center">
                              <Image
                                src={outputImage || "/placeholder.svg"}
                                alt="Output Preview"
                                className="max-h-[200px] object-contain"
                                width={400}
                                height={200}
                                style={{
                                  objectFit: "contain",
                                  maxHeight: "200px",
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                          <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800">
                            {output || "// output"}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : templateType === "experiment" ? (
                  <div className="a4-preview experiment-template">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-bold">
                          {experimentTitle || "Experiment Title"}
                        </h2>
                      </div>
                      <div className="text-right text-sm flex gap-1 flex-col text-slate-600">
                        <p>
                          <span className="font-medium">Experiment No:</span>{" "}
                          {experimentNumber || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {experimentDate || "N/A"}
                        </p>
                      </div>
                    </div>

                    <Separator className="mb-6" />

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Target className="h-4.5 w-4.5 text-slate-500" />
                        Aim
                      </h3>
                      <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                        <p className="text-slate-800">
                          {experimentAim ||
                            "The aim of the experiment is not specified!..."}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <ListOrdered className="h-4.5 w-4.5 text-slate-500" />
                        Algorithm
                      </h3>
                      <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                        <ol className="list-decimal pl-5 space-y-3">
                          {algorithmSteps.map((step, index) => (
                            <li key={index} className="text-slate-800">
                              {step.text}
                              {step.hasCode && (
                                <div className="mt-2 bg-white p-3 rounded border border-slate-200 font-mono text-sm">
                                  <pre className="whitespace-pre-wrap">
                                    {step.code || "// Code will appear here"}
                                  </pre>
                                </div>
                              )}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4.5 w-4.5 text-slate-500" />
                        Result
                      </h3>
                      <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                        <p className="text-slate-800">
                          {experimentResult ||
                            "The result of the experiment will appear here"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="a4-preview index-template">
                    <div className="mb-8 text-center">
                      <h2 className="text-3xl font-semibold uppercase">
                        Index
                      </h2>
                    </div>

                    <table className="w-full border-collapse border border-slate-300">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-slate-300 p-2 text-center w-[8%] font-medium">
                            S.NO
                          </th>
                          <th className="border border-slate-300 p-2 text-center w-[15%] font-medium">
                            DATE
                          </th>
                          <th className="border border-slate-300 p-2 text-center w-[52%] font-medium">
                            TOPIC
                          </th>
                          <th className="border border-slate-300 p-2 text-center w-[14%] font-medium">
                            PAGE NO.
                          </th>
                          <th className="border border-slate-300 p-2 text-center w-[15%] font-medium">
                            SIGN
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {indexEntries.map((entry, idx) => (
                          <tr key={idx}>
                            <td className="border border-slate-300 p-2 text-center">
                              {entry.sno}
                            </td>
                            <td className="border border-slate-300 p-2 text-center">
                              {entry.date}
                            </td>
                            <td className="border border-slate-300 p-2 text-left">
                              {entry.topic}
                            </td>
                            <td className="border border-slate-300 p-2 text-center">
                              {entry.pageNo}
                            </td>
                            <td className="border border-slate-300 p-2 text-center">
                              {entry.sign}
                            </td>
                          </tr>
                        ))}
                        {Array.from({
                          length: Math.min(
                            3,
                            indexRowCount - indexEntries.length
                          ),
                        }).map((_, idx) => (
                          <tr key={`empty-${idx}`}>
                            <td className="border border-slate-300 p-2 text-center">
                              {indexEntries.length + idx + 1}
                            </td>
                            <td className="border border-slate-300 p-2"></td>
                            <td className="border border-slate-300 p-2"></td>
                            <td className="border border-slate-300 p-2"></td>
                            <td className="border border-slate-300 p-2"></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {indexRowCount - indexEntries.length > 3 && (
                      <p className="text-sm text-slate-500 mt-2 text-center">
                        + {indexRowCount - indexEntries.length - 3} more empty
                        rows will appear in the PDF
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-center">
        {templateType === "simple" ? (
          <Suspense fallback={<Button disabled>Loading PDF...</Button>}>
            <PDFDownloadButton
              key={`pdf-${
                outputImage ? "with-image" : "no-image"
              }-${Date.now()}`}
              program={program}
              output={output}
              image={outputImage || undefined}
              resetTrigger={JSON.stringify({
                program,
                output,
                hasImage: !!outputImage,
              })}
            />
          </Suspense>
        ) : templateType === "experiment" ? (
          handleExperimentPDFDownload()
        ) : (
          handleIndexPDFDownload()
        )}
      </div>
    </div>
  );
}
