import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// const SECRET_KEY = process.env.VERY_SECRET_KEY ?? "yourSecretKey";
// const REFRESH_SECRET_KEY =
//   process.env.REFRESH_VERY_SECRET_KEY ?? "yourRefreshSecretKey";
// const REAL_URL = process.env.NEXT_PUBLIC_REAL_URL ?? "";

export async function POST(req: NextRequest) {
  // Parse the string as JSON
  const { username, password } = await req.json();
  const response = await fetch(`${process.env.NEXT_PUBLIC_REAL_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Error" }, { status: response.status });
  }
  const data = await response.json();
  const user = data.id;

  return NextResponse.json({
    accessToken: user.access_token,
    refreshToken: user.refresh_token,
    role: user.data.role_id,
    id: user.data.id,
  });
}
