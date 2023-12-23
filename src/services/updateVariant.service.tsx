import {
  PropertyInterface,
  PropertyLocationInterface,
  UserData,
  VariantAttributesInterface,
} from "@/app/interfaces/variant.interface";
import axios from "axios";

const API = "http://81.200.148.149:13069";

const fetchLocation = async (id: string) => {
  const response = await axios.get(`${API}/realtor/location?id=${id}`);
  const data = {
    propertyLocation: response.data.propertyLocation,
  };
  return data;
};

const fetchProperty = async (id: string) => {
  const response = await axios.get(`${API}/realtor/property?id=${id}`);
  const data = {
    property: response.data.property,
  };
  return data;
};

const fetchAttribute = async (id: string) => {
  const response = await axios.get(`${API}/realtor/attribute?id=${id}`);
  const data = {
    attribute: response.data.attribute,
  };
  return data;
};

const fetchCurators = async () => {
  const response = await axios.get<UserData>(`${API}/realtor/curators`);
  const data = {
    curators: response.data.curators,
  };
  return data;
};

const editPropertyLocation = async (
  propertyLocation: PropertyLocationInterface
) => {
  await axios.put(`${API}/realtor/update/location`, propertyLocation);
};

const editProperty = async (property: PropertyInterface) => {
  await axios.put(`${API}/realtor/update/property`, property);
};

const editAttribute = async (attribute: VariantAttributesInterface) => {
  await axios.put(`${API}/realtor/update/attribute`, attribute);
};

const editVariant = async (variant: any) => {
  await axios.put(`${API}/realtor/update/variant`, variant);
};
const updateVariantService = {
  fetchAttribute,
  fetchLocation,
  fetchProperty,
  fetchCurators,
  editPropertyLocation,
  editProperty,
  editAttribute,
  editVariant,
};

export default updateVariantService;
