import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  // get token from headers
  const token = req.headers.get("authorization")?.split(" ")[1] || "";
  // get limit, page and search from query params
  const url = new URL(req.url);
  const limit = url.searchParams.get("limit") ?? "10";
  const page = url.searchParams.get("page") ?? "1";
  const search = url.searchParams.get("q");

  // if token does not exist, return an error
  if (!token) {
    return NextResponse.json({ error: "Token doesn't exist" }, { status: 401 });
  }
  // if token exists, verify it
  else {
    // fetch data from json server
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_REAL_URL
      }/almarhum?page=${page}&per_page=${limit}${search ? `&q=${search}` : ""}`,
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

  // if token does not exist, return an error
  if (!token) {
    return NextResponse.json({ error: "Token doesn't exist" }, { status: 401 });
  }
  // if token exists, verify it
  else {
    // fetch data from json server
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REAL_URL}/almarhum`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
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
