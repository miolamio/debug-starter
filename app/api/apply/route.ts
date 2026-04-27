import { NextResponse } from "next/server";

type ApplyBody = {
  email: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ApplyBody;

    if (!body.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true, email: body.email });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
