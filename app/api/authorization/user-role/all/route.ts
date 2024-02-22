import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  // get token from headers
  const token = req.headers.get("authorization")?.split(" ")[1] || "";
  // get limit, page and search from query params
  const url = new URL(req.url);
  const limit = url.searchParams.get("limit");
  const page = url.searchParams.get("page");
  const search = url.searchParams.get("q");

  // combine search and joinDateFrom and joinDateTo
  const searchParams = new URLSearchParams();
  if (search) searchParams.append("q", search);

  if (limit) searchParams.append("_per_page", limit);

  if (page) searchParams.append("_page", page);

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
    const response = await fetch(`http://localhost:3001/user-role`);
    const data = await response.json();
    return NextResponse.json(data);
  }
}
