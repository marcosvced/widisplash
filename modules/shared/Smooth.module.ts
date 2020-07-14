let data: any = null
let dom: any = null
let requestAnimationFrame: (args?: any) => void

export class SmoothModule {
    private _rAF!: any;

    constructor (el:HTMLElement, content:HTMLElement) {
      data = {
        ease: 0.08,
        current: 0,
        last: 0,
        rounded: 0
      }
      dom = {
        el,
        content
      }
      this._bindMethods()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      requestAnimationFrame = (args?: any) => {
        this.rAF = window.requestAnimationFrame(this._run)
      }
      this._init()
    }

    private _init () {
      this._preload()
      this._on()
    }

    private _bindMethods () {
      // eslint-disable-next-line no-return-assign
      [this._scroll, this._run, this._resize].forEach(fn => fn = fn.bind(this))
    }

    private _preload () {
      this.setHeight()
    }

    private _on () {
      // this._setStyles()
      this.setHeight()
      this._addEvents()
      requestAnimationFrame()
    }

    public off () {
      this._cancelAnimationFrame()
      this._removeEvents()
      document.body.removeAttribute('style')
    }

    private _run () {
      data.last += (data.current - data.last) * data.ease
      data.rounded = Math.round(data.last * 100) / 100

      dom.content.style.transform = `translate3d(-${data.rounded}px, 0, 0)`

      requestAnimationFrame()
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private _cancelAnimationFrame (args?: any) {
      window.cancelAnimationFrame(this.rAF)
    }

    public setHeight () {
      document.body.style.height = `${dom.content.getBoundingClientRect().width}px`
    }

    private _resize () {
      this.setHeight()
      data.rounded = data.last = data.current
    }

    private _scroll () {
      data.current = window.scrollY
    }

    private _addEvents () {
      window.addEventListener('resize', this._resize, { passive: true })
      window.addEventListener('scroll', this._scroll, { passive: true })
    }

    private _removeEvents () {
      window.removeEventListener('resize', this._resize)
      window.removeEventListener('scroll', this._scroll)
    }

    get rAF (): any {
      return this._rAF
    }

    set rAF (value: any) {
      this._rAF = value
    }
}
