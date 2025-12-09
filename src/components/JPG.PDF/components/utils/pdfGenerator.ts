import { jsPDF } from "jspdf";

export const generatePDF = async (images: string[]) => {
  const pdf = new jsPDF();
  for (let i = 0; i < images.length; i++) {
    if (i > 0) pdf.addPage();
    const img = images[i];
    pdf.addImage(img, "JPEG", 10, 10, 190, 270);
  }
  pdf.save("converted.pdf");
};
