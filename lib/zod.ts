import { z } from "zod";

export const classSchema = z
  .object({
    name: z.string().min(3, "Class name must be at least 3 characters long"),
    description: z.string(),
    unit: z.string(),
    class_date: z.date(),
    start_time: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
    end_time: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
    status: z
      .enum(["active", "ended", "upcoming", "cancelled"])
      .optional()
      .default("active"),
    lecturer: z.string(),
  })
  .refine(
    (data) => {
      const startDateTime = new Date(
        `${data.class_date.toISOString().split("T")[0]}T${data.start_time}`
      );
      const endDateTime = new Date(
        `${data.class_date.toISOString().split("T")[0]}T${data.end_time}`
      );

      return startDateTime < endDateTime;
    },
    {
      message: "Start time must be before end time",
      path: ["start_time"],
    }
  );
//inter class
export type IClassValues = z.infer<typeof classSchema>;
export const _idSchema = z.object({
  _idSchema: z.string(),
});
