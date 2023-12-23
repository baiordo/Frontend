"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import variantService from "@/services/variant.service";
import { AgentCred } from "@/app/interfaces/login.interface";
import Image from "next/image";
import { Loader } from "@/app/components/loader/Loader";

const Variant: React.FC = () => {
  const router = useRouter();
  const path = usePathname();
  const id = path.split("/")[2];
  const [loading, setLoading] = useState(false);
  const { data: variant } = useQuery({
    queryKey: ["variant"],
    queryFn: () => variantService.fetchVariant(id),
    select: (data) => data.variant,
  });
  const deleteVariant = useMutation({
    mutationFn: async () => {
      setLoading(true);
      await variantService.deleteVariant(id);
    },
    onSuccess: () => {
      setLoading(false);
      alert("Вариант успешно удален");
      router.push("/variants");
    },
    onError: () => {
      setLoading(false);
      alert("Произошла ошибка");
    },
  });
  if (!variant) {
    return <div>Нет данных</div>;
  }
  const sign = variant.property_type === "Участок" ? "соток" : "м²";
  const userString =
    typeof window !== "undefined"
      ? localStorage.getItem("it's fkn secret, boy")
      : null;
  const curator: AgentCred = userString ? JSON.parse(userString) : null;

  const originalDate = new Date(variant.created_at);
  const year = originalDate.getUTCFullYear();
  const month = String(originalDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(originalDate.getUTCDate()).padStart(2, "0");
  const hour = String(originalDate.getUTCHours()).padStart(2, "0");
  const minute = String(originalDate.getUTCMinutes()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}, ${hour}:${minute}`;
  if (loading) {
    return (
      <span className="absolute inset-0 flex items-center justify-center">
        <Loader />
      </span>
    );
  }
  if (curator === null) {
    return <div>В доступе отказано</div>;
  }
  const isOwner = curator.agent_id === variant.curator_id;
  return (
    <div className="w-11/12 mx-auto text-base">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {variant.images.map((image: string, index: number) => (
          <div key={index}>
            <Image src={image} width={300} height={300} alt="variant photo" />
          </div>
        ))}
      </div>
      <p>
        <span className="font-bold">id:</span> {id}
      </p>
      <p>
        <span className="font-bold">Дата создания:</span> {formattedDate}
      </p>
      <p>
        <span className="font-bold">Тип:</span> {variant.property_type}
      </p>
      <p>
        <span className="font-bold">Документ:</span> {variant.document}
      </p>
      <p>
        <span className="font-bold">Состояние:</span>{" "}
        {variant.property_condition}
      </p>
      <p>
        <span className="font-bold">Серия:</span> {variant.series_name}
      </p>
      <p>
        <span className="font-bold">Жилой комплекс:</span>{" "}
        {variant.apartment_complex_name}
      </p>
      <p>
        <span className="font-bold">Район:</span> {variant.district_name}
      </p>
      <p>
        <span className="font-bold">Суб-район:</span>{" "}
        {variant.sub_district_name}
      </p>
      <p>
        <span className="font-bold">Этажность:</span>
        {variant.number_of_storeys}
      </p>
      <p>
        <span className="font-bold">Этаж:</span>
        {variant.floor}
      </p>
      <p>
        <span className="font-bold">Комнат:</span> {variant.rooms}
      </p>
      <p>
        <span className="font-bold">Площадь:</span> {variant.area} {sign}
      </p>
      <p>
        <span className="font-bold">Цена:</span> {variant.price}
      </p>
      {isOwner ? (
        <>
          <p>
            <span className="font-bold">Цена на руку:</span>{" "}
            {variant.price_per_hand}$
          </p>
          <p>
            <span className="font-bold">Адрес:</span> {variant.property_address}
          </p>
          <p>
            <span className="font-bold">Примечание:</span>{" "}
            {variant.property_note}
          </p>
          <p>
            <span className="font-bold">Номер владельца:</span>{" "}
            {variant.property_owner_phone_number}
          </p>
        </>
      ) : null}
      <p>
        <span className="font-bold">Владелец:</span> {variant.property_owner}
      </p>
      <p>
        <span className="font-bold">Описание:</span>{" "}
        {variant.property_description}
      </p>
      <p>
        <span className="font-bold">Куратор:</span> {variant.curator_name}
      </p>
      <p>
        <span className="font-bold">Номер телефона куратора:</span>{" "}
        {variant.curator_phone_number}
      </p>
      {isOwner ? (
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-5 py-2.5 me-2 my-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={() => deleteVariant.mutate()}
        >
          Удалить
        </button>
      ) : null}
    </div>
  );
};

export default Variant;
