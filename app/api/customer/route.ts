import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { imageKit } from "@/lib/imagekit";
import { mkdir } from "fs/promises";

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
      }/customer?page=${page}&per_page=${limit}${search ? `&q=${search}` : ""}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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

    // PREPARE IMAGEKIT UPLOAD
    //Get current date to create a folder with the name of the current month
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Ensure two-digit month
    const day = currentDate.getDate().toString().padStart(2, "0"); // Ensure two-digit day

    // create folder name based on current year and month
    const folderPath = `${year}-${month}`;
    await mkdir(folderPath, { recursive: true });

    // create file name for file
    const fileName = `${year}-${month}-${day}_BUKTI_KEMATIAN`;

    // get file from body
    const file = body.almarhum.file;

    // upload file to imagekit
    let fileId = "";
    try {
      const upload = await imageKit.upload({
        file: file,
        fileName: fileName,
        folder: folderPath,
      });
      fileId = upload.fileId;
      // assign file in body to fileId
      body.almarhum.file = fileId;
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 400 }
      );
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
