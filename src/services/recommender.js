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

export const postUser = async (body) => httpClient.post("item/user", body);

export const postEvaluation = async (body) =>
  httpClient.post("summarizer/evaluation", body);

export const postCompare = async (body) =>
  httpClient.post("summarizer/compare", body);

export const getTcleUrl = () =>
  `${process.env.REACT_APP_API_URL}resources/tcle`;
