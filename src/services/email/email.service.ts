import { readFile } from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

import { sendMail } from "./mailer.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

type TemplateVariables = Record<string, string | number>

async function renderTemplate(templateName: string, variables: TemplateVariables) {
  const templatePath = path.join(__dirname, "templates", `${templateName}.html`)
  let html = await readFile(templatePath, "utf-8")

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g")
    html = html.replace(regex, String(value))
  }

  return html
}

interface SendTemplateEmailOptions {
  to: string
  subject: string
  templateName: string
  variables?: TemplateVariables
}

export async function sendTemplateEmail({
  to,
  subject,
  templateName,
  variables = {}
}: SendTemplateEmailOptions) {
  const defaultVariables = {
    appWebUrl: "https://marhabamarbella.com",
    logoUrl: "https://marhabamarbella.com/images/marhaba-marbella-logo.svg",
    year: new Date().getFullYear()
  }
  variables = { ...defaultVariables, ...variables }
  const html = await renderTemplate(templateName, variables)

  return sendMail({
    to,
    subject,
    html
  })
}