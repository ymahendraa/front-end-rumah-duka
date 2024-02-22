import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.VERY_SECRET_KEY ?? "yourSecretKey";
const REFRESH_SECRET_KEY =
  process.env.REFRESH_VERY_SECRET_KEY ?? "yourRefreshSecretKey";

export async function POST(req: NextRequest) {
  // Parse the string as JSON
  const { username, password } = await req.json();

  // get user from db.json
  const user = await fetch(
    `http://localhost:3001/users?username=${username}&password=${password}`
  ).then((res) => res.json());

  // if user does not exist, return an error
  if (user.length === 0) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  } else {
    console.log(user[0].role);
    // if user exists, return a token
    const accessToken = jwt.sign({ username, role: user[0].role }, SECRET_KEY, {
      expiresIn: "20m",
    }); // access token expires in 15 minutes
    const refreshToken = jwt.sign({ username }, REFRESH_SECRET_KEY, {
      expiresIn: "30m",
    }); // refresh token does not expire

    return NextResponse.json({
      accessToken,
      refreshToken,
      role: user[0].role,
    });
  }
}
