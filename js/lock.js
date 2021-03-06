
var dom = document.getElementById('clock');
var ctx = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width / 200;
function drawBackground () {
ctx.save();
ctx.translate(r, r);//把圆心定位到正方形的中心
ctx.beginPath();//创建一个起始路径
ctx.lineWidth = 10 * rem;
ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
ctx.stroke();//绘制路径

var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3]
ctx.font = 18 * rem + 'px Arial';//字体样式
ctx.textAlign = "center";//水平居中
ctx.textBaseline = 'middle';//垂直居中
hourNumbers.forEach(function (number, i) {
var rad = i * 2 * Math.PI / 12;
var x = Math.cos(rad) * (r - 30 * rem);
var y = Math.sin(rad) * (r - 30 * rem);
ctx.fillText(number, x, y)//文字填充
});
for (var i = 0; i < 60; i++) {
var rad = i * 2 * Math.PI / 60;
var x = Math.cos(rad) * (r - 18 * rem);
var y = Math.sin(rad) * (r - 18 * rem);
ctx.beginPath();//再画要再创建一个起始路径
if (i % 5 === 0) {
    ctx.fillStyle = '#000';
    ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
} else {
    ctx.fillStyle = '#ccc';
    ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
}
ctx.fill(); //填充小圆
}

}
function drawHour (hour, minute) {
ctx.save();//保存画小时之前的画布状态
ctx.beginPath();
var rad = 2 * Math.PI / 12 * hour;
var mrad = 2 * Math.PI / 12 / 60 * minute;
ctx.rotate(rad + mrad);
ctx.lineWidth = 6 * rem;
ctx.lineCap = 'round';
ctx.moveTo(0, 10 * rem);
ctx.lineTo(0, -r / 2);
ctx.stroke();
ctx.restore();//画完之后返回到画小时之前的画布状态
}
function drawMinute (minute) {
ctx.save();
ctx.beginPath();
var rad = 2 * Math.PI / 60 * minute;
ctx.rotate(rad);
ctx.lineWidth = 3 * rem;
ctx.lineCap = 'round';//设置或返回线条的结束端点样式
ctx.moveTo(0, 10 * rem);//起始点改变
ctx.lineTo(0, -r + 30 * rem);//画线条
ctx.stroke();
ctx.restore();
}
function drawSecond (second) {
ctx.save();
ctx.beginPath();
ctx.fillStyle = 'red'
var rad = 2 * Math.PI / 60 * second;
ctx.rotate(rad);
ctx.lineWidth = 2 * rem;
ctx.lineCap = 'round';//设置或返回线条的结束端点样式
ctx.moveTo(-2 * rem, 20 * rem);//起始点改变
ctx.lineTo(2 * rem, 20 * rem);
ctx.lineTo(1, -r + 18 * rem);
ctx.lineTo(-1, -r + 18 * rem);
ctx.fill();
ctx.restore();
}
function darwC () {
ctx.beginPath();
ctx.fillStyle = '#fff';
ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
ctx.fill();

}
function draw () {
ctx.clearRect(0, 0, width, height)
var now = new Date();
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();
drawBackground();
drawHour(hour, minute);
drawMinute(minute);
drawSecond(second);
darwC();
ctx.restore();
}
draw();
setInterval(draw, 1000)


