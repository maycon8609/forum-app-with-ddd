import {
  ChooseQuestionBestAnswerUseCase,
  ChooseQuestionBestAnswerUseCaseRequest,
} from './choose-question-best-answer'

import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Use-cases: Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryQuestionsRepository,
    )
  })

  it('should be able to choose the question best answer', async () => {
    const newQuestion = makeQuestion()
    const newAnswer = makeAnswer({ questionId: newQuestion.id })

    await inMemoryQuestionsRepository.create(newQuestion)
    await inMemoryAnswersRepository.create(newAnswer)

    const data: ChooseQuestionBestAnswerUseCaseRequest = {
      authorId: newQuestion.authorId.toString(),
      answerId: newAnswer.id.toString(),
    }

    await sut.execute(data)

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      newAnswer.id,
    )
  })

  it('should not be able to choose another user question best answer', async () => {
    const newQuestion = makeQuestion()
    const newAnswer = makeAnswer({ questionId: newQuestion.id })

    await inMemoryQuestionsRepository.create(newQuestion)
    await inMemoryAnswersRepository.create(newAnswer)

    const data: ChooseQuestionBestAnswerUseCaseRequest = {
      authorId: 'other-author-id',
      answerId: newAnswer.id.toString(),
    }

    expect(() => sut.execute(data)).rejects.toBeInstanceOf(Error)
  })
})
