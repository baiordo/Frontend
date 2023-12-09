import { Filters, VariantsInterface } from "@/app/interfaces/variant.interface";
import axios from "axios";

const API = "http://81.200.148.149:13069";

const fetchVariants = async (page: number, query?: Filters) => {
  let URL = `${API}/variants?page=${page}`;

  if (query) {
    if (query.max_price) {
      URL += `&max_price=${query.max_price}`;
    }
    if (query.min_price) {
      URL += `&min_price=${query.min_price}`;
    }
    if (query.district_name) {
      URL += `&district_name=${query.district_name}`;
    }
    if (query.sub_district_name) {
      URL += `&sub_district_name=${query.sub_district_name}`;
    }
    if (query.apartment_complex_name) {
      URL += `&apartment_complex_name=${query.apartment_complex_name}`;
    }
    if (query.series_name) {
      URL += `&series_name=${query.series_name}`;
    }
    if (query.rooms) {
      URL += `&rooms=${query.rooms}`;
    }
    if (query.property_condition) {
      URL += `&property_condition=${query.property_condition}`;
    }
    if (query.curator_name) {
      URL += `&curator_name=${query.curator_name}`;
    }
    if (query.search) {
      URL += `&search=${query.search}`;
    }
    if (query.id) {
      URL += `&id=${query.id}`;
    }
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

const deleteVariant = async (id: string) => {
  await axios.delete(`${API}/realtor/delete?id=${id}`);
};

const variantService = {
  fetchVariants,
  fetchVariant,
  deleteVariant,
};

export default variantService;
