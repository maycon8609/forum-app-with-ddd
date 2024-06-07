import { Entity } from "../../core/entities/entity"
import { Slug } from "./value-objects/slug"

interface QuestionProps {
  authorId: string
  content: string
  slug: Slug
  title: string
}

export class Question extends Entity<QuestionProps> {}