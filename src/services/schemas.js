// src/services/schemas.js
import {schema} from 'normalizr';

// Define the place schema
export const placeSchema = new schema.Entity(
  'places',
  {},
  {idAttribute: 'place_id'},
);

// You can add more schemas here for other entities if needed
