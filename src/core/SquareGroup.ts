import {Square} from "./Square";
import {Point, Shape} from "./types";

export class SquareGroup {
    private _squares: readonly Square[]

    get squares(): readonly Square[] {
        return this._squares
    }

    get shape(): Shape {
        return this._shape
    }

    get centerPoint(): Point {
        return this._centerPoint
    }

    set centerPoint(value: Point) {
        this._centerPoint = value
        this.setSquarePoints()
    }

    private setSquarePoints() {
        this._shape.forEach((p, i) => {
            this._squares[i].point = {
                x: p.x + this._centerPoint.x,
                y: p.y + this._centerPoint.y
            }
        })
    }

    constructor(private _shape: Shape, private _centerPoint: Point, private _color: string) {
        const squares: Square[] = []
        this._shape.forEach((p) => {
            const sq = new Square()
            sq.color = this._color
            squares.push(sq)
        })
        this._squares = squares
        this.setSquarePoints()
    }

    /**
     * 旋转方向是否为顺时针
     * @private
     */
    protected isClock = true

    afterRotateShape(): Shape {
        if (this.isClock) {
            return this._shape.map(p => {
                const newP: Point = {
                    x: -p.y,
                    y: p.x
                }
                return newP
            })
        } else {
            return this._shape.map(p => {
                const newP: Point = {
                    x: p.y,
                    y: -p.x
                }
                return newP
            })
        }
    }
    rotate() {
        const newShape = this.afterRotateShape()
        this._shape = newShape
        this.setSquarePoints()
    }
}
