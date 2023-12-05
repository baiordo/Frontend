export interface SeriesInterface {
  series: { id: number; series_name: string }[];
}
export interface ApartmentComplexInterface {
  apartmentComplexes: {
    id: number;
    apartment_complex_name: string;
  }[];
}
export interface DistrictsInterface {
  districts: {
    id: string;
    district_name: string;
  }[];
}
export interface SubDistrictsInterface {
  subDistricts: {
    id: number;
    sub_district_name: string;
    district_id: number;
  }[];
}
export interface PropertyLocationInterface {
  property_address: string;
  district_id: string;
  sub_district_id: string;
}

export interface PropertyInterface {
  property_type: string;
  property_status: string;
  property_condition: string | undefined;
  series: string | undefined;
  rooms: string | undefined;
  area: string;
  number_of_storeys: string | undefined;
  floor: string | undefined;
  document: string;
  apartment_complex: string | undefined;
  property_location_id: string;
}

export interface VariantAttributesInterface {
  property_owner: string;
  property_owner_phone_number: string;
  property_note: string;
  property_description: string;
}

export interface CreateVariantInterface {
  images: File[] | undefined;
  curator_id: string;
  price_per_hand: string;
  price: string;
  area_id: string;
  series_id: string | undefined;
  property_id: string;
  property_state: string;
  attributes_id: string;
  to_site: boolean;
  [key: string]: string | File[] | undefined | boolean;
}

export interface VariantsInterface {
  variants: {
    id: number;
    images: string[] | undefined;
    curator_id: string;
    price_per_hand: string;
    price: string;
    area_id: number;
    area: string;
    series_id: number | undefined;
    property_id: number;
    property_state: string;
    property_type: string;
    attributes_id: number;
    to_site: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    apartment_complex_name: string | undefined;
    series_name: string | undefined;
    rooms: number;
    property_condition: string | undefined;
    property_address: string;
    district_name: string;
    sub_district_name: string;
    curator_name: string;
    curator_phone_number: string;
  }[];
}