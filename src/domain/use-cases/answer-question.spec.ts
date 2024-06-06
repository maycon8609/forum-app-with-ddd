import { describe, it, expect } from 'vitest'

import { AnswerQuestionUseCase } from './answer-question'

describe('Use-cases: Answer Question', () => {
  it('should be able create a answer', () => {
    const answerQuestion = new AnswerQuestionUseCase()

    const answer = answerQuestion.execute({
      content: 'Nova resposta',
      instructorId: '1',
      questionId: '1'
    })

    expect(answer.content).toEqual('Nova resposta')
  })
})