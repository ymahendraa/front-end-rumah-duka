type GroupMenu = {
  id: number | string;
  name: string;
  group: {
    id: string | number;
    name: string;
    code: string;
  };
  code: string;
  description: string;
  position: number;
  icon: string;
};

type Permission = {
  id: number | string;
  name: string;
  description: string;
};

type Role = {
  id: number | string;
  name: string;
  description: string;
  permissions: Permission[];
};

export type { GroupMenu, Permission, Role };
