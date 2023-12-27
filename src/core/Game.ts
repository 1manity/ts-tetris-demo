import {GameStatus, GameViewer, MoveDirection} from "./types";
import {SquareGroup} from "./SquareGroup";
import {createTetris} from "./Tetris";
import {TetrisRule} from "./TetrisRule";
import GameConfig from "./GameConfig";
import {Square} from "./Square";

export class Game {
    private _gameStatus: GameStatus = GameStatus.init
    get gameStatus() {
        return this._gameStatus
    }

    private curTetris?: SquareGroup
    private nextTetris: SquareGroup

    private _duration: number

    private timer?: number
    private exists: Square[] = []

    _score: number = 0

    get score() {
        return this._score
    }
    set score(value: number) {
        this._score = value
        this._viewer.showScore(this._score)

        const level =GameConfig.levels.filter(it=> {
            return it.score <= value
        }).pop()!

        if(level.duration === this._duration){
            return
        }
        this._duration = level.duration
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = undefined
            this.autoDrop()
        }
    }


    constructor(private _viewer: GameViewer) {
        this.nextTetris = createTetris({x: 0, y: 0})
        this.init()
        this._viewer.init(this)
        this._viewer.showScore(this.score)
        this._duration = GameConfig.levels[0].duration
    }

    init() {
        this.exists.forEach(sq => {
            if (sq.viewer) {
                sq.viewer.remove()
            }
        })
        this.exists = []
        this.createNext()

        this.score = 0
        this._duration = GameConfig.levels[0].duration
    }

    createNext() {
        this.nextTetris = createTetris({x: 0, y: 0})
        this.resetCenterPoint(GameConfig.nextSize.width, this.nextTetris)
        this._viewer.showNext(this.nextTetris)
    }

    start() {
        if (this._gameStatus === GameStatus.playing) {
            return
        }

        if (this._gameStatus === GameStatus.over) {
            this.init()
        }

        this._gameStatus = GameStatus.playing
        if (true) {
            this.switchTetris()
        }
        this.autoDrop()
        this._viewer.onGameStart()
    }

    pause() {
        if (this._gameStatus === GameStatus.playing) {
            this._gameStatus = GameStatus.pause
            clearInterval(this.timer)
            this.timer = undefined
            this._viewer.onGamePause()
        }
    }

    controlLeft() {
        if (this.curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.move(this.curTetris, MoveDirection.Left, this.exists)
        }
    }

    controlRight() {
        if (this.curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.move(this.curTetris, MoveDirection.Right, this.exists)
        }
    }

    controlDown() {
        if (this.curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.moveDirectly(this.curTetris, MoveDirection.Down, this.exists)
            this.hitBottom()
        }
    }

    controlRotate() {
        if (this.curTetris && this._gameStatus === GameStatus.playing) {
            TetrisRule.rotate(this.curTetris, this.exists)
        }
    }

    private autoDrop() {
        if (this.timer || this._gameStatus !== GameStatus.playing) {
            return
        }
        this.timer = setInterval(() => {
            if (this.curTetris) {
                if (!TetrisRule.move(this.curTetris, MoveDirection.Down, this.exists)) {
                    this.hitBottom()
                }


            }
        }, this._duration)

    }

    private switchTetris() {
        this.curTetris = this.nextTetris
        this.curTetris.squares.forEach(it => {
            if (it.viewer) {
                it.viewer.remove()
            }
        })
        this.resetCenterPoint(GameConfig.panelSize.width, this.curTetris)

        // check game over
        if (!TetrisRule.canIMove(this.curTetris.shape, this.curTetris.centerPoint, this.exists)) {
            this._gameStatus = GameStatus.over
            clearInterval(this.timer)
            this.timer = undefined
            this._viewer.onGameOver()
            return
        }

        this.createNext()
        this._viewer.switch(this.curTetris)
    }

    private resetCenterPoint(width: number, tetris: SquareGroup) {
        const x = Math.ceil(width / 2) - 1
        const y = 0
        tetris.centerPoint = {x, y}
        while (tetris.squares.some(it => it.point.y < 0)) {
            tetris.centerPoint = {
                x: tetris.centerPoint.x,
                y: tetris.centerPoint.y + 1
            }
        }
        while (tetris.squares.some(it => it.point.x < 0)) {
            tetris.squares.forEach(sq => {
                sq.point = {
                    x: sq.point.x + 1,
                    y: sq.point.y
                }
            })
        }
    }

    private hitBottom() {
        this.exists.push(...this.curTetris!.squares)
        const num = TetrisRule.deleteSquares(this.exists)
        this.addScore(num)
        this.switchTetris()
    }

    private addScore(lineNum: number) {
        if (lineNum === 0) {
            return
        } else if (lineNum === 1) {
            this.score += 10
        } else if (lineNum === 2) {
            this.score += 25
        } else if (lineNum === 3) {
            this.score += 50
        } else if (lineNum === 4) {
            this.score += 100
        }
    }
}
