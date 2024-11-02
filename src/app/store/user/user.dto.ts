export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface UserDetailResponse {
  data: User;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface UserState {
  users: User[];
  selectedUser: User | null;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface UsersResponse {
  data: User[];
  total: number;
  per_page: number;
  total_pages: number;
}
