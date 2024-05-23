import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
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
    // const SECRET_KEY = process.env.VERY_SECRET_KEY ?? "yourSecretKey";
    // try {
    //   jwt.verify(token, SECRET_KEY);
    // } catch (err) {
    //   return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    // }

    // fetch data from json server
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REAL_URL}/customer/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.json({ error: "Error" }, { status: response.status });
    }
    const { data } = await response.json();

    console.log("data", data);

    // get data.document detail if document exists
    if (data?.document) {
      const documentDetail: any = await getImageDetail(data?.document || "");
      // add documentDetail to data.almarhum
      data.documentDetail = documentDetail;
      // assign document with documentDetail.name
      data.document = documentDetail.name;
    }

    // check if screenshot exists
    // if exists, get screenshot file detail
    if (data?.screenshot) {
      const screenshotDetail: any = await getImageDetail(data?.screenshot);
      // add screenshotDetail to data.reservasi
      data.screenshotDetail = screenshotDetail;
      // assign screenshot with buktiTFDetail.thumbnail
      data.screenshot = screenshotDetail.thumbnail;
    }

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
    // const SECRET_KEY = process.env.VERY_SECRET_KEY ?? "yourSecretKey";
    // try {
    //   jwt.verify(token, SECRET_KEY);
    // } catch (err) {
    //   return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    // }

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
    const file = body.document;
    const buktiTF = body?.screenshot;

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
        body.document = fileId;

        // delete current file in imagekit with data?.documentDetail?.fileId
        // await imageKit.deleteFile(body?.documentDetail?.fileId).catch((err) => {
        //   throw console.log(err);
        // });
      } else if (!file) {
        // if file is empty, assign document in body to ""
        body.document = "";
      }
      if (buktiTF) {
        const uploadBuktiTF = await imageKit.upload({
          file: buktiTF,
          fileName: buktiTFName,
          folder: folderPath,
        });
        bukti_tfId = uploadBuktiTF.fileId;
        // assign screenshot in body to screenshot
        body.screenshot = bukti_tfId;

        // delete current bukti_tf in imagekit with data?.screenshotDetail?.fileId
        // await imageKit
        //   .deleteFile(body?.screenshotDetail?.fileId)
        //   .catch((err) => {
        //     throw console.log(err);
        //   });
      } else if (!buktiTF) {
        // if bukti_tf is empty, assign screenshot in body to ""
        body.screenshot = "";
      }
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    // fetch data from json server
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REAL_URL}/customer/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) {
      console.log(response);
      if (response.status === 401) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.json({ error: "Error" }, { status: response.status });
    }
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
    // const SECRET_KEY = process.env.VERY_SECRET_KEY ?? "yourSecretKey";
    // try {
    //   jwt.verify(token, SECRET_KEY);
    // } catch (err) {
    //   return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    // }
    // fetch data from json server
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REAL_URL}/customer/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response from route", response);
    if (
      response.status !== 201 &&
      response.status !== 204 &&
      response.status !== 200
    ) {
      if (response.status === 401) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      console.log("in");
      return NextResponse.json({ error: "Error" }, { status: response.status });
    }
    const data = await response.text();
    return NextResponse.json(data);
  }
}
