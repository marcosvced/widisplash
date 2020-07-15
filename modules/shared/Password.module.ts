import { OPPOSITES_SYMBOLS, OPEN_PARENTHESIS, OPEN_BRACKETS, OPEN_BRACES } from '~/constants/Password.const'

export default class PasswordModule extends String {
  public get value () {
    return this.toString()
  }

  public get isValid (): boolean {
    return this._isBalancedParenthesis()
  }

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
}
