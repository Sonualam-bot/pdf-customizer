import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1";

export const addPdf = async (formData) => {
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

export const deletePdf = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/pdf/${id}`);
    if (response.status === 200) {
      const data = response.data.pdf;
      window.location.reload();
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};
