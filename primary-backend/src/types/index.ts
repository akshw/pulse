import { z } from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(6),
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const ZapCreateSchema = z.object({
  availableTriggerId: z.string(),
  triggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      availableActionId: z.string(),
      actionMeatadata: z.any().optional(),
    })
  ),
});
