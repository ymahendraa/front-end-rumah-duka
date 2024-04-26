import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // get token from headers
  const token = req.headers.get("authorization")?.split(" ")[1] || "";
  // get limit, page and search from query params
  const url = new URL(req.url);
  const search = url.searchParams.get("q");

  // if token does not exist, return an error
  if (!token) {
    return NextResponse.json({ error: "Token doesn't exist" }, { status: 401 });
  }
  // if token exists, verify it
  else {
    // fetch data from json server
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REAL_URL}/role${search ? `&q=${search}` : ""}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.json({ error: "Error" }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  }
}

export async function POST(req: NextRequest) {
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
        `${process.env.NEXT_PUBLIC_REAL_URL}/role`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!responseHeader.ok) {
        if (responseHeader.status === 401) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json(
          { error: "Error" },
          { status: responseHeader.status }
        );
      }

      const dataHeader = await responseHeader.json();

      const responsePermissions = await fetch(
        `${process.env.NEXT_PUBLIC_REAL_URL}/role_permission/${dataHeader.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyPermission),
        }
      );

      if (!responsePermissions.ok) {
        if (responsePermissions.status === 401) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json(
          { error: "Error" },
          { status: responsePermissions.status }
        );
      }
      const dataPermission = await responsePermissions.json();

      return NextResponse.json({
        header: dataHeader,
        permission: dataPermission,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
