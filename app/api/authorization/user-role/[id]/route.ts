import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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
    const SECRET_KEY = process.env.VERY_SECRET_KEY ?? "yourSecretKey";
    try {
      jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    // fetch data from json server
    const response = await fetch(`http://localhost:3001/user-role/${id}`);
    const data = await response.json();
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
  // if token does not exist, return an error
  if (!token) {
    return NextResponse.json({ error: "Token doesn't exist" }, { status: 401 });
  }
  // if token exists, verify it
  else {
    const SECRET_KEY = process.env.VERY_SECRET_KEY ?? "yourSecretKey";
    try {
      jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // turn body.permissions into Array of object with id and name
    const permissions = body.permissions.map((item: string) => {
      return { id: item, name: item };
    });

    // change body.permissions to permissions
    body.permissions = permissions;

    // update data in json server
    const response = await fetch(`http://localhost:3001/user-role/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data);
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
    const SECRET_KEY = process.env.VERY_SECRET_KEY ?? "yourSecretKey";
    try {
      jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    // delete data in json server
    const response = await fetch(`http://localhost:3001/user-role/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return NextResponse.json(data);
  }
}
