export interface IPharmacy {
  icon: string;
  name: string;
  address: string;
  location: { lat: number; lng: number };
  opem_now: boolean;
  place_id: string;
}
