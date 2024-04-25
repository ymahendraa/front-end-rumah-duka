import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

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
    const response = await fetch(`${process.env.NEXT_PUBLIC_REAL_URL}/roles`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await response.json();
    return NextResponse.json(data);
  }
}
