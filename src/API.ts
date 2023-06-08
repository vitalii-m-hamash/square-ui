import axios from 'axios';
type API_String = string;

export const MAIN_API: API_String =
  'https://60816d9073292b0017cdd833.mockapi.io';

export const client = axios.create({
  baseURL: MAIN_API,
});
