"use client";
import Input from "@/app/components/input/Input";
import { LoginUser } from "@/services/LoginUser";
import { useState } from "react";
import { Loader } from "../components/loader/Loader";
import { AgentCred } from "../interfaces/login.interface";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateCredentials = (key: any, value: any) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [key]: value,
    }));
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }
    try {
      setLoading(true);
      const response = await LoginUser(credentials);
      const result: AgentCred = {
        agent_id: response.user_id,
        agent_avatar_url: response.avatar_url,
        agent_access: response.access_token,
        agent_role: response.user_role,
        agent_refresh: response.refresh_token,
        agent_full_name: response.full_name,
        agent_phone_number: response.phone_number,
      };
      login(result);
    } catch (error: any) {
      setError(
        error.response.data.message ||
          "Произошла ошибка при входе. Пожалуйста, попробуйте снова."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none'>
      <div className='fixed inset-0 transition-opacity'>
        <div className='absolute inset-0 bg-white'></div>
      </div>
      <div className='relative z-50 bg-white w-full max-w-md p-6 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4 text-center'>Вход</h2>
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <Input
              id='email'
              label='Логин'
              type='text'
              value={credentials.email}
              autocomplete='on'
              onchange={updateCredentials}
            />
          </div>
          <div className='mb-4'>
            <Input
              id='password'
              label='Пароль'
              type='password'
              value={credentials.password}
              autocomplete='on'
              onchange={updateCredentials}
            />
          </div>
          <button
            type='submit'
            disabled={loading}
            className='w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-base px-5 py-2.5 me-2 my-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 relative'
          >
            Войти
            {loading && (
              <span className='absolute inset-0 flex items-center justify-center'>
                <Loader />
              </span>
            )}
          </button>
          {error && (
            <p className='text-red-500 text-sm mt-2 text-center'>{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;