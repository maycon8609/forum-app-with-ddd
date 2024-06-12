import { faker } from '@faker-js/faker'

import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityId(),
      title: faker.lorem.sentence({ min: 3, max: 5 }),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
