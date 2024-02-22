import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  // get token from headers
  const token = req.headers.get("authorization")?.split(" ")[1] || "";

  // if token does not exist, return an error
  if (!token) {
    return NextResponse.json({ error: "Token doesn't exist" }, { status: 401 });
  }
  // if token exists, verify it
  else {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;
    const role = decodedToken?.role;

    // fetch data from json server
    const response = await fetch(
      `http://localhost:3001/user-permissions?group.name=${role}`
    );
    const data = await response.json();
    return NextResponse.json(data[0]);
  }
}
