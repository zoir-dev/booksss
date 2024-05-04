import axios from "axios";
import CryptoJS from "crypto-js";

const data = localStorage.getItem("data");
const dataa = JSON.parse(data ?? "");
const res = "GET" + `/books` + dataa?.secret;
const token = CryptoJS.MD5(res).toString();

const http = axios.create({
  baseURL: "https://no23.lavina.tech",
  headers: {
    "Content-Type": "application/json",
    Key: dataa?.key,
    Sign: token,
  },
});

export { http };
