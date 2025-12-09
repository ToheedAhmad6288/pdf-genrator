import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * HtmlDownloadButton
 * - targetId: id of the element that contains the preview HTML (e.g. "preview-content")
 *
 * Approach:
 * 1. Read element.innerHTML
 * 2. Create offscreen iframe, write a full HTML doc into it (includes current <style> and <link> tags)
 * 3. Wait for iframe to finish rendering, call html2canvas on iframe.body
 * 4. Build multi-page PDF with jsPDF
 */
interface HtmlDownloadButtonProps {
  targetId: string;
  fileName?: string;
}

const HtmlDownloadButton: React.FC<HtmlDownloadButtonProps> = ({ targetId, fileName = "converted.pdf" }) => {
  const [loading, setLoading] = useState(false);

  const collectHeadHtml = (): string => {
    // Collect style and link tags from the current document to copy into iframe head
    const styles: string[] = [];
    Array.from(document.querySelectorAll("style, link[rel='stylesheet']")).forEach((el) => {
      // For <link> tags we copy the outerHTML (works if server allows) - if blocked, CSS may not load
      styles.push((el as HTMLElement).outerHTML);
    });
    return styles.join("\n");
  };

  const inlineExternalImages = async (html: string): Promise<string> => {
    // Optional improvement: convert <img src="..."> external images to data URLs to avoid CORS issues.
    // This is a best-effort routine and is async. If an image cannot be fetched (CORS), it will be left as-is.
    // NOTE: Fetching images from remote servers might be blocked by CORS; in that case user must supply images that allow CORS or inline data URIs.
    try {
      const div = document.createElement("div");
      div.innerHTML = html;
      const imgs = Array.from(div.querySelectorAll("img"));
      await Promise.all(
        imgs.map(async (img) => {
          const src = img.getAttribute("src");
          if (!src) return;
          // skip already-data URLs
          if (src.startsWith("data:")) return;
          try {
            const resp = await fetch(src, { mode: "cors" });
            if (!resp.ok) return;
            const blob = await resp.blob();
            const reader = new Promise<string>((res, rej) => {
              const r = new FileReader();
              r.onload = () => res(String(r.result));
              r.onerror = rej;
              r.readAsDataURL(blob);
            });
            const dataUrl = await reader;
            img.setAttribute("src", dataUrl);
          } catch (e) {
            // can't fetch (CORS or network) -> leave as is
            console.warn("Could not inline image:", src, e);
          }
        })
      );
      return div.innerHTML;
    } catch (e) {
      console.warn("inlineExternalImages failed:", e);
      return html;
    }
  };

  const handleDownload = async () => {
    const el = document.getElementById(targetId);
    if (!el) {
      alert("Preview element not found. Make sure the preview is rendered and has the correct id.");
      return;
    }

    setLoading(true);
    try {
      console.log("[pdf] grabbing innerHTML from target element");
      const rawHtml = el.innerHTML;

      // Optional: inline external images (best-effort)
      console.log("[pdf] attempting to inline external images (this may take time)");
      const inlinedHtml = await inlineExternalImages(rawHtml);

      // Build iframe document
      const headHtml = collectHeadHtml();
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.left = "-9999px";
      iframe.style.top = "0";
      iframe.style.width = `${el.clientWidth}px`;
      iframe.style.height = `${Math.max(el.clientHeight, 800)}px`;
      iframe.style.visibility = "hidden";
      document.body.appendChild(iframe);

      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) throw new Error("Could not access iframe document");

      // Create a full HTML document for the iframe so CSS & fonts load
      doc.open();
      doc.write(`
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8"/>
            ${headHtml}
            <style>
              /* ensure white background for canvas */
              html,body { background: white !important; margin: 0; padding: 0; }
              /* Preserve the preview container width */
              #__capture_root { box-sizing: border-box; width: ${el.clientWidth}px; }
            </style>
          </head>
          <body>
            <div id="__capture_root">${inlinedHtml}</div>
          </body>
        </html>
      `);
      doc.close();

      // Wait for iframe resources (fonts, images, css) to load.
      await new Promise<void>((resolve) => {
        const win = iframe.contentWindow!;
        const onLoaded = () => {
          // small extra delay so fonts render
          setTimeout(() => resolve(), 300);
        };
        // If already loaded
        if (win.document.readyState === "complete") onLoaded();
        else win.addEventListener("load", onLoaded, { once: true });
        // fallback timeout
        setTimeout(() => resolve(), 3000);
      });

      // Now capture the iframe body or the root element
      const captureRoot = iframe.contentDocument!.getElementById("__capture_root")!;
      if (!captureRoot) throw new Error("Capture root not found in iframe");

      console.log("[pdf] calling html2canvas on iframe content...");
      const canvas = await html2canvas(captureRoot as HTMLElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        // allowTaint: true // can enable if you understand consequences
      });

      // Build PDF pages
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // compute image size in PDF units
      const pxToMm = (px: number) => (px * 25.4) / (96 *  (1)); // assuming 96 DPI; html2canvas scale=2 increases pixels
      const imgWmm = pdfWidth;
      const imgHmm = (canvas.height * imgWmm) / canvas.width;

      let renderedHeight = imgHmm;
      let positionY = 0;

      // if content fits one page, just add it
      if (imgHmm <= pdfHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWmm, imgHmm);
      } else {
        // slice into page-sized chunks by drawing cropped canvases
        const canvasPage = document.createElement("canvas");
        const ratio = canvas.width / imgWmm; // px per mm approx
        // page height in px
        const pageHeightPx = Math.round((pdfHeight * canvas.width) / imgWmm);

        let y = 0;
        while (y < canvas.height) {
          const h = Math.min(pageHeightPx, canvas.height - y);
          canvasPage.width = canvas.width;
          canvasPage.height = h;
          const ctx = canvasPage.getContext("2d")!;
          ctx.drawImage(canvas, 0, y, canvas.width, h, 0, 0, canvas.width, h);
          const pageData = canvasPage.toDataURL("image/png");

          if (y > 0) pdf.addPage();
          pdf.addImage(pageData, "PNG", 0, 0, imgWmm, (h * imgWmm) / canvas.width);

          y += h;
        }
      }

      // trigger download
      pdf.save(fileName);
      console.log("[pdf] done, file saved:", fileName);

      // cleanup
      document.body.removeChild(iframe);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Check console for details. Common causes: cross-origin images or large resources.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={`mt-4 px-4 py-2 rounded text-white font-medium ${
        loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
      }`}
    >
      {loading ? "Generating..." : "Download as PDF"}
    </button>
  );
};

export default HtmlDownloadButton;
