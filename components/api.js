

import axios from 'axios';
const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
export const fetchBook = async (isbn) => {
  const configurationObject = {
    method: 'get',
    url: `${baseUrl}isbn=${isbn}`,
  };
  const response = await axios(configurationObject);
  return response.data;
};