import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

interface CreateQuestionUseCaseRequest {
  authorId: string
  content: string
  title: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      content,
      title,
    })

    await this.questionRepository.create(question)

    return {
      question,
    }
  }
}
