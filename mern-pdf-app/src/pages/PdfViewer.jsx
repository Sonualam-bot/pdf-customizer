import { useContext } from "react";
import "../Css/PdfViewer.css";
import { PdfContext } from "../context/PdfContext";

const PDFViewer = ({ pdfUrl }) => {
  const { setPdfUrl } = useContext(PdfContext);
  const iframeStyles = {
    width: "100%",
    height: "600px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div>
      <h2>
        Pdf Uploaded <span onClick={() => setPdfUrl("")}>X</span>{" "}
      </h2>

      <div className="pdf-container">
        {!pdfUrl ? (
          <h4>Select A Pdf To Show</h4>
        ) : (
          <iframe
            title="PDF Viewer"
            src={pdfUrl}
            width="100%"
            height="600px"
            style={iframeStyles}
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
