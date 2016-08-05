var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Shape = (function () {
    function Shape(x, y, context) {
        this._context = context;
        this._x = x;
        this._y = y;
        this._interval = Math.floor((Math.random() * 100) + 1);
        this._color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
    }
    Object.defineProperty(Shape.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "interval", {
        get: function () {
            return this._interval;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "color", {
        get: function () {
            return this._color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "context", {
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    Shape.prototype.move = function () {
        this._x += 5;
        this._y += 5;
        this._interval = Math.floor((Math.random() * 30) + 1);
    };
    Shape.prototype.startAnimation = function () {
        setInterval(this.drawObject, this.interval);
    };
    return Shape;
}());
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(x, y, context) {
        _super.call(this, x, y, context);
        this._width = Math.floor((Math.random() * 100) + 1);
        this._height = Math.floor((Math.random() * 100) + 1);
        this._previous = null;
    }
    Object.defineProperty(Rectangle.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "previous", {
        get: function () {
            return this._previous;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.drawObject = function () {
        this.context.clearRect(this.x, this.y, this.width, this.height);
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.x += 20;
        this.y += 20;
        this.context.rect(this.x, this.y, this.width, this.height);
        this.context.closePath();
        this.context.fill();
    };
    return Rectangle;
}(Shape));
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(x, y, context) {
        _super.call(this, x, y, context);
        this._radius = Math.floor((Math.random() * 100) + 1);
    }
    Object.defineProperty(Circle.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        enumerable: true,
        configurable: true
    });
    Circle.prototype.drawObject = function () {
        this.context.clearRect(this.x, this.y, this.radius * 2, this.radius * 2);
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.x += 20;
        this.y += 20;
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
    };
    return Circle;
}(Shape));
var Draw = (function () {
    function Draw() {
        this.shapes = [];
        this.element = document.getElementById("myCanvas");
        this.context = this.element.getContext("2d");
        this.shapes = [];
    }
    Draw.prototype.draw = function (x, y) {
        var shape = Math.floor((Math.random() * 2) + 1);
        if (shape === 1)
            this.shapes.push(new Circle(x, y, this.context));
        else
            this.shapes.push(new Rectangle(x, y, this.context));
        this.shapes[this.shapes.length - 1].drawObject();
    };
    return Draw;
}());
window.onload = function () {
    var drawObj = new Draw();
    var canvas = document.getElementById('myCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.onclick = function (event) {
        drawObj.draw(event.clientX, event.clientY);
        //c.startAnimation();    
    };
};
