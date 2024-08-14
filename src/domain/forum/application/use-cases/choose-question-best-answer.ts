import { AnswersRepository } from '../repositories/answers-repository'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Either, left, right } from '@/core/either'

export interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

export type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return right({
      question,
    })
  }
}
