import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Use-cases: Fetch Questions Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    const questionId = new UniqueEntityId('question-01')

    await inMemoryAnswersRepository.create(makeAnswer({ questionId }))
    await inMemoryAnswersRepository.create(makeAnswer({ questionId }))
    await inMemoryAnswersRepository.create(makeAnswer({ questionId }))

    const result = await sut.execute({
      questionId: questionId.toString(),
      page: 1,
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    const questionId = new UniqueEntityId('question-01')

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(makeAnswer({ questionId }))
    }

    const result = await sut.execute({
      questionId: questionId.toString(),
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
