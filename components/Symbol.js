import {getRandomArrayElement} from '../utils/getRandomArrayElement.js'

export class Symbol extends PIXI.Graphics {
    static SIZE = 100
    static _COLOR_MAP = Object.freeze({
        1: '#ff0000',
        2: '#00ff00',
        3: '#0000ff',
        4: '#ffff00',
        5: '#00ffff'
    })
    static _IDS = Object.freeze(Object.keys(Symbol._COLOR_MAP))

    static getRandomId() {
        return getRandomArrayElement(this._IDS)
    }

    constructor(id) {
        super()

        this.label = new PIXI.Text()
        this.addChild(this.label)
        this.applyId(id)
    }

    applyId(id) {
        this.id = id
        this.clear()
        this
            .rect(0, 0, Symbol.SIZE, Symbol.SIZE)
            .fill(Symbol._COLOR_MAP[id])
        this.label.text = id
    }
}