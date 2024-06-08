import { Slug } from './slug'

describe('Value-objects: Slug', () => {
  it('should be able to create a new slug from text', () => {
    const slug = Slug.createFromText('Random --mock @any _têxt-')

    expect(slug.value).toEqual('random-mock-any-text')
  })
})