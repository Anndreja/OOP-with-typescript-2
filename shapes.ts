abstract class Shape {
   	private _x: number;
    private _y: number;
    private _color: string;
    private _interval: number;
    private _context: CanvasRenderingContext2D;

    constructor(x: number, y: number, context: CanvasRenderingContext2D) {
        this._context = context;
        this._x = x;
        this._y = y;
        this._interval = Math.floor((Math.random() * 100) + 1);
        this._color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
    }

    get x(): number {
        return this._x;
    }
    get y(): number {
        return this._y;
    }
    get interval(): number {
        return this._interval;
    }
    get color(): string {
        return this._color;
    }
    get context(): CanvasRenderingContext2D {
        return this._context;
    }
    abstract drawObject();
    move() {
        this._x += 5;
        this._y += 5;
        this._interval = Math.floor((Math.random() * 30) + 1);
    }
    startAnimation() {
        setInterval(this.drawObject, this.interval);
    }
}

class Rectangle extends Shape {
    private _width: number;
    private _height: number;
    private _previous: Rectangle;

    constructor(x: number, y: number, context: CanvasRenderingContext2D) {
        super(x, y, context);
        this._width = Math.floor((Math.random() * 100) + 1);
        this._height = Math.floor((Math.random() * 100) + 1);
        this._previous = null;

    }

    get width(): number {
        return this._width;
    }
    get height(): number {
        return this._height;
    }
    get previous(): Rectangle {
        return this._previous;
    }

    drawObject() {
        this.context.clearRect(this.x, this.y, this.width, this.height);
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.x += 20;
        this.y += 20;
        this.context.rect(this.x, this.y, this.width, this.height);
        this.context.closePath();
        this.context.fill();

    }
}

class Circle extends Shape {
    private _radius: number;

    constructor(x: number, y: number, context: CanvasRenderingContext2D) {
        super(x, y, context);
        this._radius = Math.floor((Math.random() * 100) + 1);
    }

    get radius(): number {
        return this._radius;
    }

    drawObject() {
        this.context.clearRect(this.x,
            this.y,
            this.radius * 2,
            this.radius * 2);
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.x += 20;
        this.y += 20;
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
    }
}

class Draw {
    private element: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private shapes: Array<Shape> = [];

    constructor() {
        this.element = <HTMLCanvasElement>document.getElementById("myCanvas");
        this.context = this.element.getContext("2d");
        this.shapes = [];
    }

    draw(x: number, y: number) {
        let shape: number = Math.floor((Math.random() * 2) + 1);
        if (shape === 1)
            this.shapes.push(new Circle(x, y, this.context));
        else
            this.shapes.push(new Rectangle(x, y, this.context));

        this.shapes[this.shapes.length - 1].drawObject();
    }
}

window.onload = function () {
    let drawObj: Draw = new Draw();
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('myCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.onclick = function (event: MouseEvent) {
        drawObj.draw(event.clientX, event.clientY);
        //c.startAnimation();    
    }
};