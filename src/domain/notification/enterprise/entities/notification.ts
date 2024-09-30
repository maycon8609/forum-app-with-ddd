import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface NotificationProps {
  content: string
  recipientId: UniqueEntityId
  title: string
  readAt?: Date
  createdAt: Date
}

export class Notification extends Entity<NotificationProps> {
  static create(
    props: Optional<NotificationProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return notification
  }

  get content() {
    return this.props.content
  }

  get recipientId() {
    return this.props.recipientId
  }

  get title() {
    return this.props.title
  }

  get readAt() {
    return this.props.readAt
  }

  get createdAt() {
    return this.props.createdAt
  }

  read() {
    this.props.readAt = new Date()
  }
}
