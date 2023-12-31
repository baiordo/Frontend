"use client";
import React, { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import variantService from "@/services/variant.service";
import Link from "next/link";
import VariantTable from "../components/variantTable/VariantTable";
import { AgentCred } from "../interfaces/login.interface";
import { Loader } from "../components/loader/Loader";
import { Filters } from "../interfaces/variant.interface";
import Input from "../components/input/Input";
import CustomSelect from "../components/select/CustomSelect";
import createVariantService from "@/services/createVariant.service";

const Variants: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const userString =
    typeof window !== "undefined"
      ? localStorage.getItem("it's fkn secret, boy")
      : null;
  const curator: AgentCred = userString ? JSON.parse(userString) : null;
  const initialFilters: Filters = {
    id: "",
    max_price: "",
    min_price: "",
    district_name: "",
    sub_district_name: "",
    apartment_complex_name: "",
    series_name: "",
    rooms: "",
    property_condition: "",
    curator_name: "",
    search: "",
  };
  const { data: districts } = useQuery({
    queryKey: ["districts"],
    queryFn: createVariantService.fetchDistricts,
    select: (data) => data.districts,
  });
  const { data: subDistricts } = useQuery({
    queryKey: ["all_sub_districts"],
    queryFn: () => createVariantService.fetchAllSubDistricts(),
    select: (data) => data.subDistricts,
  });
  const { data: apartmentComplexes } = useQuery({
    queryKey: ["apartment_complexes"],
    queryFn: createVariantService.fetchApartmentComplexes,
    select: (data) => data.apartmentComplexes,
  });
  const { data: series } = useQuery({
    queryKey: ["series"],
    queryFn: createVariantService.fetchSeries,
    select: (data) => data.series,
  });
  const [filters, setFilters] = useState(initialFilters);
  const updateFilters = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const { data: variants, isFetching } = useQuery({
    queryKey: ["variants", page, filters],
    queryFn: () => variantService.fetchVariants(page, filters ?? filters),
    select: (data) => data.variants,
    placeholderData: keepPreviousData,
  });
  return (
    <div className="text-base">
      <div>
        <Link href={"/variants/create"}>
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Создать вариант
          </button>
        </Link>
      </div>

      <div className="block text-center rounded-md" role="group">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          onClick={() => {
            setPage(1);
            updateFilters("curator_name", curator.agent_full_name);
          }}
        >
          Мои варианты
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          onClick={() => {
            setPage(1);
            setFilters(initialFilters);
          }}
        >
          Все варианты
        </button>
      </div>
      <div className="border border-zinc-400 p-2">
        <p className="font-bold">Фильтры</p>
        <div className="flex flex-wrap items-end">
          <div className="w-4/12 p-1">
            <Input
              id="search"
              type="text"
              label="Поиск по тексту"
              autocomplete="off"
              onchange={updateFilters}
              value={filters?.search}
            />
          </div>
          <div className="w-2/12 p-1">
            <Input
              id="id"
              type="text"
              label="id"
              autocomplete="off"
              onchange={updateFilters}
              value={filters?.id}
            />
          </div>
          <div className="w-2/12 p-1">
            <Input
              id="rooms"
              type="text"
              label="Комнат"
              autocomplete="off"
              onchange={updateFilters}
              value={filters?.rooms}
            />
          </div>
          <div className="w-2/12 p-1">
            <Input
              id="min_price"
              type="text"
              label="От"
              autocomplete="off"
              onchange={updateFilters}
              value={filters?.min_price}
            />
          </div>
          <div className="w-2/12 p-1">
            <Input
              id="max_price"
              type="text"
              label="До"
              autocomplete="off"
              onchange={updateFilters}
              value={filters?.max_price}
            />
          </div>
          <div className="w-2/12 p-1">
            {districts ? (
              <CustomSelect
                id="district_name"
                label="Район"
                chooseLabel="Все"
                value={filters.district_name}
                options={districts?.map((d) => ({
                  value: d.district_name,
                  label: d.district_name,
                }))}
                onchange={(event) =>
                  updateFilters("district_name", event.target.value)
                }
              />
            ) : undefined}
          </div>
          <div className="w-2/12 p-1">
            {subDistricts ? (
              <CustomSelect
                id="sub_district_name"
                value={filters.sub_district_name}
                chooseLabel="Все"
                label="Под район"
                options={subDistricts?.map((sd) => ({
                  value: sd.sub_district_name,
                  label: sd.sub_district_name,
                }))}
                onchange={(event) =>
                  updateFilters("sub_district_name", event.target.value)
                }
              />
            ) : undefined}
          </div>
          <div className="w-2/12 p-1">
            {apartmentComplexes ? (
              <CustomSelect
                id="apartment_complex_name"
                value={filters.apartment_complex_name}
                chooseLabel="Все"
                label="Жилой комплекс"
                options={apartmentComplexes?.map((ac) => ({
                  value: ac.apartment_complex_name,
                  label: ac.apartment_complex_name,
                }))}
                onchange={(event) =>
                  updateFilters("apartment_complex_name", event.target.value)
                }
              />
            ) : undefined}
          </div>
          <div className="w-2/12 p-1">
            {series ? (
              <CustomSelect
                id="series_name"
                value={filters.series_name}
                chooseLabel="Все"
                label="Серия"
                options={series.map((s) => ({
                  value: s.series_name,
                  label: s.series_name,
                }))}
                onchange={(event) =>
                  updateFilters("series_name", event.target.value)
                }
              />
            ) : undefined}
          </div>
          <div className="w-2/12 p-1">
            <CustomSelect
              id="property_condition"
              chooseLabel="Все"
              label="Состояние"
              options={[
                { value: "ПСО", label: "Псо" },
                { value: "С отделкой", label: "С отделкой" },
              ]}
              onchange={(event) =>
                updateFilters("property_condition", event.target.value)
              }
            />
          </div>
        </div>
      </div>
      {!isFetching ?? (
        <span className="absolute inset-0 flex items-center justify-center">
          Идет поиск...
        </span>
      )}
      <div className="my-6">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3" />
                <th scope="col" className="px-6 py-3">
                  Вариант
                </th>
                <th scope="col" className="px-6 py-3">
                  Серия
                </th>
                <th scope="col" className="px-6 py-3">
                  Площадь
                </th>
                <th scope="col" className="px-6 py-3">
                  Цена
                </th>
              </tr>
            </thead>
            <tbody>
              {variants?.map((variant, index) => (
                <VariantTable
                  key={index}
                  area={variant.area}
                  condition={variant.property_condition}
                  id={variant.id}
                  type={variant.property_type}
                  district={variant.district_name}
                  subDistrict={variant.sub_district_name}
                  price={variant.price}
                  rooms={variant.rooms}
                  series={variant.series_name}
                  img={variant.images ? variant.images[0] : undefined}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between sm:px-8">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Вперед
        </button>
        <button
          type="button"
          onClick={() => setPage(page + 1)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Назад
        </button>
      </div>
    </div>
  );
};

export default Variants;
