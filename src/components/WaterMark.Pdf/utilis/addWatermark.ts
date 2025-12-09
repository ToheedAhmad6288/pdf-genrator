import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function addWatermarkToPDF(
  pdfFile: File,
  options: {
    text?: string;
    image?: string; // base64 if image watermark
    position: "top-left" | "top-right" | "center" | "bottom-left" | "bottom-right";
    opacity: number;
    fontSize: number;
    color: string;
  }
): Promise<Blob> {
  const pdfBytes = await pdfFile.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  for (const page of pages) {
    const { width, height } = page.getSize();
    const text = options.text;

    let x = 50, y = 50;
    switch (options.position) {
      case "top-right":
        x = width - 150;
        y = height - 50;
        break;
      case "top-left":
        x = 50;
        y = height - 50;
        break;
      case "center":
        x = width / 2 - 50;
        y = height / 2;
        break;
      case "bottom-left":
        x = 50;
        y = 50;
        break;
      case "bottom-right":
        x = width - 150;
        y = 50;
        break;
    }

    if (options.text) {
      page.drawText(text!, {
        x,
        y,
        size: options.fontSize,
        font,
        color: rgb(0, 0, 0),
        opacity: options.opacity,
      });
    }
  }

  const pdfBytesNew = await pdfDoc.save();
  return new Blob(    );
}
