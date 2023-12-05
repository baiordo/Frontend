import { VariantsInterface } from "@/app/interfaces/variant.interface";
import axios from "axios";

const API = "http://83.222.8.129:13069";

const fetchVariants = async (page: number, curator?: string) => {
  let URL = "";
  if (curator) {
    URL = `${API}/variants?page=${page}&curator_name=${curator}`;
  } else {
    URL = `${API}/variants?page=${page}`
  }
  const response = await axios.get<VariantsInterface>(URL);
  const data = {
    variants: response.data.variants,
  };
  return data;
};

const fetchVariant = async (id: string) => {
  const response = await axios.get(`${API}/variants/detail?id=${id}`);
  const data = {
    variant: response.data.variant,
  };
  return data;
};
const variantService = {
  fetchVariants,
  fetchVariant,
};

export default variantService;
