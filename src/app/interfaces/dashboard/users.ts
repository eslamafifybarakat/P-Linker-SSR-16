//Listing
export interface UsersListApiResponse {
  success: boolean;
  result: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    items: UserListingItem[];
  };
}
export interface UserListingItem {
  id?: number | string;
  name: string;
  email: string;
  password?: string;
  active?: boolean;
  birthDate: string | Date | null;
  phoneNumber: string;
  createdAt?: string;
  updatedAt?: string;
  company_id?: number | null;
  admin_id?: number;
  permissions?: any[];
}
