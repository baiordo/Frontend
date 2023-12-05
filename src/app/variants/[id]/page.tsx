"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import variantService from "@/services/variant.service";
import { AgentCred } from "@/app/interfaces/login.interface";
import Image from "next/image";

const Variant: React.FC = () => {
  const path = usePathname();
  const id = path.split("/")[2];
  const { data: variant } = useQuery({
    queryKey: ["variant"],
    queryFn: () => variantService.fetchVariant(id),
    select: (data) => data.variant,
  });
  if (!variant) {
    return <div>Нет данных</div>;
  }
  const sign = variant.property_type === "Участок" ? "соток" : "м²";
  const userString = typeof window !== 'undefined' ? localStorage.getItem("it's fkn secret, boy") : null;
  const curator: AgentCred = userString ? JSON.parse(userString) : null;
  if (curator === null) {
    return <div>В доступе отказано</div>
  }
  return (
    <div className="w-11/12 mx-auto text-base">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {variant.images.map((image: string, index: number) => (
          <div key={index}>
            <Image src={image} width={300} height={300} alt="variant photo" />
          </div>
        ))}
      </div>
      <p>Тип: {variant.property_type}</p>
      <p>Документ: {variant.document}</p>
      <p>Состояние: {variant.property_condition}</p>
      <p>Серия: {variant.series_name}</p>
      <p>Жилой комплекс: {variant.apartment_complex_name}</p>
      <p>Адрес: {variant.property_address}</p>
      <p>Район: {variant.district_name}</p>
      <p>Суб-район: {variant.sub_district_name}</p>
      <p>Этажность:{variant.number_of_storeys}</p>
      <p>Этаж:{variant.floor}</p>
      <p>Комнат: {variant.rooms}</p>
      <p>
        Площадь: {variant.area} {sign}
      </p>
      <p>Владелец: {variant.property_owner}</p>
      <p>Номер владельца: {variant.property_owner_phone_number}</p>
      <p>Описание: {variant.property_description}</p>
      {curator.agent_id === variant.curator_id ? (
        <>
          <p>Примечание: {variant.property_note}</p>
          <p>Цена на руку: {variant.price_per_hand}$</p>
        </>
      ) : null}
      <p>Цена: {variant.price}</p>
      <p>Куратор: {variant.curator_name}</p>
      <p>Номер телефона куратора: {variant.curator_phone_number}</p>
    </div>
  );
};

export default Variant;
