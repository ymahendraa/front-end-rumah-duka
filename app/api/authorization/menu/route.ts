import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import remapActions from "@/utils/remapActions";

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
    const response = await fetch(
      `http://localhost:3001/menu?_page=${page}&_per_page=${limit}${
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

    if (!body.group) {
      body.group = null;
    }
    if (!body.description) {
      body.description = null;
    }

    if (!body.actions) {
      body.actions = [];
    }

    // remap actions for add several properties
    const formattedActions = remapActions(body.actions);
    body.actions = formattedActions;

    // post data to json server
    const response = await fetch("http://localhost:3001/menu", {
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
