import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';
import { toast } from 'react-toastify';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (firstname, lastname, number, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://moviebookingsystem.azurewebsites.net/api/user/signup', {
        firstname, lastname, number, email, password
      });

      localStorage.setItem('user', JSON.stringify(response.data));

      dispatch({ type: 'LOGIN', payload: response.data });
      toast.success('Sign Up Successful!');


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

  return { signup, isLoading, error };
};
