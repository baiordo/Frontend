"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AgentCred } from "@/app/interfaces/login.interface";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "../loader/Loader";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const { isLoggedIn, login, logout, checkAuthAndRedirect, userCredentials } =
    useAuth();
  const [shouldRender, setShouldRender] = useState(false);
useEffect(()=> {
  checkAuthAndRedirect();
})

  useEffect(() => {
    if (isLoggedIn && userCredentials) {
      setShouldRender(true); 
    }
  }, [isLoggedIn, userCredentials]);

  if (!shouldRender) {
    return null; 
  }

  const handleLogout = () => {
    logout();
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-300 dark:bg-dark dark:border-dark'>
      <div className='px-3 py-3 lg:px-5 lg:pl-3 h-14 flex items-center justify-between'>
        <div className='flex items-center justify-start'>
          <Link href={"/"} className='flex ml-2 md:mr-24'>
            <span className='self-center text-2xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
              БАЙ ОРДО
            </span>
          </Link>
        </div>
        <button
          id='theme-toggle'
          type='button'
          className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5'
        >
          <svg
            id='theme-toggle-dark-icon'
            className='hidden w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
          </svg>
          <svg
            id='theme-toggle-light-icon'
            className='hidden w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
              fillRule='evenodd'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
        <div className='flex items-center'>
          <div className='flex items-center ml-3'>
            <div>
              <>
                <div className='flex items-center'>
                  {/* {userSession.role !== "realtor" ? (
                      userSession.role === "admin" ? (
                        <>
                          <Link
                            href={"/admin"}
                            className='block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                          >
                            <div className='flex items-center'>
                              <RiAdminLine className='text-gray-800 mr-2 dark:text-white' />
                              Панель администратора
                            </divå
                          </Link>

                          <Link
                            href={"/applications/onReview"}
                            className='block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                          >
                            Заявки
                          </Link>
                        </>
                      ) : (
                        <Link
                          href={"/applications/onReview"}
                          className='block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          Заявки
                        </Link>
                      )
                    ) : (
                      <>
                        <Link
                          href={"/applications/add_application"}
                          className='block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          <div className='flex items-center'>
                            <MdAddComment className='block text-gray-800 dark:text-white mr-2' />
                            Задать вопрос
                          </div>
                        </Link>{" "}
                        <Link
                          href={"/account/my_questions"}
                          className='block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                          onClick={() => setIsOpen(false)}
                        >
                          Мои вопросы
                        </Link>
                      </>
                    )} */}
                  <p className='text-xl text-gray-900 dark:text-white cursor-default mx-2'>
                    {userCredentials ? (
                      userCredentials.agent_full_name
                    ) : (
                      <Loader />
                    )}
                  </p>
                  <Image
                    className='w-8 h-8 rounded-full cursor-pointer mx-2'
                    src={userCredentials.agent_avatar_url}
                    alt='err'
                    height={30}
                    width={30}
                    onClick={handleToggle}
                  />
                </div>
                {isOpen && (
                  <div className='z-50 fixed right-0 my-5 text-base list-none bg-white text-white divide-y divide-gray-100 rounded shadow dark:bg-gray-800 dark:divide-gray-600'>
                    <ul className='py-1'>
                      <li>
                        <Link
                          href={``}
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                          onClick={() => setIsOpen(false)}
                        >
                          Личный кабинет
                        </Link>
                      </li>
                      <li>
                        {/* <Link
                            href={`/`}
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                            onClick={handleThemeToggle}
                          >
                            Изменить тему
                          </Link> */}
                      </li>
                      <li></li>
                      <li>
                        <p
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
                          onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                          }}
                        >
                          Выйти
                        </p>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;