import { useContext, useEffect } from "react";
import "./App.css";
import { Form } from "./form/Form";
import { ShowPdf } from "./pages/ShowPdf";
import { pdfjs } from "react-pdf";
import { PdfContext } from "./context/PdfContext";
import PDFViewer from "./pages/PdfViewer";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  const { fetchPdf, pdfUrl } = useContext(PdfContext);

  useEffect(() => {
    fetchPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="home-container">
        <div>
          <ShowPdf />
        </div>

        <div>
          <PDFViewer pdfUrl={pdfUrl} />
        </div>
        <div>
          <Form />
        </div>
      </div>
    </>
  );
}

export default App;
