import {IViewer, Point} from "./types";

export class Square {

    private _point: Point = {x: 0, y: 0}
    private _color: string = ""
    private _viewer?: IViewer

    get viewer(): IViewer | undefined {
        return this._viewer
    }
    set viewer(value: IViewer) {
        this._viewer = value
        if (value) {
            value.show()
        }
    }

    get point(): Point {
        return this._point
    }
    set point(value: Point) {
        this._point = value
        if (this._viewer) {
            this._viewer.show()
        }
    }

    get color(): string {
        return this._color
    }

    set color(value: string) {
        this._color = value
    }
}
