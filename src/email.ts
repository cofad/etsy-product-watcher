import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";
import { getEnvOrThrow } from "./env.ts";

export type EmailCredentials = {
  readonly email: string;
  readonly password: string;
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
    password: credentials.password,
  });

  await client.send({
    from: "etsy.product.watcher@gmail.com",
    to: "will.r.warner@gmail.com",
    subject,
    content: "",
    html,
  });
}

export function buildEmailCredentials(): EmailCredentials {
  return {
    email: "etsy.product.watcher@gmail.com",
    password: getEnvOrThrow("GMAIL_PASSWORD"),
  };
}
