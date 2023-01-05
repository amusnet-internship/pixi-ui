import * as PIXI from 'pixi.js';
import { Button } from './Button';
import { createPanel, tileTexture } from './utility';


const app = new PIXI.Application();
app.ticker.add(update);
document.body.appendChild(app.view as HTMLCanvasElement);

document.body.addEventListener('keydown', event => {
    console.log(event.key);
});

init();

async function init() {
    const picturesPromises = [
        PIXI.Assets.load('assets/1.jpg'),
        PIXI.Assets.load('assets/2.jpg'),
        PIXI.Assets.load('assets/3.jpg')
    ];

    const pictures = await Promise.all(picturesPromises);
    const backgrounds = pictures.map(p => new PIXI.Sprite(p));
    let currentIndex = 0;
    backgrounds.forEach((b, i) => {
        b.renderable = currentIndex == i;
        b.anchor.set(0.5, 0.5);
        b.position.set(400, 300);
    });

    const back = new PIXI.Container();
    back.addChild(...backgrounds);

    const buttonTiles = await tileTexture('assets/button.png', 25, 105, 25, 105);
    const hlTiles = await tileTexture('assets/hl.png', 25, 105, 25, 105);
    const pressedTiles = await tileTexture('assets/pressed.png', 25, 105, 25, 105);

    const prevBtn = new Button(
        'Previous',
        onClick.bind(null, -1),
        createPanel(buttonTiles, 200, 50),
        createPanel(hlTiles, 200, 50),
        createPanel(pressedTiles, 200, 50)
    );
    const nextBtn = new Button(
        'Next',
        onClick.bind(null, 1),
        createPanel(buttonTiles, 200, 50),
        createPanel(hlTiles, 200, 50),
        createPanel(pressedTiles, 200, 50)
    );

    prevBtn.position.set(190, 530);
    nextBtn.position.set(410, 530);

    const ui = new PIXI.Container();
    ui.addChild(prevBtn, nextBtn);

    app.stage.addChild(back);
    app.stage.addChild(ui);

    function onClick(modifier) {
        currentIndex = (backgrounds.length + (currentIndex + modifier)) % backgrounds.length;
        backgrounds.forEach((b, i) => b.renderable = currentIndex == i);
    }
}

function update() {

}