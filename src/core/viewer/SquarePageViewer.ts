import {Square} from "../Square";
import {IViewer} from "../types";
import PageConfig from "./PageConfig";
import $ from 'jquery'

interface ColorToCss {

    [colorName: string]: {
        backgroundColor?: string;
        borderRadius?: string;
        background?: string;
    };

}

export class SquarePageViewer implements IViewer {

    private dom?: JQuery<HTMLElement>;
    private isRemove: boolean = false;

    constructor(
        private square: Square,
        private container: JQuery<HTMLElement>,
    ) {

    }

    show(): void {
        if (this.isRemove) {
            return
        }
        if (!this.dom) {
            this.dom = $('<div>').css({
                position: 'absolute',
                width: PageConfig.SquareSize.width,
                height: PageConfig.SquareSize.height,
                border: '1px solid black',
                boxSizing: 'border-box',
            }).appendTo(this.container);
        }
        const colorToCss: ColorToCss = PageConfig.ColorToCss;
        this.dom.css({
            left: this.square.point.x * PageConfig.SquareSize.width,
            top: this.square.point.y * PageConfig.SquareSize.height,
            // backgroundColor: this.square.color,
            ...colorToCss[this.square.color]
        })
    }

    remove(): void {
        if (this.dom && !this.isRemove) {
            this.dom?.remove()
            this.isRemove = true
        }

    }


}
