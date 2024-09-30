import { useCaseError } from '@/core/errors/use-case-error'

export class NotAllowedError extends Error implements useCaseError {
  constructor() {
    super('Not allowed')
  }
}
