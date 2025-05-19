export interface Location {
  id: string;
  user_id: string;
  address: string;
  latitud: number | null;
  longitud: number | null;
  created_at: string;
}

export interface LocationInsert {
  user_id: string;
  address: string;
  latitud?: number | null;
  longitud?: number | null;
}
