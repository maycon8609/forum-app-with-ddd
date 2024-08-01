import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionRepository } from '../repositories/question-repository'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

export interface CommentOnQuestionUseCaseRequest {
  authorId: string
  content: string
  questionId: string
}

export interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      questionId: new UniqueEntityId(questionId),
    })

    await this.questionCommentsRepository.create(questionComment)

    return {
      questionComment,
    }
  }
}
