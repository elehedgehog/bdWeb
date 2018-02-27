export class FlowChart {
  constructor(width, height) {
    this._width = width;
    this._height = height;
    this._canvas = null;
    this._context = null;
    this._aniCanvas = null;
    this._aniCtx = null;
    this._backCanvas = null;
    this._backCtx = null;

    this._dataIn = [];   //存放方向为流入的点
    this._dataOut = [];  //存放方向为流出的点

    this._maxInLen = 0;
    this._maxOutLen = 0;
    this._stepIn = 0;
    this._stepOut = 0;
    this._maxLen = 0;
    this._step = 0;

    this._center = {
      x: Math.floor(width/2),
      y: Math.floor(height/2)
    };

    //默认参数
    this._styles = {
      //线条类型 solid、dashed、dotted
      lineType: 'solid',
      //线条宽度
      lineWidth: 1,
      //线条颜色
      colors: ['#F9815C', '#F8AB60', '#EDCC72', '#E2F194', '#94E08A', '#4ECDA5'],
      //移动点半径
      moveRadius: 2,
      //移动点颜色
      fillColor: '#fff',
      //移动点阴影颜色
      shadowColor: '#fff',
      //移动点阴影大小
      shadowBlur: 10
    };
  }

  init(id, data) {
    this._data = data;

    const width = this._width,
          height = this._height,
          options = this._styles;
    let cv = this.creatCanvas(width, height);
    this._canvas = cv.canvas;
    this._context = cv.context;
    document.querySelector(id).appendChild(this._canvas);

    let aniCv = this.creatCanvas(width, height);
    this._aniCanvas = aniCv.canvas;
    this._aniCtx = aniCv.context;
    document.querySelector(id).appendChild(this._aniCanvas);

    let backCv = this.creatCanvas(width, height);
    this._backCanvas = backCv.canvas;
    this._backCtx = backCv.context;

    this._aniCtx.globalAlpha = 0.95;
    this._backCtx.globalCompositeOperation = 'copy';

    this.drawCenterCircle(this._context);

    for(let el of data) {
      //let index = Math.floor((Math.random()*options.colors.length));
      //el.color = options.colors[index];
      el.radius = 0;
      el.step = 0;
      el.maxRadius = this._getRadius(Number(el.reqCount));
      el.pos = this.revisePosition(this._getRandomPos());

      if(el.pos.y < el.maxRadius) {
        el.pos.y += (el.maxRadius + 5);
      }
      if((el.pos.y + el.maxRadius) > height) {
        el.pos.y -= (el.maxRadius + 5);
      }
      if(el.pos.x < el.maxRadius) {
        el.pos.x += (el.maxRadius + 5);
      }
      if((el.pos.x + el.maxRadius) > width) {
        el.pos.x -= (el.maxRadius + 5);
      }

      if(el.dir === 'in') {
        el.color = 'rgba(255, 218, 36, 1)';
        el.markerColor = 'rgba(255, 218, 36, .5)';
        el.path = this.getPointList(el.pos, this._center);
        this._dataIn.push(el);
        if(el.path.length > this._maxInLen)
          this._maxInLen = el.path.length;
      } else {
        el.color = 'rgba(94, 180, 255, 1)';
        el.markerColor = 'rgba(94, 180, 255, .5)';
        el.path = this.getPointList(this._center, el.pos);
        this._dataOut.push(el);
        if(el.path.length > this._maxOutLen)
          this._maxOutLen = el.path.length;
      }

      if(el.path.length > this._maxLen)
        this._maxLen = el.path.length;

      this.drawLinePath(this._context, el);
      this.drawCircle(this._context, el);
    }

    let self = this;
    (function drawFrame() {
      requestAnimationFrame(drawFrame);
      self.render();
    })();
  }

  requestAnimationFrame() {
    let global = typeof window === 'undefined' ? {} : window;
    return global.requestAnimationFrame || global.mozRequestAnimationFrame || global.webkitRequestAnimationFrame || global.msRequestAnimationFrame || function (callback) {
        return global.setTimeout(callback, 1000 / 960);
      };
  }

  render() {
    //this._step += 1;

    let aniCanvas = this._aniCanvas,
        aniCtx = this._aniCtx;
    //先将主canvas的图像缓存到临时canvas中
    this._backCtx.drawImage(aniCanvas, 0, 0, aniCanvas.width, aniCanvas.height);
    //清除主canvas上的图像
    aniCtx.clearRect(0, 0, aniCanvas.width, aniCanvas.height);
    //在主canvas上画新圆
    /*this._stepIn++;
    for(let el of this._dataIn) {
      if(this._stepIn === 1 || el.radius < el.maxRadius)
        this.drawSpreadCircle(aniCtx, el);
      if((el.step+1) === el.path.length && this._stepIn < this._maxInLen)
        continue;
      this.drawMoveCircle(aniCtx, el);
    }
    if(this._stepIn >= this._maxInLen)
      this._stepIn = 0;

    this._stepOut++;
    for(let el of this._dataOut) {
      if(this._stepOut === 1 || el.radius < el.maxRadius)
        this.drawSpreadCircle(aniCtx, el);
      if((el.step+1) === el.path.length && this._stepOut < this._maxOutLen)
        continue;
      this.drawMoveCircle(aniCtx, el);
    }
    if(this._stepOut >= this._maxOutLen)
      this._stepOut = 0;*/
    /*if(this._stepIn < this._maxInLen || this._stepOut >= this._maxOutLen) {
      this._stepIn++;
      for(let el of this._dataIn) {
        this.drawSpreadCircle(aniCtx, el);
        if((el.step+1) === el.path.length && this._stepIn < this._maxInLen)
          continue;
        this.drawMoveCircle(aniCtx, el);
      }
      if(this._stepIn >= this._maxInLen)
        this._stepOut = 0;
    } else {
      this._stepOut++;
      for(let el of this._dataOut) {
        this.drawSpreadCircle(aniCtx, el);
        if((el.step+1) === el.path.length && this._stepOut < this._maxOutLen)
          continue;
        this.drawMoveCircle(aniCtx, el);
      }
      if(this._stepOut >= this._maxOutLen)
        this._stepIn = 0;
    }*/
    /*for(let el of this._data) {
      if(this._step === 1 || el.radius < el.maxRadius)
        this.drawSpreadCircle(aniCtx, el);
      if((el.step+1) == el.path.length && this._step < this._maxLen)
        continue;
      this.drawMoveCircle(aniCtx, el);
    }

    if(this._step >= this._maxLen) {
      this._step = 0;
    }*/
    for(let el of this._data) {
      //this.drawSpreadCircle(aniCtx, el);
      this.drawMoveCircle(aniCtx, el);
    }
    //等新圆画完后，再把临时canvas的图像绘制回主canvas中
    aniCtx.drawImage(this._backCanvas, 0, 0, this._backCanvas.width, this._backCanvas.height);
  }

  creatCanvas(width, height) {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext("2d");
    canvas.style.cssText = 'position:absolute;' + 'left:0;' + 'top:0;';
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    return { canvas, context };
  }

  revisePosition(pos) {
    const center = this._center;
    let self = this;
    (function revise() {
      let disX = Math.abs(pos.x - center.x),
          disY = Math.abs(pos.y - center.y);
      if(disX < 100 && disY < 100) {
        pos = self._getRandomPos();
        revise();
      }
    })();

    return pos;
  }

  drawSpreadCircle(context, data) {
    let radius = data.radius;
    let pos = data.pos;

    context.save();
    context.beginPath();
    context.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    context.closePath();
    context.lineWidth = 2;
    context.strokeStyle = data.color; //颜色
    context.stroke();
    context.restore();
    radius += 0.5; //每一帧半径增加0.5

    //半径radius大于图标最大半径时，重置为0
    data.radius = radius > data.maxRadius ? 0 : radius;
  }

  drawCenterCircle(context) {
    let center = this._center;

    context.fillStyle = 'rgba(255, 255, 255, .4)';
    context.shadowColor = '#fff';
    context.shadowBlur = 25;
    context.beginPath();
    context.arc(center.x, center.y, 10, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }

  drawCircle(context, data) {
    let options = this._styles;
    let pos = data.pos;

    context.fillStyle = data.markerColor; //颜色
    context.shadowColor = data.color;
    context.shadowBlur = data.maxRadius + 5;
    context.beginPath();
    context.arc(pos.x, pos.y, data.maxRadius, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }

  drawLinePath(context, data) {
    let pointList = data.path;
    let len = pointList.length;
    let options = this._styles;

    context.beginPath();
    context.lineWidth = options.lineWidth;
    context.strokeStyle = data.color;

    if (!options.lineType || options.lineType == 'solid') {
      context.moveTo(pointList[0][0], pointList[0][1]);
      for (let i = 0; i < len; i++) {
        context.lineTo(pointList[i][0], pointList[i][1]);
      }
    } else if (options.lineType == 'dashed' || options.lineType == 'dotted') {
      for (let i = 1; i < len; i += 2) {
        context.moveTo(pointList[i - 1][0], pointList[i - 1][1]);
        context.lineTo(pointList[i][0], pointList[i][1]);
      }
    }
    context.stroke();
  }

  drawMoveCircle(context, data) {
    let pointList = data.path;
    let options = this._styles;
    context.save();
    context.fillStyle = options.fillColor;
    context.shadowColor = options.shadowColor;
    context.shadowBlur = options.shadowBlur;
    context.beginPath();
    context.arc(pointList[data.step][0], pointList[data.step][1], options.moveRadius, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
    context.restore();
    data.step += 1;
    if (data.step >= pointList.length) {
      data.step = 0;
    }
  }

  getPointList(from, to) {
    let points = [[from.x, from.y], [to.x, to.y]];
    let ex = points[1][0];
    let ey = points[1][1];
    points[3] = [ex, ey];
    points[1] = this.getOffsetPoint(points[0], points[3]);
    points[2] = this.getOffsetPoint(points[3], points[0]);
    points = this.smoothSpline(points, false);
    //修正最后一点在插值产生的偏移
    points[points.length - 1] = [ex, ey];
    return points;
  }

  getOffsetPoint(start, end) {
    let distance = this._getDistance(start, end) / 3; //除以3？
    let angle, dX, dY;
    let mp = [start[0], start[1]];
    let deltaAngle = -0.2; //偏移0.2弧度
    if (start[0] != end[0] && start[1] != end[1]) {
      //斜率存在
      let k = (end[1] - start[1]) / (end[0] - start[0]);
      angle = Math.atan(k);
    } else if (start[0] == end[0]) {
      //垂直线
      angle = (start[1] <= end[1] ? 1 : -1) * Math.PI / 2;
    } else {
      //水平线
      angle = 0;
    }
    if (start[0] <= end[0]) {
      angle -= deltaAngle;
      dX = Math.round(Math.cos(angle) * distance);
      dY = Math.round(Math.sin(angle) * distance);
      mp[0] += dX;
      mp[1] += dY;
    } else {
      angle += deltaAngle;
      dX = Math.round(Math.cos(angle) * distance);
      dY = Math.round(Math.sin(angle) * distance);
      mp[0] -= dX;
      mp[1] -= dY;
    }
    return mp;
  }

  smoothSpline(points, isLoop) {
    let len = points.length;
    let ret = [];
    let distance = 0;
    for (let i = 1; i < len; i++) {
      distance += this._getDistance(points[i - 1], points[i]);
    }
    let segs = distance / 2;
    segs = segs < len ? len : segs;
    for (let i = 0; i < segs; i++) {
      let pos = i / (segs - 1) * (isLoop ? len : len - 1);
      let idx = Math.floor(pos);
      let w = pos - idx;
      let p0;
      let p1 = points[idx % len];
      let p2;
      let p3;
      if (!isLoop) {
        p0 = points[idx === 0 ? idx : idx - 1];
        p2 = points[idx > len - 2 ? len - 1 : idx + 1];
        p3 = points[idx > len - 3 ? len - 1 : idx + 2];
      } else {
        p0 = points[(idx - 1 + len) % len];
        p2 = points[(idx + 1) % len];
        p3 = points[(idx + 2) % len];
      }
      let w2 = w * w;
      let w3 = w * w2;

      ret.push([this._interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3), this._interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)]);
    }
    return ret;
  }

  _interpolate(p0, p1, p2, p3, t, t2, t3) {
    let v0 = (p2 - p0) * 0.5;
    let v1 = (p3 - p1) * 0.5;
    return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
  }

  _getDistance(p1, p2) {
    return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]));
  }

  _getRandomPos() {
    let x = Math.floor(Math.random()*this._width),
        y = Math.floor(Math.random()*this._height);

    return { x, y };
  }

  _getRadius(v) {
    let r = 5;
    if(v > 10 && v <= 30)
      r = 8;
    else if(v > 30 && v <= 100)
      r = 12;
    else if(v > 100 && v <= 500)
      r = 15;
    else if(v > 500)
      r = 20;

    return r;
  }
}
