import { Entity } from "../../core/entities/entity"

interface AnswerProps {
  authorId: string
  content: string
  questionId: string
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }
}