
var font = "Encode Sans";
/*
  Draw retangular with rounded corner
  @param ctx: context
  @param x: upper X (number)
  @param y: upper Y (number)
  @param width: width (number)
  @param height: width (number)
  @param color: color (string)
  @param radius: corner radius (number)
*/
function roundRect(ctx, x, y, width, height, color, radius = 9) {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};

    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    ctx.fill();
}

/*
  Draw Bar with label and data
  @param ctx: context
  @param x: upper X (number)
  @param y: upper Y (number)
  @param width: width (number)
  @param height: width (number)
  @param color: color (string)
  @param data: number of representing bar (number)
  @param label: label (string)
*/
function drawBar(ctx, upperX, upperY, width, height, color, data, label) {
    //console.log(upperX, upperY, width, height);
   ctx.fillStyle = color;
   let X = upperX;
   let Y = upperY - 23;

   //ctx.fillRect(X, Y, width, height);
   roundRect(ctx, X, Y, width, height, color);

   ctx.font=`15px ${font}`;
   //ctx.font = `bold 13pt ${font}`
   // text align
   let data_width = ctx.measureText(data).width;
   let data_x = Math.round((X * 2 + width) / 2 - data_width / 2)
   ctx.fillText(data, data_x, Y - 5);

   // text align
   let label_width = ctx.measureText(label).width;
   let label_x = Math.round((X * 2 + width) / 2 - label_width / 2)
   ctx.fillStyle = "#3e3e3e";
   ctx.font=`15px ${font}`;
   ctx.fillText(label, label_x, upperY + height);
}


/*
Top function to draw barchart, accepting options
@param options: Object
*/
function BarChart(options) {
    var self = this;
    self.options = options;
    self.canvas = options.canvas;
    self.ctx = self.canvas.getContext("2d");
    self.colors = options.colors;



    self.draw = function() {
        self.canvas.height = Math.round($('.card').height() * 0.9);
        self.canvas.width = Math.round($('.card').width() * 0.7);
        console.log("width ",self.canvas.width);
        //console.log(self.canvas.width, self.canvas.height);
        let maxVal = 0;
        for (let categ in self.options.data) {
            maxVal = Math.max(maxVal, self.options.data[categ]);
        }
        let canvasActualHeight = Math.round((self.canvas.height - self.options.padding * 2) * 0.7);
        let canvasActualWidth = self.canvas.width - self.options.padding * 2;
        //console.log(self.canvas.width, self.canvas.height);

        // draw the bars
        let barIndex = 0;
        let numberOfBars = Object.keys(self.options).length;
        let barSize = Math.round((canvasActualWidth) / numberOfBars);
        let barWidth = Math.round(barSize * 0.5);
        if (barWidth > 60)  barWidth = 60;
        console.log(barWidth);

        for (let categ in self.options.data) {
            let val = self.options.data[categ];
            // get porpotional height for each bar
            let barHeight = Math.round(canvasActualHeight * val / maxVal);
            drawBar(
                self.ctx,
                self.options.padding + barIndex * barSize + 40, // 40 is the offset
                self.canvas.height - barHeight - self.options.padding,
                barWidth,
                barHeight,
                self.colors[barIndex++],
                val,
                categ.toString()
            );
        }
    }
}
