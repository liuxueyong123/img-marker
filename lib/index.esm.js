/*! *****************************************************************************
Copyright (c) Microsoft Corporation.
Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var t = function(e, i) {
  return (
    (t =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(t, e) {
          t.__proto__ = e;
        }) ||
      function(t, e) {
        for (var i in e)
          Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
      }),
    t(e, i)
  );
};
var e = function() {
  return (
    (e =
      Object.assign ||
      function(t) {
        for (var e, i = 1, s = arguments.length; i < s; i++)
          for (var n in (e = arguments[i]))
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t;
      }),
    e.apply(this, arguments)
  );
};
function i(t, e, i) {
  if (i || 2 === arguments.length)
    for (var s, n = 0, a = e.length; n < a; n++)
      (!s && n in e) ||
        (s || (s = Array.prototype.slice.call(e, 0, n)), (s[n] = e[n]));
  return t.concat(s || e);
}
var s,
  n,
  a,
  o = new ((function() {
    function t() {
      this.eventTree = new Map();
    }
    return (
      (t.prototype.on = function(t, e) {
        var s,
          n = null !== (s = this.eventTree.get(t)) && void 0 !== s ? s : [];
        this.eventTree.set(t, i(i([], n, !0), [e], !1));
      }),
      (t.prototype.emit = function(t) {
        for (var e, i = [], s = 1; s < arguments.length; s++)
          i[s - 1] = arguments[s];
        for (
          var n = 0,
            a = null !== (e = this.eventTree.get(t)) && void 0 !== e ? e : [];
          n < a.length;
          n++
        ) {
          a[n].apply(null, i);
        }
      }),
      (t.prototype.off = function(t, e) {
        var i,
          s = null !== (i = this.eventTree.get(t)) && void 0 !== i ? i : [],
          n = s.findIndex(function(t) {
            return t === e;
          });
        s.splice(n, 1), this.eventTree.set(t, s);
      }),
      t
    );
  })())();
!(function(t) {
  t[(t.rect = 1)] = "rect";
})(s || (s = {})),
  (function(t) {
    (t[(t.edit = 0)] = "edit"), (t[(t.rect = 1)] = "rect");
  })(n || (n = {})),
  (function(t) {
    (t.Add = "add"),
      (t.Select = "select"),
      (t.Load = "load"),
      (t.Update = "update");
  })(a || (a = {}));
var r = function() {
    var t;
    return null === (t = window.navigator) || void 0 === t
      ? void 0
      : t.userAgent.includes("Mobile");
  },
  h = (function(e) {
    function i(t) {
      var i = e.call(this, t) || this;
      return (i.type = s.rect), (i.type = s.rect), i;
    }
    return (
      (function(e, i) {
        if ("function" != typeof i && null !== i)
          throw new TypeError(
            "Class extends value " + String(i) + " is not a constructor or null"
          );
        function s() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((s.prototype = i.prototype), new s()));
      })(i, e),
      Object.defineProperty(i.prototype, "ctrlsData", {
        get: function() {
          var t = this.coor,
            e = t[0],
            i = e[0],
            s = e[1],
            n = t[1],
            a = n[0],
            o = n[1];
          return [
            [i, s],
            [i + (a - i) / 2, s],
            [a, s],
            [a, s + (o - s) / 2],
            [a, o],
            [i + (a - i) / 2, o],
            [i, o],
            [i, s + (o - s) / 2],
          ];
        },
        enumerable: !1,
        configurable: !0,
      }),
      (i.MIN_WIDTH = 10),
      (i.MIN_HEIGHT = 10),
      i
    );
  })(function(t) {
    (this.coor = []),
      (this.strokeStyle = "#FFE729"),
      (this.fillStyle = "rgba(255,231,41, 0.2)"),
      (this.lineWidth = 4),
      (this.type = s.rect),
      (this.active = !1),
      (this.creating = !1),
      (this.dragging = !1),
      (this.uuid = (function() {
        if ("object" == typeof crypto && "function" == typeof crypto.randomUUID)
          return crypto.randomUUID();
        var t = new Date().getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
          e
        ) {
          var i = 16 * Math.random();
          return (
            (i = (t + i) % 16 | 0),
            (t = Math.floor(t / 16)),
            ("x" === e ? i : (3 & i) | 8).toString(16)
          );
        });
      })()),
      Object.assign(this, t);
  }),
  c = (function() {
    function t(t, e) {
      (this.CANVAS_WIDTH = 0),
        (this.CANVAS_HEIGHT = 0),
        (this.IMAGE_ORIGIN_WIDTH = 0),
        (this.IMAGE_ORIGIN_HEIGHT = 0),
        (this.IMAGE_WIDTH = 0),
        (this.IMAGE_HEIGHT = 0),
        (this.strokeStyle = "#FFE729"),
        (this.fillStyle = "rgba(255,231,41, 0.2)"),
        (this.lineWidth = 4),
        (this.activeStrokeStyle = "#FFE729"),
        (this.activeFillStyle = "rgba(255,231,41, 0.2)"),
        (this.ctrlStrokeStyle = "#505E72"),
        (this.ctrlFillStyle = "#fff"),
        (this.ctrlRadius = 4),
        (this.dataset = []),
        (this.image = new Image()),
        (this.currentMode = n.edit),
        (this.ctrlIndex = -1),
        (this.currentMousePoint = [0, 0]),
        (this.handleLoad = this.handleLoad.bind(this)),
        (this.handleMouseDown = this.handleMouseDown.bind(this)),
        (this.handelMouseMove = (function(t, e) {
          void 0 === e && (e = 200);
          var i = Date.now();
          return function() {
            for (var s = [], n = 0; n < arguments.length; n++)
              s[n] = arguments[n];
            if (Date.now() - i >= e)
              return (i = Date.now()), t.apply(void 0, s);
          };
        })(this.handelMouseMove.bind(this), 16.7)),
        (this.handelMouseUp = this.handelMouseUp.bind(this)),
        (this.handelKeyup = this.handelKeyup.bind(this));
      var i = "string" == typeof t ? document.querySelector(t) : t;
      i instanceof HTMLCanvasElement
        ? ((this.canvas = i),
          this.initSetting(),
          this.initEvents(),
          e && this.setImage(e))
        : console.warn("HTMLCanvasElement is required!");
    }
    return (
      Object.defineProperty(t.prototype, "activeShape", {
        get: function() {
          var t;
          return null !==
            (t = this.dataset.find(function(t) {
              return t.active;
            })) && void 0 !== t
            ? t
            : null;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.initSetting = function() {
        (this.ctx = this.ctx || this.canvas.getContext("2d", { alpha: !0 })),
          (this.CANVAS_WIDTH = this.canvas.clientWidth),
          (this.CANVAS_HEIGHT = this.canvas.clientHeight),
          (this.canvas.width = 1 * this.CANVAS_WIDTH),
          (this.canvas.height = 1 * this.CANVAS_HEIGHT),
          (this.canvas.style.width = this.CANVAS_WIDTH + "px"),
          (this.canvas.style.height = this.CANVAS_HEIGHT + "px"),
          this.ctx.scale(1, 1);
      }),
      (t.prototype.initEvents = function() {
        this.image.addEventListener("load", this.handleLoad),
          this.canvas.addEventListener("mousedown", this.handleMouseDown),
          this.canvas.addEventListener("mousemove", this.handelMouseMove),
          this.canvas.addEventListener("mouseup", this.handelMouseUp),
          document.body.addEventListener("keyup", this.handelKeyup);
      }),
      (t.prototype.destroy = function() {
        this.image.removeEventListener("load", this.handleLoad),
          this.canvas.removeEventListener("mousedown", this.handleMouseDown),
          this.canvas.removeEventListener("mousemove", this.handelMouseMove),
          this.canvas.removeEventListener("mouseup", this.handelMouseUp),
          document.body.removeEventListener("keyup", this.handelKeyup);
      }),
      (t.prototype.handleLoad = function() {
        (this.IMAGE_ORIGIN_WIDTH = this.IMAGE_WIDTH = this.image.width),
          (this.IMAGE_ORIGIN_HEIGHT = this.IMAGE_HEIGHT = this.image.height),
          this.fitZoom(),
          this.update();
      }),
      (t.prototype.handleMouseDown = function(t) {
        var e,
          i,
          s,
          c = this;
        t.stopPropagation();
        var u = this.mergeEvent(t),
          l = u.mouseX,
          p = u.mouseY,
          d = u.mouseCX,
          v = u.mouseCY,
          f = r() && 2 === t.touches.length ? [d, v] : [l, p];
        if ((!r() && 1 === t.buttons) || (r() && 1 === t.touches.length)) {
          this.currentMousePoint = f;
          var y =
            null !==
              (i =
                null === (e = this.activeShape) || void 0 === e
                  ? void 0
                  : e.ctrlsData) && void 0 !== i
              ? i
              : [];
          if (
            ((this.ctrlIndex = y.findIndex(function(t) {
              return c.isPointInCircle(f, t, c.ctrlRadius);
            })),
            this.ctrlIndex > -1)
          )
            return void this.changeCursor("nwse-resize");
          if (this.currentMode > n.edit) {
            var I = void 0,
              g = [l, p];
            this.currentMode,
              n.rect,
              ((I = new h({ coor: [g, g] })).creating = !0),
              this.dataset.forEach(function(t) {
                t.active = !1;
              }),
              (I.active = !0),
              this.dataset.push(I);
          } else {
            var S = this.isHitOnShape(f),
              x = S.isOnShape,
              H = S.shape,
              M = S.index;
            x
              ? ((null === (s = this.activeShape) || void 0 === s
                  ? void 0
                  : s.uuid) !== H.uuid && o.emit(a.Select, H),
                this.dataset.map(function(t) {
                  return (t.active = t.uuid === H.uuid);
                }),
                (H.dragging = !0),
                this.dataset.splice(M, 1),
                this.dataset.push(H),
                this.changeCursor("move"))
              : this.activeShape && (this.activeShape.active = !1);
          }
          this.update();
        }
      }),
      (t.prototype.handelMouseMove = function(t) {
        var e;
        t.stopPropagation();
        var i = this.mergeEvent(t),
          a = i.mouseX,
          o = i.mouseY,
          c = i.mouseCX,
          u = i.mouseCY,
          l = r() && 2 === t.touches.length ? [c, u] : [a, o],
          p = this.isHitOnShape(l),
          d = p.isOnShape,
          v = p.shape;
        if (
          (this.ctrlIndex > -1
            ? this.changeCursor("nwse-resize")
            : this.currentMode > n.edit
            ? this.changeCursor("copy")
            : d
            ? this.changeCursor(v.active ? "move" : "pointer")
            : this.changeCursor("default"),
          ((!r() && 1 === t.buttons) || (r() && 1 === t.touches.length)) &&
            (null === (e = this.activeShape) || void 0 === e ? void 0 : e.type))
        ) {
          if (this.ctrlIndex > -1) {
            if (this.activeShape.type === s.rect) {
              var f = this.activeShape.coor,
                y = f[0],
                I = y[0],
                g = y[1],
                S = f[1],
                x = S[0],
                H = S[1],
                M = [];
              switch (this.ctrlIndex) {
                case 0:
                  M = [
                    [a, o],
                    [x, H],
                  ];
                  break;
                case 1:
                  M = [
                    [I, o],
                    [x, H],
                  ];
                  break;
                case 2:
                  M = [
                    [I, o],
                    [a, H],
                  ];
                  break;
                case 3:
                  M = [
                    [I, g],
                    [a, H],
                  ];
                  break;
                case 4:
                  M = [
                    [I, g],
                    [a, o],
                  ];
                  break;
                case 5:
                  M = [
                    [I, g],
                    [x, o],
                  ];
                  break;
                case 6:
                  M = [
                    [a, g],
                    [x, o],
                  ];
                  break;
                case 7:
                  M = [
                    [a, g],
                    [x, H],
                  ];
              }
              var m = M[0],
                A = m[0],
                E = m[1],
                _ = M[1],
                T = _[0],
                C = _[1];
              T - A >= h.MIN_WIDTH &&
                C - E >= h.MIN_HEIGHT &&
                (this.activeShape.coor = [
                  [A, E],
                  [T, C],
                ]);
            }
          } else if (this.activeShape.dragging) {
            M = [];
            for (var G = !0, w = 0; w < this.activeShape.coor.length; w++) {
              var b = this.activeShape.coor[w],
                D = b[0],
                N = b[1],
                W = D + a - this.currentMousePoint[0],
                k = N + o - this.currentMousePoint[1];
              (W < 0 ||
                W > this.CANVAS_WIDTH ||
                k < 0 ||
                k > this.CANVAS_HEIGHT) &&
                (G = !1),
                M.push([W, k]);
            }
            G && (this.activeShape.coor = M);
          } else
            this.activeShape.creating &&
              (this.changeCursor("nwse-resize"),
              this.activeShape.type === s.rect &&
                this.activeShape.coor.splice(1, 1, [a, o]));
          (this.currentMousePoint = l), this.update();
        }
      }),
      (t.prototype.handelMouseUp = function(t) {
        var e;
        if (
          (t.stopPropagation(),
          (this.ctrlIndex = -1),
          (null === (e = this.activeShape) || void 0 === e ? void 0 : e.type) &&
            ((this.activeShape.dragging = !1), this.activeShape.creating))
        ) {
          if (this.activeShape.type === s.rect) {
            var i = this.activeShape.coor,
              n = i[0],
              r = n[0],
              c = n[1],
              u = i[1],
              l = u[0],
              p = u[1];
            Math.abs(r - l) < h.MIN_WIDTH || Math.abs(c - p) < h.MIN_HEIGHT
              ? this.dataset.pop()
              : ((this.activeShape.coor = [
                  [Math.min(r, l), Math.min(c, p)],
                  [Math.max(r, l), Math.max(c, p)],
                ]),
                (this.activeShape.creating = !1));
          }
          o.emit(a.Add, this.activeShape), this.update();
        }
      }),
      (t.prototype.handelKeyup = function(t) {
        var e;
        t.stopPropagation(),
          (null === (e = this.activeShape) || void 0 === e ? void 0 : e.type) &&
            (("Backspace" !== t.key && "Escape" !== t.key) ||
              this.deleteByUuid(this.activeShape.uuid));
      }),
      (t.prototype.fitZoom = function() {
        var t = this.CANVAS_WIDTH / this.CANVAS_HEIGHT,
          e = this.IMAGE_ORIGIN_WIDTH / this.IMAGE_ORIGIN_HEIGHT;
        t > e
          ? ((this.IMAGE_HEIGHT = this.CANVAS_HEIGHT),
            (this.IMAGE_WIDTH = this.CANVAS_HEIGHT * e))
          : ((this.IMAGE_WIDTH = this.CANVAS_WIDTH),
            (this.IMAGE_HEIGHT = this.CANVAS_WIDTH / e));
      }),
      (t.prototype.setData = function(t) {
        (this.dataset = t.map(function(t) {
          return t.type, s.rect, new h(t);
        })),
          this.update();
      }),
      (t.prototype.setMode = function(t) {
        this.currentMode = t;
      }),
      (t.prototype.on = function(t, e) {
        o.on(t, e);
      }),
      (t.prototype.deleteByUuid = function(t) {
        var e = this.dataset.findIndex(function(e) {
          return e.uuid === t;
        });
        e > -1 && (this.dataset.splice(e, 1), this.update());
      }),
      (t.prototype.update = function() {
        this.ctx.save(),
          this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT),
          this.drawShapes(),
          this.activeShape &&
            [s.rect].includes(this.activeShape.type) &&
            this.drawCtrlList(this.activeShape),
          this.ctx.restore(),
          o.emit(a.Update, this.dataset);
      }),
      (t.prototype.drawShapes = function() {
        for (var t = 0; t < this.dataset.length; t++) {
          var e = this.dataset[t];
          if (e.type === s.rect) this.drawRect(e);
        }
      }),
      (t.prototype.drawImg = function() {
        var t = (this.CANVAS_WIDTH - this.IMAGE_WIDTH) / 2,
          e = (this.CANVAS_HEIGHT - this.IMAGE_HEIGHT) / 2;
        this.ctx.drawImage(
          this.image,
          t,
          e,
          this.IMAGE_WIDTH,
          this.IMAGE_HEIGHT
        );
      }),
      (t.prototype.drawRect = function(t) {
        if (2 === t.coor.length) {
          var e = t.strokeStyle,
            i = t.fillStyle,
            s = t.active,
            n = t.creating,
            a = t.coor,
            o = t.lineWidth,
            r = a[0],
            h = r[0],
            c = r[1],
            u = a[1],
            l = u[0],
            p = u[1];
          this.ctx.save(),
            (this.ctx.lineWidth = o || this.lineWidth),
            (this.ctx.fillStyle = i || this.fillStyle),
            (this.ctx.strokeStyle =
              s || n ? this.activeStrokeStyle : e || this.strokeStyle);
          var d = l - h,
            v = p - c;
          this.ctx.fillRect(h, c, d, v),
            this.ctx.strokeRect(h, c, d, v),
            this.ctx.restore();
        }
      }),
      (t.prototype.drawCtrlList = function(t) {
        var e = this;
        t.ctrlsData.forEach(function(t, i) {
          e.drawCtrl(t);
        });
      }),
      (t.prototype.drawCtrl = function(t) {
        var e = t[0],
          i = t[1];
        this.ctx.save(),
          this.ctx.beginPath(),
          (this.ctx.fillStyle = this.ctrlFillStyle),
          (this.ctx.strokeStyle = this.ctrlStrokeStyle),
          this.ctx.arc(e, i, this.ctrlRadius, 0, 2 * Math.PI, !0),
          this.ctx.fill(),
          this.ctx.arc(e, i, this.ctrlRadius, 0, 2 * Math.PI, !0),
          this.ctx.stroke(),
          this.ctx.restore();
      }),
      (t.prototype.setImage = function(t) {
        (this.image.src = t),
          (this.image.crossOrigin = "anonymous"),
          (this.canvas.style.backgroundImage = 'url("'.concat(t, '")')),
          (this.canvas.style.backgroundSize = "contain"),
          (this.canvas.style.backgroundRepeat = "no-repeat"),
          (this.canvas.style.backgroundPosition = "center center"),
          (this.image.onload = function() {
            o.emit(a.Load);
          });
      }),
      (t.prototype.exportImg = function(t, e) {
        return (
          void 0 === t && (t = "image/png"),
          void 0 === e && (e = 1),
          this.activeShape && (this.activeShape.active = !1),
          this.ctx.save(),
          this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT),
          (this.ctx.fillStyle = "#fff"),
          this.ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT),
          this.drawImg(),
          this.drawShapes(),
          this.ctx.restore(),
          this.canvas.toDataURL(t, e)
        );
      }),
      (t.prototype.mergeEvent = function(t) {
        var i = 0,
          s = 0,
          n = 0,
          a = 0;
        if (r()) {
          var o = t.touches[0],
            h = o.clientX,
            c = o.clientY,
            u = t.target.getBoundingClientRect(),
            l = u.left,
            p = u.top;
          if (
            ((i = Math.round(h - l)),
            (s = Math.round(c - p)),
            2 === t.touches.length)
          ) {
            var d = t.touches[1] || {},
              v = d.clientX,
              f = void 0 === v ? 0 : v,
              y = d.clientY,
              I = void 0 === y ? 0 : y;
            (n = Math.round(Math.abs((f - h) / 2 + h) - l)),
              (a = Math.round(Math.abs((I - c) / 2 + c) - p));
          }
        } else (i = t.offsetX), (s = t.offsetY);
        return e(e({}, t), { mouseX: i, mouseY: s, mouseCX: n, mouseCY: a });
      }),
      (t.prototype.isPointInCircle = function(t, e, i) {
        var s = t[0],
          n = t[1],
          a = e[0],
          o = e[1];
        return Math.sqrt(Math.pow(a - s, 2) + Math.pow(o - n, 2)) <= i;
      }),
      (t.prototype.isPointInRect = function(t, e) {
        var i = t[0],
          s = t[1],
          n = e[0],
          a = n[0],
          o = n[1],
          r = e[1],
          h = r[0],
          c = r[1];
        return a <= i && i <= h && o <= s && s <= c;
      }),
      (t.prototype.isHitOnShape = function(t) {
        for (var e = this.dataset.length - 1; e >= 0; e--) {
          var i = this.dataset[e];
          if (i.type === s.rect && this.isPointInRect(t, i.coor))
            return { isOnShape: !0, index: e, shape: i };
        }
        return { isOnShape: !1, index: -1, shape: null };
      }),
      (t.prototype.changeCursor = function(t) {
        this.canvas.style.cursor = t;
      }),
      t
    );
  })();
export { a as EventType, n as MarkMode, s as ShapeType, c as default };
