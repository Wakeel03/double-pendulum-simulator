let x1 = 0;
let x2 = 0;
let y1 = 0;
let y2 = 0;
let m1 = 20;
let m2 = 20;
let a1 = 2;
let a2 = 2;
let a1_v = 0;
let a2_v = 0;
let a1_a = 0;
let a2_a = 0;
let r1 = 150;
let r2 = 150;
let g = 1;
let W = 800;
let H = 800;
let dH = 2;

let m1_slider;
let m2_slider;
let g_slider;
let r1_slider;
let r2_slider;
let ar_slider;

let sliders = ["Mass 1", "Mass 2", "Gravity", "Length 1", "Length 2", "Air Resistance"];

let grapX;
let prev_x2 = -1;
let prev_y2 = -1;

function setup() {
  createCanvas(W, H);
  pixelDensity(1);
  grapX = createGraphics(width, height);
  grapX.background(255);
  grapX.translate(W/2, H/dH);
  
  m1_slider = createSlider(10, 50, 20);
  m1_slider.position(120, 0);
  m1_slider.style('width', '120px');
  
  m2_slider = createSlider(10, 50, 20);
  m2_slider.position(120, 15);
  m2_slider.style('width', '120px');
  
  g_slider = createSlider(0, 2, 1);
  g_slider.position(120, 30);
  g_slider.style('width', '120px');
  
  r1_slider = createSlider(50, 200, 150);
  r1_slider.position(120, 45);
  r1_slider.style('width', '120px');
  
  r2_slider = createSlider(50, 200, 150);
  r2_slider.position(120, 60);
  r2_slider.style('width', '120px');
  
  ar_slider = createSlider(0, 10, 0);
  ar_slider.position(120, 75);
  ar_slider.style('width', '120px');
}

function draw() {
  
  fill(0, 150, 53);
  
  m1 = m1_slider.value();
  m2 = m2_slider.value();
  g = g_slider.value();
  r1 = r1_slider.value();
  r2 = r2_slider.value();
  airR = ar_slider.value();
  
  background(255);
  imageMode(CORNER);
  image(grapX, 0, 0, width, height);
  
  n1 = -g * (2 * m1 + m2) * sin(a1);
  n2 = -m2 * g * sin(a1 - 2 * a2);
  n3 = -2 * sin(a1 - a2) * m2 * (a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2));
  
  d1 = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  
  a1_a = (n1 + n2 + n3) / d1;
  
  n2 = 2 * sin(a1 - a2) * (a1_v * a1_v * r1 * (m1 + m2) + g * (m1 + m2) * cos(a1) + a2_v * a2_v * r2 * m2 * cos(a1 - a2));
  
  d2 = (r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2)));
  
  a2_a = n2 / d2;
  
  //background(220);
  
  translate(W/2, H/dH);
  
  x1 = r1 * sin(a1);
  y1 = r1 * cos(a1);
  
  x2 = x1 + (r2 * sin(a2));
  y2 = y1 + (r2 * cos(a2));
  
  line(0, 0, x1, y1);
  circle(x1, y1, m1);
  
  line(x1, y1, x2, y2);
  circle(x2, y2, m2);
  
  a1_v += a1_a;
  a2_v += a2_a;
  
  //Air resistance
  a1_v *= 1 - airR/500;
  a2_v *= 1 - airR/500;
  
  a1 += a1_v;
  a2 += a2_v;
  
  for (let i = 0; i < sliders.length; ++i){
    fill(0, 102, 153);
    textSize(12);
    text(sliders[i], -W/2 + 10, -H/dH + i * 15, 100, 15);      
  }
  
  grapX.stroke(0);
  if (frameCount > 1) {
    grapX.line(prev_x2, prev_y2, x2, y2);
  }
  
  prev_x2 = x2;
  prev_y2 = y2;
}
