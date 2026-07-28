export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  userTypeId: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  userTypeId?: string;
}
