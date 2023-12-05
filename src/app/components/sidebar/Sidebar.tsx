"use client";
import Link from "next/link";
import VariantsIcon from "../../../../public/pictures/sidebar/Variants";
import AdverstingIcon from "../../../../public/pictures/sidebar/Advertising";
import ClientsIcon from "../../../../public/pictures/sidebar/Clients";
import { useState } from 'react';

const sections = [
  {
    id: "1",
    title: "Варианты",
    icon: <VariantsIcon />,
    href: "/variants",
  },
  {
    id: "2",
    title: "Клиенты",
    icon: <ClientsIcon />,
    href: "/clients",
  },
  {
    id: "3",
    title: "Реклама",
    icon: <AdverstingIcon />,
    href: "/ad",
  },
];

const Sidebar = () => {
  const [section, setSection] = useState("");
  const handleClick = (id: string) => {
    setSection(id);
  };

  return (
    <>
      <aside
        className='fixed left-0 z-40 w-48 h-screen pt-20 transition-transform -translate-x-full border-r border-gray-300 bg-white sm:translate-x-0 dark:bg-dark dark:border-gray-700'
        id='sidebar-multi-level-sidebar'
      >
        <div className='h-full px-3 pb-4 overflow-y-auto dark:bg-dark'>
          <div className='space-y-2 font-medium'>
            {!sections
              ? "..."
              : sections.map((sectionItem) => (
                  <Link key={sectionItem.id} href={sectionItem.href}>
                    <div
                      className='px-3 py-3 text-lg flex items-center text-black rounded-lg dark:text-white hover:bg-gray-200 dark:bg-dark dark:hover:bg-darkHover cursor-pointer'
                      onClick={() => handleClick(sectionItem.id)}
                    >
                      <div>{sectionItem.icon}</div>
                      <span className='ml-3 flex'>{sectionItem.title}</span>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
