import { useContext } from "react";
import "../Css/Form.css";

import { PdfContext } from "../context/PdfContext";

export const Form = () => {
  const { data, handleTitleChange, handleFileChange, submitPdf } =
    useContext(PdfContext);

  return (
    <>
      <form className="formStyle" onSubmit={submitPdf}>
        <h2>PDF Uploader</h2>
        <input
          type="text"
          className="form-control"
          placeholder="Give a custom name"
          value={data.title}
          onChange={handleTitleChange}
          required
        />

        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
          accept="application/pdf"
          required
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};
