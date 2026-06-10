import { EmailMessage } from "cloudflare:email";
import { createMimeMessage, Mailbox } from "mimetext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(data, name, max = 500) {
  return (data.get(name) || "").toString().trim().slice(0, max);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" && request.method === "POST") {
      const data = await request.formData();
      const thanks = new URL("/contact/thanks/", url);

      // Honeypot: pretend success, send nothing.
      if (field(data, "bot-field")) {
        return Response.redirect(thanks, 303);
      }

      const name = field(data, "name", 200);
      const email = field(data, "email", 200);
      const company = field(data, "company", 200);
      const brief = field(data, "brief", 5000);
      const timeline = field(data, "timeline", 100);
      const budget = field(data, "budget", 100);
      const integrations = field(data, "integrations", 500);

      if (!name || !EMAIL_RE.test(email)) {
        return new Response("Missing or invalid name/email.", { status: 400 });
      }

      const body = [
        `Name:         ${name}`,
        `Email:        ${email}`,
        `Company:      ${company || "—"}`,
        `Timeline:     ${timeline || "—"}`,
        `Budget:       ${budget || "—"}`,
        `Integrations: ${integrations || "—"}`,
        ``,
        `Brief:`,
        brief || "—",
      ].join("\n");

      const msg = createMimeMessage();
      msg.setSender({ name: "10x Studio site", addr: env.SENDER_ADDRESS });
      msg.setRecipient(env.DESTINATION_ADDRESS);
      msg.setHeader("Reply-To", new Mailbox(email));
      msg.setSubject(`Project inquiry — ${name}${company ? ` (${company})` : ""}`);
      msg.addMessage({ contentType: "text/plain", data: body });

      try {
        await env.CONTACT_EMAIL.send(
          new EmailMessage(env.SENDER_ADDRESS, env.DESTINATION_ADDRESS, msg.asRaw())
        );
      } catch (err) {
        console.error("contact email send failed:", err);
        return new Response("Could not send your message. Email us directly at hello@10xstudio.dev.", { status: 500 });
      }

      return Response.redirect(thanks, 303);
    }

    return env.ASSETS.fetch(request);
  },
};
