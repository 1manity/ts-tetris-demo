import {MoveDirection, Point, Shape} from "./types";
import GameConfig from "./GameConfig";
import {SquareGroup} from "./SquareGroup";
import {Square} from "./Square";

function isPoint(obj: any) : obj is Point {
    return obj.hasOwnProperty("x") && obj.hasOwnProperty("y")
}
export class TetrisRule {
    static canIMove(shape: Shape,targetPoint: Point,exists: Square[]): boolean {
        const targetSquarePoints: Point[] = shape.map(it=> {
            return {
                x: it.x + targetPoint.x,
                y: it.y + targetPoint.y
            }
        })
        let result = targetSquarePoints.some(p=> {
            return p.x < 0 || p.x >= GameConfig.panelSize.width || p.y < 0 || p.y >= GameConfig.panelSize.height
        })
        if (result) return false

        result = targetSquarePoints.some(p=> {
            return exists.some(sq=>sq.point.x === p.x && sq.point.y === p.y)
        })
        if (result) {
            return false
        }
        return true
    }
    static move(tetris: SquareGroup,targetPoint: Point, exists: Square[]):boolean
    static move(tetris: SquareGroup,MoveDirection: MoveDirection, exists: Square[]): boolean
    static move(tetris: SquareGroup,targetPointOrDirection: Point | MoveDirection,exists: Square[]): boolean {
        if (isPoint(targetPointOrDirection)) {
            if (this.canIMove(tetris.shape,targetPointOrDirection,exists)) {
                tetris.centerPoint = targetPointOrDirection
                return true
            }
            return false
        } else {
            const direction = targetPointOrDirection
            let targetPoint
            if (direction === MoveDirection.Down) {
                targetPoint = {
                    x: tetris.centerPoint.x,
                    y: tetris.centerPoint.y + 1
                }
            } else if (direction === MoveDirection.Left) {
                targetPoint = {
                    x: tetris.centerPoint.x - 1,
                    y: tetris.centerPoint.y
                }
            } else if (direction === MoveDirection.Right) {
                targetPoint = {
                    x: tetris.centerPoint.x + 1,
                    y: tetris.centerPoint.y
                }
            }
            else {
                throw new Error("invalid direction")
            }
            return this.move(tetris,targetPoint,exists)
        }
    }
    static moveDirectly(tetris: SquareGroup,direction: MoveDirection,exists: Square[]) {
        while (this.move(tetris,direction,exists)) {}
    }

    static rotate(tetris: SquareGroup,exists: Square[]): boolean {
        const newShape = tetris.afterRotateShape()
        if (this.canIMove(newShape,tetris.centerPoint,exists)) {
            tetris.rotate()
            return true
        } else {
            return false
        }
    }

    static getLineSquares(exists: Square[],y: number) {
        return exists.filter(it=>it.point.y === y)
    }

    static deleteSquares(exists: Square[]):number {
        const ys =exists.map(sq=>sq.point.y)
        const maxY = Math.max(...ys)
        const minY = Math.min(...ys)

        let num = 0
        for (let i = minY; i <= maxY; i++) {
            if (this.deleteLine(exists,i)) {
                num++
            }
        }
        return num
    }
    static deleteLine(exists: Square[],y: number):boolean {
        const squares = this.getLineSquares(exists,y)
        if (squares.length === GameConfig.panelSize.width) {
            squares.forEach(sq=> {
                if (sq.viewer) {
                    sq.viewer.remove()
                }

                const index = exists.indexOf(sq)
                exists.splice(index,1)
            })
            exists.filter(sq=>sq.point.y < y).forEach(sq=> {
                sq.point = {
                    x: sq.point.x,
                    y: sq.point.y + 1
                }
            })
            return  true
        }
        return false

    }
}
