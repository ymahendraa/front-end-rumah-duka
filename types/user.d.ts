type User = {
  id: string;
  username: string;
  email: string;
  phone?: string;
  nama_admin: string;
  password: string;
  status?: boolean;
  role: {
    id: string;
    name: string;
  }[];
};

export type { User };
