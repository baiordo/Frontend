import Image from "next/image";
import Link from "next/link";

interface TableProps {
  id: number;
  area: string;
  series?: string;
  price: string;
  img?: string;
  address: string;
  condition?: string;
  rooms?: number;
  type: string;
}

const VariantTable: React.FC<TableProps> = ({
  id,
  area,
  series,
  price,
  img,
  address,
  condition,
  rooms,
  type,
}) => {
  const sign = type === "Участок" ? "соток" : "м²";
  const imageAddress = img ? img : "/defaultLogo.png";
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-28 px-6 py-6">{id}</td>
      <td className="w-36 sm:w-28">
        <Image
          src={imageAddress}
          width={100}
          height={100}
          alt="Picture of the variant"
        />
      </td>
      <td className="px-6 py-6 underline">
        <Link href={"/variants/" + id}>
        {type}, {address}, {condition}, {rooms ? rooms + "ком." : undefined}
        </Link>
      </td>
      <td className="px-6 py-6">{series}</td>
      <td className="px-6 py-6">
        {area}
        {sign}
      </td>
      <td className="px-6 py-6">${price}</td>
    </tr>
  );
};

export default VariantTable;
