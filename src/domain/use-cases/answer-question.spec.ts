import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (answer: Answer) => {},
}

describe('Use-cases: Answer Question', () => {
  it('should be able create a answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

    const answer = await answerQuestion.execute({
      content: 'Nova resposta',
      instructorId: '1',
      questionId: '1',
    })

    expect(answer.content).toEqual('Nova resposta')
  })
})
