import * as pdfjsLib from "pdfjs-dist";
import { createWorker } from "tesseract.js";

// @ts-ignore
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Extract text from PDF using PDF.js
 * @param file - PDF file to extract text from
 * @returns Extracted text from all pages
 */
export const extractTextFromPdf = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let text = "";
    console.log(`Extracting text from PDF '${file.name}' - pages: ${pdf.numPages}`);
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((it: any) => it.str || "");
      const pageText = strings.join(" ");
      console.log(`Page ${i} extracted length: ${pageText.length}`);
      text += pageText + "\n";
    }
    console.log(`Total extracted length for '${file.name}': ${text.length}`);
    return text.trim();
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    return ""; // return empty so UI shows "No text extracted"
  }
};

/**
 * Extract text from PDF using OCR with Tesseract.js
 * Renders each PDF page to a canvas and runs OCR.
 * @param file - PDF file to extract text from
 * @returns Extracted text from all pages using OCR
 */
export const ocrExtractTextFromPdf = async (file: File): Promise<string> => {
  if (!file) return "";
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const worker: any = createWorker({ logger: (m: any) => console.log("Tesseract:", m) });

  let fullText = "";
  try {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    for (let i = 1; i <= pdf.numPages; i++) {
      try {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          console.warn(`Could not get canvas context for page ${i}`);
          continue;
        }

        // @ts-ignore -- some pdfjs versions accept canvas directly
        await page.render({ canvas, viewport }).promise;

        try {
          const { data } = await worker.recognize(canvas as any);
          const pageText = data?.text || "";
          console.log(`OCR page ${i} length: ${pageText.length}`);
          fullText += pageText + "\n";
        } catch (recErr) {
          console.error(`Tesseract recognize failed on page ${i}:`, recErr);
          // continue on recognition error
          continue;
        }
      } catch (pageErr) {
        console.error(`Error rendering/OCRing page ${i}:`, pageErr);
        continue;
      }
    }
  } catch (err) {
    console.error("OCR worker failed:", err);
    throw err;
  } finally {
    try {
      await worker.terminate();
    } catch (tErr) {
      console.warn("Error terminating Tesseract worker:", tErr);
    }
  }

  return fullText.trim();
};
