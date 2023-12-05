import {
  ApartmentComplexInterface,
  DistrictsInterface,
  PropertyInterface,
  PropertyLocationInterface,
  SeriesInterface,
  SubDistrictsInterface,
  VariantAttributesInterface,
} from "@/app/interfaces/variant.interface";
import axios from "axios";

const API = "http://83.222.8.129:13069";

const fetchSeries = async () => {
  const response = await axios.get<SeriesInterface>(`${API}/realtor/series`);
  const data = {
    series: response.data.series,
  };
  return data;
};

const fetchDistricts = async () => {
  const response = await axios.get<DistrictsInterface>(
    `${API}/realtor/districts`
  );
  const data = {
    districts: response.data.districts,
  };
  return data;
};

const fetchSubDistricts = async (id: string | undefined) => {
  const response = await axios.get<SubDistrictsInterface>(
    `${API}/realtor/sub_districts?id=${id}`
  );
  const data = {
    subDistricts: response.data.subDistricts,
  };
  return data;
};

const fetchApartmentComplexes = async () => {
  const response = await axios.get<ApartmentComplexInterface>(
    `${API}/realtor/apartment_complexes`
  );
  const data = {
    apartmentComplexes: response.data.apartmentComplexes,
  };
  return data;
};

const postPropertyLocation = async (
  propertyLocation: PropertyLocationInterface
) => {
  const response = await axios.post(
    `${API}/realtor/property_locations`,
    propertyLocation
  );
  return response.data.id as string;
};

const postProperty = async (property: PropertyInterface) => {
  const response = await axios.post(`${API}/realtor/properties`, property);
  return response.data.id as string;
};

const postAttribute = async (attribute: VariantAttributesInterface) => {
  const response = await axios.post(
    `${API}/realtor/variants/attributes`,
    attribute
  );
  return response.data.id as string;
};
const postVariant = async(variant: any) => {
  const response = await axios.post(
    `${API}/realtor/variants`,
    variant
  )
  return response.data.id as string
}

const createVariantService = {
  fetchSeries,
  fetchDistricts,
  fetchSubDistricts,
  fetchApartmentComplexes,
  postPropertyLocation,
  postProperty,
  postAttribute,
  postVariant
};

export default createVariantService;