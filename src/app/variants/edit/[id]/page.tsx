"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import createVariantService from "@/services/createVariant.service";
import Checkbox from "@/app/components/checkbox/Checkbox";
import CustomSelect from "@/app/components/select/CustomSelect";
import Input from "@/app/components/input/Input";
import TextArea from "@/app/components/textarea/Textarea";
import PhotoUploader from "@/app/components/photoUploader/PhotoUploader";
import {
  PropertyInterface,
  PropertyLocationInterface,
  VariantAttributesInterface,
  CreateVariantInterface,
  UserData,
} from "@/app/interfaces/variant.interface";
import { AgentCred } from "@/app/interfaces/login.interface";
import { Loader } from "@/app/components/loader/Loader";
import { usePathname, useRouter } from "next/navigation";
import variantService from "@/services/variant.service";
import updateVariantService from "@/services/updateVariant.service";

const EditVariant: React.FC = () => {
  const router = useRouter();
  const path = usePathname();
  const id = path.split("/")[2];
  const userString =
    typeof window !== "undefined"
      ? localStorage.getItem("it's fkn secret, boy")
      : null;
  const curator: AgentCred = userString ? JSON.parse(userString) : null;
  const [loading, setLoading] = useState(false);
  const { data: variant } = useQuery({
    queryKey: ["variant"],
    queryFn: () => variantService.fetchVariant(id),
    select: (data) => data.variant,
  });
  if (curator.agent_id !== variant.curator_id) {
    router.push("/");
  }
  const { data: propLocation } = useQuery({
    queryKey: ["property_location_get"],
    queryFn: () =>
      updateVariantService.fetchLocation(variant.property_location_id),
    select: (data) => data.propertyLocation,
  });
  const { data: property } = useQuery({
    queryKey: ["property_get"],
    queryFn: () => updateVariantService.fetchProperty(variant.property_id),
    select: (data) => data.property,
  });
  const { data: attribute } = useQuery({
    queryKey: ["attribute_get"],
    queryFn: () => updateVariantService.fetchAttribute(variant.attributes_id),
    select: (data) => data.attribute,
  });
  const { data: curators } = useQuery({
    queryKey: ["curators_get"],
    queryFn: () => updateVariantService.fetchCurators(),
    select: (data) => data.curators,
  });
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
  const [updatedVariant, setVariant] = useState<CreateVariantInterface>({
    id: variant.id,
    images: variant.images,
    curator_id: variant.curator_id,
    price_per_hand: variant.price_per_hand,
    price: variant.price,
    area_id: variant.area_id,
    series_id: variant.series_id,
    property_id: variant.property_id,
    property_state: variant.property_state,
    attributes_id: variant.attributes_id,
    to_site: variant.to_site,
  });
  const updateVariant = (key: string, value: any) => {
    setVariant((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const [updatedPropLocation, setPropLocation] =
    useState<PropertyLocationInterface>({
      id: propLocation.id,
      property_address: propLocation.property_address,
      district_id: propLocation.district_id,
      sub_district_id: propLocation.sub_district_id,
    });
  const updatePropertyLocation = (key: string, value: any) => {
    setPropLocation((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const [updatedProperty, setProperty] = useState<PropertyInterface>({
    id: property.id,
    property_type: property.property_type,
    property_status: property.property_status,
    property_condition: property.property_condition,
    series: property.series,
    rooms: property.rooms,
    area: property.area,
    number_of_storeys: property.number_of_storeys,
    floor: property.floor,
    document: property.document,
    apartment_complex: property.apartment_complex,
    property_location_id: property.property_location_id,
  });
  const updateProperty = (key: string, value: any) => {
    setProperty((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const [updatedAttribute, setAttribute] = useState<VariantAttributesInterface>(
    {
      id: attribute.id,
      property_owner: attribute.property_owner,
      property_owner_phone_number: attribute.property_owner_phone_number,
      property_note: attribute.property_note,
      property_description: attribute.property_description,
    }
  );
  const updateAttribute = (key: string, value: any) => {
    setAttribute((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const [district, setDistrict] = useState<string>(
    updatedPropLocation.district_id
  );
  useEffect(() => {
    refetch();
  }, [district, refetch]);
  const updatedDistrict = (value: string) => {
    setDistrict(value);
    updatePropertyLocation("district_id", value);
    updatePropertyLocation("sub_district_id", "");
  };
  // const [imagePreviews, setImagePreviews] = useState<string[]>(updatedVariant.images);
  // const onPreviewImagesChange = (previews: string[], files: File[]) => {
  //   setImagePreviews(previews);
  //   updateVariant("images", files);
  // };
  const editPropertyLocation = useMutation({
    mutationFn: async () => {
      await updateVariantService.editPropertyLocation(updatedPropLocation);
    },
    onError: () => {
      setLoading(false);
      alert("Произошла ошибка. Попробуйте изменить адрес");
    },
  });
  const editProperty = useMutation({
    mutationFn: async () => {
      await updateVariantService.editProperty(updatedProperty);
    },
    onError: () => {
      setLoading(false);
      alert("Произошла ошибка. Попробуйте данные квартиры");
    },
  });
  const editAttribute = useMutation({
    mutationFn: async () => {
      await updateVariantService.editAttribute(updatedAttribute);
    },
    onError: () => {
      setLoading(false);
      alert("Произошла ошибка. Попробуйте данные клиента");
    },
  });
  const editVariant = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      Object.keys(updatedVariant).forEach((key) => {
        const value = updatedVariant[key];
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
    onError: () => {
      setLoading(false);
      alert("Произошла ошибка. Попробуйте изменить адрес");
    },
  });
  const editVariantHandler = () => {
    setLoading(true);
    editPropertyLocation.mutate();
    editProperty.mutate();
    editAttribute.mutate();
    editVariant.mutate();
  };
  const apartmentCompaniesClass =
    updatedProperty.property_type === "Квартира" ||
    updatedProperty.property_type === "От строительных компаний"
      ? ""
      : "hidden";
  const areaClass =
    updatedProperty.property_type === "Нежилое помещение" ||
    updatedProperty.property_type === "Участок"
      ? "hidden"
      : "";
  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-center text-2xl mb-2">Редактировать вариант</h1>
      <div className={apartmentCompaniesClass}>
        <CustomSelect
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
          value={updatedProperty.property_condition}
        />
      </div>
      <div>
        <CustomSelect
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
          value={updatedProperty.document}
        />
      </div>
      {series ? (
        <div className={apartmentCompaniesClass}>
          <CustomSelect
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
            value={updatedProperty.series}
          />
        </div>
      ) : undefined}
      {apartmentComplexes && updatedProperty.series === "1" ? (
        <div className={apartmentCompaniesClass}>
          <CustomSelect
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
            value={updatedProperty.apartment_complex}
          />
        </div>
      ) : undefined}
      {districts ? (
        <div>
          <CustomSelect
            id="districts"
            label="Выберите район"
            options={districts.map((d) => ({
              value: d.id.toString(),
              label: d.district_name,
            }))}
            onchange={(event) => updatedDistrict(event.target.value)}
            value={district}
          />
        </div>
      ) : undefined}
      {subDistricts ? (
        <div>
          <CustomSelect
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
            value={updatedPropLocation.sub_district_id}
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
            value={updatedProperty.floor}
          />
        </div>
        <div className={"w-2/4 lg:w-2/12 mr-2 " + apartmentCompaniesClass}>
          <Input
            id="number_of_storeys"
            label="Этажность"
            type="number"
            autocomplete="off"
            onchange={updateProperty}
            value={updatedProperty.number_of_storeys}
          />
        </div>
        <div className={"w-2/4 lg:w-2/12 mr-2 " + areaClass}>
          <Input
            id="rooms"
            label="Кол-во комнат"
            type="number"
            autocomplete="off"
            onchange={updateProperty}
            value={updatedProperty.rooms}
          />
        </div>
        <div className="w-2/4 lg:w-2/12 mr-2">
          <Input
            id="area"
            label="Площадь"
            type="number"
            autocomplete="off"
            onchange={updateProperty}
            value={updatedProperty.area}
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
              value={updatedVariant.price}
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
            value={updatedVariant.price_per_hand}
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
            value={updatedAttribute.property_owner}
          />
        </div>
        <div className="w-full sm:w-6/12 sm:pl-4">
          <Input
            id="property_owner_phone_number"
            label=" Номер собственника"
            type="text"
            autocomplete="off"
            onchange={updateAttribute}
            value={updatedAttribute.property_owner_phone_number}
          />
        </div>
      </div>
      <div>
        <Input
          id="property_address"
          value={updatedPropLocation.property_address}
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
          value={updatedAttribute.property_note}
        />
      </div>
      <div>
        <TextArea
          id="property_description"
          label="Описание"
          height="h-32"
          onchange={updateAttribute}
          value={updatedAttribute.property_description}
        />
      </div>
      {curators ? (
        <div>
          <CustomSelect
            id="subDistricts"
            label="Суб район"
            chooseLabel="Выберите суб-район"
            options={curators.map((c) => ({
              value: c.user_id.toString(),
              label: c.full_name,
            }))}
            onchange={(e) =>
              updatePropertyLocation("curator_id", e.target.value)
            }
            value={updatedVariant.curator_id}
          />
        </div>
      ) : undefined}
      {/* <div className="mt-4">
        <PhotoUploader
          previewImages={imagePreviews}
          onPreviewImagesChange={onPreviewImagesChange}
        />
      </div> */}
      <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-5 py-2.5 me-2 my-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={editVariantHandler}
      >
        Изменить
      </button>
    </div>
  );
};

export default EditVariant;
