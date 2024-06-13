import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Use-cases: Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer()
    await inMemoryAnswersRepository.create(newAnswer)

    const updatedAnswer = {
      authorId: newAnswer.authorId.toString(),
      content: 'new content',
      answerId: newAnswer.id.toString(),
    }

    await sut.execute(updatedAnswer)

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: updatedAnswer.content,
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer()
    await inMemoryAnswersRepository.create(newAnswer)

    const data = {
      authorId: 'other-author-id',
      content: 'new content',
      answerId: newAnswer.id.toString(),
    }

    expect(() => sut.execute(data)).rejects.toBeInstanceOf(Error)
  })
})
