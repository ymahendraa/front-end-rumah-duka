export type MenuType = {
  name: string;
  path?: string;
  icon?: string;
  children?: MenuType[];
};

export const MENU_ARR: MenuType[] = [
  {
    name: "Home",
    path: "/home",
    icon: "HomeIcon",
  },
  {
    name: "Master",
    // path: "/master",
    icon: "CircleStack",
    children: [
      {
        name: "Customers",
        path: "/master/customers",
      },
    ],
  },
  {
    name: "Transaction",
    // path: "/transaction",
    icon: "ClipboardDocumentIcon",
    children: [
      {
        name: "Transaction 1",
        path: "/transaction/1",
      },
      {
        name: "Transaction 2",
        path: "/transaction/2",
      },
    ],
  },
  {
    name: "Authorization Management",
    icon: "UserGroup",
    children: [
      {
        name: "Menu",
        path: "/authorization-management/menu",
      },
      {
        name: "Permissions",
        path: "/authorization-management/permissions",
      },
      {
        name: "Group Menu",
        path: "/authorization-management/group-menu",
      },
      {
        name: "User Role",
        path: "/authorization-management/user-role",
      },
      {
        name: "Users",
        path: "/authorization-management/users",
      },
    ],
  },
  {
    name: "Documentation",
    path: "/documentation",
    icon: "BookOpenIcon",
  },
  {
    name: "Report",
    icon: "TableCells",
    children: [
      {
        name: "Report 1",
        path: "/report-1",
      },
      {
        name: "Report 2",
        path: "/report-2",
      },
    ],
  },
];
