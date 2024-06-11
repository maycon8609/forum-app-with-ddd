import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Use-cases: Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      content: 'New question',
      title: 'Title to question',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toEqual('New question')
    expect(question.title).toEqual('Title to question')
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
