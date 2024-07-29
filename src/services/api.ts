import axios from 'axios';

const BACKEND_URL = `${process.env.REACT_APP_BASEURL}/api`;

export const getUser = async (userId: string) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  phone: string;
  provider: string;
}) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/user`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
