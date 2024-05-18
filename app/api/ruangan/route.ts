import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
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
    // fetch data from json server
    const response = await fetch(`${process.env.NEXT_PUBLIC_REAL_URL}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
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
