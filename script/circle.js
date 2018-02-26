var font = "Encode Sans";

/*
Top function to create circle chart
*/
function createChart() {
    let totalWidth = Math.round($('.status_row').width() - $('.status_desc').width());
    let totalHeight = Math.round($('.status_row').height());

    let padding = 10;
    let cnt = Object.keys(data[Object.keys(data)[0]]).length;
    let r = Math.round((totalWidth - padding * 2) * 0.95 / cnt / 2);
    console.log("r is", r);
    //if (r < 35) r = 35;
    //let r = Math.round(totalHeight / 2 * 0.95);

    for (let categ in data) {
        let can = document.getElementById(categ+'_chart');
        can.width = totalWidth;
        can.height = totalHeight;
        createOne(can, data[categ], padding, r, Math.round(totalHeight) / 2);
    }

}

/*
create one colume of circles
@param canvas: canvas
@param options: object
@param r : raidus of the circle (number)
@param Y : height of container that containing that circle (number)
*/
function createOne(canvas, options, padding, r, Y) {
    let ctx = canvas.getContext('2d');
    let startX = r + padding;
    for (let c in options) {
        if (r > Y) {
            r = Math.round(Y * 0.9);
        }
        drawCircle(ctx, startX, Y, r, options[c], c);
        startX = startX + 2 * r + 5;
    }
}

/*
draw one circle
@param ctx: canvas 2d context
@param x: x of circle (number)
@param y: y of circle (number)
@param r: radius (number)
@content: inner content of the circle (object)
@title: inner content(title) of the circle (string)
*/

function drawCircle(ctx, x, y, r, content, title) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle=content.color;
    ctx.fill();

    ctx.font=`15px ${font}`;
    let w1 = ctx.measureText(title).width;
    ctx.fillStyle='#FFFFFF';
    ctx.fillText(title, Math.round(x - w1/2), y - 5);
    let w2 = String(content.num);
    ctx.fillStyle="#FFFFFF";

    let w2x = Math.round(x - ctx.measureText(w2).width / 2);
    let w2y = y + 15;
    ctx.fillText(w2, w2x, w2y);
}
