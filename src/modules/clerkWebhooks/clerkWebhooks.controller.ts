
import { WebhookEvent } from "@clerk/backend";
import type { Response, Request } from "express"
import { Webhook } from "svix";
import { env } from "@/config/env.js";
import { ClerkWebhooksService } from "./clerkWebhooks.service.js";
import { logger } from "@/utils/logger.js";

const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET;

export const ClerkWebhooksController = {
  userWebhooks: async (req: Request, res: Response) => {
    const payload = req.body.toString();
    const headers = req.headers;

    // Obtener encabezados de Svix para la verificación
    const svix_id = headers['svix-id'] as string;
    const svix_timestamp = headers['svix-timestamp'] as string;
    const svix_signature = headers['svix-signature'] as string;

    const wh = new Webhook(WEBHOOK_SECRET)
    let evt: WebhookEvent

    try {
      evt = wh.verify(payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;

      if (evt.type === "user.created") {
        const resp = await ClerkWebhooksService.userCreated(evt.data)
        logger.info(resp, "User created internally with success")
      } else if (evt.type === "user.updated") {
        const resp = await ClerkWebhooksService.userUpdated(evt.data)
        logger.info(resp, "User updated internally with success")
      } else if (evt.type === "user.deleted") {
        const resp = await ClerkWebhooksService.userDeleted(evt.data)
        logger.info(resp, "User deleted internally with success")
      }

    } catch (err: any) {
      logger.error(err)
      return res.status(400).send(err)
    }

    res.status(200).send("ok")
  },
}
