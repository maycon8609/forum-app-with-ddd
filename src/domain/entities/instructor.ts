import { randomUUID } from "node:crypto"

interface InstructorProps {
  id?: string
  name: string
}

export class Instructor {
  public id: string
  public name: string

  constructor({ name, id }: InstructorProps) {
    this.id = id ?? randomUUID()
    this.name = name
  }
}