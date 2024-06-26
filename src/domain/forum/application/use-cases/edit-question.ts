import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

export interface EditQuestionUseCaseRequest {
  authorId: string
  content: string
  questionId: string
  title: string
}

export interface EditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    content,
    questionId,
    title,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
