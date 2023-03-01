export interface IPharmacy {
  icon: string;
  name: string;
  address: string;
  location: { lat: number; lng: number };
  opem_now: boolean;
  place_id: string;
}

export interface IPharmacyDetails {
  weekday_text: string;
  formatted_address: string;
  international_phone_number: string;
  icon_background_color: string;
  place_id: string;
  rating: number;
  wheelchair_accessible_entrance: boolean;
  delivery: boolean;
  reviews: {
    author_name: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
  }[];
}

export interface IReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}
