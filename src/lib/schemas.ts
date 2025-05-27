import { z } from "zod/v4";

export const facilityFormSchema = z.object({  
  id: z.uuidv4(),
  global_id: z.string()
    .regex(/^\d{6}$/, "Global ID must be exactly 6 digits"),
  dl_id: z.string()
    .regex(/^\d{4,6}$/, "DL ID must be between 4 and 6 digits"),
  dl_name: z.string()
    .optional(),
  mac: z
    .string()
    .optional(),
  revenue_center: z.enum(
    ["EAST", "WEST", "NORTH", "SOUTH"]
  )
    .optional(),
  npi: z.string()
    .regex(/^\d{10}$/, "NPI must be exactly 10 digits")
    .optional(),
  created_at: z.iso
    .datetime({ offset: true })
    .optional(),
  updated_at: z.iso
    .datetime({ offset: true })
    .optional(),
});
