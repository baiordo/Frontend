"use client";
import React, { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import variantService from "@/services/variant.service";
import Link from "next/link";
import VariantTable from "../components/variantTable/VariantTable";
import { AgentCred } from "../interfaces/login.interface";
import { Loader } from "../components/loader/Loader";

const Variants: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const userString = typeof window !== 'undefined' ? localStorage.getItem("it's fkn secret, boy") : null;
  const curator: AgentCred = userString ? JSON.parse(userString) : null;
  const [all, setAll] = useState(true);
  const { data: variants, isFetching } = useQuery({
    queryKey: ["variants", page, all],
    queryFn: () =>
      variantService.fetchVariants(
        page,
        all ? undefined : curator.agent_full_name
      ),
    select: (data) => data.variants,
    placeholderData: keepPreviousData,
  });
  if (isFetching) {
    return (
      <span className="absolute inset-0 flex items-center justify-center">
        <Loader />
      </span>
    );
  }
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
            setAll(false);
            setPage(1);
          }}
        >
          Мои варианты
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          onClick={() => {
            setAll(true);
            setPage(1);
          }}
        >
          Все варианты
        </button>
      </div>
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
                  address={variant.property_address}
                  area={variant.area}
                  condition={variant.property_condition}
                  id={variant.id}
                  type={variant.property_type}
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