import { createContext, useState } from "react";
import axios from "axios";

export const PdfContext = createContext();

export const PdfContextProvider = ({ children }) => {
  const [allPdf, setAllPdf] = useState(null);
  const [data, setData] = useState({
    title: "",
    file: null,
  });
  const [pdfUrl, setPdfUrl] = useState(null);
  const [examplePdf, setExamplePdf] = useState();

  const BASE_URL = "https://mern-pdf.onrender.com/api/v1";

  const fetchPdf = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/pdf`);

      if (response.status === 200) {
        const data = response.data.pdf;
        if (data) {
          setAllPdf(data);
        }
      }
    } catch (error) {
      console.log(error);
      // Handle errors gracefully, perhaps display an error message to the user
      setAllPdf(null); // Set the state to null or default value in case of error
    }
  };

  const addPdf = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/upload-files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        const data = response.data.pdf;

        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePdf = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/pdf/${id}`);
      if (response.status === 200) {
        const data = response.data.pdf;
        fetchPdf();
        return data;
      }
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };

  const handleTitleChange = (e) => {
    setData({ ...data, title: e.target.value });
  };

  const handleFileChange = (e) => {
    setData({ ...data, file: e.target.files[0] });
  };

  const submitPdf = async (e) => {
    e.preventDefault();
    if (data.title && data.file) {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("file", data.file);

      const result = await addPdf(formData);

      if (result) {
        fetchPdf();
        setData({
          title: "",
          file: "",
        });
      }
    } else {
      console.log("Title and file are required.");
    }
  };

  const value = {
    fetchPdf,
    allPdf,
    addPdf,
    deletePdf,
    data,
    handleTitleChange,
    handleFileChange,
    submitPdf,
    pdfUrl,
    setPdfUrl,
    examplePdf,
    setExamplePdf,
  };

  return (
    <>
      <PdfContext.Provider value={value}>{children}</PdfContext.Provider>
    </>
  );
};
