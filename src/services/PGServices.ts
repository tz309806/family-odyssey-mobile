import axios from 'axios';
import React from 'react';
import {AddressDetails} from '../model/address_details.tsx';
import {getSession} from './authService.ts';
import {supabase} from '../supabaseClient.js';

const BACKEND_URL = `${process.env.BACKEND_URL}/api`;

export const PG_getAddressByPlaceId = async (placeId: string) => {
  try {
    console.log(
      'in getAddressByPlaceId, URL is: ',
      `${BACKEND_URL}/pg/get_address_by_place_id/${placeId}`,
    );

    const resp = await axios.get(
      `${BACKEND_URL}/pg/get_address_by_place_id/${placeId}`,
    );

    // Check if the response contains an empty array
    if (resp.data.length === 0) {
      console.log('No address details found for placeId:', placeId);
      // You can return a specific value or handle it here, e.g., returning null or an empty object
      return resp; // or return resp.data if you want to return the empty array
    }
    console.log('RETURNUING WITH RESULT')
    return resp; // Return the data from the response if it's not empty
  } catch (e) {
    console.error('Error fetching address and reviews:', e);
    throw e; // Re-throw the error if you want to handle it elsewhere
  }
};

export const PG_getReviewsByPlaceId = async (
  placeId: string,
  page: number = 1,
  limit: number = 10,
) => {
  try {
    const resp = await axios.get(
      `${BACKEND_URL}/pg/get_reviews_by_place_id/${placeId}`,
      {
        params: {
          page,
          limit,
        },
      },
    );
    return resp.data; // Return the data from the response
  } catch (e) {
    console.error('Error fetching reviews:', e);
    throw e; // Re-throw the error if you want to handle it elsewhere
  }
};

export const putAddressDetails = async addressDetails => {
  console.log('in putAddressDetails');
  try {
    // Retrieve the current session's JWT token
    const {data: session} = await supabase.auth.getSession();
    console.log('hhhhhhhh', session);
    const token = session?.session?.access_token;

    if (!token) {
      console.error('No JWT token found');
      throw new Error('No JWT token found');
    }

    // Make the request to your backend with the JWT token
    const response = await axios.post(
      `${BACKEND_URL}/pg/save_address_details`,
      addressDetails,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include JWT in the request
        },
      },
    );

    if (response.status === 200) {
      console.log('Address details saved successfully:', response.data);
    } else {
      console.error('Failed to save address details:', response.status);
    }
  } catch (error) {
    console.error('Error saving address details:', error);
  }
};
