import axios  from "axios";

// Create an Axios instance with a default configuration
const data = localStorage.getItem('data')
const dataa = JSON.parse(data)

const http = axios.create({
  baseURL: 'https://0001.uz',
  headers: {
    'Content-Type': 'application/json',
    "Key":dataa.key,
    'Sign':'POST'+'/books'+''+dataa.secret
  },
});


export { http };