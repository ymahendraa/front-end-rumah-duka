import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  // get token from headers
  const token = req.headers.get("authorization")?.split(" ")[1] || "";
  // get limit, page and search from query params
  const url = new URL(req.url);
  const limit = url.searchParams.get("limit") ?? "10";
  const page = url.searchParams.get("page") ?? "1";
  const start_date = url.searchParams.get("start_date") ?? "";
  const end_date = url.searchParams.get("end_date") ?? "";
  // const start_date = "2024-03-19";
  // const end_date = "2024-03-22";

  // if token does not exist, return an error
  if (!token) {
    return NextResponse.json({ error: "Token doesn't exist" }, { status: 401 });
  }
  // if token exists, verify it
  else {
    // return error if start_date and end_date are not provided
    if (!start_date || !end_date) {
      return NextResponse.json(
        { error: "Start date and end date are required" },
        { status: 400 }
      );
    }
    // fetch data from json server
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REAL_URL}/revenue?page=${page}&per_page=${limit}&start_date=${start_date}&end_date=${end_date}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response", response);
    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      if (response.status === 400) {
        const newResponse = {
          chart: null,
          data: [],
          message: "Data berhasil ditampilkan",
          meta: {
            currentPage: 1,
            itemCount: 0,
            itemsPerPage: 0,
            totalItems: 0,
            totalPages: 0,
            totalSumTotal: "0",
          },
        };
        return NextResponse.json(newResponse);
      }
      return NextResponse.json({ error: "Error" }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  }
}
