import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Export schedule as PNG (high quality)
 */
export async function exportAsPNG(element: HTMLElement, filename: string = "schedule.png") {
  const canvas = await html2canvas(element, {
    scale: 3, // 3x resolution untuk HD
    backgroundColor: "#ffffff",
    logging: false,
    useCORS: true,
  });
  
  // Download
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/**
 * Export schedule as JPEG
 */
export async function exportAsJPEG(element: HTMLElement, filename: string = "schedule.jpg") {
  const canvas = await html2canvas(element, {
    scale: 3,
    backgroundColor: "#ffffff",
    logging: false,
    useCORS: true,
  });
  
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/jpeg", 0.95);
  link.click();
}

/**
 * Export schedule as PDF (A4 landscape)
 */
export async function exportAsPDF(element: HTMLElement, filename: string = "schedule.pdf") {
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: "#ffffff",
    logging: false,
    useCORS: true,
  });
  
  const imgData = canvas.toDataURL("image/png");
  
  // A4 landscape: 297mm x 210mm
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });
  
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
}
