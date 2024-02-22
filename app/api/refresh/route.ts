import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type Payload = {
  username: string;
  iat: number;
  exp: number;
};

const SECRET_KEY = process.env.VERY_SECRET_KEY ?? "yourSecretKey";
const REFRESH_SECRET_KEY =
  process.env.REFRESH_VERY_SECRET_KEY ?? "yourRefreshSecretKey";

export async function GET(req: NextRequest) {
  // get refresh token from headers
  const refreshToken = req.headers.get("authorization")?.split(" ")[1] || "";

  try {
    // Verify the refresh token
    const payload: Payload = jwt.verify(
      refreshToken,
      REFRESH_SECRET_KEY
    ) as Payload;

    // If the refresh token is valid, issue a new access token
    const newToken = jwt.sign({ username: payload.username }, SECRET_KEY, {
      expiresIn: "20m",
    });

    // and a new refresh token
    const newRefreshToken = jwt.sign(
      { username: payload.username },
      REFRESH_SECRET_KEY,
      {
        expiresIn: "30m",
      }
    );

    return NextResponse.json({
      accessToken: newToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    // If the refresh token is not valid or has expired, return an error
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 }
    );
  }
}
