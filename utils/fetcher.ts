import { baseUrl } from "@/utils/baseUrl";
import axios from 'axios'
const fetcher = async (url : string) =>  axios.get(baseUrl + url).then((res) => res.data)
export default fetcher;