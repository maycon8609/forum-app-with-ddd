/* eslint-disable no-new */
import { MockInstance, vi } from 'vitest'

import { OnAnswerCreated } from './on-answer-created'

import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'

import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { waitFor } from 'test/utils/wait-for'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('Subiscribers: On Answer Created', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })

  it('should send a notification when an answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalledTimes(1)
    })
  })
})
