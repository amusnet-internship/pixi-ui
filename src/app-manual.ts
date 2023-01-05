import * as PIXI from 'pixi.js';


init();

async function init() {

    const renderer = new PIXI.Renderer({
        width: 800,
        height: 600,
        backgroundColor: 0x999999
    });

    document.body.appendChild(renderer.view as HTMLCanvasElement);

    const stage = new PIXI.Container();

    const gr = new PIXI.Graphics();
    gr.beginFill(0x000000);
    gr.drawRect(100, 100, 300, 200);
    gr.endFill();

    document.body.addEventListener('click', () => {
        gr.position.set(0, 400);
    });

    stage.addChild(gr);

    const resource = await PIXI.Assets.load<PIXI.Texture>('assets/button.png');
    let sprite: PIXI.Sprite;

    if (resource instanceof PIXI.Texture) {
        sprite = new PIXI.Sprite(resource);
    } else {
        throw new MediaError();
    }

    stage.addChild(sprite);

    const ticker = new PIXI.Ticker();
    ticker.add(update);
    ticker.start();

    function update() {
        renderer.render(stage);
    }
}