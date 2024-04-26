import { NextResponse, NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  // get token from headers
  const token = req.headers.get("authorization")?.split(" ")[1] || "";

  // if token does not exist, return an error
  if (!token) {
    return NextResponse.json({ error: "Token doesn't exist" }, { status: 401 });
  }
  // if token exists, verify it
  else {
    // fetch data from json server
    const response = await fetch(`${process.env.NEXT_PUBLIC_REAL_URL}/login`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.json({ error: "Error" }, { status: response.status });
    }

    const resdata = await response.json();
    const data = resdata.data;

    // get menu from data
    const menu = data?.menu;

    let groupedMenu = [];

    if (menu) {
      groupedMenu = menu?.reduce((groups: any, item: any) => {
        const splitted = item.path.split("/");
        const key = splitted[1]; // Get the parent path

        // If the group doesn't exist yet, create it
        if (!groups[key] && splitted.length > 2) {
          groups[key] = {
            name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the key
            icon: item.icon,
            children: [],
          };
        }
        if (splitted.length > 2 && "children" in groups[key]) {
          // Add the item to the group
          groups[key].children.push({
            name: item.name,
            path: item.path,
          });
        } else {
          groups[key] = {
            name: item.name,
            icon: item.icon,
            path: item.path,
          };
        }

        return groups;
      }, {});
      const arrayOfGroupedMenu = Object.values(groupedMenu);
      data.menu = arrayOfGroupedMenu;
    }

    // assign menu to data
    return NextResponse.json(data);
  }
}
