import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Use-cases: Fetch Questions Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    const questionId = new UniqueEntityId('question-01')

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId }),
    )

    const { questionComments } = await sut.execute({
      questionId: questionId.toString(),
      page: 1,
    })

    expect(questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comments', async () => {
    const questionId = new UniqueEntityId('question-01')

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId }),
      )
    }

    const { questionComments } = await sut.execute({
      questionId: questionId.toString(),
      page: 2,
    })

    expect(questionComments).toHaveLength(2)
  })
})
