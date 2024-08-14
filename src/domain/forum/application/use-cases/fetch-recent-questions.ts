import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

import { Either, right } from '@/core/either'

export interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

export type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return right({
      questions,
    })
  }
}
