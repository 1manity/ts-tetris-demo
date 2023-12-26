import {MoveDirection, Point, Shape} from "./types";
import GameConfig from "./GameConfig";
import {SquareGroup} from "./SquareGroup";

function isPoint(obj: any) : obj is Point {
    return obj.hasOwnProperty("x") && obj.hasOwnProperty("y")
}
export class TetrisRule {
    static canIMove(shape: Shape,targetPoint: Point): boolean {
        const targetSquarePoints: Point[] = shape.map(it=> {
            return {
                x: it.x + targetPoint.x,
                y: it.y + targetPoint.y
            }
        })
        const result = targetSquarePoints.some(p=> {
            return p.x < 0 || p.x >= GameConfig.panelSize.width || p.y < 0 || p.y >= GameConfig.panelSize.height
        })
        return !result;
    }
    static move(tetris: SquareGroup,targetPoint: Point):boolean
    static move(tetris: SquareGroup,MoveDirection: MoveDirection): boolean
    static move(tetris: SquareGroup,targetPointOrDirection: Point | MoveDirection): boolean {
        if (isPoint(targetPointOrDirection)) {
            if (this.canIMove(tetris.shape,targetPointOrDirection)) {
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
            return this.move(tetris,targetPoint)
        }

    }
    static moveDirectly(tetris: SquareGroup,direction: MoveDirection) {
        while (this.move(tetris,direction)) {}
    }
}
