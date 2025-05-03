import {Symbol} from './Symbol.js'
import {clampAudioPlaybackRate} from '../utils/audio/clampAudioPlaybackRate.js'

export class Reel extends PIXI.Application {
    static _SYMBOLS_COUNT = 3
    _SPIN_HEIGHT = Symbol.SIZE * 30
    _SPIN_DURATION = 3.5
    _LINEAR_SPIN_SPEED = this._SPIN_HEIGHT / this._SPIN_DURATION / 1000
    _spinAudio = document.getElementById('spin-audio')
    _prevY = 0
    _lastSwapY = 0

    get _isWin() {
        for (let i = 1; i < Reel._SYMBOLS_COUNT; i++) {
            if (this.stage.children[i].id !== this.stage.children[i + 1].id) return false
        }
        return true
    }

    async init() {
        await super.init({width: Symbol.SIZE, height: Symbol.SIZE * Reel._SYMBOLS_COUNT})

        for (let i = -1; i < Reel._SYMBOLS_COUNT; i++) {
            const symbol = new Symbol(Symbol.getRandomId())
            symbol.y = Symbol.SIZE * i

            this.stage.addChild(symbol)
        }
    }

    _swapLastSymbol() {
        const firstSymbol = this.stage.children[0]
        const lastSymbol = this.stage.children[this.stage.children.length - 1]

        lastSymbol.y = firstSymbol.y - Symbol.SIZE
        lastSymbol.applyId(Symbol.getRandomId())
        this.stage.addChildAt(lastSymbol, 0)
    }

    _updateSpinAudio() {
        const linearSpeedDiff = this._ticker.deltaMS * this._LINEAR_SPIN_SPEED
        this._spinAudio.playbackRate = clampAudioPlaybackRate((this.stage.y - this._prevY) / linearSpeedDiff)
        this._prevY = this.stage.y
    }

    _onSpinUpdate() {
        this._updateSpinAudio();

        while (this.stage.y - this._lastSwapY >= Symbol.SIZE) {
            this._swapLastSymbol()
            this._lastSwapY += Symbol.SIZE;
        }
    }

    spin() {
        return new Promise(resolve => {
            this._spinAudio.play()
            this._spinTween = gsap.to(this.stage, {
                pixi: {y: `+=${this._SPIN_HEIGHT}`},
                duration: this._SPIN_DURATION,
                ease: 'power1.inOut',
                onUpdate: this._onSpinUpdate.bind(this),
                onComplete: () => {
                    this._spinAudio.pause()
                    this._spinAudio.currentTime = 0
                    resolve(this._isWin)
                }
            })
        })
    }

    destroy(options) {
        super.destroy(options)
        this._spinTween?.kill()
    }
}