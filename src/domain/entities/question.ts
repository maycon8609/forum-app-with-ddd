import { Entity } from "../../core/entities/entity"
import { Slug } from "./value-objects/slug"
import { UniqueEntityId } from "../../core/entities/unique-entity-id"

interface QuestionProps {
  authorId: UniqueEntityId
  bestAnswerId: UniqueEntityId
  content: string
  createdAt: Date
  slug: Slug
  title: string
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {}