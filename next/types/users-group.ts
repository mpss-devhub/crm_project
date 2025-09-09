import { z } from "zod";

export const userGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  systemType: z.string().min(1, "Select a system type"),
  permissions: z.array(z.string()).min(1, "Select at least one permission"),
});

export type UserGroupFormData = z.infer<typeof userGroupSchema>;
