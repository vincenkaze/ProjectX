import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Change if deployed

export const fetchNews = async () => {
  const res = await axios.get(`${API_BASE_URL}/news`);
  return res.data.news;
};

export const fetchPrediction = async (text: string) => {
  const res = await axios.post(`${API_BASE_URL}/predict`, { text });
  return res.data;
};