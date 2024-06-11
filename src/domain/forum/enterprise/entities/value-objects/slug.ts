export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  /**
   * Receives a string and normalize it as a slug.
   *
   * Example: "Example title" => "example-title"
   *
   * @param value {string}
   */
  static createFromText(value: string) {
    const slugValue = value
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugValue)
  }
}
