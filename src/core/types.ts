import {SquareGroup} from "./SquareGroup";
import {Game} from "./Game";

export interface Point {
    readonly x: number;
    readonly y: number;
}

export interface IViewer {
    /**
     * 显示
     */
    show(): void;

    /**
     * 隐藏
     */
    remove(): void;
}

export type Shape = Point[]

export enum MoveDirection {
    Left,
    Right,
    Down,
}

export enum GameStatus {
    init,
    playing,
    pause,
    over,
}

export interface GameViewer {
    showNext(tetris: SquareGroup): void;
    switch(tetris: SquareGroup): void

    init(game: Game): void;
    showScore(score: number): void;
    onGamePause(): void;
    onGameStart(): void;
    onGameOver(): void;
}


