import * as z from "zod";

//TASK Change colour ID to be one of the colour options
//TASK How do i set it to a date if it needs a string for defaults
export const schema = z.object({
  title: z
    .string()
    .min(1, "Titles need to be longer than ")
    .max(50, "Titles need to be shorter than 50 characters."),
  task: z
    .string()
    .min(1)
    .max(200, "Task should be smaller than 200 characters"),
  dueDate: z.string().optional(),
  isComplete: z.boolean().optional(),
  colourId: z.string().or(z.number()),
});

export type TodoFormData = z.infer<typeof schema>;
