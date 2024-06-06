import { randomUUID } from "node:crypto"

interface AnswerProps {
  authorId: string
  content: string
  id?: string
  questionId: string
}

export class Answer {
  public authorId: string
  public content: string
  public id: string
  public questionId: string

  constructor({ authorId, content, questionId, id }: AnswerProps) {
    this.authorId = authorId
    this.content = content
    this.id = id ?? randomUUID()
    this.questionId = questionId
  }
}