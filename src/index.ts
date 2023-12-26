import {SquarePageViewer} from "./core/viewer/SquarePageViewer";
import $ from "jquery"

import {createTetris} from "./core/Tetris";
import {TetrisRule} from "./core/TetrisRule";
import {MoveDirection} from "./core/types";


const Tetris = createTetris({x: 3, y: 2});
Tetris.squares.forEach(sq => {
    sq.viewer = new SquarePageViewer(sq, $("#root"));
})

$("#btnDown").click(function () {
    //更改中心点坐标
    TetrisRule.moveDirectly(Tetris, MoveDirection.Down);
})

$("#btnUp").click(function () {
    //更改中心点坐标
    TetrisRule.move(Tetris, {
        x: Tetris.centerPoint.x,
        y: Tetris.centerPoint.y - 1
    });
})


$("#btnLeft").click(function () {
    //更改中心点坐标
    TetrisRule.moveDirectly(Tetris, MoveDirection.Left);
})

$("#btnRight").click(function () {
    //更改中心点坐标
    TetrisRule.moveDirectly(Tetris, MoveDirection.Right);
})
