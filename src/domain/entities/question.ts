import { Entity } from "../../core/entities/entity"
import { Optional } from "../../core/types/optional"
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

export class Question extends Entity<QuestionProps> {
  static create(
    props: Optional<QuestionProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const question = new Question({
      ...props,
      createdAt: new Date()
    }, id)

    return question
  }
}