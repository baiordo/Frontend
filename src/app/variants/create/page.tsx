"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import createVariantService from "@/services/createVariant.service";
import Checkbox from "@/app/components/checkbox/Checkbox";
import Select from "@/app/components/select/Select";
import Input from "@/app/components/input/Input";
import TextArea from "@/app/components/textarea/Textarea";
import PhotoUploader from "@/app/components/photoUploader/PhotoUploader";
import {
  PropertyInterface,
  PropertyLocationInterface,
  VariantAttributesInterface,
  CreateVariantInterface,
} from "@/app/interfaces/variant.interface";
import { AgentCred } from "@/app/interfaces/login.interface";
import { Loader } from "@/app/components/loader/Loader";
import { useRouter } from "next/navigation";

const CreateVariant: React.FC = () => {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const { data: series } = useQuery({
    queryKey: ["series"],
    queryFn: createVariantService.fetchSeries,
    select: (data) => data.series,
  });
  const { data: districts } = useQuery({
    queryKey: ["districts"],
    queryFn: createVariantService.fetchDistricts,
    select: (data) => data.districts,
  });
  const { data: subDistricts, refetch } = useQuery({
    queryKey: ["sub_districts"],
    queryFn: () => createVariantService.fetchSubDistricts(district),
    select: (data) => data.subDistricts,
  });
  const { data: apartmentComplexes } = useQuery({
    queryKey: ["apartment_complexes"],
    queryFn: createVariantService.fetchApartmentComplexes,
    select: (data) => data.apartmentComplexes,
  });
  const [district, setDistrict] = useState<string>("1");
  useEffect(() => {
    refetch();
  }, [district, refetch]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const onPreviewImagesChange = (previews: string[], files: File[]) => {
    setImagePreviews(previews);
    updateVariant("images", files);
  };
  const [propertyLocation, setPropertyLocation] =
    useState<PropertyLocationInterface>({
      property_address: "",
      district_id: district,
      sub_district_id: "",
    });
  const updatePropertyLocation = (key: string, value: string) => {
    setPropertyLocation((prevPropertyLocation) => ({
      ...prevPropertyLocation,
      [key]: value,
    }));
  };
  const userString = typeof window !== 'undefined' ? localStorage.getItem("it's fkn secret, boy") : null;
  const curator: AgentCred = userString ? JSON.parse(userString) : null;
  const [property, setProperty] = useState<PropertyInterface>({
    property_type: "",
    property_status: "default",
    property_condition: "",
    series: undefined,
    rooms: undefined,
    area: "",
    number_of_storeys: undefined,
    floor: undefined,
    document: "",
    apartment_complex: undefined,
    property_location_id: "",
  });
  const [attribute, setAttribute] = useState<VariantAttributesInterface>({
    property_owner: "",
    property_owner_phone_number: "",
    property_note: "",
    property_description: "",
  });
  const [variant, setVariant] = useState<CreateVariantInterface>({
    images: undefined,
    curator_id: curator? curator.agent_id : "",
    price_per_hand: "",
    price: "",
    area_id: "",
    series_id: undefined,
    property_id: "",
    property_state: "Продается",
    attributes_id: "",
    to_site: false,
  });
  const updateVariant = (key: string, value: any) => {
    setVariant((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const updateProperty = (key: string, value: string) => {
    setProperty((prevProperty) => ({
      ...prevProperty,
      [key]: value,
    }));
  };
  const updateAttribute = (key: string, value: string) => {
    setAttribute((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const updatedDistrict = (value: string) => {
    setDistrict(value);
    updatePropertyLocation("district_id", value);
    updatePropertyLocation("sub_district_id", "");
  };
  const addPropertyType = (value: string) => {
    setPropertyType(value);
    updateProperty("property_type", value);
  };
  const addPropertyLocation = useMutation({
    mutationFn: async () => {
      const locationId = await createVariantService.postPropertyLocation(
        propertyLocation
      );
      updateProperty("property_location_id", locationId);
      updateVariant("area_id", locationId);
    },
  });
  const addProperty = useMutation({
    mutationFn: async () => {
      const response = await createVariantService.postProperty(property);
      updateVariant("property_id", response);
      updateVariant("area_id", response);
    },
  });
  const addAttribute = useMutation({
    mutationFn: async () => {
      const response = await createVariantService.postAttribute(attribute);
      updateVariant("attributes_id", response);
    },
  });
  const addVariant = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      Object.keys(variant).forEach((key) => {
        const value = variant[key];
        if (value !== undefined) {
          if (key === "images" && Array.isArray(value)) {
            value.forEach((image) => {
              formData.append(key, image);
            });
          }
          formData.append(key, value as any);
        }
      });
      await createVariantService.postVariant(formData);
    },
    onSuccess: () => {
      router.push("/");
      setLoading(false);
    },
  });
  const createVariant = () => {
    setLoading(true);
    addPropertyLocation.mutate();
    addAttribute.mutate();
  };
  useEffect(() => {
    if (property.property_location_id !== "") {
      addProperty.mutate();
    }
  }, [property.property_location_id]);
  useEffect(() => {
    updateVariant("series_id", property.series);
  }, [property.series]);
  useEffect(() => {
    if (variant.property_id !== "" && variant.attributes_id !== "") {
      addVariant.mutate();
    }
  }, [variant]);
  const apartmentCompaniesClass =
    propertyType === "Квартира" || propertyType === "От строительных компаний"
      ? ""
      : "hidden";
  const areaClass =
    propertyType === "Нежилое помещение" || propertyType === "Участок"
      ? "hidden"
      : "";
  if (loading) {
    return (
      <span className="absolute inset-0 flex items-center justify-center">
        <Loader />
      </span>
    );
  }
  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-center text-2xl mb-2">Добавление варианта</h1>
      <div className="flex">
        <Checkbox id="website-checkbox" label="На сайт" />
        <Checkbox id="urgently-checkbox" label="Срочно" />
      </div>
      <div>
        <Select
          id="property_type"
          label="Выберите тип"
          chooseLabel="Выберите тип"
          options={[
            { label: "Квартира", value: "Квартира" },
            { label: "Дом/Особняк", value: "Дом/Особняк" },
            { label: "Нежилое помещение", value: "Нежилое помещение" },
            {
              label: "От строительных компаний",
              value: "От строительных компаний",
            },
            { label: "Участок", value: "Участок" },
          ]}
          onchange={(event) => addPropertyType(event.target.value)}
        />
      </div>
      <div className={apartmentCompaniesClass}>
        <Select
          id="property_condition"
          label="Состояние"
          chooseLabel="Выберите состояние"
          options={[
            { label: "ПСО", value: "ПСО" },
            { label: "С отделкой", value: "С отделкой" },
          ]}
          onchange={(e) => {
            updateProperty("property_condition", e.target.value);
          }}
        />
      </div>
      <div>
        <Select
          id="property_document"
          label="Выберите документ"
          chooseLabel="Выберите документ"
          options={[
            { label: "ДДУ", value: "ДДУ" },
            { label: "Тех. паспорт", value: "Тех. паспорт" },
            { label: "Красная книга", value: "Красная книга" },
          ]}
          onchange={(e) => {
            updateProperty("document", e.target.value);
          }}
        />
      </div>
      {series ? (
        <div className={apartmentCompaniesClass}>
          <Select
            id="series"
            label="Серия"
            chooseLabel="Выберите серию"
            options={series.map((s) => ({
              value: s.id.toString(),
              label: s.series_name,
            }))}
            onchange={(e) => {
              updateProperty("series", e.target.value);
            }}
          />
        </div>
      ) : undefined}
      {apartmentComplexes && property.series === "5" ? (
        <div className={apartmentCompaniesClass}>
          <Select
            id="apartmentComplexes"
            label="Жилой комплекс"
            chooseLabel="Выберите жилой комплекс"
            options={apartmentComplexes.map((ac) => ({
              value: ac.id.toString(),
              label: ac.apartment_complex_name,
            }))}
            onchange={(e) => {
              updateProperty("apartment_complex", e.target.value);
            }}
          />
        </div>
      ) : undefined}
      {districts ? (
        <div>
          <Select
            id="districts"
            label="Выберите район"
            options={districts.map((d) => ({
              value: d.id.toString(),
              label: d.district_name,
            }))}
            onchange={(event) => updatedDistrict(event.target.value)}
          />
        </div>
      ) : undefined}
      {subDistricts ? (
        <div>
          <Select
            id="subDistricts"
            label="Суб район"
            chooseLabel="Выберите суб-район"
            options={subDistricts.map((sd) => ({
              value: sd.id.toString(),
              label: sd.sub_district_name,
            }))}
            onchange={(e) =>
              updatePropertyLocation("sub_district_id", e.target.value)
            }
            value={propertyLocation.sub_district_id}
          />
        </div>
      ) : undefined}
      <div className="flex flex-wrap justify-items-center">
        <div className={"w-2/4 lg:w-2/12 mr-2 " + apartmentCompaniesClass}>
          <Input
            id="floor"
            label="Этаж"
            type="number"
            autocomplete="off"
            onchange={updateProperty}
          />
        </div>
        <div className={"w-2/4 lg:w-2/12 mr-2 " + apartmentCompaniesClass}>
          <Input
            id="number_of_storeys"
            label="Этажность"
            type="number"
            autocomplete="off"
            onchange={updateProperty}
          />
        </div>
        <div className={"w-2/4 lg:w-2/12 mr-2 " + areaClass}>
          <Input
            id="rooms"
            label="Кол-во комнат"
            type="number"
            autocomplete="off"
            onchange={updateProperty}
          />
        </div>
        <div className="w-2/4 lg:w-2/12 mr-2">
          <Input
            id="area"
            label="Площадь"
            type="number"
            autocomplete="off"
            onchange={updateProperty}
          />
        </div>
      </div>
      <div className="w-3/4 lg:w-2/4 flex flex-wrap">
        <div className="w-full lg:w-3/5 lg:pr-3">
          <label
            htmlFor="price"
            className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
          >
            Цена
          </label>
          <div className="flex justify-items-end w-full">
            <Input
              id="price"
              type="number"
              autocomplete="off"
              onchange={updateVariant}
            />
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="DDU">$</option>
              <option value="Passport">сом</option>
            </select>
          </div>
        </div>
        <div className="w-full lg:w-2/5">
          <Input
            id="price_per_hand"
            label="Цена на руку"
            type="number"
            autocomplete="off"
            onchange={updateVariant}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-6/12 sm:pr-4">
          <Input
            id="property_owner"
            label="Имя собственника"
            type="text"
            autocomplete="off"
            onchange={updateAttribute}
          />
        </div>
        <div className="w-full sm:w-6/12 sm:pl-4">
          <Input
            id="property_owner_phone_number"
            label=" Номер собственника"
            type="text"
            autocomplete="off"
            onchange={updateAttribute}
          />
        </div>
      </div>
      <div>
        <Input
          id="property_address"
          value={propertyLocation.property_address}
          label="Адрес"
          type="text"
          autocomplete="off"
          onchange={updatePropertyLocation}
        />
      </div>
      <div>
        <TextArea
          id="property_note"
          label="Примечание"
          onchange={updateAttribute}
        />
      </div>
      <div>
        <TextArea
          id="property_description"
          label="Описание"
          height="h-32"
          onchange={updateAttribute}
        />
      </div>
      <div className="mt-4">
        <PhotoUploader
          previewImages={imagePreviews}
          onPreviewImagesChange={onPreviewImagesChange}
        />
      </div>
      <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-5 py-2.5 me-2 my-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={createVariant}
      >
        Сохранить
      </button>
    </div>
  );
};

export default CreateVariant;