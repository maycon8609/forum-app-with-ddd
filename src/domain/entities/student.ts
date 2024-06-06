import { randomUUID } from "node:crypto"

interface StudentProps {
  id?: string
  name: string
}

export class Student {
  public id: string
  public name: string

  constructor({ name, id }: StudentProps) {
    this.id = id ?? randomUUID()
    this.name = name
  }
}