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
            sq.point = {x: p.x + this._centerPoint.x, y: p.y + this._centerPoint.y}
            sq.color = this._color
            squares.push(sq)
        })
        this._squares = squares
    }
}
