import axios from "axios";

const httpClient = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const getItens = async (title) => httpClient.get("item/");

export const getItensByTitle = async (title) =>
  httpClient.get("item/search", { params: { title: title } });
