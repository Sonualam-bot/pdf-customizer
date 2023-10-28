import { PDFDocument } from "pdf-lib";
import { getDocument } from "pdfjs-dist";

export const extractPagesAndDownload = async (pdfUrl, selectedPages) => {
  try {
    const response = await fetch(pdfUrl);
    const arrayBuffer = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    const extractedDoc = await PDFDocument.create();

    for (const pageNo of selectedPages) {
      const pageIndex = pageNo - 1; // Page numbers start at 1, while array index starts at 0
      const [copiedPage] = await extractedDoc.copyPages(pdfDoc, [pageIndex]);
      extractedDoc.addPage(copiedPage);
    }

    const extractedBytes = await extractedDoc.save();
    const blob = new Blob([extractedBytes], { type: "application/pdf" });
    const downloadLink = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = "extracted_pages.pdf";
    link.click();
  } catch (error) {
    console.error("Extraction and download failed:", error);
  }
};

export const getNumberOfPages = async (pdfUrl) => {
  try {
    const pdf = await getDocument(pdfUrl).promise;
    console.log(pdf.numPages);
    return pdf.numPages;
  } catch (error) {
    console.log(error);
  }
};
