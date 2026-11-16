import { Role } from "@/constants/type";
import { OrderSchema } from "@/schemaValidations/order.schema";
import z from "zod";

export const GuestLoginBody = z
  .object({
    name: z.string().min(2).max(50),
    tableNumber: z.number(),
    token: z.string(),
  })
  .strict();

export type GuestLoginBodyType = z.infer<typeof GuestLoginBody>;

export const GuestLoginRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    guest: z.object({
      id: z.number(),
      name: z.string(),
      role: z.enum([Role.Guest]),
      tableNumber: z.number().nullable(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  }),
  message: z.string(),
});

export type GuestLoginResType = z.infer<typeof GuestLoginRes>;

export const GuestCreateOrdersBody = z.array(
  z.object({
    dishId: z.number(),
    quantity: z.number(),
  }),
);

export type GuestCreateOrdersBodyType = z.infer<typeof GuestCreateOrdersBody>;

export const GuestCreateOrdersRes = z.object({
  message: z.string(),
  data: z.array(OrderSchema),
});

export type GuestCreateOrdersResType = z.infer<typeof GuestCreateOrdersRes>;

export const GuestGetOrdersRes = GuestCreateOrdersRes;

export type GuestGetOrdersResType = z.infer<typeof GuestGetOrdersRes>;
