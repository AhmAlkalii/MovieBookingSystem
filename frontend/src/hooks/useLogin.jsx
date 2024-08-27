import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';
import { toast } from 'react-toastify';


export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://moviebookingsystem.azurewebsites.net/api/user/login', {
        email, password
      });

      localStorage.setItem('user', JSON.stringify(response.data));

      dispatch({ type: 'LOGIN', payload: response.data });
      toast.success('Logged in Successfully')

    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
