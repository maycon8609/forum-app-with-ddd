import { randomUUID } from "node:crypto"

interface QuestionProps {
  authorId: string
  content: string
  id?: string
  title: string
}

export class Question {
  public authorId: string
  public content: string
  public id: string
  public title: string

  constructor({ authorId, content, title, id }: QuestionProps) {
    this.authorId = authorId
    this.content = content
    this.id = id ?? randomUUID()
    this.title = title
  }
}