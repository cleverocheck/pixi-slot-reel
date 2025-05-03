export function initPlugins() {
    gsap.registerPlugin(PixiPlugin)
    PixiPlugin.registerPIXI(PIXI)
}