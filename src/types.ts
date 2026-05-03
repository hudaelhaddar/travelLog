// TODO: Define your product type here.
// Replace "Product" with whatever you're building (Game, Recipe, Movie, etc.)
// Add at least 5 meaningful fields (not counting id, created_at, or user_id).
//
// Example:
//
// export interface Product {
//   id: number;
//   created_at: string;
//   user_id: string;
//   name: string;
//   description: string;
//   category: string;
//   price: number;
//   rating: number;
//   image_url: string;
// }


export interface TravelVlog {
  id: number;
  created_at: string;
  user_id: string;
  state_name: string;
  cities_visited: string[];
  duration_days: number;
  activities: string[];
  rating: number | null;
  notes: string | null;
  date_started: string;
  date_ended: string;
}