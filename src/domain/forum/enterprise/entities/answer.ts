import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerAttachmentList } from './answer-attachment-list'

export interface AnswerProps {
  authorId: UniqueEntityId
  attachments: AnswerAttachmentList
  content: string
  createdAt: Date
  questionId: UniqueEntityId
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  static create(
    props: Optional<AnswerProps, 'attachments' | 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answer = new Answer(
      {
        ...props,
        attachments: props.attachments ?? new AnswerAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answer
  }

  get authorId() {
    return this.props.authorId
  }

  get attachments() {
    return this.props.attachments
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get questionId() {
    return this.props.questionId
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }
}
