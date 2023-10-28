const PdfDetails = require("../models/pdf.model");

async function createPdf(title, fileName) {
  try {
    const pdf = await PdfDetails.create({
      title: title,
      pdf: fileName,
    });
    return pdf;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

async function getAllPdf() {
  try {
    const allPdf = await PdfDetails.find({});
    return allPdf;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

async function removePdf(id) {
  try {
    const remove = await PdfDetails.findOneAndDelete({ _id: id });
    return remove;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

module.exports = {
  createPdf,
  getAllPdf,
  removePdf,
};
