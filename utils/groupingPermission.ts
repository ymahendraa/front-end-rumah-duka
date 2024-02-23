import { Permission } from "@/types/authorization";
import { TODO } from "@/types/todo";

/**
 * @description grouping permission type by group
 * 
 * @param {Permission[]} permissions - array of permission
 * 
 * @example
 * {
      "name": "master.customer.create",
      "description": "Allows the user to create a new customer"
    },
    {
      "name": "master.customer.update",
      "description": "Allows the user to update an existing customer"
    },
    {
      "name": "master.customer.delete",
      "description": "Allows the user to delete an existing customer"
    },
    {
      "name": "master.customer.read",
      "description": "Allows the user to read an existing customer"
    },
    {
        "name":"master.customer-group.create",
        "description":"Allows the user to create a new customer group"
    }

    return {
        "Master Customer": [
            {
            "name": "master.customer.create",
            "description": "Allows the user to create a new customer"
            },
            {
            "name": "master.customer.update",
            "description": "Allows the user to update an existing customer"
            },
            {
            "name": "master.customer.delete",
            "description": "Allows the user to delete an existing customer"
            },
            {
            "name": "master.customer.read",
            "description": "Allows the user to read an existing customer"
            }
        ],
        "Master Customer Group": [
            {
            "name":"master.customer-group.create",
            "description":"Allows the user to create a new customer group"
            }
        ]
        }
        
 */
export const groupingPermission = (permissions: Permission[]) => {
  const groupedPermission: Record<string, Permission[]> = {};
  const arrayOfGroupedPermission: TODO = [];

  permissions.forEach((permission) => {
    const [group, name, action] = permission.name.split(".");
    const splittedPermission = permission.name.split(".");

    // get value of splittedPermission with index last two
    const lastTwoIndexElement =
      splittedPermission[splittedPermission.length - 2];

    // check if lastTwoIndexElement contain "-"
    // split lastTwoIndexElement if contain "-"
    if (lastTwoIndexElement.includes("-")) {
      const splittedGroupNames = lastTwoIndexElement.split("-");
      const capitalGroupName = splittedGroupNames
        .map((g) => `${g.charAt(0).toUpperCase()}${g.slice(1)}`)
        .join(" ");

      if (groupedPermission[capitalGroupName]) {
        groupedPermission[capitalGroupName].push(permission);
      } else {
        groupedPermission[capitalGroupName] = [permission];
      }
    } else {
      const capitalGroupName = [lastTwoIndexElement]
        .map((g) => `${g.charAt(0).toUpperCase()}${g.slice(1)}`)
        .join(" ");
      if (groupedPermission[capitalGroupName]) {
        groupedPermission[capitalGroupName].push(permission);
      } else {
        groupedPermission[capitalGroupName] = [permission];
      }
    }
  });

  // assign grouped permission to array
  Object.keys(groupedPermission).forEach((key) => {
    arrayOfGroupedPermission.push({
      id: key,
      name: key,
      children: groupedPermission[key],
    });
  });

  return arrayOfGroupedPermission;
};
