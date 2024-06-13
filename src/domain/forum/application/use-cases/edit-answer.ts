import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

export interface EditAnswerUseCaseRequest {
  authorId: string
  content: string
  answerId: string
}

export interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    content,
    answerId,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return {
      answer,
    }
  }
}
