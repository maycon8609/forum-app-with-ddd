import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'

import { QuestionBestAnswerChoseEvent } from '@/domain/forum/enterprise/events/question-best-answer-chosen-event'

import { SendNotificationUseCase } from '../use-cases/send-notification'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChoseEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    bestAnswerId,
    question,
  }: QuestionBestAnswerChoseEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    )

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: 'Sua resposta foi escolhida!',
        content: `Sua resposta em "${question.title.substring(0, 20).concat('...')}" foi escolhida como a melhor pelo autor!`,
      })
    }
  }
}
