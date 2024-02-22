import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  // get token from headers
  const token = req.headers.get("authorization")?.split(" ")[1] || "";
  // get limit, page and search from query params
  const url = new URL(req.url);
  const limit = url.searchParams.get("limit") ?? "10";
  const page = url.searchParams.get("page") ?? "1";
  const search = url.searchParams.get("q");
  const joinDateFrom = url.searchParams.get("join-date-from");
  const joinDateTo = url.searchParams.get("join-date-to");

  // combine search and joinDateFrom and joinDateTo
  const searchParams = new URLSearchParams();
  if (search) searchParams.append("q", search);
  if (joinDateFrom) searchParams.append("join-date-from", joinDateFrom);
  if (joinDateTo) searchParams.append("join-date-to", joinDateTo);

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
    const response = await fetch(
      `http://localhost:3001/customers?_page=${page}&_per_page=${limit}${
        searchParams.toString() ? "&" + searchParams.toString() : ""
      }`
    );
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
    const SECRET_KEY = process.env.VERY_SECRET_KEY ?? "yourSecretKey";
    try {
      jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    // fetch data from json server
    const response = await fetch(`http://localhost:3001/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data);
  }
}
