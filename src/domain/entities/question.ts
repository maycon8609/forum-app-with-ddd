import { randomUUID } from "node:crypto"

import { Slug } from "./value-objects/slug"

interface QuestionProps {
  authorId: string
  content: string
  id?: string
  slug: Slug
  title: string
}

export class Question {
  public authorId: string
  public content: string
  public id: string
  public slug: Slug
  public title: string

  constructor({ authorId, content, id, title, slug }: QuestionProps) {
    this.authorId = authorId
    this.content = content
    this.id = id ?? randomUUID()
    this.slug = slug
    this.title = title
  }
}