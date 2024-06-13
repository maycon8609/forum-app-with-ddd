import {
  EditQuestionUseCase,
  EditQuestionUseCaseRequest,
} from './edit-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Use-cases: Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion()
    await inMemoryQuestionsRepository.create(newQuestion)

    const data: EditQuestionUseCaseRequest = {
      authorId: newQuestion.authorId.toString(),
      content: 'new content',
      questionId: newQuestion.id.toString(),
      title: 'new title',
    }

    await sut.execute(data)

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      content: data.content,
      title: data.title,
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion()
    await inMemoryQuestionsRepository.create(newQuestion)

    const data: EditQuestionUseCaseRequest = {
      authorId: 'other-author-id',
      content: 'new content',
      questionId: newQuestion.id.toString(),
      title: 'new title',
    }

    expect(() => sut.execute(data)).rejects.toBeInstanceOf(Error)
  })
})
