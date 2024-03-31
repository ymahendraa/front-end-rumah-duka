import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getImageDetail, imageKit } from "@/lib/imagekit";
import { mkdir } from "fs/promises";

export async function GET(
  req: NextRequest,
  params: { params: { id: string } }
) {
  const { id } = params.params;
  // get token from headers
  const token = req.headers.get("authorization")?.split(" ")[1] || "";

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
    const response = await fetch(`http://localhost:3001/customers/${id}`);
    const data = await response.json();

    // get data.almarhum.document detail
    const documentDetail: any = await getImageDetail(data?.almarhum?.document);

    // check if screenshot exists
    // if exists, get screenshot file detail
    if (data.reservasi.screenshot) {
      const screenshotDetail: any = await getImageDetail(
        data?.reservasi?.screenshot
      );
      // add screenshotDetail to data.reservasi
      data.reservasi.screenshotDetail = screenshotDetail;
      // assign screenshot with buktiTFDetail.thumbnail
      data.reservasi.screenshot = screenshotDetail.thumbnail;
    }

    // add documentDetail to data.almarhum
    data.almarhum.documentDetail = documentDetail;
    // assign document with documentDetail.name
    data.almarhum.document = documentDetail.name;

    // return NextResponse.json(data);
    return NextResponse.json(data);
  }
}

export async function PATCH(
  req: NextRequest,
  params: { params: { id: string } }
) {
  const { id } = params.params;
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

    // create bukti_tf file name
    const buktiTFName = `${year}-${month}-${day}_BUKTI_TF`;

    // get file and bukti_tf from body
    const file = body.almarhum.document;
    const buktiTF = body?.reservasi?.screenshot;

    // upload file to imagekit
    let fileId = "";
    let bukti_tfId = "";
    try {
      if (file) {
        const uploadFile = await imageKit.upload({
          file: file,
          fileName: fileName,
          folder: folderPath,
        });
        fileId = uploadFile.fileId;
        // assign document in body to fileId
        body.almarhum.document = fileId;

        // delete current file in imagekit with data?.almarhum?.documentDetail?.fileId
        await imageKit
          .deleteFile(body?.almarhum?.documentDetail?.fileId)
          .catch((err) => {
            throw console.log(err);
          });
      }
      if (buktiTF) {
        const uploadBuktiTF = await imageKit.upload({
          file: buktiTF,
          fileName: buktiTFName,
          folder: folderPath,
        });
        bukti_tfId = uploadBuktiTF.fileId;
        // assign screenshot in body to bukti_tfId
        body.reservasi.screenshot = bukti_tfId;

        // delete current bukti_tf in imagekit with data?.reservasi?.screenshotDetail?.fileId
        await imageKit
          .deleteFile(body?.reservasi?.screenshotDetail?.fileId)
          .catch((err) => {
            throw console.log(err);
          });
      }
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    // fetch data from json server
    const response = await fetch(`http://localhost:3001/customers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data);
  }
}

export async function DELETE(
  req: NextRequest,
  params: { params: { id: string } }
) {
  const { id } = params.params;
  // get token from headers
  const token = req.headers.get("authorization")?.split(" ")[1] || "";

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
    const response = await fetch(`http://localhost:3001/customers/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return NextResponse.json(data);
  }
}
