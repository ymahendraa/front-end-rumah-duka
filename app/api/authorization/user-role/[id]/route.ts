import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

export async function GET(
  req: NextRequest,
  params: { params: { id: string } }
) {
  const { id } = params.params;
  // get token from headers
  const token = req.headers.get("authorization")?.split(" ")[1] || "";

  // if token does not exist, return an error
  if (!token) {
    return NextResponse.json({ error: "Token doesn't exist" }, { status: 401 });
  }
  // if token exists, verify it
  else {
    // fetch data from json server
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REAL_URL}/role/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = await response.json();

    // map data.group.permission value
    const permissions = data?.group?.permissions?.map(
      (item: Record<string, string>) => {
        return item.permission_id.toString();
      }
    );

    data.group.permissions = permissions;
    // console.log("data role", data);

    // return NextResponse.json(data);
    return NextResponse.json(data);
  }
}

export async function PATCH(
  req: NextRequest,
  params: { params: { id: string } }
) {
  const { id } = params.params;
  // get token from headers
  const token = req.headers.get("authorization")?.split(" ")[1] || "";
  // get body from request
  const body = await req.json();

  // define new body for role_permission
  const arrayPermission = body.permissions.map((item: string) => {
    return {
      permission_id: parseInt(item),
    };
  });

  const bodyPermission = {
    role_permission: arrayPermission,
  };

  // if token does not exist, return an error
  if (!token) {
    return NextResponse.json({ error: "Token doesn't exist" }, { status: 401 });
  }
  // if token exists, verify it
  else {
    try {
      // fetch data from json server
      const responseHeader = await fetch(
        `${process.env.NEXT_PUBLIC_REAL_URL}/role/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const responsePermissions = await fetch(
        `${process.env.NEXT_PUBLIC_REAL_URL}/role_permission/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyPermission),
        }
      );

      const dataPermission = await responsePermissions.json();
      const dataHeader = await responseHeader.json();
      return NextResponse.json({
        header: dataHeader,
        permission: dataPermission,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(
  req: NextRequest,
  params: { params: { id: string } }
) {
  const { id } = params.params;
  // get token from headers
  const token = req.headers.get("authorization")?.split(" ")[1] || "";

  // if token does not exist, return an error
  if (!token) {
    return NextResponse.json({ error: "Token doesn't exist" }, { status: 401 });
  }
  // if token exists, verify it
  else {
    // fetch data from json server
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REAL_URL}/role/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.text();
    return NextResponse.json(data);
  }
}
