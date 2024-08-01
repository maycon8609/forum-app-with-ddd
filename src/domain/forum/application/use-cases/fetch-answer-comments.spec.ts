import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Use-cases: Fetch Answers Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    const answerId = new UniqueEntityId('answer-01')

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId }),
    )

    const { answerComments } = await sut.execute({
      answerId: answerId.toString(),
      page: 1,
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    const answerId = new UniqueEntityId('answer-01')

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId }),
      )
    }

    const { answerComments } = await sut.execute({
      answerId: answerId.toString(),
      page: 2,
    })

    expect(answerComments).toHaveLength(2)
  })
})
