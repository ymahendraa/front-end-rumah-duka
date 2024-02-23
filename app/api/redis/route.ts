import { NextResponse, NextRequest } from "next/server";
import { createRedisInstance } from "@/redis";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  // get token from headers
  const token = req.headers.get("authorization")?.split(" ")[1] || "";
  if (!token) {
    return NextResponse.json({ error: "Token doesn't exist" }, { status: 401 });
  }
  // if token exists, verify it
  else {
    const SECRET_KEY = process.env.VERY_SECRET_KEY ?? "yourSecretKey";
    let userId = "";
    try {
      jwt.verify(token, SECRET_KEY);
      const decoded = jwt.decode(token) as any;
      userId = decoded.id;
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const redis = createRedisInstance();
    const redisvalue = (await redis.get(userId)) ?? "No value found";
    return NextResponse.json(JSON.parse(redisvalue));
  }
}
