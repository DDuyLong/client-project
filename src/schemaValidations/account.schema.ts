import { Role } from "@/constants/type";
import { LoginRes } from "@/schemaValidations/auth.schema";
import z from "zod";

export const AccountSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.enum([Role.Owner, Role.Employee]),
  avatar: z.string().nullable(),
});

export type AccountType = z.infer<typeof AccountSchema>;

export const AccountListRes = z.object({
  data: z.array(AccountSchema),
  message: z.string(),
});

export type AccountListResType = z.infer<typeof AccountListRes>;

export const AccountRes = z
  .object({
    data: AccountSchema,
    message: z.string(),
  })
  .strict();

export type AccountResType = z.infer<typeof AccountRes>;

export const CreateEmployeeAccountBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    avatar: z.string().url().optional(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

export type CreateEmployeeAccountBodyType = z.infer<
  typeof CreateEmployeeAccountBody
>;

export const UpdateEmployeeAccountBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    avatar: z.string().url().optional(),
    changePassword: z.boolean().optional(),
    password: z.string().min(6).max(100).optional(),
    confirmPassword: z.string().min(6).max(100).optional(),
    role: z.enum([Role.Owner, Role.Employee]).default(Role.Employee).optional(),
  })
  .strict()
  .superRefine(({ confirmPassword, password, changePassword }, ctx) => {
    if (changePassword) {
      if (!password || !confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Hãy nhập mật khẩu mới và xác nhận mật khẩu mới",
          path: ["changePassword"],
        });
      } else if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "Mật khẩu không khớp",
          path: ["confirmPassword"],
        });
      }
    }
  });

export type UpdateEmployeeAccountBodyType = z.infer<
  typeof UpdateEmployeeAccountBody
>;

export const UpdateMeBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    avatar: z.string().url().optional(),
  })
  .strict();

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>;

export const ChangePasswordBody = z
  .object({
    oldPassword: z.string().min(6).max(100),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu mới không khớp",
        path: ["confirmPassword"],
      });
    }
  });

export type ChangePasswordBodyType = z.infer<typeof ChangePasswordBody>;

export const ChangePasswordV2Body = ChangePasswordBody;

export type ChangePasswordV2BodyType = z.infer<typeof ChangePasswordV2Body>;

export const ChangePasswordV2Res = LoginRes;

export type ChangePasswordV2ResType = z.infer<typeof ChangePasswordV2Res>;

export const AccountIdParam = z.object({
  id: z.coerce.number(),
});

export type AccountIdParamType = z.infer<typeof AccountIdParam>;

export const GetListGuestsRes = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      tableNumber: z.number().nullable(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  ),
  message: z.string(),
});

export type GetListGuestsResType = z.infer<typeof GetListGuestsRes>;

export const GetGuestListQueryParams = z.object({
  fromDate: z.coerce.date().optional(),
  toDate: z.coerce.date().optional(),
});

export type GetGuestListQueryParamsType = z.infer<
  typeof GetGuestListQueryParams
>;

export const CreateGuestBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    tableNumber: z.number(),
  })
  .strict();

export type CreateGuestBodyType = z.infer<typeof CreateGuestBody>;

export const CreateGuestRes = z.object({
  message: z.string(),
  data: z.object({
    id: z.number(),
    name: z.string(),
    role: z.enum([Role.Guest]),
    tableNumber: z.number().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
});

export type CreateGuestResType = z.infer<typeof CreateGuestRes>;
