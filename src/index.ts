import {Square} from "./core/Square";
import $ from "jquery"
import {SquarePageViewer} from "./core/viewer/SquarePageViewer";


const sq = new Square()

sq.viewer = new SquarePageViewer(sq, $('#root'))

sq.color = "red"
sq.point = {x: 1, y: 2}
