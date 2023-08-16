export class LocalStorageItem<V> {
  private KEY: string

  constructor(key: string) {
    this.KEY = key
  }

  read(): V | null {
    const item = localStorage.getItem(this.KEY)

    if (typeof item === 'string') {
      try {
        const value = JSON.parse(item) as V
        return value
      } catch (error) {
        console.error(`Can't parse item '${this.KEY}'\n${error}`)
        return null
      }
    } else {
      return null
    }
  }

  write(value: V): void {
    localStorage.setItem(this.KEY, JSON.stringify(value))
  }

  delete(): void {
    localStorage.removeItem(this.KEY)
  }
}
