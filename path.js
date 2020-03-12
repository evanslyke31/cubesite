const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x000, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();


// Listen for animate update
app.ticker.add(() => {
    graphics.lineStyle(10, 0xFFBD01, 1);
    graphics.beginFill(0xC34288);
    graphics.drawRect(350, 50, 20, 20);
    graphics.endFill();
});
