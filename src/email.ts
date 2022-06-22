import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

export type EmailCredentials = {
  email: string;
  password: string;
};

export async function sendEmail(
  credentials: EmailCredentials,
  subject: string,
  html: string,
): Promise<void> {
  const client = new SmtpClient();

  await client.connectTLS({
    hostname: "smtp.gmail.com",
    port: 465,
    username: credentials.email,
    password: credentials.password
  });

  await client.send({
    from: "etsy.product.watcher@gmail.com",
    to: "will.r.warner@gmail.com",
    subject,
    content: "",
    html,
  });
}
