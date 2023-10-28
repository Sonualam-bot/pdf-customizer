const mongoose = require("mongoose");

const PdfDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
  },
  {
    timestamps: true,
  },
  {
    collection: "PdfDetails",
  }
);

const PdfDetails = mongoose.model("PdfDetails", PdfDetailsSchema);

module.exports = PdfDetails;
