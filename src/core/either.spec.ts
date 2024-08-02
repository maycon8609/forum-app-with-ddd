import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, string> {
  if (shouldSuccess) {
    return right('success')
  } else {
    return left('error')
  }
}

describe('Core: Either', () => {
  it('should be able return success result', () => {
    const result = doSomething(true)

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
  })

  it('should be able return error result', () => {
    const result = doSomething(false)

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
  })
})
