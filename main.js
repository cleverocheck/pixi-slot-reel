import {initPlugins} from './services/initPlugins.js'
import {Reel} from './components/Reel.js'

initPlugins()

const reel = new Reel()
await reel.init()
document.body.appendChild(reel.canvas)

const win = document.getElementById('win')
document.getElementById('spin-button').onclick = async function () {
    win.innerText = ''
    this.disabled = true
    const isWin = await reel.spin()
    if (isWin) win.innerText = 'You Win!'
    this.disabled = false
}