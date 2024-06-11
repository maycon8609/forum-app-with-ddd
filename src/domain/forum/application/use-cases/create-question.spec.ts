import { CreateQuestionUseCase } from './create-question'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

const fakeQuestionRepository: QuestionRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (question: Question) => {},
}

describe('Use-cases: Create Question', () => {
  it('should be able create a question', async () => {
    const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

    const { question } = await createQuestion.execute({
      authorId: '1',
      content: 'New question',
      title: 'Title to question',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toEqual('New question')
    expect(question.title).toEqual('Title to question')
  })
})
