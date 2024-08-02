import { useCaseError } from '@/core/errors/use-case-error'

export class ResourceNotFoundError extends Error implements useCaseError {
  constructor() {
    super('Resource not found')
  }
}
