// address_details.tsx

export class AddressDetails {
  place_id: string; // features[0]/properties/place_id
  name?: string; // from place details API
  house_number: string; // features[0]/properties/housenumber
  street: string; // features[0]/properties/street
  city: string; // features[0]/properties/city
  state: string; // features[0]/properties/state_code
  postcode: string; // features[0]/properties/postcode
  country_code: string; // features[0]/properties/country_code
  lat: number; // features[0]/properties/lat
  lon: number; // features[0]/properties/lon
  categories: string | null = null; // from place details API
  phone: string | null = null; // from place details API
  smoking: boolean | null = null; // from place details API
  takeaway: boolean | null = null; // from place details API
  delivery: boolean | null = null; // from place details API
  website: string | null = null; // from place details API
  overall_family_friendliness_rating: number | null = null; // calculate from reviews or user-generated
  hours_of_operation: any = null; // from place details API (JSON or structured data)
  created_at: Date; // current timestamp
  updated_at: Date; // when updated timestamp

  constructor(data: any, placeDetails: any = {}) {
    this.place_id = data.place_id;
    this.name = placeDetails.name || data.name || null;
    this.house_number = data.housenumber;
    this.street = data.street;
    this.city = data.city;
    this.state = data.state;
    this.postcode = data.postcode;
    this.country_code = data.country_code;
    this.lat = data.lat;
    this.lon = data.lon;
    this.categories = placeDetails.categories || null;
    this.phone = placeDetails.phone || null;
    this.smoking = placeDetails.smoking || null;
    this.takeaway = placeDetails.takeaway || null;
    this.delivery = placeDetails.delivery || null;
    this.website = placeDetails.website || null;
    this.hours_of_operation = placeDetails.hours_of_operation || null;
    this.overall_family_friendliness_rating = null; // Can be set later from user reviews
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  updateTimestamps() {
    this.updated_at = new Date();
  }
}
