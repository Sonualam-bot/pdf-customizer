const express = require("express");
const { upload } = require("../multer/multer");
const {
  createPdf,
  getAllPdf,
  removePdf,
} = require("../controllers/pdf.controller");
const pdfRouter = express.Router();

pdfRouter.post("/upload-files", upload.single("file"), async (req, res) => {
  try {
    const title = req.body.title;
    const fileName = req.file.filename;

    const upload = await createPdf(title, fileName);

    if (upload) {
      res.status(200).json({
        success: true,
        message: "Successfully added pdf",
        path: req.file.path,
        pdf: upload,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to upload pdf ${error.message}`,
    });
  }
});

pdfRouter.get("/pdf", async (req, res) => {
  try {
    const pdfData = await getAllPdf();
    if (!pdfData) {
      res.status(404).json({
        success: false,
        message: "No pdfs in db",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched pdf",
      pdf: pdfData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to fetch pdf ${error.message} `,
    });
  }
});

pdfRouter.delete("/pdf/:pdfId", async (req, res) => {
  try {
    const pdfId = req.params.pdfId;
    const pdfRemove = await removePdf(pdfId);

    if (!pdfRemove) {
      res.status(404).json({
        success: false,
        message: `Pdf Not found by Id`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted pdf",
      pdf: pdfRemove,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to deleted pdf ${error.message} `,
    });
  }
});

module.exports = pdfRouter;
