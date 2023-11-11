import axios  from "axios";
import CryptoJS from 'crypto-js'

// const data = localStorage.getItem('data')
// const dataa = JSON.parse(data)
// const res = 'GET' + `/books` + dataa?.secret
// const token = CryptoJS.MD5(res).toString()

// console.log('data',data);




const http = axios.create({
  baseURL: 'https://0001.uz',
  headers: {
    'Content-Type': 'application/json',
    // "Key":dataa?.key,
    // 'Sign':token
  },
});


export { http };