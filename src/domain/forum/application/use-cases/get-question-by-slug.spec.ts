import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Use-cases: Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId(),
      content: 'New question',
      slug: Slug.create('title-to-question'),
      title: 'Title to question',
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'title-to-question',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toEqual(newQuestion.content)
    expect(question.title).toEqual(newQuestion.title)
    expect(question.slug.value).toEqual(newQuestion.slug.value)
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
