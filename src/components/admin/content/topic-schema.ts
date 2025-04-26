
import { z } from "zod";

export const topicSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  theory_content: z.string().min(1, "Theory content is required"),
  examples_content: z.string().optional(),
  practice_content: z.string().optional(),
  quiz_content: z.any().optional(),
  sub_topic_id: z.string().min(1, "Sub-topic is required"),
});
