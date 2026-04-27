import { NextResponse } from "next/server";
import { sendEmail } from "@/app/lib/email";

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

    await sendEmail({
      to: body.email,
      subject: "Заявка получена",
      text: "Спасибо за заявку. Мы вернёмся с ответом в течение 2 рабочих дней.",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
