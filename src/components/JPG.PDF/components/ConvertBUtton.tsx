import React, { useState } from "react";
import { jsPDF } from "jspdf";

interface ConvertButtonProps {
  images: File[];
}

const ConvertButton: React.FC<ConvertButtonProps> = ({ images }) => {
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (images.length === 0) {
      alert("Please upload at least one image first!");
      return;
    }

    setLoading(true);

    const pdf = new jsPDF();
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const imgData = await fileToDataURL(file);

      if (i > 0) pdf.addPage();
      const imgProps = pdf.getImageProperties(imgData);

      // Scale image to fit page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save("converted.pdf");
    setLoading(false);
  };

  const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="flex justify-center ">
      {/* <button
        onClick={handleConvert}
        disabled={loading}
        className={`px-6 py-2 font-medium rounded-lg text-white transition mb-96 -mb-96 ${
          loading
            ? "bg-gray-400 cursor-not-allowed "
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Converting..." : "Convert to PDF"}
      </button> */}
    </div>
  );
};

export default ConvertButton;
