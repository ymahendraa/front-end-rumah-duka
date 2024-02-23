import { NextResponse, NextRequest } from "next/server";
import { createRedisInstance } from "@/redis";
// import jwt from "jsonwebtoken";

export async function DELETE(
  req: NextRequest,
  params: { params: { id: string } }
) {
  const redis = createRedisInstance();
  await redis
    .del(params.params.id)
    .then(() => {
      console.log("Finished deleting redis data with key:", params.params.id);
    })
    .catch((error) => {
      console.log(error);
    });
  return NextResponse.json({ message: "Deleted" });
}
