import axios from 'axios';

const httpClient = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const getItensByTitle = async (title) => httpClient.get( 'item/search', { params: { title: title } });