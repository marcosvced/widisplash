let data: any = null
let dom: any = null
let requestAnimationFrame: () => void
let setHeight: () => void

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
      requestAnimationFrame = () => {
        this.rAF = window.requestAnimationFrame(SmoothModule._run)
      }
      setHeight = () => {
        document.body.style.height = `${dom.content.getBoundingClientRect().width - (window.innerWidth - window.innerHeight)}px`
      }
      this._init()
    }

    private _init () {
      this._preload()
      this._on()
    }

    private _bindMethods () {
      [SmoothModule._scroll, SmoothModule._run, SmoothModule._resize].forEach(fn => fn.bind(this))
    }

    private _preload () {
      this.setHeight()
    }

    private _on () {
      this.setHeight()
      SmoothModule._addEvents()
      requestAnimationFrame()
    }

    private static _run () {
      data.last += (data.current - data.last) * data.ease
      data.rounded = Math.round(data.last * 100) / 100
      dom.content.style.transform = `translate3d(-${data.rounded}px, 0, 0)`
      requestAnimationFrame()
    }

    private static _addEvents () {
      window.addEventListener('resize', SmoothModule._resize, { passive: true })
      window.addEventListener('scroll', SmoothModule._scroll, { passive: true })
    }

    private static _removeEvents () {
      window.removeEventListener('resize', SmoothModule._resize)
      window.removeEventListener('scroll', SmoothModule._scroll)
    }

    private static _resize () {
      setHeight()
      data.rounded = data.last = data.current
    }

    private static _scroll () {
      data.current = window.scrollY
    }

    private _cancelAnimationFrame () {
      window.cancelAnimationFrame(this.rAF)
    }

    public off () {
      this._cancelAnimationFrame()
      SmoothModule._removeEvents()
      document.body.removeAttribute('style')
    }

    public setHeight () {
      setHeight()
    }

    get rAF (): any {
      return this._rAF
    }

    set rAF (value: any) {
      this._rAF = value
    }
}
