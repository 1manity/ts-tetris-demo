import {GameStatus, GameViewer} from "../types";
import {SquareGroup} from "../SquareGroup";
import {SquarePageViewer} from "./SquarePageViewer";
import $ from 'jquery'
import {Game} from "../Game";
import GameConfig from "../GameConfig";
import PageConfig from "./PageConfig";

export class GamePageViewer implements GameViewer {

    private nextDom = $('#next')
    private panelDom = $('#panel')
    private scoreDom = $('#score')
    private msgDom = $('#msg')

    showNext(tetris: SquareGroup): void {
        tetris.squares.forEach((sq) => {
            sq.viewer = new SquarePageViewer(sq, this.nextDom)
        })
    }

    switch(tetris: SquareGroup): void {
        tetris.squares.forEach((sq) => {
            if (sq.viewer) {
                sq.viewer.remove()
            }
            sq.viewer = new SquarePageViewer(sq,this.panelDom)
        })
    }

    init(game: Game): void {
        this.panelDom.css({
            width: GameConfig.panelSize.width*PageConfig.SquareSize.width,
            height: GameConfig.panelSize.height*PageConfig.SquareSize.height
        })
        this.nextDom.css({
            width: GameConfig.nextSize.width*PageConfig.SquareSize.width,
            height: GameConfig.nextSize.height*PageConfig.SquareSize.height
        })

        $(document).on('keydown', (e) => {
            if (e.key === "ArrowLeft") {
                game.controlLeft()
            }
            else if (e.key === "ArrowRight") {
                game.controlRight()
            }
            else if (e.key === "ArrowDown") {
                game.controlDown()
            }
            else if (e.key === "ArrowUp") {
                game.controlRotate()
            }
            else if (e.key === " ") {
                if (game.gameStatus === GameStatus.playing) {
                    game.pause()
                }
                else {
                    game.start()
                }
            }
        })
    }

    showScore(score: number): void {
        this.scoreDom.text(score)
    }

    onGameOver(): void {
        this.msgDom.css({display: 'flex'})
        this.msgDom.find('p').text('游戏结束')
    }

    onGamePause(): void {
        this.msgDom.css({display: 'flex'})
        this.msgDom.find('p').text('游戏暂停')

    }

    onGameStart(): void {
        this.msgDom.hide()
    }

}
