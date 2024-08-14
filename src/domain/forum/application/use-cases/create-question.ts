import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

import { Either, right } from '@/core/either'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export interface CreateQuestionUseCaseRequest {
  authorId: string
  attachmentsIds: string[]
  content: string
  title: string
}

export type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    attachmentsIds,
    content,
    title,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      content,
      title,
    })

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      })
    })

    question.attachments = questionAttachments

    await this.questionRepository.create(question)

    return right({
      question,
    })
  }
}
