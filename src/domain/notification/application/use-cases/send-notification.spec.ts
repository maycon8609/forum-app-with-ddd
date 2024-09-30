import { SendNotificationUseCase } from './send-notification'

import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('Use-cases: Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able send a notification', async () => {
    const result = await sut.execute({
      content: 'New notification',
      recipientId: 'example-recipient-id',
      title: 'Title to notification',
    })

    expect(result.isRight()).toBe(true)
    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
