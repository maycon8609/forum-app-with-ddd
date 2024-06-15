import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

export interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

export interface FetchRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return {
      questions,
    }
  }
}
