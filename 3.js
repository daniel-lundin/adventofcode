
const input = 265149;

const directions = [
  [0, -1],
  [-1, 0],
  [0, 1],
  [1, 0]
];

function generateMemory(size) {
  const grid = Array.from({ length: (size + 1) * (size + 1) }).map(() => {
    return 0;
  });
  return grid;
}

function add(v1, v2) {
  return [v1[0] + v2[0], v1[1] + v2[1]];
}

const WIDTH = 1000;

function get(grid, x, y) {
  return grid[(x + WIDTH/2) + (y + WIDTH/2) * WIDTH];
}

function set(grid, x, y, value) {
  grid[(x + WIDTH/2) + (y + WIDTH/2) * WIDTH] = value;
}

function print(grid) {
  grid.forEach((value, index) => {
    process.stdout.write(`${value} `);
    if (index !== 0 && index % WIDTH === 0) {
      process.stdout.write('\n');
    }
  });
  process.stdout.write('\n');
}

const grid = generateMemory(WIDTH);
set(grid, 0, 0, 1);
set(grid, 1, 0, 2);

let direction = 0;
let desiredDirection = 1;
let currentPosition = [1, 0];
let currentValue = 2;

function step() {
  const nextDesired = add(currentPosition, directions[desiredDirection]);
  if (!get(grid, nextDesired[0], nextDesired[1])) {
    set(grid, nextDesired[0], nextDesired[1], ++currentValue);
    direction = (direction + 1) % directions.length;
    desiredDirection = (desiredDirection + 1) % directions.length;
    currentPosition = nextDesired;
  } else {
    const nextPosition = add(currentPosition, directions[direction]);
    set(grid, nextPosition[0], nextPosition[1], ++currentValue);
    currentPosition = nextPosition;
  }
}

Array.from({ length: input - 2 }).forEach(step);

console.log('Answer:', Math.abs(currentPosition[0]) + Math.abs(currentPosition[1]));
