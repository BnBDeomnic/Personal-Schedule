import { domToPng, domToJpeg } from "modern-screenshot";
import jsPDF from "jspdf";

/**
 * Export schedule as PNG (high quality) with 3:4 aspect ratio
 * Canvas is already optimized for 3:4 ratio
 */
export async function exportAsPNG(element: HTMLElement, filename: string = "schedule.png") {
  try {
    // Capture element at high quality (canvas already optimized for 3:4)
    const dataUrl = await domToPng(element, {
      scale: 3,
      backgroundColor: "#ffffff",
      quality: 1,
    });
    
    // Download directly
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("PNG export error:", error);
    throw error;
  }
}

/**
 * Export schedule as JPEG with 3:4 aspect ratio
 * Canvas is already optimized for 3:4 ratio
 */
export async function exportAsJPEG(element: HTMLElement, filename: string = "schedule.jpg") {
  try {
    // Capture element (canvas already optimized)
    const dataUrl = await domToJpeg(element, {
      scale: 3,
      backgroundColor: "#ffffff",
      quality: 0.95,
    });
    
    // Download directly
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("JPEG export error:", error);
    throw error;
  }
}

/**
 * Export schedule as PDF (A4 landscape) - No stretch, maintain aspect ratio
 */
export async function exportAsPDF(element: HTMLElement, filename: string = "schedule.pdf") {
  try {
    // Capture element at high quality
    const dataUrl = await domToPng(element, {
      scale: 2,
      backgroundColor: "#ffffff",
      quality: 1,
    });
    
    // Create image to get dimensions
    const img = new Image();
    img.src = dataUrl;
    
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
    
    // A4 landscape dimensions in mm
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth(); // 297mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 210mm
    
    // Calculate aspect ratios
    const imgRatio = img.width / img.height;
    const pdfRatio = pdfWidth / pdfHeight;
    
    let finalWidth = pdfWidth;
    let finalHeight = pdfHeight;
    let xOffset = 0;
    let yOffset = 0;
    
    // Maintain aspect ratio - no stretch
    if (imgRatio > pdfRatio) {
      // Image is wider - fit to width
      finalHeight = pdfWidth / imgRatio;
      yOffset = (pdfHeight - finalHeight) / 2;
    } else {
      // Image is taller - fit to height
      finalWidth = pdfHeight * imgRatio;
      xOffset = (pdfWidth - finalWidth) / 2;
    }
    
    // Add image centered with proper aspect ratio
    pdf.addImage(dataUrl, "PNG", xOffset, yOffset, finalWidth, finalHeight);
    pdf.save(filename);
  } catch (error) {
    console.error("PDF export error:", error);
    throw error;
  }
}
