import axios from "axios";

const httpClient = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const getItens = async () => httpClient.get("item/");

export const getItensByTitle = async (title) =>
  httpClient.get("item/search", { params: { title: title } });

export const getRecommendation = async (body) =>
  httpClient.post("recommender/recommendation", body);

export const getExplanation = async (body) =>
  httpClient.post("summarizer/summarize", body);

export const getExplanationBaseline = async (body) =>
  httpClient.post("summarizer/baseline", body);

export const getTcleUrl = () =>
  `${process.env.REACT_APP_API_URL}resources/tcle`;
