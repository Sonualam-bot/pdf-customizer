import { useContext } from "react";
import "../Css/Show.css";
import { PdfContext } from "../context/PdfContext";

export const ShowPdf = () => {
  const { deletePdf, allPdf, setPdfUrl } = useContext(PdfContext);

  const BASE_URL = "http://localhost:4000/api/v1";

  const displayPdf = (pdf) => {
    // window.open(`${BASE_URL}/files/${pdf}`, "_blank", "noreferrer");
    setPdfUrl(`${BASE_URL}/files/${pdf}`);
  };

  return (
    <>
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="parentContainer">
          {allPdf?.map((data) => {
            const { _id, title, pdf } = data;
            return (
              <div key={_id} className="pdfCard">
                <h3> {title} </h3>
                <button
                  className="btn btn-primary"
                  onClick={() => displayPdf(pdf)}
                >
                  Show PDF
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deletePdf(_id)}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
