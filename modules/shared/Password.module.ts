import { OPPOSITES_SYMBOLS, OPEN_PARENTHESIS, OPEN_BRACKETS, OPEN_BRACES } from '~/constants/Password.const'

export default class PasswordModule extends String {
  private _isBalancedParenthesis (): boolean {
    const opened: string[] = []
    return !this.split('').reduce((index, char) => {
      switch (char) {
        case OPEN_PARENTHESIS:
        case OPEN_BRACKETS:
        case OPEN_BRACES:
          opened.push(char)
          index = index + 1
          break
        default:
          if (OPPOSITES_SYMBOLS[opened[index - 1]] === char) {
            index = index - 1
            break
          }
          index = index + 1
          break
      }
      return index
    }, 0)
  }

  private static _invalidChars (char: string): string | undefined {
    switch (char) {
      case OPEN_BRACES:
      case OPEN_BRACKETS:
      case OPEN_PARENTHESIS:
      case OPPOSITES_SYMBOLS[OPEN_BRACES]:
      case OPPOSITES_SYMBOLS[OPEN_BRACKETS]:
      case OPPOSITES_SYMBOLS[OPEN_PARENTHESIS]:
        break
      default:
        return char
    }
  }

  public static areCharacterValid (characters: string): boolean {
    const char: string | undefined = characters.split('').find((char) => {
      return this._invalidChars(char)
    })
    return !char
  }

  public static removeInvalidCharacters (characters: string): string {
    let newString: string = ''
    characters.split('').forEach((char) => {
      newString = characters.replace(this._invalidChars(char) || '', '')
    })
    return newString
  }

  public get value () {
    return this.toString()
  }

  public get isValid (): boolean {
    return this._isBalancedParenthesis()
  }
}
