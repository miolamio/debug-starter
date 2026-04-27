type SendEmailParams = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail(params: SendEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not defined");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "noreply@example.com",
      to: params.to,
      subject: params.subject,
      text: params.text,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend API error: ${res.status}`);
  }

  return res.json();
}
