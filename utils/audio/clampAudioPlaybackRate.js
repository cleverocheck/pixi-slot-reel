import {clamp} from '../math/clamp.js';

export function clampAudioPlaybackRate(value) {
    return clamp(0.0625, 16.0, value)
}