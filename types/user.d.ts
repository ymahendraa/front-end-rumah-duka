type User = {
  id: string;
  username: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  password: string;
  status: boolean;
  role: {
    id: string;
    name: string;
  }[];
};

export type { User };
