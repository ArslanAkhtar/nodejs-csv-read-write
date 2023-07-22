export type User = {
  id: number;
  name: string;
  email: string;
  Roll: string;
};

export type ResponseData = {
  status?: string;
  data?: User[] | User;
  message?: string;
  statusCode?: number;
};
