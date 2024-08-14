import { DeleteQuestionUseCase } from './delete-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Use-cases: Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion()
    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id.toString(),
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion()
    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'other-author-id',
      questionId: newQuestion.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
