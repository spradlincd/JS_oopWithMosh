// this is an object literal - cannot be used to create multiple objs
// an issue only if it has a function
const circle = {
    radius: 1,
    location: {
        x: 1,
        y: 1
    },
    draw: function() {
        console.log('draw');
    }
};

circle.draw();

// let's try again
// factory function
function createCircle(radius) {
    return {
        radius: radius,
        draw: function() {
            console.log("draw");
        }
    };
}
//const circle = createCircle(1);

//let's use constructor function
//it is upper cased not because JS supports classes, but because of convention for constructors
function Circle(radius) {
    // here are my public variables
    this.radius = radius;

    // this is a private variable
    let defaultLocation = { x: 0, y: 0 };

    
    // this is a private function
    let computeOptimumLocation = function() {
        //...
    }
    
    // this is a public function
    this.draw = function() {
        this.computeOptimumLocation();
        console.log("draw");
    }

    // this allows users to simply use circle.defaultLocation as a GETTER
    Object.defineProperty(this, 'defaultLocation', {get:function() {  return defaultLocation;  }},
    {set: function(value) {
        if(!value.x || !value.y) throw new Error("Invalid location");
        defaultLocation = value;
    }});

}



//dynamically creating properties
circle.location = {x: 1};

const propertyName = 'location';
circle[propertyName] = {x: 1};

circle['location'] = {x: 1};

// dynamically deleting properties
delete circle.location;


for (let key in circle) {
    if (typeof circle[key] !== 'function')
        console.log(key, circle[key]);
}

const keys = Object.keys(circle);
console.log(keys);

if ('radius' in circle)
    console.log("Circle has a radius");

//Circle.length = number of objects
//const another = new Circle(1);
//another.draw();

const Circle1 = new Function('radius', `
        this.radius = radius;
        this.draw = function() {
            console.log("draw");
        }
    `);

// const circleEx = new Circle1(2);

//this is setting y to value of address of x
let x =  { value: 10 };
let y = x;
x.value = 20;

let num = 10; // this is a variable
console.log(num);
function increase(number) {
    number++;
}
increase(num);
console.log(num);
// lololol value of num is copied into parameter and the parameter is changed, not the original variable

let object = {value: 10}; // obs, this is an object
console.log(object.value);
function increase(obj) {
    obj.value++;
}
increase(object);
console.log(object.value);
// this is passed by reference


function Stopwatch() {
    // public variables
        

    // private variables
    let duration = 0;
    let currStart = 0;
    let currEnd = 0;
    let running = false;

    
    // public methods
    this.reset = function() {
        duration = 0;
        currStart = null;
        currEnd = null;
        running = false;
    };
    this.start = function() {
        //start with an error check
        if (running) throw new Error("Already running");

        currStart = new Date();
        running = true;
    };
    this.stop = function() {
        //start with an error check
        if (!running) throw new Error("Not currently running");

        currEnd = new Date();
        running = false;
        elapsed();
    };


    // private methods
    let elapsed = function() {
        const time = (currEnd.getTime() - currStart.getTime()) / 1000;
        duration += time;
        console.log(`elapsed time: ${duration}`);
    }


    // getters and setters
    Object.defineProperty(this, 'duration', {get: function() { return duration; }});
}
//const sw = new Stopwatch();
//console.log(sw.duration);

