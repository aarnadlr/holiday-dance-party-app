(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// import choo
var choo = require('choo');

// import choo template helper
var html = require('choo/html');

// import template
var main = require('./templates/main.js');



//**
// initialize choo
var app = choo();



// STATE = STORAGE
// SET UP/ INITIALIZE A STATE OBJECT TO STORE STATE and RE-STORE IT UPON EVERY FLOW-THROUGH
app.use(function(state, emitter){
  
  //initialize state with property: animals ARRAY
  state.animals = [
	// *** REVISE!!!
	// *** REVISE!!!
	// *** REVISE!!!
    {type: 'char3c', x: 90, y:130},
    // {type: 'asher1', x: 50, y:100},
    {type: 'asher-skel-2', x: 220, y:170},
    {type: 'aaron1b', x: 520, y:160},
    {type: 'molly-1c', x: 370, y:120}
  ];
  
  // EMITTER = LISTENER and REACTOR
  //Listen for addAnimal; when triggered, create an obj and push it into ARRAY
  // addAnimal is a handle; when it is emitted, run the callback;
  //therefore, the callback function IS the 'addAnimal' event
  emitter.on('addAnimal', function(data){
    
    var animals = [
		// *** REVISE!!!
		// *** REVISE!!!
		// *** REVISE!!!
      'char-2b', 'asher1', 'molly-1c','asher-skel-2', 'aaron1b','char3c'
    ];
		
		// *** REVISE NUMBER!!!
		// *** REVISE NUMBER!!!
		// *** REVISE NUMBER!!!
    var type = Math.floor(Math.random() * 6);
    var x = data.x -20;
    var y = data.y -40;
    
    var obj = {type: animals[type], x: x, y: y}
    state.animals.push(obj);
    
    //Tell choo to re-render our templates
    emitter.emit('render');
  });
  
  
  //REMOVE animal:
  emitter.on('removeAnimal', function (i){
    
    //At index [i], remove one item in the array
    state.animals.splice(i, 1)
    //Re-render template
    emitter.emit('render')
  });
  
});




//**
//declare routes: takes two args: path, template-name
app.route('/', main);



// start app
app.mount('div');
},{"./templates/main.js":27,"choo":4,"choo/html":3}],2:[function(require,module,exports){
var document = require('global/document')
var hyperx = require('hyperx')
var onload = require('on-load')

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  selected: 1,
  willvalidate: 1
}
var COMMENT_TAG = '!--'
var SVG_TAGS = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else if (tag === COMMENT_TAG) {
    return document.createComment(props.comment)
  } else {
    el = document.createElement(tag)
  }

  // If adding onload events
  if (props.onload || props.onunload) {
    var load = props.onload || function () {}
    var unload = props.onunload || function () {}
    onload(el, function belOnload () {
      load(el)
    }, function belOnunload () {
      unload(el)
    },
    // We have to use non-standard `caller` to find who invokes `belCreateElement`
    belCreateElement.caller.caller.caller)
    delete props.onload
    delete props.onunload
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        typeof node === 'function' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = document.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

module.exports = hyperx(belCreateElement, {comments: true})
module.exports.default = module.exports
module.exports.createElement = belCreateElement

},{"global/document":6,"hyperx":9,"on-load":21}],3:[function(require,module,exports){
module.exports = require('bel')

},{"bel":2}],4:[function(require,module,exports){
var documentReady = require('document-ready')
var nanohistory = require('nanohistory')
var nanorouter = require('nanorouter')
var nanomount = require('nanomount')
var nanomorph = require('nanomorph')
var nanohref = require('nanohref')
var nanoraf = require('nanoraf')
var nanobus = require('nanobus')
var assert = require('assert')

module.exports = Choo

function Choo (opts) {
  opts = opts || {}

  var routerOpts = {
    default: opts.defaultRoute || '/404',
    curry: true
  }

  var timingEnabled = opts.timing === undefined ? true : opts.timing
  var hasWindow = typeof window !== 'undefined'
  var hasPerformance = hasWindow && window.performance && window.performance.mark
  var router = nanorouter(routerOpts)
  var bus = nanobus()
  var rerender = null
  var tree = null
  var state = {}

  return {
    toString: toString,
    use: register,
    mount: mount,
    router: router,
    route: route,
    start: start
  }

  function route (route, handler) {
    router.on(route, function (params) {
      return function () {
        state.params = params
        return handler(state, emit)
      }
    })
  }

  function register (cb) {
    cb(state, bus)
  }

  function start () {
    if (opts.history !== false) {
      nanohistory(function (href) {
        bus.emit('pushState')
      })

      bus.prependListener('pushState', updateHistory.bind(null, 'push'))
      bus.prependListener('replaceState', updateHistory.bind(null, 'replace'))

      if (opts.href !== false) {
        nanohref(function (location) {
          var href = location.href
          var currHref = window.location.href
          if (href === currHref) return
          bus.emit('pushState', href)
        })
      }
    }

    function updateHistory (mode, href) {
      if (href) window.history[mode + 'State']({}, null, href)
      bus.emit('render')
      setTimeout(function () {
        scrollIntoView()
      }, 0)
    }

    rerender = nanoraf(function () {
      if (hasPerformance && timingEnabled) {
        window.performance.mark('choo:renderStart')
      }
      var newTree = router(createLocation())
      tree = nanomorph(tree, newTree)
      assert.notEqual(tree, newTree, 'choo.start: a different node type was returned as the root node on a rerender. Make sure that the root node is always the same type to prevent the application from being unmounted.')
      if (hasPerformance && timingEnabled) {
        window.performance.mark('choo:renderEnd')
        window.performance.measure('choo:render', 'choo:renderStart', 'choo:renderEnd')
      }
    })

    bus.prependListener('render', rerender)

    documentReady(function () {
      bus.emit('DOMContentLoaded')
    })

    tree = router(createLocation())

    return tree
  }

  function emit (eventName, data) {
    bus.emit(eventName, data)
  }

  function mount (selector) {
    var newTree = start()
    documentReady(function () {
      var root = document.querySelector(selector)
      assert.ok(root, 'choo.mount: could not query selector: ' + selector)
      nanomount(root, newTree)
      tree = root
    })
  }

  function toString (location, _state) {
    state = _state || {}
    var html = router(location)
    return html.toString()
  }
}

function scrollIntoView () {
  var hash = window.location.hash
  if (hash) {
    try {
      var el = document.querySelector(hash)
      if (el) el.scrollIntoView(true)
    } catch (e) {}
  }
}

function createLocation () {
  var pathname = window.location.pathname.replace(/\/$/, '')
  var hash = window.location.hash.replace(/^#/, '/')
  return pathname + hash
}

},{"assert":28,"document-ready":5,"nanobus":11,"nanohistory":12,"nanohref":13,"nanomorph":14,"nanomount":17,"nanoraf":18,"nanorouter":19}],5:[function(require,module,exports){
'use strict'

var assert = require('assert')

module.exports = ready

function ready (callback) {
  assert.notEqual(typeof document, 'undefined', 'document-ready only runs in the browser')
  var state = document.readyState
  if (state === 'complete' || state === 'interactive') {
    return setTimeout(callback, 0)
  }

  document.addEventListener('DOMContentLoaded', function onLoad () {
    callback()
  })
}

},{"assert":28}],6:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":29}],7:[function(require,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],9:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12
var COMMENT = 13

module.exports = function (h, opts) {
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }
  if (opts.attrToProp !== false) {
    h = attrToProp(h)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        p.push([ VAR, xstate, arg ])
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else parts[i][1]==="" || (cur[1][key] = concat(cur[1][key], parts[i][1]));
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else parts[i][2]==="" || (cur[1][key] = concat(cur[1][key], parts[i][2]));
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            if (parts[i][0] === CLOSE) {
              i--
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state) && state !== COMMENT) {
          if (state === OPEN) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === COMMENT && /-$/.test(reg) && c === '-') {
          if (opts.comments) {
            res.push([ATTR_VALUE,reg.substr(0, reg.length - 1)],[CLOSE])
          }
          reg = ''
          state = TEXT
        } else if (state === OPEN && /^!--$/.test(reg)) {
          if (opts.comments) {
            res.push([OPEN, reg],[ATTR_KEY,'comment'],[ATTR_EQ])
          }
          reg = c
          state = COMMENT
        } else if (state === TEXT || state === COMMENT) {
          reg += c
        } else if (state === OPEN && /\s/.test(c)) {
          res.push([OPEN, reg])
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[^\s"'=/]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":8}],10:[function(require,module,exports){
assert.notEqual = notEqual
assert.notOk = notOk
assert.equal = equal
assert.ok = assert

module.exports = assert

function equal (a, b, m) {
  assert(a == b, m) // eslint-disable-line eqeqeq
}

function notEqual (a, b, m) {
  assert(a != b, m) // eslint-disable-line eqeqeq
}

function notOk (t, m) {
  assert(!t, m)
}

function assert (t, m) {
  if (!t) throw new Error(m || 'AssertionError')
}

},{}],11:[function(require,module,exports){
var nanotiming = require('nanotiming')
var assert = require('assert')

module.exports = Nanobus

function Nanobus (name) {
  if (!(this instanceof Nanobus)) return new Nanobus(name)

  this._name = name || 'nanobus'
  this._starListeners = []
  this._listeners = {}

  this._timing = nanotiming(this._name)
}

Nanobus.prototype.emit = function (eventName, data) {
  assert.equal(typeof eventName, 'string', 'nanobus.emit: eventName should be type string')

  this._timing.start(eventName)
  var listeners = this._listeners[eventName]
  if (listeners && listeners.length > 0) {
    this._emit(this._listeners[eventName], data)
  }

  if (this._starListeners.length > 0) {
    this._emit(this._starListeners, eventName, data)
  }
  this._timing.end(eventName)

  return this
}

Nanobus.prototype.on = Nanobus.prototype.addListener = function (eventName, listener) {
  assert.equal(typeof eventName, 'string', 'nanobus.on: eventName should be type string')
  assert.equal(typeof listener, 'function', 'nanobus.on: listener should be type function')

  if (eventName === '*') {
    this._starListeners.push(listener)
  } else {
    if (!this._listeners[eventName]) this._listeners[eventName] = []
    this._listeners[eventName].push(listener)
  }
  return this
}

Nanobus.prototype.prependListener = function (eventName, listener) {
  assert.equal(typeof eventName, 'string', 'nanobus.prependListener: eventName should be type string')
  assert.equal(typeof listener, 'function', 'nanobus.prependListener: listener should be type function')

  if (eventName === '*') {
    this._starListeners.unshift(listener)
  } else {
    if (!this._listeners[eventName]) this._listeners[eventName] = []
    this._listeners[eventName].unshift(listener)
  }
  return this
}

Nanobus.prototype.once = function (eventName, listener) {
  assert.equal(typeof eventName, 'string', 'nanobus.once: eventName should be type string')
  assert.equal(typeof listener, 'function', 'nanobus.once: listener should be type function')

  var self = this
  this.on(eventName, once)
  function once () {
    listener.apply(self, arguments)
    self.removeListener(eventName, once)
  }
  return this
}

Nanobus.prototype.prependOnceListener = function (eventName, listener) {
  assert.equal(typeof eventName, 'string', 'nanobus.prependOnceListener: eventName should be type string')
  assert.equal(typeof listener, 'function', 'nanobus.prependOnceListener: listener should be type function')

  var self = this
  this.prependListener(eventName, once)
  function once () {
    listener.apply(self, arguments)
    self.removeListener(eventName, once)
  }
  return this
}

Nanobus.prototype.removeListener = function (eventName, listener) {
  assert.equal(typeof eventName, 'string', 'nanobus.removeListener: eventName should be type string')
  assert.equal(typeof listener, 'function', 'nanobus.removeListener: listener should be type function')

  if (eventName === '*') {
    this._starListeners = this._starListeners.slice()
    return remove(this._starListeners, listener)
  } else {
    if (typeof this._listeners[eventName] !== 'undefined') {
      this._listeners[eventName] = this._listeners[eventName].slice()
    }

    return remove(this._listeners[eventName], listener)
  }

  function remove (arr, listener) {
    if (!arr) return
    var index = arr.indexOf(listener)
    if (index !== -1) {
      arr.splice(index, 1)
      return true
    }
  }
}

Nanobus.prototype.removeAllListeners = function (eventName) {
  if (eventName) {
    if (eventName === '*') {
      this._starListeners = []
    } else {
      this._listeners[eventName] = []
    }
  } else {
    this._starListeners = []
    this._listeners = {}
  }
  return this
}

Nanobus.prototype.listeners = function (eventName) {
  var listeners = (eventName !== '*') ? this._listeners[eventName] : this._starListeners
  var ret = []
  if (listeners) {
    var ilength = listeners.length
    for (var i = 0; i < ilength; i++) ret.push(listeners[i])
  }
  return ret
}

Nanobus.prototype._emit = function (arr, eventName, data) {
  if (typeof arr === 'undefined') return
  if (!data) {
    data = eventName
    eventName = null
  }
  var length = arr.length
  for (var i = 0; i < length; i++) {
    var listener = arr[i]
    if (eventName) listener(eventName, data)
    else listener(data)
  }
}

},{"assert":28,"nanotiming":20}],12:[function(require,module,exports){
var assert = require('assert')

module.exports = history

// listen to html5 pushstate events
// and update router accordingly
function history (cb) {
  assert.equal(typeof cb, 'function', 'nanohistory: cb must be type function')
  window.onpopstate = function () {
    cb(document.location)
  }
}

},{"assert":28}],13:[function(require,module,exports){
var assert = require('assert')

module.exports = href

var noRoutingAttrName = 'data-no-routing'

// handle a click if is anchor tag with an href
// and url lives on the same domain. Replaces
// trailing '#' so empty links work as expected.
// (fn(str), obj?) -> undefined
function href (cb, root) {
  assert.equal(typeof cb, 'function', 'nanohref: cb must be type function')
  root = root || window.document

  window.onclick = function (e) {
    if ((e.button && e.button !== 0) || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return

    var node = (function traverse (node) {
      if (!node || node === root) return
      if (node.localName !== 'a') return traverse(node.parentNode)
      if (node.href === undefined) return traverse(node.parentNode)
      if (window.location.host !== node.host) return traverse(node.parentNode)
      return node
    })(e.target)

    if (!node) return

    var isRoutingDisabled = node.hasAttribute(noRoutingAttrName)
    if (isRoutingDisabled) return

    e.preventDefault()
    cb(node)
  }
}

},{"assert":28}],14:[function(require,module,exports){
var assert = require('assert')
var morph = require('./lib/morph')
var rootLabelRegex = /^data-onloadid/

var ELEMENT_NODE = 1

module.exports = nanomorph

// morph one tree into another tree
// (obj, obj) -> obj
// no parent
//   -> same: diff and walk children
//   -> not same: replace and return
// old node doesn't exist
//   -> insert new node
// new node doesn't exist
//   -> delete old node
// nodes are not the same
//   -> diff nodes and apply patch to old node
// nodes are the same
//   -> walk all child nodes and append to old node
function nanomorph (oldTree, newTree) {
  assert.equal(typeof oldTree, 'object', 'nanomorph: oldTree should be an object')
  assert.equal(typeof newTree, 'object', 'nanomorph: newTree should be an object')

  persistStatefulRoot(newTree, oldTree)
  var tree = walk(newTree, oldTree)
  return tree
}

// walk and morph a dom tree
// (obj, obj) -> obj
function walk (newNode, oldNode) {
  if (!oldNode) {
    return newNode
  } else if (!newNode) {
    return null
  } else if (newNode.isSameNode && newNode.isSameNode(oldNode)) {
    return oldNode
  } else if (newNode.tagName !== oldNode.tagName) {
    return newNode
  } else {
    morph(newNode, oldNode)
    updateChildren(newNode, oldNode)
    return oldNode
  }
}

// update the children of elements
// (obj, obj) -> null
function updateChildren (newNode, oldNode) {
  if (!newNode.childNodes || !oldNode.childNodes) return

  var newLength = newNode.childNodes.length
  var oldLength = oldNode.childNodes.length
  var length = Math.max(oldLength, newLength)

  var iNew = 0
  var iOld = 0
  for (var i = 0; i < length; i++, iNew++, iOld++) {
    var newChildNode = newNode.childNodes[iNew]
    var oldChildNode = oldNode.childNodes[iOld]
    var retChildNode = walk(newChildNode, oldChildNode)
    if (!retChildNode) {
      if (oldChildNode) {
        oldNode.removeChild(oldChildNode)
        iOld--
      }
    } else if (!oldChildNode) {
      if (retChildNode) {
        oldNode.appendChild(retChildNode)
        iNew--
      }
    } else if (retChildNode !== oldChildNode) {
      oldNode.replaceChild(retChildNode, oldChildNode)
      iNew--
    }
  }
}

function persistStatefulRoot (newNode, oldNode) {
  if (!newNode || !oldNode || oldNode.nodeType !== ELEMENT_NODE || newNode.nodeType !== ELEMENT_NODE) return
  var oldAttrs = oldNode.attributes
  var attr, name
  for (var i = 0, len = oldAttrs.length; i < len; i++) {
    attr = oldAttrs[i]
    name = attr.name
    if (rootLabelRegex.test(name)) {
      newNode.setAttribute(name, attr.value)
      break
    }
  }
}

},{"./lib/morph":16,"assert":28}],15:[function(require,module,exports){
module.exports = [
  // attribute events (can be set with attributes)
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'onmouseenter',
  'onmouseleave',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oninput',
  // other common events
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
]

},{}],16:[function(require,module,exports){
var events = require('./events')
var eventsLength = events.length

var ELEMENT_NODE = 1
var TEXT_NODE = 3
var COMMENT_NODE = 8

module.exports = morph

// diff elements and apply the resulting patch to the old node
// (obj, obj) -> null
function morph (newNode, oldNode) {
  var nodeType = newNode.nodeType
  var nodeName = newNode.nodeName

  if (nodeType === ELEMENT_NODE) {
    copyAttrs(newNode, oldNode)
  }

  if (nodeType === TEXT_NODE || nodeType === COMMENT_NODE) {
    oldNode.nodeValue = newNode.nodeValue
  }

  // Some DOM nodes are weird
  // https://github.com/patrick-steele-idem/morphdom/blob/master/src/specialElHandlers.js
  if (nodeName === 'INPUT') updateInput(newNode, oldNode)
  else if (nodeName === 'OPTION') updateOption(newNode, oldNode)
  else if (nodeName === 'TEXTAREA') updateTextarea(newNode, oldNode)
  else if (nodeName === 'SELECT') updateSelect(newNode, oldNode)

  copyEvents(newNode, oldNode)
}

function copyAttrs (newNode, oldNode) {
  var oldAttrs = oldNode.attributes
  var newAttrs = newNode.attributes
  var attrNamespaceURI = null
  var attrValue = null
  var fromValue = null
  var attrName = null
  var attr = null

  for (var i = newAttrs.length - 1; i >= 0; --i) {
    attr = newAttrs[i]
    attrName = attr.name
    attrNamespaceURI = attr.namespaceURI
    attrValue = attr.value

    if (attrNamespaceURI) {
      attrName = attr.localName || attrName
      fromValue = oldNode.getAttributeNS(attrNamespaceURI, attrName)

      if (fromValue !== attrValue) {
        oldNode.setAttributeNS(attrNamespaceURI, attrName, attrValue)
      }
    } else {
      fromValue = oldNode.getAttribute(attrName)

      if (fromValue !== attrValue) {
        // apparently values are always cast to strings, ah well
        if (attrValue === 'null' || attrValue === 'undefined') {
          oldNode.removeAttribute(attrName)
        } else {
          oldNode.setAttribute(attrName, attrValue)
        }
      }
    }
  }

  // Remove any extra attributes found on the original DOM element that
  // weren't found on the target element.
  for (var j = oldAttrs.length - 1; j >= 0; --j) {
    attr = oldAttrs[j]
    if (attr.specified !== false) {
      attrName = attr.name
      attrNamespaceURI = attr.namespaceURI

      if (attrNamespaceURI) {
        attrName = attr.localName || attrName
        if (!newNode.hasAttributeNS(attrNamespaceURI, attrName)) {
          oldNode.removeAttributeNS(attrNamespaceURI, attrName)
        }
      } else {
        if (!newNode.hasAttributeNS(null, attrName)) {
          oldNode.removeAttribute(attrName)
        }
      }
    }
  }
}

function copyEvents (newNode, oldNode) {
  for (var i = 0; i < eventsLength; i++) {
    var ev = events[i]
    if (newNode[ev]) {           // if new element has a whitelisted attribute
      oldNode[ev] = newNode[ev]  // update existing element
    } else if (oldNode[ev]) {    // if existing element has it and new one doesnt
      oldNode[ev] = undefined    // remove it from existing element
    }
  }
}

function updateOption (newNode, oldNode) {
  updateAttribute(newNode, oldNode, 'selected')
}

// The "value" attribute is special for the <input> element since it sets the
// initial value. Changing the "value" attribute without changing the "value"
// property will have no effect since it is only used to the set the initial
// value. Similar for the "checked" attribute, and "disabled".
function updateInput (newNode, oldNode) {
  var newValue = newNode.value
  var oldValue = oldNode.value

  updateAttribute(newNode, oldNode, 'checked')
  updateAttribute(newNode, oldNode, 'disabled')

  if (!newNode.hasAttributeNS(null, 'value') || newValue === 'null') {
    oldNode.value = ''
    oldNode.removeAttribute('value')
  } else if (newValue !== oldValue) {
    oldNode.setAttribute('value', newValue)
    oldNode.value = newValue
  } else if (oldNode.type === 'range') {
    // this is so elements like slider move their UI thingy
    oldNode.value = newValue
  }
}

function updateTextarea (newNode, oldNode) {
  var newValue = newNode.value
  if (newValue !== oldNode.value) {
    oldNode.value = newValue
  }

  if (oldNode.firstChild) {
    // Needed for IE. Apparently IE sets the placeholder as the
    // node value and vise versa. This ignores an empty update.
    if (newValue === '' && oldNode.firstChild.nodeValue === oldNode.placeholder) {
      return
    }

    oldNode.firstChild.nodeValue = newValue
  }
}

function updateSelect (newNode, oldNode) {
  if (!oldNode.hasAttributeNS(null, 'multiple')) {
    var i = 0
    var curChild = oldNode.firstChild
    while (curChild) {
      var nodeName = curChild.nodeName
      if (nodeName && nodeName.toUpperCase() === 'OPTION') {
        if (curChild.hasAttributeNS(null, 'selected')) break
        i++
      }
      curChild = curChild.nextSibling
    }

    newNode.selectedIndex = i
  }
}

function updateAttribute (newNode, oldNode, name) {
  if (newNode[name] !== oldNode[name]) {
    oldNode[name] = newNode[name]
    if (newNode[name]) {
      oldNode.setAttribute(name, '')
    } else {
      oldNode.removeAttribute(name, '')
    }
  }
}

},{"./events":15}],17:[function(require,module,exports){
var nanomorph = require('nanomorph')
var assert = require('assert')

module.exports = nanomount

function nanomount (target, newTree) {
  if (target.nodeName === 'BODY') {
    var children = target.childNodes
    for (var i = 0; i < children.length; i++) {
      if (children[i].nodeName === 'SCRIPT') {
        newTree.appendChild(children[i].cloneNode(true))
      }
    }
  }

  var tree = nanomorph(target, newTree)
  assert.equal(tree, target, 'nanomount: The target node ' +
    tree.outerHTML.nodeName + ' is not the same type as the new node ' +
    target.outerHTML.nodeName + '.')
}

},{"assert":28,"nanomorph":14}],18:[function(require,module,exports){
'use strict'

var assert = require('assert')

module.exports = nanoraf

// Only call RAF when needed
// (fn, fn?) -> fn
function nanoraf (render, raf) {
  assert.equal(typeof render, 'function', 'nanoraf: render should be a function')
  assert.ok(typeof raf === 'function' || typeof raf === 'undefined', 'nanoraf: raf should be a function or undefined')

  if (!raf) raf = window.requestAnimationFrame
  var redrawScheduled = false
  var args = null

  return function frame () {
    if (args === null && !redrawScheduled) {
      redrawScheduled = true

      raf(function redraw () {
        redrawScheduled = false

        var length = args.length
        var _args = new Array(length)
        for (var i = 0; i < length; i++) _args[i] = args[i]

        render.apply(render, _args)
        args = null
      })
    }

    args = arguments
  }
}

},{"assert":28}],19:[function(require,module,exports){
var wayfarer = require('wayfarer')

var isLocalFile = (/file:\/\//.test(typeof window === 'object' &&
  window.location && window.location.origin)) // electron support

/* eslint-disable no-useless-escape */
var electron = '^(file:\/\/|\/)(.*\.html?\/?)?'
var protocol = '^(http(s)?(:\/\/))?(www\.)?'
var domain = '[a-zA-Z0-9-_\.]+(:[0-9]{1,5})?(\/{1})?'
var qs = '[\?].*$'
/* eslint-enable no-useless-escape */

var stripElectron = new RegExp(electron)
var prefix = new RegExp(protocol + domain)
var normalize = new RegExp('#')
var suffix = new RegExp(qs)

module.exports = Nanorouter

function Nanorouter (opts) {
  opts = opts || {}

  var router = wayfarer(opts.default || '/404')
  var curry = opts.curry || false
  var prevCallback = null
  var prevRoute = null

  emit.router = router
  emit.on = on
  return emit

  function on (routename, listener) {
    routename = routename.replace(/^[#/]/, '')
    router.on(routename, listener)
  }

  function emit (route) {
    if (!curry) {
      return router(route)
    } else {
      route = pathname(route, isLocalFile)
      if (route === prevRoute) {
        return prevCallback()
      } else {
        prevRoute = route
        prevCallback = router(route)
        return prevCallback()
      }
    }
  }
}

// replace everything in a route but the pathname and hash
function pathname (route, isElectron) {
  if (isElectron) route = route.replace(stripElectron, '')
  else route = route.replace(prefix, '')
  return route.replace(suffix, '').replace(normalize, '/')
}

},{"wayfarer":22}],20:[function(require,module,exports){
var assert = require('assert')

module.exports = Nanotiming

function Nanotiming (name) {
  if (!(this instanceof Nanotiming)) return new Nanotiming(name)
  assert.equal(typeof name, 'string', 'Nanotiming: name should be type string')
  this._name = name
  this._enabled = typeof window !== 'undefined' &&
    window.performance && window.performance.mark
}

Nanotiming.prototype.start = function (partial) {
  if (!this._enabled) return
  var name = partial ? this._name + ':' + partial : this._name
  window.performance.mark(name + '-start')
}

Nanotiming.prototype.end = function (partial) {
  if (!this._enabled) return
  var name = partial ? this._name + ':' + partial : this._name
  window.performance.mark(name + '-end')
  window.performance.measure(name, name + '-start', name + '-end')
}

},{"assert":28}],21:[function(require,module,exports){
/* global MutationObserver */
var document = require('global/document')
var window = require('global/window')
var assert = require('assert')
var watch = Object.create(null)
var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36)
var KEY_ATTR = 'data-' + KEY_ID
var INDEX = 0

if (window && window.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    if (Object.keys(watch).length < 1) return
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === KEY_ATTR) {
        eachAttr(mutations[i], turnon, turnoff)
        continue
      }
      eachMutation(mutations[i].removedNodes, turnoff)
      eachMutation(mutations[i].addedNodes, turnon)
    }
  })
  if (document.body) {
    beginObserve(observer)
  } else {
    document.addEventListener('DOMContentLoaded', function (event) {
      beginObserve(observer)
    })
  }
}

function beginObserve (observer) {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [KEY_ATTR]
  })
}

module.exports = function onload (el, on, off, caller) {
  assert(document.body, 'on-load: will not work prior to DOMContentLoaded')
  on = on || function () {}
  off = off || function () {}
  el.setAttribute(KEY_ATTR, 'o' + INDEX)
  watch['o' + INDEX] = [on, off, 0, caller || onload.caller]
  INDEX += 1
  return el
}

module.exports.KEY_ATTR = KEY_ATTR
module.exports.KEY_ID = KEY_ID

function turnon (index, el) {
  if (watch[index][0] && watch[index][2] === 0) {
    watch[index][0](el)
    watch[index][2] = 1
  }
}

function turnoff (index, el) {
  if (watch[index][1] && watch[index][2] === 1) {
    watch[index][1](el)
    watch[index][2] = 0
  }
}

function eachAttr (mutation, on, off) {
  var newValue = mutation.target.getAttribute(KEY_ATTR)
  if (sameOrigin(mutation.oldValue, newValue)) {
    watch[newValue] = watch[mutation.oldValue]
    return
  }
  if (watch[mutation.oldValue]) {
    off(mutation.oldValue, mutation.target)
  }
  if (watch[newValue]) {
    on(newValue, mutation.target)
  }
}

function sameOrigin (oldValue, newValue) {
  if (!oldValue || !newValue) return false
  return watch[oldValue][3] === watch[newValue][3]
}

function eachMutation (nodes, fn) {
  var keys = Object.keys(watch)
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
      var onloadid = nodes[i].getAttribute(KEY_ATTR)
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k, nodes[i])
        }
      })
    }
    if (nodes[i].childNodes.length > 0) {
      eachMutation(nodes[i].childNodes, fn)
    }
  }
}

},{"assert":10,"global/document":6,"global/window":7}],22:[function(require,module,exports){
var assert = require('assert')
var trie = require('./trie')

module.exports = Wayfarer

// create a router
// str -> obj
function Wayfarer (dft) {
  if (!(this instanceof Wayfarer)) return new Wayfarer(dft)

  var _default = (dft || '').replace(/^\//, '')
  var _trie = trie()

  emit._trie = _trie
  emit.emit = emit
  emit.on = on
  emit._wayfarer = true

  return emit

  // define a route
  // (str, fn) -> obj
  function on (route, cb) {
    assert.equal(typeof route, 'string')
    assert.equal(typeof cb, 'function')

    route = route || '/'
    cb.route = route

    if (cb && cb._wayfarer && cb._trie) {
      _trie.mount(route, cb._trie.trie)
    } else {
      var node = _trie.create(route)
      node.cb = cb
    }

    return emit
  }

  // match and call a route
  // (str, obj?) -> null
  function emit (route) {
    assert.notEqual(route, undefined, "'route' must be defined")
    var args = new Array(arguments.length)
    for (var i = 1; i < args.length; i++) {
      args[i] = arguments[i]
    }

    var node = _trie.match(route)
    if (node && node.cb) {
      args[0] = node.params
      var cb = node.cb
      return cb.apply(cb, args)
    }

    var dft = _trie.match(_default)
    if (dft && dft.cb) {
      args[0] = dft.params
      var dftcb = dft.cb
      return dftcb.apply(dftcb, args)
    }

    throw new Error("route '" + route + "' did not match")
  }
}

},{"./trie":23,"assert":28}],23:[function(require,module,exports){
var mutate = require('xtend/mutable')
var assert = require('assert')
var xtend = require('xtend')

module.exports = Trie

// create a new trie
// null -> obj
function Trie () {
  if (!(this instanceof Trie)) return new Trie()
  this.trie = { nodes: {} }
}

// create a node on the trie at route
// and return a node
// str -> null
Trie.prototype.create = function (route) {
  assert.equal(typeof route, 'string', 'route should be a string')
  // strip leading '/' and split routes
  var routes = route.replace(/^\//, '').split('/')

  function createNode (index, trie) {
    var thisRoute = (routes.hasOwnProperty(index) && routes[index])
    if (thisRoute === false) return trie

    var node = null
    if (/^:|^\*/.test(thisRoute)) {
      // if node is a name match, set name and append to ':' node
      if (!trie.nodes.hasOwnProperty('$$')) {
        node = { nodes: {} }
        trie.nodes['$$'] = node
      } else {
        node = trie.nodes['$$']
      }

      if (thisRoute[0] === '*') {
        trie.wildcard = true
      }

      trie.name = thisRoute.replace(/^:|^\*/, '')
    } else if (!trie.nodes.hasOwnProperty(thisRoute)) {
      node = { nodes: {} }
      trie.nodes[thisRoute] = node
    } else {
      node = trie.nodes[thisRoute]
    }

    // we must recurse deeper
    return createNode(index + 1, node)
  }

  return createNode(0, this.trie)
}

// match a route on the trie
// and return the node
// str -> obj
Trie.prototype.match = function (route) {
  assert.equal(typeof route, 'string', 'route should be a string')

  var routes = route.replace(/^\//, '').split('/')
  var params = {}

  function search (index, trie) {
    // either there's no match, or we're done searching
    if (trie === undefined) return undefined
    var thisRoute = routes[index]
    if (thisRoute === undefined) return trie

    if (trie.nodes.hasOwnProperty(thisRoute)) {
      // match regular routes first
      return search(index + 1, trie.nodes[thisRoute])
    } else if (trie.name) {
      // match named routes
      try {
        params[trie.name] = decodeURIComponent(thisRoute)
      } catch (e) {
        return search(index, undefined)
      }
      return search(index + 1, trie.nodes['$$'])
    } else if (trie.wildcard) {
      // match wildcards
      try {
        params['wildcard'] = decodeURIComponent(routes.slice(index).join('/'))
      } catch (e) {
        return search(index, undefined)
      }
      // return early, or else search may keep recursing through the wildcard
      return trie.nodes['$$']
    } else {
      // no matches found
      return search(index + 1)
    }
  }

  var node = search(0, this.trie)

  if (!node) return undefined
  node = xtend(node)
  node.params = params
  return node
}

// mount a trie onto a node at route
// (str, obj) -> null
Trie.prototype.mount = function (route, trie) {
  assert.equal(typeof route, 'string', 'route should be a string')
  assert.equal(typeof trie, 'object', 'trie should be a object')

  var split = route.replace(/^\//, '').split('/')
  var node = null
  var key = null

  if (split.length === 1) {
    key = split[0]
    node = this.create(key)
  } else {
    var headArr = split.splice(0, split.length - 1)
    var head = headArr.join('/')
    key = split[0]
    node = this.create(head)
  }

  mutate(node.nodes, trie.nodes)
  if (trie.name) node.name = trie.name

  // delegate properties from '/' to the new node
  // '/' cannot be reached once mounted
  if (node.nodes['']) {
    Object.keys(node.nodes['']).forEach(function (key) {
      if (key === 'nodes') return
      node[key] = node.nodes[''][key]
    })
    mutate(node.nodes, node.nodes[''].nodes)
    delete node.nodes[''].nodes
  }
}

},{"assert":28,"xtend":24,"xtend/mutable":25}],24:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],25:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],26:[function(require,module,exports){
//A SINGLE ANIMAL TEMPLATE TO RENDER AS MANY ANIMALS AS WE HAVE IN OUR ANIMALS OBJECT

//import choo template helper (ALWAYS when making html tagged temp lits)
var html = require('choo/html');


//export module (PATTERN 2: 'Exporting an anonymous function')
// (it gets named inside the require statement of the INDEX.js file!!)
module.exports = function(onclick, animal, i){
  var type = animal.type;
  var x = animal.x;
  var y = animal.y;
  
  //html template
  return html`
    <img src='/assets/${type}.gif' style='left: ${x}px; top: ${y}px;' id=${i} onclick=${onclick} />
  `
};


},{"choo/html":3}],27:[function(require,module,exports){
//import choo template header; needed everywhere we make html tagged literal code
var html = require('choo/html')
// var danceparty = require('./../assets/danceparty-data.js')

// import adjacent ANIMAL template (template insiede a template)
var animal = require('./animal.js');


//export this module of code so it is available to index.js
module.exports = function(state, emit){
  
  //create html template
	return html`


<div id='outer'>

	<div id='border'>
		<p>-</p>
	</div>

	<div id='svg-header'>
			<svg version="1.1" id="Layer_1"
				x="0px" y="0px"
				viewBox="0 0 839.1 405.9"
				>

				<style type="text/css">
					.st0{fill:#FFFFFF;}
					.st1{opacity:0.7;fill:#FFFFFF;}
					.st2{opacity:0.9;fill:#FFFFFF;}
					.st3{opacity:0.8;fill:#FFFFFF;}
					.st4{fill:#42D3FF;}
					.st5{fill:#00D74C;}
					.st6{opacity:0.9;fill:#CD004D;}
				</style>

				<g id='g1-the'>
					<path class="st0" d="M4,4c-1.1,0-2-0.4-2.8-1.2C0.4,2,0,1.1,0,0c1.1,0,2,0.4,2.8,1.2C3.6,1.9,4,2.9,4,4z M4,8c-1.1,0-2-0.4-2.8-1.2
						C0.4,6,0,5.1,0,4c1.1,0,2,0.4,2.8,1.2C3.6,5.9,4,6.9,4,8z M4,11.9c-1.1,0-2-0.4-2.8-1.2C0.4,10,0,9.1,0,8c1.1,0,2,0.4,2.8,1.2
						C3.6,9.9,4,10.8,4,11.9z M4,15.9c-1.1,0-2-0.4-2.8-1.2C0.4,14,0,13,0,11.9c1.1,0,2,0.4,2.8,1.2C3.6,13.9,4,14.8,4,15.9z M4,4
						c0-1.1,0.4-2,1.2-2.8C5.9,0.4,6.9,0,8,0c0,1.1-0.4,2-1.2,2.8C6,3.6,5.1,4,4,4z M4,8c0-1.1,0.4-2,1.2-2.8C5.9,4.4,6.9,4,8,4
						c0,1.1-0.4,2-1.2,2.8C6,7.6,5.1,8,4,8z M4,11.9c0-1.1,0.4-2,1.2-2.8C5.9,8.3,6.9,8,8,8c0,1.1-0.4,2-1.2,2.8C6,11.5,5.1,11.9,4,11.9
						z M4,15.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,15.5,5.1,15.9,4,15.9z M11.9,4c-1.1,0-2-0.4-2.8-1.2
						C8.3,2,8,1.1,8,0c1.1,0,2,0.4,2.8,1.2C11.5,1.9,11.9,2.9,11.9,4z M11.9,8c-1.1,0-2-0.4-2.8-1.2C8.3,6,8,5.1,8,4
						c1.1,0,2,0.4,2.8,1.2C11.5,5.9,11.9,6.9,11.9,8z M11.9,11.9c-1.1,0-2-0.4-2.8-1.2C8.3,10,8,9.1,8,8c1.1,0,2,0.4,2.8,1.2
						C11.5,9.9,11.9,10.8,11.9,11.9z M11.9,15.9c-1.1,0-2-0.4-2.8-1.2C8.3,14,8,13,8,11.9c1.1,0,2,0.4,2.8,1.2
						C11.5,13.9,11.9,14.8,11.9,15.9z M11.9,4c0-1.1,0.4-2,1.2-2.8C13.9,0.4,14.8,0,15.9,0c0,1.1-0.4,2-1.2,2.8C14,3.6,13,4,11.9,4z
						M11.9,8c0-1.1,0.4-2,1.2-2.8C13.9,4.4,14.8,4,15.9,4c0,1.1-0.4,2-1.2,2.8C14,7.6,13,8,11.9,8z M11.9,11.9c0-1.1,0.4-2,1.2-2.8
						C13.9,8.3,14.8,8,15.9,8c0,1.1-0.4,2-1.2,2.8C14,11.5,13,11.9,11.9,11.9z M11.9,15.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C14,15.5,13,15.9,11.9,15.9z M19.9,4c-1.1,0-2-0.4-2.8-1.2C16.3,2,15.9,1.1,15.9,0c1.1,0,2,0.4,2.8,1.2
						C19.5,1.9,19.9,2.9,19.9,4z M19.9,8c-1.1,0-2-0.4-2.8-1.2C16.3,6,15.9,5.1,15.9,4c1.1,0,2,0.4,2.8,1.2C19.5,5.9,19.9,6.9,19.9,8z
						M19.9,11.9c-1.1,0-2-0.4-2.8-1.2C16.3,10,15.9,9.1,15.9,8c1.1,0,2,0.4,2.8,1.2C19.5,9.9,19.9,10.8,19.9,11.9z M19.9,15.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,13.9,19.9,14.8,19.9,15.9z M19.9,19.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,17.8,19.9,18.8,19.9,19.9z M19.9,23.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,21.8,19.9,22.8,19.9,23.9z M19.9,27.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,25.8,19.9,26.7,19.9,27.8z M19.9,31.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,29.8,19.9,30.7,19.9,31.8z M19.9,35.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,33.7,19.9,34.7,19.9,35.8z M19.9,39.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,37.7,19.9,38.7,19.9,39.8z M19.9,43.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,41.7,19.9,42.7,19.9,43.7z M19.9,47.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,45.7,19.9,46.6,19.9,47.7z M19.9,51.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,49.7,19.9,50.6,19.9,51.7z M19.9,55.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,53.7,19.9,54.6,19.9,55.7z M19.9,59.6
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,57.6,19.9,58.6,19.9,59.6z M19.9,63.6
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,61.6,19.9,62.5,19.9,63.6z M19.9,4c0-1.1,0.4-2,1.2-2.8
						S22.8,0,23.9,0c0,1.1-0.4,2-1.2,2.8C21.9,3.6,21,4,19.9,4z M19.9,8c0-1.1,0.4-2,1.2-2.8S22.8,4,23.9,4c0,1.1-0.4,2-1.2,2.8
						C21.9,7.6,21,8,19.9,8z M19.9,11.9c0-1.1,0.4-2,1.2-2.8S22.8,8,23.9,8c0,1.1-0.4,2-1.2,2.8C21.9,11.5,21,11.9,19.9,11.9z
						M19.9,15.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,15.5,21,15.9,19.9,15.9z M19.9,19.9
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,19.5,21,19.9,19.9,19.9z M19.9,23.9c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,23.5,21,23.9,19.9,23.9z M19.9,27.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C21.9,27.4,21,27.8,19.9,27.8z M19.9,31.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,31.4,21,31.8,19.9,31.8z M19.9,35.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,35.4,21,35.8,19.9,35.8z
						M19.9,39.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,39.4,21,39.8,19.9,39.8z M19.9,43.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,43.4,21,43.7,19.9,43.7z M19.9,47.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,47.3,21,47.7,19.9,47.7z M19.9,51.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,51.3,21,51.7,19.9,51.7z M19.9,55.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,55.3,21,55.7,19.9,55.7z M19.9,59.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,59.3,21,59.6,19.9,59.6z M19.9,63.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,63.2,21,63.6,19.9,63.6z M27.8,4c-1.1,0-2-0.4-2.8-1.2C24.2,2,23.9,1.1,23.9,0
						c1.1,0,2,0.4,2.8,1.2C27.4,1.9,27.8,2.9,27.8,4z M27.8,8c-1.1,0-2-0.4-2.8-1.2S23.9,5.1,23.9,4c1.1,0,2,0.4,2.8,1.2
						C27.4,5.9,27.8,6.9,27.8,8z M27.8,11.9c-1.1,0-2-0.4-2.8-1.2S23.9,9.1,23.9,8c1.1,0,2,0.4,2.8,1.2C27.4,9.9,27.8,10.8,27.8,11.9z
						M27.8,15.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C27.4,13.9,27.8,14.8,27.8,15.9z M27.8,19.9
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C27.4,17.8,27.8,18.8,27.8,19.9z M27.8,23.9c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C27.4,21.8,27.8,22.8,27.8,23.9z M27.8,27.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C27.4,25.8,27.8,26.7,27.8,27.8z M27.8,31.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,29.8,27.8,30.7,27.8,31.8z M27.8,35.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,33.7,27.8,34.7,27.8,35.8z M27.8,39.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,37.7,27.8,38.7,27.8,39.8z M27.8,43.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,41.7,27.8,42.7,27.8,43.7z M27.8,47.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,45.7,27.8,46.6,27.8,47.7z M27.8,51.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,49.7,27.8,50.6,27.8,51.7z M27.8,55.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,53.7,27.8,54.6,27.8,55.7z M27.8,59.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,57.6,27.8,58.6,27.8,59.6z M27.8,63.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,61.6,27.8,62.5,27.8,63.6z M27.8,4c0-1.1,0.4-2,1.2-2.8S30.7,0,31.8,0c0,1.1-0.4,2-1.2,2.8C29.9,3.6,28.9,4,27.8,4z M27.8,8
						c0-1.1,0.4-2,1.2-2.8S30.7,4,31.8,4c0,1.1-0.4,2-1.2,2.8C29.9,7.6,28.9,8,27.8,8z M27.8,11.9c0-1.1,0.4-2,1.2-2.8S30.7,8,31.8,8
						c0,1.1-0.4,2-1.2,2.8C29.9,11.5,28.9,11.9,27.8,11.9z M27.8,15.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,15.5,28.9,15.9,27.8,15.9z M27.8,19.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,19.5,28.9,19.9,27.8,19.9z M27.8,23.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,23.5,28.9,23.9,27.8,23.9z M27.8,27.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,27.4,28.9,27.8,27.8,27.8z M27.8,31.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,31.4,28.9,31.8,27.8,31.8z M27.8,35.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,35.4,28.9,35.8,27.8,35.8z M27.8,39.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,39.4,28.9,39.8,27.8,39.8z M27.8,43.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,43.4,28.9,43.7,27.8,43.7z M27.8,47.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,47.3,28.9,47.7,27.8,47.7z M27.8,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,51.3,28.9,51.7,27.8,51.7z M27.8,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,55.3,28.9,55.7,27.8,55.7z M27.8,59.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,59.3,28.9,59.6,27.8,59.6z M27.8,63.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,63.2,28.9,63.6,27.8,63.6z M35.8,4c-1.1,0-2-0.4-2.8-1.2C32.2,2,31.8,1.1,31.8,0c1.1,0,2,0.4,2.8,1.2
						C35.4,1.9,35.8,2.9,35.8,4z M35.8,8c-1.1,0-2-0.4-2.8-1.2S31.8,5.1,31.8,4c1.1,0,2,0.4,2.8,1.2C35.4,5.9,35.8,6.9,35.8,8z
						M35.8,11.9c-1.1,0-2-0.4-2.8-1.2S31.8,9.1,31.8,8c1.1,0,2,0.4,2.8,1.2C35.4,9.9,35.8,10.8,35.8,11.9z M35.8,15.9
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C35.4,13.9,35.8,14.8,35.8,15.9z M35.8,4c0-1.1,0.4-2,1.2-2.8
						S38.7,0,39.8,0c0,1.1-0.4,2-1.2,2.8C37.8,3.6,36.9,4,35.8,4z M35.8,8c0-1.1,0.4-2,1.2-2.8S38.7,4,39.8,4c0,1.1-0.4,2-1.2,2.8
						S36.9,8,35.8,8z M35.8,11.9c0-1.1,0.4-2,1.2-2.8S38.7,8,39.8,8c0,1.1-0.4,2-1.2,2.8S36.9,11.9,35.8,11.9z M35.8,15.9
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,15.9,35.8,15.9z M43.7,4c-1.1,0-2-0.4-2.8-1.2
						C40.2,2,39.8,1.1,39.8,0c1.1,0,2,0.4,2.8,1.2S43.7,2.9,43.7,4z M43.7,8c-1.1,0-2-0.4-2.8-1.2C40.2,6,39.8,5.1,39.8,4
						c1.1,0,2,0.4,2.8,1.2S43.7,6.9,43.7,8z M43.7,11.9c-1.1,0-2-0.4-2.8-1.2C40.2,10,39.8,9.1,39.8,8c1.1,0,2,0.4,2.8,1.2
						S43.7,10.8,43.7,11.9z M43.7,15.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S43.7,14.8,43.7,15.9z
						M43.7,4c0-1.1,0.4-2,1.2-2.8C45.7,0.4,46.6,0,47.7,0c0,1.1-0.4,2-1.2,2.8C45.8,3.6,44.8,4,43.7,4z M43.7,8c0-1.1,0.4-2,1.2-2.8
						C45.7,4.4,46.6,4,47.7,4c0,1.1-0.4,2-1.2,2.8S44.8,8,43.7,8z M43.7,11.9c0-1.1,0.4-2,1.2-2.8C45.7,8.3,46.6,8,47.7,8
						c0,1.1-0.4,2-1.2,2.8S44.8,11.9,43.7,11.9z M43.7,15.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S44.8,15.9,43.7,15.9z"/>
					<path class="st1" d="M55.7,4c-1.1,0-2-0.4-2.8-1.2C52.1,2,51.7,1.1,51.7,0c1.1,0,2,0.4,2.8,1.2C55.3,1.9,55.7,2.9,55.7,4z M55.7,8
						c-1.1,0-2-0.4-2.8-1.2S51.7,5.1,51.7,4c1.1,0,2,0.4,2.8,1.2C55.3,5.9,55.7,6.9,55.7,8z M55.7,11.9c-1.1,0-2-0.4-2.8-1.2
						S51.7,9.1,51.7,8c1.1,0,2,0.4,2.8,1.2C55.3,9.9,55.7,10.8,55.7,11.9z M55.7,15.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C55.3,13.9,55.7,14.8,55.7,15.9z M55.7,19.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C55.3,17.8,55.7,18.8,55.7,19.9z M55.7,23.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C55.3,21.8,55.7,22.8,55.7,23.9z M55.7,27.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C55.3,25.8,55.7,26.7,55.7,27.8z M55.7,31.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C55.3,29.8,55.7,30.7,55.7,31.8z M55.7,35.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C55.3,33.7,55.7,34.7,55.7,35.8z M55.7,39.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C55.3,37.7,55.7,38.7,55.7,39.8z M55.7,43.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C55.3,41.7,55.7,42.7,55.7,43.7z M55.7,47.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C55.3,45.7,55.7,46.6,55.7,47.7z M55.7,51.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C55.3,49.7,55.7,50.6,55.7,51.7z M55.7,55.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C55.3,53.7,55.7,54.6,55.7,55.7z M55.7,59.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C55.3,57.6,55.7,58.6,55.7,59.6z M55.7,63.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C55.3,61.6,55.7,62.5,55.7,63.6z M55.7,4c0-1.1,0.4-2,1.2-2.8S58.5,0,59.6,0c0,1.1-0.4,2-1.2,2.8C57.7,3.6,56.8,4,55.7,4z M55.7,8
						c0-1.1,0.4-2,1.2-2.8S58.5,4,59.6,4c0,1.1-0.4,2-1.2,2.8C57.7,7.6,56.8,8,55.7,8z M55.7,11.9c0-1.1,0.4-2,1.2-2.8S58.5,8,59.6,8
						c0,1.1-0.4,2-1.2,2.8C57.7,11.5,56.8,11.9,55.7,11.9z M55.7,15.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,15.5,56.8,15.9,55.7,15.9z M55.7,19.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,19.5,56.8,19.9,55.7,19.9z M55.7,23.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,23.5,56.8,23.9,55.7,23.9z M55.7,27.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,27.4,56.8,27.8,55.7,27.8z M55.7,31.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,31.4,56.8,31.8,55.7,31.8z M55.7,35.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,35.4,56.8,35.8,55.7,35.8z M55.7,39.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,39.4,56.8,39.8,55.7,39.8z M55.7,43.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,43.4,56.8,43.7,55.7,43.7z M55.7,47.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,47.3,56.8,47.7,55.7,47.7z M55.7,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,51.3,56.8,51.7,55.7,51.7z M55.7,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,55.3,56.8,55.7,55.7,55.7z M55.7,59.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,59.3,56.8,59.6,55.7,59.6z M55.7,63.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,63.2,56.8,63.6,55.7,63.6z M63.6,4c-1.1,0-2-0.4-2.8-1.2C60,2,59.6,1.1,59.6,0c1.1,0,2,0.4,2.8,1.2C63.2,1.9,63.6,2.9,63.6,4
						z M63.6,8c-1.1,0-2-0.4-2.8-1.2C60,6,59.6,5.1,59.6,4c1.1,0,2,0.4,2.8,1.2C63.2,5.9,63.6,6.9,63.6,8z M63.6,11.9
						c-1.1,0-2-0.4-2.8-1.2C60,10,59.6,9.1,59.6,8c1.1,0,2,0.4,2.8,1.2C63.2,9.9,63.6,10.8,63.6,11.9z M63.6,15.9c-1.1,0-2-0.4-2.8-1.2
						C60,14,59.6,13,59.6,11.9c1.1,0,2,0.4,2.8,1.2C63.2,13.9,63.6,14.8,63.6,15.9z M63.6,19.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,17.8,63.6,18.8,63.6,19.9z M63.6,23.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,21.8,63.6,22.8,63.6,23.9z M63.6,27.8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,25.8,63.6,26.7,63.6,27.8z M63.6,31.8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,29.8,63.6,30.7,63.6,31.8z M63.6,35.8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,33.7,63.6,34.7,63.6,35.8z M63.6,39.8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,37.7,63.6,38.7,63.6,39.8z M63.6,43.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,41.7,63.6,42.7,63.6,43.7z M63.6,47.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,45.7,63.6,46.6,63.6,47.7z M63.6,51.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,49.7,63.6,50.6,63.6,51.7z M63.6,55.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,53.7,63.6,54.6,63.6,55.7z M63.6,59.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,57.6,63.6,58.6,63.6,59.6z M63.6,63.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,61.6,63.6,62.5,63.6,63.6z M63.6,4c0-1.1,0.4-2,1.2-2.8S66.5,0,67.6,0
						c0,1.1-0.4,2-1.2,2.8C65.6,3.6,64.7,4,63.6,4z M63.6,8c0-1.1,0.4-2,1.2-2.8S66.5,4,67.6,4c0,1.1-0.4,2-1.2,2.8
						C65.6,7.6,64.7,8,63.6,8z M63.6,11.9c0-1.1,0.4-2,1.2-2.8S66.5,8,67.6,8c0,1.1-0.4,2-1.2,2.8C65.6,11.5,64.7,11.9,63.6,11.9z
						M63.6,15.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C65.6,15.5,64.7,15.9,63.6,15.9z M63.6,19.9
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C65.6,19.5,64.7,19.9,63.6,19.9z M63.6,23.9c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C65.6,23.5,64.7,23.9,63.6,23.9z M63.6,27.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C65.6,27.4,64.7,27.8,63.6,27.8z M63.6,31.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,31.4,64.7,31.8,63.6,31.8z M63.6,35.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,35.4,64.7,35.8,63.6,35.8z M63.6,39.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,39.4,64.7,39.8,63.6,39.8z M63.6,43.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,43.4,64.7,43.7,63.6,43.7z M63.6,47.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,47.3,64.7,47.7,63.6,47.7z M63.6,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,51.3,64.7,51.7,63.6,51.7z M63.6,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,55.3,64.7,55.7,63.6,55.7z M63.6,59.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,59.3,64.7,59.6,63.6,59.6z M63.6,63.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,63.2,64.7,63.6,63.6,63.6z M71.6,19.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,17.8,71.6,18.8,71.6,19.9z M71.6,23.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,21.8,71.6,22.8,71.6,23.9z M71.6,27.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,25.8,71.6,26.7,71.6,27.8z M71.6,31.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,29.8,71.6,30.7,71.6,31.8z M71.6,19.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,19.5,72.7,19.9,71.6,19.9z M71.6,23.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,23.5,72.7,23.9,71.6,23.9z M71.6,27.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,27.4,72.7,27.8,71.6,27.8z M79.5,19.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S79.5,18.8,79.5,19.9z M79.5,23.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S79.5,22.8,79.5,23.9z
						M79.5,27.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S79.5,26.7,79.5,27.8z M79.5,31.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S79.5,30.7,79.5,31.8z M79.5,19.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,19.9,79.5,19.9z M79.5,23.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S80.6,23.9,79.5,23.9z M79.5,27.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S80.6,27.8,79.5,27.8z M79.5,31.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,31.8,79.5,31.8z
						M79.5,35.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,35.8,79.5,35.8z M79.5,39.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,39.8,79.5,39.8z M79.5,43.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,43.7,79.5,43.7z M79.5,47.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S80.6,47.7,79.5,47.7z M79.5,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S80.6,51.7,79.5,51.7z M79.5,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,55.7,79.5,55.7z
						M79.5,59.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,59.6,79.5,59.6z M79.5,63.6
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,63.6,79.5,63.6z M87.5,23.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,22.8,87.5,23.9z M87.5,27.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S87.5,26.7,87.5,27.8z M87.5,31.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S87.5,30.7,87.5,31.8z M87.5,35.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,34.7,87.5,35.8z
						M87.5,39.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,38.7,87.5,39.8z M87.5,43.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C87.1,41.7,87.5,42.7,87.5,43.7z M87.5,47.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C87.1,45.7,87.5,46.6,87.5,47.7z M87.5,51.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C87.1,49.7,87.5,50.6,87.5,51.7z M87.5,55.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C87.1,53.7,87.5,54.6,87.5,55.7z M87.5,59.6
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C87.1,57.6,87.5,58.6,87.5,59.6z M87.5,63.6
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C87.1,61.6,87.5,62.5,87.5,63.6z M87.5,27.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C89.5,27.4,88.6,27.8,87.5,27.8z M87.5,31.8c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C89.5,31.4,88.6,31.8,87.5,31.8z M87.5,35.8c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C89.5,35.4,88.6,35.8,87.5,35.8z M87.5,39.8c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C89.5,39.4,88.6,39.8,87.5,39.8z M87.5,43.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C89.5,43.4,88.6,43.7,87.5,43.7z M87.5,47.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C89.5,47.3,88.6,47.7,87.5,47.7z M87.5,51.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C89.5,51.3,88.6,51.7,87.5,51.7z M87.5,55.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C89.5,55.3,88.6,55.7,87.5,55.7z M87.5,59.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C89.5,59.3,88.6,59.6,87.5,59.6z M87.5,63.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C89.5,63.2,88.6,63.6,87.5,63.6z M95.4,31.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C95,29.8,95.4,30.7,95.4,31.8z M95.4,35.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,33.7,95.4,34.7,95.4,35.8z M95.4,39.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C95,37.7,95.4,38.7,95.4,39.8
						z M95.4,43.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C95,41.7,95.4,42.7,95.4,43.7z M95.4,47.7
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C95,45.7,95.4,46.6,95.4,47.7z M95.4,51.7c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C95,49.7,95.4,50.6,95.4,51.7z M95.4,55.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C95,53.7,95.4,54.6,95.4,55.7z M95.4,59.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,57.6,95.4,58.6,95.4,59.6z M95.4,63.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C95,61.6,95.4,62.5,95.4,63.6
						z"/>
					<path class="st2" d="M103.4,31.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C103,29.8,103.4,30.7,103.4,31.8z
						M103.4,35.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C103,33.7,103.4,34.7,103.4,35.8z M103.4,39.8
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C103,37.7,103.4,38.7,103.4,39.8z M103.4,43.7c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C103,41.7,103.4,42.7,103.4,43.7z M103.4,47.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C103,45.7,103.4,46.6,103.4,47.7z M103.4,51.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,49.7,103.4,50.6,103.4,51.7z M103.4,27.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,27.4,104.5,27.8,103.4,27.8z M103.4,31.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,31.4,104.5,31.8,103.4,31.8z M103.4,35.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,35.4,104.5,35.8,103.4,35.8z M103.4,39.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,39.4,104.5,39.8,103.4,39.8z M103.4,43.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,43.4,104.5,43.7,103.4,43.7z M103.4,47.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,47.3,104.5,47.7,103.4,47.7z M103.4,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,51.3,104.5,51.7,103.4,51.7z M103.4,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,55.3,104.5,55.7,103.4,55.7z M111.3,23.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,21.8,111.3,22.8,111.3,23.9z M111.3,27.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,25.8,111.3,26.7,111.3,27.8z M111.3,31.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,29.8,111.3,30.7,111.3,31.8z M111.3,35.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,33.7,111.3,34.7,111.3,35.8z M111.3,39.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,37.7,111.3,38.7,111.3,39.8z M111.3,43.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,41.7,111.3,42.7,111.3,43.7z M111.3,47.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,45.7,111.3,46.6,111.3,47.7z M111.3,51.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,49.7,111.3,50.6,111.3,51.7z M111.3,55.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,53.7,111.3,54.6,111.3,55.7z M111.3,59.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,57.6,111.3,58.6,111.3,59.6z M111.3,19.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,19.5,112.4,19.9,111.3,19.9z M111.3,23.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,23.5,112.4,23.9,111.3,23.9z M111.3,27.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,27.4,112.4,27.8,111.3,27.8z M111.3,31.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,31.4,112.4,31.8,111.3,31.8z M111.3,35.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,35.4,112.4,35.8,111.3,35.8z M111.3,39.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,39.4,112.4,39.8,111.3,39.8z M111.3,43.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,43.4,112.4,43.7,111.3,43.7z M111.3,47.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,47.3,112.4,47.7,111.3,47.7z M111.3,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,51.3,112.4,51.7,111.3,51.7z M111.3,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,55.3,112.4,55.7,111.3,55.7z M111.3,59.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,59.3,112.4,59.6,111.3,59.6z M111.3,63.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,63.2,112.4,63.6,111.3,63.6z M119.3,19.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C118.9,17.8,119.3,18.8,119.3,19.9z M119.3,23.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C118.9,21.8,119.3,22.8,119.3,23.9z M119.3,27.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C118.9,25.8,119.3,26.7,119.3,27.8z M119.3,31.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C118.9,29.8,119.3,30.7,119.3,31.8z M119.3,39.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C118.9,37.7,119.3,38.7,119.3,39.8z M119.3,43.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C118.9,41.7,119.3,42.7,119.3,43.7z M119.3,51.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C118.9,49.7,119.3,50.6,119.3,51.7z M119.3,55.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C118.9,53.7,119.3,54.6,119.3,55.7z M119.3,59.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C118.9,57.6,119.3,58.6,119.3,59.6z M119.3,63.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C118.9,61.6,119.3,62.5,119.3,63.6z M119.3,19.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C121.3,19.5,120.4,19.9,119.3,19.9z M119.3,23.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C121.3,23.5,120.4,23.9,119.3,23.9z M119.3,27.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C121.3,27.4,120.4,27.8,119.3,27.8z M119.3,39.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C121.3,39.4,120.4,39.8,119.3,39.8z M119.3,43.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C121.3,43.4,120.4,43.7,119.3,43.7z M119.3,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C121.3,55.3,120.4,55.7,119.3,55.7z M119.3,59.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C121.3,59.3,120.4,59.6,119.3,59.6z M119.3,63.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C121.3,63.2,120.4,63.6,119.3,63.6z M127.2,19.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S127.2,18.8,127.2,19.9z M127.2,23.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S127.2,22.8,127.2,23.9z
						M127.2,27.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S127.2,26.7,127.2,27.8z M127.2,31.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S127.2,30.7,127.2,31.8z M127.2,39.8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S127.2,38.7,127.2,39.8z M127.2,43.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C126.9,41.7,127.2,42.7,127.2,43.7z M127.2,51.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C126.9,49.7,127.2,50.6,127.2,51.7z M127.2,55.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C126.9,53.7,127.2,54.6,127.2,55.7z M127.2,59.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C126.9,57.6,127.2,58.6,127.2,59.6z M127.2,63.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C126.9,61.6,127.2,62.5,127.2,63.6z M127.2,19.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S128.3,19.9,127.2,19.9z M127.2,23.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S128.3,23.9,127.2,23.9z M127.2,27.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S128.3,27.8,127.2,27.8z
						M127.2,31.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S128.3,31.8,127.2,31.8z M127.2,35.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S128.3,35.8,127.2,35.8z M127.2,39.8c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S128.3,39.8,127.2,39.8z M127.2,43.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S128.3,43.7,127.2,43.7z M127.2,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S128.3,51.7,127.2,51.7z M127.2,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S128.3,55.7,127.2,55.7z
						M127.2,59.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S128.3,59.6,127.2,59.6z M127.2,63.6
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S128.3,63.6,127.2,63.6z M135.2,23.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S135.2,22.8,135.2,23.9z M135.2,27.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S135.2,26.7,135.2,27.8z M135.2,31.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S135.2,30.7,135.2,31.8z M135.2,35.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S135.2,34.7,135.2,35.8z
						M135.2,39.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S135.2,38.7,135.2,39.8z M135.2,43.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C134.8,41.7,135.2,42.7,135.2,43.7z M135.2,51.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C134.8,49.7,135.2,50.6,135.2,51.7z M135.2,55.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C134.8,53.7,135.2,54.6,135.2,55.7z M135.2,59.6
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C134.8,57.6,135.2,58.6,135.2,59.6z M135.2,27.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C137.2,27.4,136.3,27.8,135.2,27.8z M135.2,31.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C137.2,31.4,136.3,31.8,135.2,31.8z M135.2,35.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C137.2,35.4,136.3,35.8,135.2,35.8z M135.2,39.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C137.2,39.4,136.3,39.8,135.2,39.8z M135.2,43.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C137.2,43.4,136.3,43.7,135.2,43.7z M135.2,51.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C137.2,51.3,136.3,51.7,135.2,51.7z M135.2,55.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C137.2,55.3,136.3,55.7,135.2,55.7z M143.2,31.8
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C142.8,29.8,143.2,30.7,143.2,31.8z M143.2,35.8c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C142.8,33.7,143.2,34.7,143.2,35.8z M143.2,39.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C142.8,37.7,143.2,38.7,143.2,39.8z M143.2,43.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,41.7,143.2,42.7,143.2,43.7z M143.2,51.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,49.7,143.2,50.6,143.2,51.7z"/>
				</g>

				<g id='g2-2017'>
					<path class="st0" d="M175,11.9c-1.1,0-2-0.4-2.8-1.2S171,9.1,171,8c1.1,0,2,0.4,2.8,1.2C174.6,9.9,175,10.8,175,11.9z M175,15.9
						c-1.1,0-2-0.4-2.8-1.2S171,13,171,11.9c1.1,0,2,0.4,2.8,1.2C174.6,13.9,175,14.8,175,15.9z M175,19.9c-1.1,0-2-0.4-2.8-1.2
						S171,17,171,15.9c1.1,0,2,0.4,2.8,1.2C174.6,17.8,175,18.8,175,19.9z M175,47.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C174.6,45.7,175,46.6,175,47.7z M175,51.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,49.7,175,50.6,175,51.7z M175,55.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,53.7,175,54.6,175,55.7z M175,59.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,57.6,175,58.6,175,59.6z M175,63.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,61.6,175,62.5,175,63.6z M178.9,8c-1.1,0-2-0.4-2.8-1.2S175,5.1,175,4c1.1,0,2,0.4,2.8,1.2C178.5,5.9,178.9,6.9,178.9,8z
						M175,11.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C177,11.5,176.1,11.9,175,11.9z M175,15.9c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C177,15.5,176.1,15.9,175,15.9z M175,19.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C177,19.5,176.1,19.9,175,19.9z M175,43.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C177,43.4,176.1,43.7,175,43.7z M175,47.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C177,47.3,176.1,47.7,175,47.7z M175,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C177,51.3,176.1,51.7,175,51.7z M175,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C177,55.3,176.1,55.7,175,55.7z M175,59.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C177,59.3,176.1,59.6,175,59.6z M175,63.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C177,63.2,176.1,63.6,175,63.6z M182.9,4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C182.5,1.9,182.9,2.9,182.9,4z M182.9,8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C182.5,5.9,182.9,6.9,182.9,8z
						M182.9,11.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C182.5,9.9,182.9,10.8,182.9,11.9z M182.9,15.9
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C182.5,13.9,182.9,14.8,182.9,15.9z M182.9,19.9c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C182.5,17.8,182.9,18.8,182.9,19.9z M182.9,39.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C182.5,37.7,182.9,38.7,182.9,39.8z M182.9,43.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C182.5,41.7,182.9,42.7,182.9,43.7z M182.9,47.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C182.5,45.7,182.9,46.6,182.9,47.7z M182.9,51.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C182.5,49.7,182.9,50.6,182.9,51.7z M182.9,55.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C182.5,53.7,182.9,54.6,182.9,55.7z M182.9,59.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C182.5,57.6,182.9,58.6,182.9,59.6z M182.9,63.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C182.5,61.6,182.9,62.5,182.9,63.6z M182.9,4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C184.9,3.6,184,4,182.9,4z
						M182.9,8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C184.9,7.6,184,8,182.9,8z M182.9,11.9c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C184.9,11.5,184,11.9,182.9,11.9z M182.9,15.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C184.9,15.5,184,15.9,182.9,15.9z M182.9,19.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,19.5,184,19.9,182.9,19.9z M182.9,35.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,35.4,184,35.8,182.9,35.8z M182.9,39.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,39.4,184,39.8,182.9,39.8z M182.9,43.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,43.4,184,43.7,182.9,43.7z M182.9,47.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,47.3,184,47.7,182.9,47.7z M182.9,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,51.3,184,51.7,182.9,51.7z M182.9,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,55.3,184,55.7,182.9,55.7z M182.9,59.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,59.3,184,59.6,182.9,59.6z M182.9,63.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,63.2,184,63.6,182.9,63.6z M190.9,4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,1.9,190.9,2.9,190.9,4z M190.9,8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C190.5,5.9,190.9,6.9,190.9,8z
						M190.9,11.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C190.5,9.9,190.9,10.8,190.9,11.9z M190.9,15.9
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C190.5,13.9,190.9,14.8,190.9,15.9z M190.9,19.9c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C190.5,17.8,190.9,18.8,190.9,19.9z M190.9,35.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C190.5,33.7,190.9,34.7,190.9,35.8z M190.9,39.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,37.7,190.9,38.7,190.9,39.8z M190.9,43.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,41.7,190.9,42.7,190.9,43.7z M190.9,47.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,45.7,190.9,46.6,190.9,47.7z M190.9,51.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,49.7,190.9,50.6,190.9,51.7z M190.9,55.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,53.7,190.9,54.6,190.9,55.7z M190.9,59.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,57.6,190.9,58.6,190.9,59.6z M190.9,63.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,61.6,190.9,62.5,190.9,63.6z M190.9,4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,3.6,192,4,190.9,4z M190.9,8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C192.9,7.6,192,8,190.9,8z
						M190.9,11.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C192.9,11.5,192,11.9,190.9,11.9z M190.9,15.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C192.9,15.5,192,15.9,190.9,15.9z M190.9,31.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C192.9,31.4,192,31.8,190.9,31.8z M190.9,35.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C192.9,35.4,192,35.8,190.9,35.8z M190.9,39.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C192.9,39.4,192,39.8,190.9,39.8z M190.9,43.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C192.9,43.4,192,43.7,190.9,43.7z M190.9,47.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C192.9,47.3,192,47.7,190.9,47.7z M190.9,51.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C192.9,51.3,192,51.7,190.9,51.7z M190.9,55.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C192.9,55.3,192,55.7,190.9,55.7z M190.9,59.6
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C192.9,59.3,192,59.6,190.9,59.6z M190.9,63.6
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C192.9,63.2,192,63.6,190.9,63.6z M198.8,4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S198.8,2.9,198.8,4z M198.8,8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S198.8,6.9,198.8,8z M198.8,11.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S198.8,10.8,198.8,11.9z M198.8,15.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S198.8,14.8,198.8,15.9z
						M198.8,27.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S198.8,26.7,198.8,27.8z M198.8,31.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S198.8,30.7,198.8,31.8z M198.8,35.8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S198.8,34.7,198.8,35.8z M198.8,39.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S198.8,38.7,198.8,39.8z M198.8,43.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,41.7,198.8,42.7,198.8,43.7z M198.8,51.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,49.7,198.8,50.6,198.8,51.7z M198.8,55.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,53.7,198.8,54.6,198.8,55.7z M198.8,59.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,57.6,198.8,58.6,198.8,59.6z M198.8,63.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,61.6,198.8,62.5,198.8,63.6z M198.8,4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.9,3.6,199.9,4,198.8,4z M198.8,8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S199.9,8,198.8,8z
						M198.8,11.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S199.9,11.9,198.8,11.9z M198.8,15.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S199.9,15.9,198.8,15.9z M198.8,19.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S199.9,19.9,198.8,19.9z M198.8,23.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S199.9,23.9,198.8,23.9z M198.8,27.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S199.9,27.8,198.8,27.8z M198.8,31.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S199.9,31.8,198.8,31.8z
						M198.8,35.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S199.9,35.8,198.8,35.8z M198.8,39.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S199.9,39.8,198.8,39.8z M198.8,51.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S199.9,51.7,198.8,51.7z M198.8,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S199.9,55.7,198.8,55.7z M198.8,59.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S199.9,59.6,198.8,59.6z M198.8,63.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S199.9,63.6,198.8,63.6z
						M206.8,4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S206.8,2.9,206.8,4z M206.8,8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S206.8,6.9,206.8,8z M206.8,11.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S206.8,10.8,206.8,11.9z M206.8,15.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S206.8,14.8,206.8,15.9z M206.8,19.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S206.8,18.8,206.8,19.9z
						M206.8,23.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S206.8,22.8,206.8,23.9z M206.8,27.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S206.8,26.7,206.8,27.8z M206.8,31.8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S206.8,30.7,206.8,31.8z M206.8,35.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S206.8,34.7,206.8,35.8z M206.8,51.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,49.7,206.8,50.6,206.8,51.7z M206.8,55.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,53.7,206.8,54.6,206.8,55.7z M206.8,59.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,57.6,206.8,58.6,206.8,59.6z M206.8,63.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,61.6,206.8,62.5,206.8,63.6z M206.8,8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,7.6,207.9,8,206.8,8z M206.8,11.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,11.5,207.9,11.9,206.8,11.9z M206.8,15.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,15.5,207.9,15.9,206.8,15.9z M206.8,19.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,19.5,207.9,19.9,206.8,19.9z M206.8,23.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,23.5,207.9,23.9,206.8,23.9z M206.8,27.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,27.4,207.9,27.8,206.8,27.8z M206.8,31.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,31.4,207.9,31.8,206.8,31.8z M206.8,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,51.3,207.9,51.7,206.8,51.7z M206.8,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,55.3,207.9,55.7,206.8,55.7z M206.8,59.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,59.3,207.9,59.6,206.8,59.6z M206.8,63.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,63.2,207.9,63.6,206.8,63.6z M214.7,11.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,9.9,214.7,10.8,214.7,11.9z M214.7,15.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,13.9,214.7,14.8,214.7,15.9z M214.7,19.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,17.8,214.7,18.8,214.7,19.9z M214.7,23.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,21.8,214.7,22.8,214.7,23.9z M214.7,27.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,25.8,214.7,26.7,214.7,27.8z M214.7,31.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,29.8,214.7,30.7,214.7,31.8z M214.7,51.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,49.7,214.7,50.6,214.7,51.7z M214.7,55.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,53.7,214.7,54.6,214.7,55.7z M214.7,59.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,57.6,214.7,58.6,214.7,59.6z M214.7,63.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,61.6,214.7,62.5,214.7,63.6z M214.7,15.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,15.5,215.8,15.9,214.7,15.9z M214.7,19.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,19.5,215.8,19.9,214.7,19.9z M214.7,23.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,23.5,215.8,23.9,214.7,23.9z M214.7,27.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,27.4,215.8,27.8,214.7,27.8z M214.7,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,51.3,215.8,51.7,214.7,51.7z M214.7,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,55.3,215.8,55.7,214.7,55.7z M214.7,59.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,59.3,215.8,59.6,214.7,59.6z M214.7,63.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,63.2,215.8,63.6,214.7,63.6z"/>
					<path class="st0" d="M226.7,15.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C226.3,13.9,226.7,14.8,226.7,15.9z M226.7,19.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C226.3,17.8,226.7,18.8,226.7,19.9z M226.7,23.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C226.3,21.8,226.7,22.8,226.7,23.9z M226.7,27.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C226.3,25.8,226.7,26.7,226.7,27.8z M226.7,31.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C226.3,29.8,226.7,30.7,226.7,31.8z M226.7,35.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C226.3,33.7,226.7,34.7,226.7,35.8z M226.7,39.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C226.3,37.7,226.7,38.7,226.7,39.8z M226.7,43.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C226.3,41.7,226.7,42.7,226.7,43.7z M226.7,47.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C226.3,45.7,226.7,46.6,226.7,47.7z M226.7,51.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C226.3,49.7,226.7,50.6,226.7,51.7z M226.7,11.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C228.7,11.5,227.7,11.9,226.7,11.9z M226.7,15.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C228.7,15.5,227.7,15.9,226.7,15.9z M226.7,19.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C228.7,19.5,227.7,19.9,226.7,19.9z M226.7,23.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C228.7,23.5,227.7,23.9,226.7,23.9z M226.7,27.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C228.7,27.4,227.7,27.8,226.7,27.8z M226.7,31.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C228.7,31.4,227.7,31.8,226.7,31.8z M226.7,35.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C228.7,35.4,227.7,35.8,226.7,35.8z M226.7,39.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C228.7,39.4,227.7,39.8,226.7,39.8z M226.7,43.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C228.7,43.4,227.7,43.7,226.7,43.7z M226.7,47.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C228.7,47.3,227.7,47.7,226.7,47.7z M226.7,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C228.7,51.3,227.7,51.7,226.7,51.7z M226.7,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C228.7,55.3,227.7,55.7,226.7,55.7z M234.6,8c-1.1,0-2-0.4-2.8-1.2C231,6,230.6,5.1,230.6,4c1.1,0,2,0.4,2.8,1.2
						C234.2,5.9,234.6,6.9,234.6,8z M234.6,11.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,9.9,234.6,10.8,234.6,11.9z M234.6,15.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,13.9,234.6,14.8,234.6,15.9z M234.6,19.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,17.8,234.6,18.8,234.6,19.9z M234.6,23.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,21.8,234.6,22.8,234.6,23.9z M234.6,27.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,25.8,234.6,26.7,234.6,27.8z M234.6,31.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,29.8,234.6,30.7,234.6,31.8z M234.6,35.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,33.7,234.6,34.7,234.6,35.8z M234.6,39.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,37.7,234.6,38.7,234.6,39.8z M234.6,43.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,41.7,234.6,42.7,234.6,43.7z M234.6,47.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,45.7,234.6,46.6,234.6,47.7z M234.6,51.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,49.7,234.6,50.6,234.6,51.7z M234.6,55.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,53.7,234.6,54.6,234.6,55.7z M234.6,59.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,57.6,234.6,58.6,234.6,59.6z M234.6,4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.6,3.6,235.7,4,234.6,4z M234.6,8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,7.6,235.7,8,234.6,8
						z M234.6,11.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,11.5,235.7,11.9,234.6,11.9z M234.6,15.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,15.5,235.7,15.9,234.6,15.9z M234.6,19.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,19.5,235.7,19.9,234.6,19.9z M234.6,23.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,23.5,235.7,23.9,234.6,23.9z M234.6,27.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,27.4,235.7,27.8,234.6,27.8z M234.6,31.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,31.4,235.7,31.8,234.6,31.8z M234.6,35.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,35.4,235.7,35.8,234.6,35.8z M234.6,39.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,39.4,235.7,39.8,234.6,39.8z M234.6,43.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,43.4,235.7,43.7,234.6,43.7z M234.6,47.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,47.3,235.7,47.7,234.6,47.7z M234.6,51.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,51.3,235.7,51.7,234.6,51.7z M234.6,55.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,55.3,235.7,55.7,234.6,55.7z M234.6,59.6
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,59.3,235.7,59.6,234.6,59.6z M234.6,63.6
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,63.2,235.7,63.6,234.6,63.6z M242.6,4
						c-1.1,0-2-0.4-2.8-1.2C239,2,238.6,1.1,238.6,0c1.1,0,2,0.4,2.8,1.2C242.2,1.9,242.6,2.9,242.6,4z M242.6,8c-1.1,0-2-0.4-2.8-1.2
						C239,6,238.6,5.1,238.6,4c1.1,0,2,0.4,2.8,1.2C242.2,5.9,242.6,6.9,242.6,8z M242.6,11.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C242.2,9.9,242.6,10.8,242.6,11.9z M242.6,15.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C242.2,13.9,242.6,14.8,242.6,15.9z M242.6,19.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C242.2,17.8,242.6,18.8,242.6,19.9z M242.6,47.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C242.2,45.7,242.6,46.6,242.6,47.7z M242.6,51.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C242.2,49.7,242.6,50.6,242.6,51.7z M242.6,55.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C242.2,53.7,242.6,54.6,242.6,55.7z M242.6,59.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C242.2,57.6,242.6,58.6,242.6,59.6z M242.6,63.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C242.2,61.6,242.6,62.5,242.6,63.6z M242.6,4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C244.6,3.6,243.7,4,242.6,4z M242.6,8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,7.6,243.7,8,242.6,8z M242.6,11.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,11.5,243.7,11.9,242.6,11.9z M242.6,15.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,15.5,243.7,15.9,242.6,15.9z M242.6,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,51.3,243.7,51.7,242.6,51.7z M242.6,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,55.3,243.7,55.7,242.6,55.7z M242.6,59.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,59.3,243.7,59.6,242.6,59.6z M242.6,63.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,63.2,243.7,63.6,242.6,63.6z M250.5,4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C250.1,1.9,250.5,2.9,250.5,4z M250.5,8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C250.1,5.9,250.5,6.9,250.5,8z
						M250.5,11.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C250.1,9.9,250.5,10.8,250.5,11.9z M250.5,15.9
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C250.1,13.9,250.5,14.8,250.5,15.9z M250.5,19.9c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C250.1,17.8,250.5,18.8,250.5,19.9z M250.5,47.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C250.1,45.7,250.5,46.6,250.5,47.7z M250.5,51.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C250.1,49.7,250.5,50.6,250.5,51.7z M250.5,55.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C250.1,53.7,250.5,54.6,250.5,55.7z M250.5,59.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C250.1,57.6,250.5,58.6,250.5,59.6z M250.5,63.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C250.1,61.6,250.5,62.5,250.5,63.6z M250.5,4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C252.6,3.6,251.6,4,250.5,4z
						M250.5,8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C252.6,7.6,251.6,8,250.5,8z M250.5,11.9c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C252.6,11.5,251.6,11.9,250.5,11.9z M250.5,15.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C252.6,15.5,251.6,15.9,250.5,15.9z M250.5,19.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,19.5,251.6,19.9,250.5,19.9z M250.5,23.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,23.5,251.6,23.9,250.5,23.9z M250.5,27.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,27.4,251.6,27.8,250.5,27.8z M250.5,31.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,31.4,251.6,31.8,250.5,31.8z M250.5,35.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,35.4,251.6,35.8,250.5,35.8z M250.5,39.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,39.4,251.6,39.8,250.5,39.8z M250.5,43.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,43.4,251.6,43.7,250.5,43.7z M250.5,47.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,47.3,251.6,47.7,250.5,47.7z M250.5,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,51.3,251.6,51.7,250.5,51.7z M250.5,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,55.3,251.6,55.7,250.5,55.7z M250.5,59.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,59.3,251.6,59.6,250.5,59.6z M250.5,63.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,63.2,251.6,63.6,250.5,63.6z M258.5,8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,5.9,258.5,6.9,258.5,8z M258.5,11.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,9.9,258.5,10.8,258.5,11.9z M258.5,15.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,13.9,258.5,14.8,258.5,15.9z M258.5,19.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,17.8,258.5,18.8,258.5,19.9z M258.5,23.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,21.8,258.5,22.8,258.5,23.9z M258.5,27.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,25.8,258.5,26.7,258.5,27.8z M258.5,31.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,29.8,258.5,30.7,258.5,31.8z M258.5,35.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,33.7,258.5,34.7,258.5,35.8z M258.5,39.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,37.7,258.5,38.7,258.5,39.8z M258.5,43.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,41.7,258.5,42.7,258.5,43.7z M258.5,47.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,45.7,258.5,46.6,258.5,47.7z M258.5,51.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,49.7,258.5,50.6,258.5,51.7z M258.5,55.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,53.7,258.5,54.6,258.5,55.7z M258.5,59.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,57.6,258.5,58.6,258.5,59.6z M258.5,11.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S259.6,11.9,258.5,11.9z
						M258.5,15.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S259.6,15.9,258.5,15.9z M258.5,19.9c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S259.6,19.9,258.5,19.9z M258.5,23.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S259.6,23.9,258.5,23.9z M258.5,27.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S259.6,27.8,258.5,27.8z M258.5,31.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S259.6,31.8,258.5,31.8z M258.5,35.8
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S259.6,35.8,258.5,35.8z M258.5,39.8c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S259.6,39.8,258.5,39.8z M258.5,43.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S259.6,43.7,258.5,43.7z M258.5,47.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S259.6,47.7,258.5,47.7z M258.5,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S259.6,51.7,258.5,51.7z
						M258.5,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S259.6,55.7,258.5,55.7z M266.4,15.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C266,13.9,266.4,14.8,266.4,15.9z M266.4,19.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C266,17.8,266.4,18.8,266.4,19.9z M266.4,23.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C266,21.8,266.4,22.8,266.4,23.9z M266.4,27.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C266,25.8,266.4,26.7,266.4,27.8z M266.4,31.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C266,29.8,266.4,30.7,266.4,31.8z M266.4,35.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C266,33.7,266.4,34.7,266.4,35.8z M266.4,39.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C266,37.7,266.4,38.7,266.4,39.8z M266.4,43.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C266,41.7,266.4,42.7,266.4,43.7z M266.4,47.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C266,45.7,266.4,46.6,266.4,47.7z M266.4,51.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C266,49.7,266.4,50.6,266.4,51.7z"/>
					<path class="st0" d="M274.4,8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C274,5.9,274.4,6.9,274.4,8z M274.4,11.9
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C274,9.9,274.4,10.8,274.4,11.9z M274.4,15.9c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C274,13.9,274.4,14.8,274.4,15.9z M274.4,4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C276.4,3.6,275.5,4,274.4,4z M274.4,8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C276.4,7.6,275.5,8,274.4,8z M274.4,11.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C276.4,11.5,275.5,11.9,274.4,11.9z M274.4,15.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C276.4,15.5,275.5,15.9,274.4,15.9z M282.3,4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C281.9,1.9,282.3,2.9,282.3,4z M282.3,8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C281.9,5.9,282.3,6.9,282.3,8z
						M282.3,11.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C281.9,9.9,282.3,10.8,282.3,11.9z M282.3,15.9
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C281.9,13.9,282.3,14.8,282.3,15.9z M282.3,19.9c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C281.9,17.8,282.3,18.8,282.3,19.9z M282.3,23.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C281.9,21.8,282.3,22.8,282.3,23.9z M282.3,27.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C281.9,25.8,282.3,26.7,282.3,27.8z M282.3,31.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C281.9,29.8,282.3,30.7,282.3,31.8z M282.3,35.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C281.9,33.7,282.3,34.7,282.3,35.8z M282.3,39.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C281.9,37.7,282.3,38.7,282.3,39.8z M282.3,43.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C281.9,41.7,282.3,42.7,282.3,43.7z M282.3,47.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C281.9,45.7,282.3,46.6,282.3,47.7z M282.3,51.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C281.9,49.7,282.3,50.6,282.3,51.7z M282.3,55.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C281.9,53.7,282.3,54.6,282.3,55.7z M282.3,59.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C281.9,57.6,282.3,58.6,282.3,59.6z M282.3,63.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C281.9,61.6,282.3,62.5,282.3,63.6z M282.3,4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C284.4,3.6,283.4,4,282.3,4z
						M282.3,8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C284.4,7.6,283.4,8,282.3,8z M282.3,11.9c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C284.4,11.5,283.4,11.9,282.3,11.9z M282.3,15.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C284.4,15.5,283.4,15.9,282.3,15.9z M282.3,19.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.4,19.5,283.4,19.9,282.3,19.9z M282.3,23.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.4,23.5,283.4,23.9,282.3,23.9z M282.3,27.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.4,27.4,283.4,27.8,282.3,27.8z M282.3,31.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.4,31.4,283.4,31.8,282.3,31.8z M282.3,35.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.4,35.4,283.4,35.8,282.3,35.8z M282.3,39.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.4,39.4,283.4,39.8,282.3,39.8z M282.3,43.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.4,43.4,283.4,43.7,282.3,43.7z M282.3,47.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.4,47.3,283.4,47.7,282.3,47.7z M282.3,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.4,51.3,283.4,51.7,282.3,51.7z M282.3,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.4,55.3,283.4,55.7,282.3,55.7z M282.3,59.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.4,59.3,283.4,59.6,282.3,59.6z M282.3,63.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.4,63.2,283.4,63.6,282.3,63.6z M290.3,4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,1.9,290.3,2.9,290.3,4z M290.3,8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C289.9,5.9,290.3,6.9,290.3,8z
						M290.3,11.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C289.9,9.9,290.3,10.8,290.3,11.9z M290.3,15.9
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C289.9,13.9,290.3,14.8,290.3,15.9z M290.3,19.9c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C289.9,17.8,290.3,18.8,290.3,19.9z M290.3,23.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C289.9,21.8,290.3,22.8,290.3,23.9z M290.3,27.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,25.8,290.3,26.7,290.3,27.8z M290.3,31.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,29.8,290.3,30.7,290.3,31.8z M290.3,35.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,33.7,290.3,34.7,290.3,35.8z M290.3,39.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,37.7,290.3,38.7,290.3,39.8z M290.3,43.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,41.7,290.3,42.7,290.3,43.7z M290.3,47.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,45.7,290.3,46.6,290.3,47.7z M290.3,51.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,49.7,290.3,50.6,290.3,51.7z M290.3,55.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,53.7,290.3,54.6,290.3,55.7z M290.3,59.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,57.6,290.3,58.6,290.3,59.6z M290.3,63.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,61.6,290.3,62.5,290.3,63.6z M290.3,4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,3.6,291.4,4,290.3,4z M290.3,8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C292.3,7.6,291.4,8,290.3,8
						z M290.3,11.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C292.3,11.5,291.4,11.9,290.3,11.9z M290.3,15.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C292.3,15.5,291.4,15.9,290.3,15.9z M290.3,19.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C292.3,19.5,291.4,19.9,290.3,19.9z M290.3,23.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C292.3,23.5,291.4,23.9,290.3,23.9z M290.3,27.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C292.3,27.4,291.4,27.8,290.3,27.8z M290.3,31.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C292.3,31.4,291.4,31.8,290.3,31.8z M290.3,35.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C292.3,35.4,291.4,35.8,290.3,35.8z M290.3,39.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C292.3,39.4,291.4,39.8,290.3,39.8z M290.3,43.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C292.3,43.4,291.4,43.7,290.3,43.7z M290.3,47.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C292.3,47.3,291.4,47.7,290.3,47.7z M290.3,51.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C292.3,51.3,291.4,51.7,290.3,51.7z M290.3,55.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C292.3,55.3,291.4,55.7,290.3,55.7z M290.3,59.6
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C292.3,59.3,291.4,59.6,290.3,59.6z M290.3,63.6
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C292.3,63.2,291.4,63.6,290.3,63.6z"/>
					<path class="st0" d="M306.2,4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C305.8,1.9,306.2,2.9,306.2,4z
						M306.2,8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C305.8,5.9,306.2,6.9,306.2,8z M306.2,11.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C305.8,9.9,306.2,10.8,306.2,11.9z M306.2,15.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C305.8,13.9,306.2,14.8,306.2,15.9z M306.2,51.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C305.8,49.7,306.2,50.6,306.2,51.7z M306.2,55.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C305.8,53.7,306.2,54.6,306.2,55.7z M306.2,59.6
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C305.8,57.6,306.2,58.6,306.2,59.6z M306.2,63.6
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C305.8,61.6,306.2,62.5,306.2,63.6z M306.2,4
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C308.2,3.6,307.3,4,306.2,4z M306.2,8c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C308.2,7.6,307.3,8,306.2,8z M306.2,11.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C308.2,11.5,307.3,11.9,306.2,11.9z M306.2,15.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C308.2,15.5,307.3,15.9,306.2,15.9z M306.2,47.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C308.2,47.3,307.3,47.7,306.2,47.7z M306.2,51.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C308.2,51.3,307.3,51.7,306.2,51.7z M306.2,55.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C308.2,55.3,307.3,55.7,306.2,55.7z M306.2,59.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C308.2,59.3,307.3,59.6,306.2,59.6z M306.2,63.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C308.2,63.2,307.3,63.6,306.2,63.6z M314.2,4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C313.8,1.9,314.2,2.9,314.2,4z M314.2,8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C313.8,5.9,314.2,6.9,314.2,8z M314.2,11.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C313.8,9.9,314.2,10.8,314.2,11.9z M314.2,15.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C313.8,13.9,314.2,14.8,314.2,15.9z M314.2,43.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C313.8,41.7,314.2,42.7,314.2,43.7z M314.2,47.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C313.8,45.7,314.2,46.6,314.2,47.7z M314.2,51.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C313.8,49.7,314.2,50.6,314.2,51.7z M314.2,55.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C313.8,53.7,314.2,54.6,314.2,55.7z M314.2,59.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C313.8,57.6,314.2,58.6,314.2,59.6z M314.2,63.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C313.8,61.6,314.2,62.5,314.2,63.6z M314.2,4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C316.2,3.6,315.3,4,314.2,4z M314.2,8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C316.2,7.6,315.3,8,314.2,8z M314.2,11.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,11.5,315.3,11.9,314.2,11.9z M314.2,15.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,15.5,315.3,15.9,314.2,15.9z M314.2,39.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,39.4,315.3,39.8,314.2,39.8z M314.2,43.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,43.4,315.3,43.7,314.2,43.7z M314.2,47.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,47.3,315.3,47.7,314.2,47.7z M314.2,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,51.3,315.3,51.7,314.2,51.7z M314.2,55.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,55.3,315.3,55.7,314.2,55.7z M314.2,59.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,59.3,315.3,59.6,314.2,59.6z M314.2,63.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,63.2,315.3,63.6,314.2,63.6z M322.1,4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,1.9,322.1,2.9,322.1,4z M322.1,8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,5.9,322.1,6.9,322.1,8z M322.1,11.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,9.9,322.1,10.8,322.1,11.9z M322.1,15.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,13.9,322.1,14.8,322.1,15.9z M322.1,35.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,33.7,322.1,34.7,322.1,35.8z M322.1,39.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,37.7,322.1,38.7,322.1,39.8z M322.1,43.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,41.7,322.1,42.7,322.1,43.7z M322.1,47.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,45.7,322.1,46.6,322.1,47.7z M322.1,51.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,49.7,322.1,50.6,322.1,51.7z M322.1,55.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,53.7,322.1,54.6,322.1,55.7z M322.1,59.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,57.6,322.1,58.6,322.1,59.6z M322.1,63.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,61.6,322.1,62.5,322.1,63.6z M322.1,4c0-1.1,0.4-2,1.2-2.8S325,0,326.1,0c0,1.1-0.4,2-1.2,2.8C324.1,3.6,323.2,4,322.1,4z
						M322.1,8c0-1.1,0.4-2,1.2-2.8S325,4,326.1,4c0,1.1-0.4,2-1.2,2.8C324.1,7.6,323.2,8,322.1,8z M322.1,11.9c0-1.1,0.4-2,1.2-2.8
						S325,8,326.1,8c0,1.1-0.4,2-1.2,2.8C324.1,11.5,323.2,11.9,322.1,11.9z M322.1,15.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C324.1,15.5,323.2,15.9,322.1,15.9z M322.1,31.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C324.1,31.4,323.2,31.8,322.1,31.8z M322.1,35.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C324.1,35.4,323.2,35.8,322.1,35.8z M322.1,39.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C324.1,39.4,323.2,39.8,322.1,39.8z M322.1,43.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C324.1,43.4,323.2,43.7,322.1,43.7z M322.1,47.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C324.1,47.3,323.2,47.7,322.1,47.7z M322.1,51.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C324.1,51.3,323.2,51.7,322.1,51.7z M330.1,4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C329.7,1.9,330.1,2.9,330.1,4z M330.1,8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C329.7,5.9,330.1,6.9,330.1,8z
						M330.1,11.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C329.7,9.9,330.1,10.8,330.1,11.9z M330.1,15.9
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C329.7,13.9,330.1,14.8,330.1,15.9z M330.1,27.8c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C329.7,25.8,330.1,26.7,330.1,27.8z M330.1,31.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C329.7,29.8,330.1,30.7,330.1,31.8z M330.1,35.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C329.7,33.7,330.1,34.7,330.1,35.8z M330.1,39.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C329.7,37.7,330.1,38.7,330.1,39.8z M330.1,43.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C329.7,41.7,330.1,42.7,330.1,43.7z M330.1,47.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C329.7,45.7,330.1,46.6,330.1,47.7z M330.1,4c0-1.1,0.4-2,1.2-2.8S332.9,0,334,0c0,1.1-0.4,2-1.2,2.8C332.1,3.6,331.2,4,330.1,4z
						M330.1,8c0-1.1,0.4-2,1.2-2.8S332.9,4,334,4c0,1.1-0.4,2-1.2,2.8C332.1,7.6,331.2,8,330.1,8z M330.1,11.9c0-1.1,0.4-2,1.2-2.8
						S332.9,8,334,8c0,1.1-0.4,2-1.2,2.8C332.1,11.5,331.2,11.9,330.1,11.9z M330.1,15.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C332.1,15.5,331.2,15.9,330.1,15.9z M330.1,19.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C332.1,19.5,331.2,19.9,330.1,19.9z M330.1,23.9c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C332.1,23.5,331.2,23.9,330.1,23.9z M330.1,27.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C332.1,27.4,331.2,27.8,330.1,27.8z M330.1,31.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C332.1,31.4,331.2,31.8,330.1,31.8z M330.1,35.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C332.1,35.4,331.2,35.8,330.1,35.8z M330.1,39.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C332.1,39.4,331.2,39.8,330.1,39.8z M330.1,43.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C332.1,43.4,331.2,43.7,330.1,43.7z M338,4c-1.1,0-2-0.4-2.8-1.2C334.4,2,334,1.1,334,0c1.1,0,2,0.4,2.8,1.2
						C337.6,1.9,338,2.9,338,4z M338,8c-1.1,0-2-0.4-2.8-1.2S334,5.1,334,4c1.1,0,2,0.4,2.8,1.2C337.6,5.9,338,6.9,338,8z M338,11.9
						c-1.1,0-2-0.4-2.8-1.2S334,9.1,334,8c1.1,0,2,0.4,2.8,1.2C337.6,9.9,338,10.8,338,11.9z M338,15.9c-1.1,0-2-0.4-2.8-1.2
						S334,13,334,11.9c1.1,0,2,0.4,2.8,1.2C337.6,13.9,338,14.8,338,15.9z M338,19.9c-1.1,0-2-0.4-2.8-1.2S334,17,334,15.9
						c1.1,0,2,0.4,2.8,1.2C337.6,17.8,338,18.8,338,19.9z M338,23.9c-1.1,0-2-0.4-2.8-1.2S334,21,334,19.9c1.1,0,2,0.4,2.8,1.2
						C337.6,21.8,338,22.8,338,23.9z M338,27.8c-1.1,0-2-0.4-2.8-1.2S334,25,334,23.9c1.1,0,2,0.4,2.8,1.2C337.6,25.8,338,26.7,338,27.8
						z M338,31.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C337.6,29.8,338,30.7,338,31.8z M338,35.8
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C337.6,33.7,338,34.7,338,35.8z M338,39.8c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C337.6,37.7,338,38.7,338,39.8z M338,4c0-1.1,0.4-2,1.2-2.8C340,0.4,340.9,0,342,0
						c0,1.1-0.4,2-1.2,2.8C340.1,3.6,339.1,4,338,4z M338,8c0-1.1,0.4-2,1.2-2.8C340,4.4,340.9,4,342,4c0,1.1-0.4,2-1.2,2.8
						S339.1,8,338,8z M338,11.9c0-1.1,0.4-2,1.2-2.8C340,8.3,340.9,8,342,8c0,1.1-0.4,2-1.2,2.8S339.1,11.9,338,11.9z M338,15.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S339.1,15.9,338,15.9z M338,19.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S339.1,19.9,338,19.9z M338,23.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S339.1,23.9,338,23.9z M338,27.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S339.1,27.8,338,27.8z M338,31.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S339.1,31.8,338,31.8z M338,35.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S339.1,35.8,338,35.8z M346,4c-1.1,0-2-0.4-2.8-1.2
						C342.4,2,342,1.1,342,0c1.1,0,2,0.4,2.8,1.2S346,2.9,346,4z M346,8c-1.1,0-2-0.4-2.8-1.2C342.4,6,342,5.1,342,4
						c1.1,0,2,0.4,2.8,1.2S346,6.9,346,8z M346,11.9c-1.1,0-2-0.4-2.8-1.2C342.4,10,342,9.1,342,8c1.1,0,2,0.4,2.8,1.2
						S346,10.8,346,11.9z M346,15.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S346,14.8,346,15.9z M346,19.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S346,18.8,346,19.9z M346,23.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S346,22.8,346,23.9z M346,27.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S346,26.7,346,27.8z M346,31.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S346,30.7,346,31.8z M346,4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C348,3.6,347.1,4,346,4z M346,8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S347.1,8,346,8z M346,11.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S347.1,11.9,346,11.9z M346,15.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S347.1,15.9,346,15.9z M346,19.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S347.1,19.9,346,19.9z M346,23.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S347.1,23.9,346,23.9z M346,27.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S347.1,27.8,346,27.8z"/>
				</g>

				<g id='g3-adler'>
					<path class="st1" d="M4,123.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,121.3,4,122.3,4,123.4z
						M4,127.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,125.3,4,126.3,4,127.3z M4,131.3
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,129.3,4,130.2,4,131.3z M4,135.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,133.3,4,134.2,4,135.3z M4,139.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,137.3,4,138.2,4,139.3z M4,143.2c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,141.2,4,142.2,4,143.2z M4,147.2c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,145.2,4,146.1,4,147.2z M4,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C6,115,5.1,115.4,4,115.4z M4,119.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C6,119,5.1,119.4,4,119.4z M4,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,123,5.1,123.4,4,123.4z
						M4,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,127,5.1,127.3,4,127.3z M4,131.3
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,130.9,5.1,131.3,4,131.3z M4,135.3c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,134.9,5.1,135.3,4,135.3z M4,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C6,138.9,5.1,139.3,4,139.3z M4,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C6,142.9,5.1,143.2,4,143.2z M4,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,146.8,5.1,147.2,4,147.2
						z M11.9,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,105.4,11.9,106.4,11.9,107.5z M11.9,111.4
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,109.4,11.9,110.3,11.9,111.4z M11.9,115.4
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,113.4,11.9,114.3,11.9,115.4z M11.9,119.4
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,117.3,11.9,118.3,11.9,119.4z M11.9,123.4
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,121.3,11.9,122.3,11.9,123.4z M11.9,127.3
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,125.3,11.9,126.3,11.9,127.3z M11.9,131.3
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,129.3,11.9,130.2,11.9,131.3z M11.9,135.3
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,133.3,11.9,134.2,11.9,135.3z M11.9,139.3
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,137.3,11.9,138.2,11.9,139.3z M11.9,143.2
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,141.2,11.9,142.2,11.9,143.2z M11.9,147.2
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,145.2,11.9,146.1,11.9,147.2z M11.9,99.5
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,99.1,13,99.5,11.9,99.5z M11.9,103.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,103.1,13,103.5,11.9,103.5z M11.9,107.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,107.1,13,107.5,11.9,107.5z M11.9,111.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,111,13,111.4,11.9,111.4z M11.9,115.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,115,13,115.4,11.9,115.4z M11.9,119.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,119,13,119.4,11.9,119.4z M11.9,123.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,123,13,123.4,11.9,123.4z M11.9,127.3c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,127,13,127.3,11.9,127.3z M11.9,131.3c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,130.9,13,131.3,11.9,131.3z M11.9,135.3c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,134.9,13,135.3,11.9,135.3z M11.9,139.3c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,138.9,13,139.3,11.9,139.3z M11.9,143.2c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,142.9,13,143.2,11.9,143.2z M11.9,147.2c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,146.8,13,147.2,11.9,147.2z M19.9,91.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,89.5,19.9,90.5,19.9,91.6z M19.9,95.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,93.5,19.9,94.4,19.9,95.5z M19.9,99.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,97.5,19.9,98.4,19.9,99.5z M19.9,103.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,101.4,19.9,102.4,19.9,103.5z M19.9,107.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,105.4,19.9,106.4,19.9,107.5z M19.9,111.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,109.4,19.9,110.3,19.9,111.4z M19.9,115.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,113.4,19.9,114.3,19.9,115.4z M19.9,119.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,117.3,19.9,118.3,19.9,119.4z M19.9,123.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,121.3,19.9,122.3,19.9,123.4z M19.9,127.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,125.3,19.9,126.3,19.9,127.3z M19.9,131.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,129.3,19.9,130.2,19.9,131.3z M19.9,135.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,133.3,19.9,134.2,19.9,135.3z M19.9,139.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,137.3,19.9,138.2,19.9,139.3z M19.9,87.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C21.9,87.2,21,87.6,19.9,87.6z M19.9,91.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,91.2,21,91.6,19.9,91.6z M19.9,95.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,95.1,21,95.5,19.9,95.5z
						M19.9,99.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,99.1,21,99.5,19.9,99.5z M19.9,103.5
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,103.1,21,103.5,19.9,103.5z M19.9,107.5c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,107.1,21,107.5,19.9,107.5z M19.9,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C21.9,127,21,127.3,19.9,127.3z M19.9,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,130.9,21,131.3,19.9,131.3z M19.9,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,134.9,21,135.3,19.9,135.3z M19.9,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,138.9,21,139.3,19.9,139.3z M27.8,87.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,85.5,27.8,86.5,27.8,87.6z M27.8,91.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,89.5,27.8,90.5,27.8,91.6z M27.8,95.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,93.5,27.8,94.4,27.8,95.5z M27.8,99.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,97.5,27.8,98.4,27.8,99.5z M27.8,103.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,101.4,27.8,102.4,27.8,103.5z M27.8,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,105.4,27.8,106.4,27.8,107.5z M27.8,127.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,125.3,27.8,126.3,27.8,127.3z M27.8,131.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,129.3,27.8,130.2,27.8,131.3z M27.8,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,133.3,27.8,134.2,27.8,135.3z M27.8,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,137.3,27.8,138.2,27.8,139.3z M27.8,91.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,91.2,28.9,91.6,27.8,91.6z M27.8,95.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,95.1,28.9,95.5,27.8,95.5z M27.8,99.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,99.1,28.9,99.5,27.8,99.5z M27.8,103.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,103.1,28.9,103.5,27.8,103.5z M27.8,107.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,107.1,28.9,107.5,27.8,107.5z M27.8,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,111,28.9,111.4,27.8,111.4z M27.8,115.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,115,28.9,115.4,27.8,115.4z M27.8,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,119,28.9,119.4,27.8,119.4z M27.8,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,123,28.9,123.4,27.8,123.4z M27.8,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,127,28.9,127.3,27.8,127.3z M27.8,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,130.9,28.9,131.3,27.8,131.3z M27.8,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,134.9,28.9,135.3,27.8,135.3z M27.8,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,138.9,28.9,139.3,27.8,139.3z M35.8,99.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,97.5,35.8,98.4,35.8,99.5z M35.8,103.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,101.4,35.8,102.4,35.8,103.5z M35.8,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,105.4,35.8,106.4,35.8,107.5z M35.8,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,109.4,35.8,110.3,35.8,111.4z M35.8,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,113.4,35.8,114.3,35.8,115.4z M35.8,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,117.3,35.8,118.3,35.8,119.4z M35.8,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,121.3,35.8,122.3,35.8,123.4z M35.8,127.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,125.3,35.8,126.3,35.8,127.3z M35.8,131.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,129.3,35.8,130.2,35.8,131.3z M35.8,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,133.3,35.8,134.2,35.8,135.3z M35.8,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,137.3,35.8,138.2,35.8,139.3z M35.8,143.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,141.2,35.8,142.2,35.8,143.2z M35.8,147.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,145.2,35.8,146.1,35.8,147.2z M35.8,107.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,107.5,35.8,107.5z
						M35.8,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,111.4,35.8,111.4z M35.8,115.4c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,115.4,35.8,115.4z M35.8,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S36.9,119.4,35.8,119.4z M35.8,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S36.9,123.4,35.8,123.4z M35.8,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,127.3,35.8,127.3z
						M35.8,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,131.3,35.8,131.3z M35.8,135.3
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,135.3,35.8,135.3z M35.8,139.3c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,139.3,35.8,139.3z M35.8,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S36.9,143.2,35.8,143.2z M35.8,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S36.9,147.2,35.8,147.2z M43.7,115.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S43.7,114.3,43.7,115.4z
						M43.7,119.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S43.7,118.3,43.7,119.4z M43.7,123.4
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S43.7,122.3,43.7,123.4z M43.7,127.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C43.4,125.3,43.7,126.3,43.7,127.3z M43.7,131.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C43.4,129.3,43.7,130.2,43.7,131.3z M43.7,135.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C43.4,133.3,43.7,134.2,43.7,135.3z M43.7,139.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C43.4,137.3,43.7,138.2,43.7,139.3z M43.7,143.2c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C43.4,141.2,43.7,142.2,43.7,143.2z M43.7,147.2c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C43.4,145.2,43.7,146.1,43.7,147.2z M43.7,123.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,123.4,43.7,123.4z M43.7,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S44.8,127.3,43.7,127.3z M43.7,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S44.8,131.3,43.7,131.3z M43.7,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,135.3,43.7,135.3z
						M43.7,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,139.3,43.7,139.3z M43.7,143.2
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,143.2,43.7,143.2z M43.7,147.2c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,147.2,43.7,147.2z"/>
					<path class="st0" d="M55.7,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C55.3,113.4,55.7,114.3,55.7,115.4z
						M55.7,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C55.3,117.3,55.7,118.3,55.7,119.4z M55.7,123.4
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C55.3,121.3,55.7,122.3,55.7,123.4z M55.7,127.3c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C55.3,125.3,55.7,126.3,55.7,127.3z M55.7,131.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C55.3,129.3,55.7,130.2,55.7,131.3z M55.7,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C55.3,133.3,55.7,134.2,55.7,135.3z M55.7,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,111,56.8,111.4,55.7,111.4z M55.7,115.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,115,56.8,115.4,55.7,115.4z M55.7,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,119,56.8,119.4,55.7,119.4z M55.7,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,123,56.8,123.4,55.7,123.4z M55.7,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,127,56.8,127.3,55.7,127.3z M55.7,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,130.9,56.8,131.3,55.7,131.3z M55.7,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,134.9,56.8,135.3,55.7,135.3z M55.7,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,138.9,56.8,139.3,55.7,139.3z M63.6,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,105.4,63.6,106.4,63.6,107.5z M63.6,111.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,109.4,63.6,110.3,63.6,111.4z M63.6,115.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,113.4,63.6,114.3,63.6,115.4z M63.6,119.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,117.3,63.6,118.3,63.6,119.4z M63.6,123.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,121.3,63.6,122.3,63.6,123.4z M63.6,127.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,125.3,63.6,126.3,63.6,127.3z M63.6,131.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,129.3,63.6,130.2,63.6,131.3z M63.6,135.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,133.3,63.6,134.2,63.6,135.3z M63.6,139.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,137.3,63.6,138.2,63.6,139.3z M63.6,143.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,141.2,63.6,142.2,63.6,143.2z M63.6,103.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,103.1,64.7,103.5,63.6,103.5z M63.6,107.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,107.1,64.7,107.5,63.6,107.5z M63.6,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,111,64.7,111.4,63.6,111.4z M63.6,115.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,115,64.7,115.4,63.6,115.4z M63.6,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,119,64.7,119.4,63.6,119.4z M63.6,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,123,64.7,123.4,63.6,123.4z M63.6,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,127,64.7,127.3,63.6,127.3z M63.6,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,130.9,64.7,131.3,63.6,131.3z M63.6,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,134.9,64.7,135.3,63.6,135.3z M63.6,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,138.9,64.7,139.3,63.6,139.3z M63.6,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,142.9,64.7,143.2,63.6,143.2z M63.6,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,146.8,64.7,147.2,63.6,147.2z M71.6,103.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,101.4,71.6,102.4,71.6,103.5z M71.6,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,105.4,71.6,106.4,71.6,107.5z M71.6,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,109.4,71.6,110.3,71.6,111.4z M71.6,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,113.4,71.6,114.3,71.6,115.4z M71.6,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,117.3,71.6,118.3,71.6,119.4z M71.6,131.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,129.3,71.6,130.2,71.6,131.3z M71.6,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,133.3,71.6,134.2,71.6,135.3z M71.6,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,137.3,71.6,138.2,71.6,139.3z M71.6,143.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,141.2,71.6,142.2,71.6,143.2z M71.6,147.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,145.2,71.6,146.1,71.6,147.2z M71.6,103.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,103.1,72.7,103.5,71.6,103.5z M71.6,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,107.1,72.7,107.5,71.6,107.5z M71.6,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,111,72.7,111.4,71.6,111.4z M71.6,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,115,72.7,115.4,71.6,115.4z M71.6,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,134.9,72.7,135.3,71.6,135.3z M71.6,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,138.9,72.7,139.3,71.6,139.3z M71.6,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,142.9,72.7,143.2,71.6,143.2z M71.6,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,146.8,72.7,147.2,71.6,147.2z M79.5,103.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S79.5,102.4,79.5,103.5z M79.5,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S79.5,106.4,79.5,107.5z
						M79.5,111.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S79.5,110.3,79.5,111.4z M79.5,115.4
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S79.5,114.3,79.5,115.4z M79.5,135.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C79.1,133.3,79.5,134.2,79.5,135.3z M79.5,139.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C79.1,137.3,79.5,138.2,79.5,139.3z M79.5,143.2c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C79.1,141.2,79.5,142.2,79.5,143.2z M79.5,147.2c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C79.1,145.2,79.5,146.1,79.5,147.2z M79.5,87.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C81.6,87.2,80.6,87.6,79.5,87.6z M79.5,91.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,91.6,79.5,91.6z M79.5,95.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S80.6,95.5,79.5,95.5z M79.5,99.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S80.6,99.5,79.5,99.5z M79.5,103.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,103.5,79.5,103.5z
						M79.5,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,107.5,79.5,107.5z M79.5,111.4
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,111.4,79.5,111.4z M79.5,115.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,115.4,79.5,115.4z M79.5,119.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S80.6,119.4,79.5,119.4z M79.5,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S80.6,123.4,79.5,123.4z M79.5,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,127.3,79.5,127.3z
						M79.5,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,131.3,79.5,131.3z M79.5,135.3
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,135.3,79.5,135.3z M79.5,139.3c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,139.3,79.5,139.3z M79.5,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S80.6,143.2,79.5,143.2z M79.5,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S80.6,147.2,79.5,147.2z M87.5,87.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,86.5,87.5,87.6z
						M87.5,91.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,90.5,87.5,91.6z M87.5,95.5
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,94.4,87.5,95.5z M87.5,99.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,98.4,87.5,99.5z M87.5,103.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S87.5,102.4,87.5,103.5z M87.5,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S87.5,106.4,87.5,107.5z M87.5,111.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,110.3,87.5,111.4z
						M87.5,115.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,114.3,87.5,115.4z M87.5,119.4
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,118.3,87.5,119.4z M87.5,123.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,122.3,87.5,123.4z M87.5,127.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C87.1,125.3,87.5,126.3,87.5,127.3z M87.5,131.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C87.1,129.3,87.5,130.2,87.5,131.3z M87.5,135.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C87.1,133.3,87.5,134.2,87.5,135.3z M87.5,139.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C87.1,137.3,87.5,138.2,87.5,139.3z M87.5,143.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C87.1,141.2,87.5,142.2,87.5,143.2z M87.5,147.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C87.1,145.2,87.5,146.1,87.5,147.2z M87.5,87.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C89.5,87.2,88.6,87.6,87.5,87.6z M87.5,91.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,91.2,88.6,91.6,87.5,91.6z M87.5,95.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,95.1,88.6,95.5,87.5,95.5z M87.5,99.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,99.1,88.6,99.5,87.5,99.5z M87.5,103.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,103.1,88.6,103.5,87.5,103.5z M87.5,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,107.1,88.6,107.5,87.5,107.5z M87.5,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,111,88.6,111.4,87.5,111.4z M87.5,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,115,88.6,115.4,87.5,115.4z M87.5,119.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,119,88.6,119.4,87.5,119.4z M87.5,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,123,88.6,123.4,87.5,123.4z M87.5,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,127,88.6,127.3,87.5,127.3z M87.5,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,130.9,88.6,131.3,87.5,131.3z M87.5,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,134.9,88.6,135.3,87.5,135.3z M87.5,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,138.9,88.6,139.3,87.5,139.3z M87.5,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,142.9,88.6,143.2,87.5,143.2z M87.5,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,146.8,88.6,147.2,87.5,147.2z M95.4,87.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,85.5,95.4,86.5,95.4,87.6z M95.4,91.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C95,89.5,95.4,90.5,95.4,91.6
						z M95.4,95.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C95,93.5,95.4,94.4,95.4,95.5z M95.4,99.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C95,97.5,95.4,98.4,95.4,99.5z M95.4,103.5c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C95,101.4,95.4,102.4,95.4,103.5z M95.4,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C95,105.4,95.4,106.4,95.4,107.5z M95.4,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,109.4,95.4,110.3,95.4,111.4z M95.4,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,113.4,95.4,114.3,95.4,115.4z M95.4,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,117.3,95.4,118.3,95.4,119.4z M95.4,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,121.3,95.4,122.3,95.4,123.4z M95.4,127.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,125.3,95.4,126.3,95.4,127.3z M95.4,131.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,129.3,95.4,130.2,95.4,131.3z M95.4,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,133.3,95.4,134.2,95.4,135.3z M95.4,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,137.3,95.4,138.2,95.4,139.3z M95.4,143.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,141.2,95.4,142.2,95.4,143.2z M95.4,147.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,145.2,95.4,146.1,95.4,147.2z"/>
					<path class="st0" d="M103.4,87.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,85.5,103.4,86.5,103.4,87.6z M103.4,91.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,89.5,103.4,90.5,103.4,91.6z M103.4,95.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,93.5,103.4,94.4,103.4,95.5z M103.4,99.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,97.5,103.4,98.4,103.4,99.5z M103.4,103.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,101.4,103.4,102.4,103.4,103.5z M103.4,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,105.4,103.4,106.4,103.4,107.5z M103.4,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,109.4,103.4,110.3,103.4,111.4z M103.4,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,113.4,103.4,114.3,103.4,115.4z M103.4,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,117.3,103.4,118.3,103.4,119.4z M103.4,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,121.3,103.4,122.3,103.4,123.4z M103.4,127.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,125.3,103.4,126.3,103.4,127.3z M103.4,131.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,129.3,103.4,130.2,103.4,131.3z M103.4,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,133.3,103.4,134.2,103.4,135.3z M103.4,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,137.3,103.4,138.2,103.4,139.3z M103.4,143.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,141.2,103.4,142.2,103.4,143.2z M103.4,147.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,145.2,103.4,146.1,103.4,147.2z M103.4,87.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,87.2,104.5,87.6,103.4,87.6z M103.4,91.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,91.2,104.5,91.6,103.4,91.6z M103.4,95.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,95.1,104.5,95.5,103.4,95.5z M103.4,99.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,99.1,104.5,99.5,103.4,99.5z M103.4,103.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,103.1,104.5,103.5,103.4,103.5z M103.4,107.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,107.1,104.5,107.5,103.4,107.5z M103.4,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,111,104.5,111.4,103.4,111.4z M103.4,115.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,115,104.5,115.4,103.4,115.4z M103.4,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,119,104.5,119.4,103.4,119.4z M103.4,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,123,104.5,123.4,103.4,123.4z M103.4,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,127,104.5,127.3,103.4,127.3z M103.4,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,130.9,104.5,131.3,103.4,131.3z M103.4,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,134.9,104.5,135.3,103.4,135.3z M103.4,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,138.9,104.5,139.3,103.4,139.3z M103.4,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,142.9,104.5,143.2,103.4,143.2z M103.4,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,146.8,104.5,147.2,103.4,147.2z M111.3,87.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,85.5,111.3,86.5,111.3,87.6z M111.3,91.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,89.5,111.3,90.5,111.3,91.6z M111.3,95.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,93.5,111.3,94.4,111.3,95.5z M111.3,99.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,97.5,111.3,98.4,111.3,99.5z M111.3,103.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,101.4,111.3,102.4,111.3,103.5z M111.3,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,105.4,111.3,106.4,111.3,107.5z M111.3,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,109.4,111.3,110.3,111.3,111.4z M111.3,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,113.4,111.3,114.3,111.3,115.4z M111.3,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,117.3,111.3,118.3,111.3,119.4z M111.3,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,121.3,111.3,122.3,111.3,123.4z M111.3,127.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,125.3,111.3,126.3,111.3,127.3z M111.3,131.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,129.3,111.3,130.2,111.3,131.3z M111.3,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,133.3,111.3,134.2,111.3,135.3z M111.3,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,137.3,111.3,138.2,111.3,139.3z M111.3,143.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,141.2,111.3,142.2,111.3,143.2z M111.3,147.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,145.2,111.3,146.1,111.3,147.2z M111.3,87.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,87.2,112.4,87.6,111.3,87.6z M111.3,91.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,91.2,112.4,91.6,111.3,91.6z M111.3,95.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,95.1,112.4,95.5,111.3,95.5z M111.3,99.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,99.1,112.4,99.5,111.3,99.5z M111.3,103.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,103.1,112.4,103.5,111.3,103.5z M111.3,107.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,107.1,112.4,107.5,111.3,107.5z M111.3,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,111,112.4,111.4,111.3,111.4z M111.3,115.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,115,112.4,115.4,111.3,115.4z M111.3,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,119,112.4,119.4,111.3,119.4z M111.3,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,123,112.4,123.4,111.3,123.4z M111.3,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,127,112.4,127.3,111.3,127.3z M111.3,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,130.9,112.4,131.3,111.3,131.3z M111.3,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,134.9,112.4,135.3,111.3,135.3z M111.3,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,138.9,112.4,139.3,111.3,139.3z M111.3,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,142.9,112.4,143.2,111.3,143.2z M111.3,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,146.8,112.4,147.2,111.3,147.2z"/>
					<path class="st0" d="M123.3,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,113.4,123.3,114.3,123.3,115.4
						z M123.3,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,117.3,123.3,118.3,123.3,119.4z M123.3,123.4
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,121.3,123.3,122.3,123.3,123.4z M123.3,127.3
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,125.3,123.3,126.3,123.3,127.3z M123.3,131.3
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,129.3,123.3,130.2,123.3,131.3z M123.3,135.3
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,133.3,123.3,134.2,123.3,135.3z M123.3,111.4
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C125.3,111,124.4,111.4,123.3,111.4z M123.3,115.4c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C125.3,115,124.4,115.4,123.3,115.4z M123.3,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C125.3,119,124.4,119.4,123.3,119.4z M123.3,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,123,124.4,123.4,123.3,123.4z M123.3,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,127,124.4,127.3,123.3,127.3z M123.3,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,130.9,124.4,131.3,123.3,131.3z M123.3,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,134.9,124.4,135.3,123.3,135.3z M123.3,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,138.9,124.4,139.3,123.3,139.3z M131.2,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,105.4,131.2,106.4,131.2,107.5z M131.2,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,109.4,131.2,110.3,131.2,111.4z M131.2,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,113.4,131.2,114.3,131.2,115.4z M131.2,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,117.3,131.2,118.3,131.2,119.4z M131.2,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,121.3,131.2,122.3,131.2,123.4z M131.2,127.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,125.3,131.2,126.3,131.2,127.3z M131.2,131.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,129.3,131.2,130.2,131.2,131.3z M131.2,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,133.3,131.2,134.2,131.2,135.3z M131.2,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,137.3,131.2,138.2,131.2,139.3z M131.2,143.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,141.2,131.2,142.2,131.2,143.2z M131.2,103.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,103.1,132.3,103.5,131.2,103.5z M131.2,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,107.1,132.3,107.5,131.2,107.5z M131.2,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,111,132.3,111.4,131.2,111.4z M131.2,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,115,132.3,115.4,131.2,115.4z M131.2,119.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,119,132.3,119.4,131.2,119.4z M131.2,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,123,132.3,123.4,131.2,123.4z M131.2,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,127,132.3,127.3,131.2,127.3z M131.2,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,130.9,132.3,131.3,131.2,131.3z M131.2,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,134.9,132.3,135.3,131.2,135.3z M131.2,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,138.9,132.3,139.3,131.2,139.3z M131.2,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,142.9,132.3,143.2,131.2,143.2z M131.2,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,146.8,132.3,147.2,131.2,147.2z M139.2,103.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,101.4,139.2,102.4,139.2,103.5z M139.2,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,105.4,139.2,106.4,139.2,107.5z M139.2,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,109.4,139.2,110.3,139.2,111.4z M139.2,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,113.4,139.2,114.3,139.2,115.4z M139.2,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,121.3,139.2,122.3,139.2,123.4z M139.2,127.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,125.3,139.2,126.3,139.2,127.3z M139.2,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,133.3,139.2,134.2,139.2,135.3z M139.2,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,137.3,139.2,138.2,139.2,139.3z M139.2,143.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,141.2,139.2,142.2,139.2,143.2z M139.2,147.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,145.2,139.2,146.1,139.2,147.2z M139.2,103.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,103.1,140.3,103.5,139.2,103.5z M139.2,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,107.1,140.3,107.5,139.2,107.5z M139.2,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,111,140.3,111.4,139.2,111.4z M139.2,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,123,140.3,123.4,139.2,123.4z M139.2,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,127,140.3,127.3,139.2,127.3z M139.2,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,138.9,140.3,139.3,139.2,139.3z M139.2,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,142.9,140.3,143.2,139.2,143.2z M139.2,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,146.8,140.3,147.2,139.2,147.2z M147.1,103.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S147.1,102.4,147.1,103.5z M147.1,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S147.1,106.4,147.1,107.5z M147.1,111.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S147.1,110.3,147.1,111.4z M147.1,115.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S147.1,114.3,147.1,115.4z M147.1,123.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S147.1,122.3,147.1,123.4z M147.1,127.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C146.7,125.3,147.1,126.3,147.1,127.3z M147.1,135.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C146.7,133.3,147.1,134.2,147.1,135.3z M147.1,139.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C146.7,137.3,147.1,138.2,147.1,139.3z M147.1,143.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C146.7,141.2,147.1,142.2,147.1,143.2z M147.1,147.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C146.7,145.2,147.1,146.1,147.1,147.2z M147.1,103.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S148.2,103.5,147.1,103.5z M147.1,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S148.2,107.5,147.1,107.5
						z M147.1,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S148.2,111.4,147.1,111.4z M147.1,115.4
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S148.2,115.4,147.1,115.4z M147.1,119.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S148.2,119.4,147.1,119.4z M147.1,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S148.2,123.4,147.1,123.4z M147.1,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S148.2,127.3,147.1,127.3z M147.1,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S148.2,135.3,147.1,135.3
						z M147.1,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S148.2,139.3,147.1,139.3z M147.1,143.2
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S148.2,143.2,147.1,143.2z M147.1,147.2c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S148.2,147.2,147.1,147.2z M155.1,107.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S155.1,106.4,155.1,107.5z M155.1,111.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S155.1,110.3,155.1,111.4z M155.1,115.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S155.1,114.3,155.1,115.4z M155.1,119.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S155.1,118.3,155.1,119.4z M155.1,123.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S155.1,122.3,155.1,123.4z M155.1,127.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C154.7,125.3,155.1,126.3,155.1,127.3z M155.1,135.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C154.7,133.3,155.1,134.2,155.1,135.3z M155.1,139.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C154.7,137.3,155.1,138.2,155.1,139.3z M155.1,143.2c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C154.7,141.2,155.1,142.2,155.1,143.2z M155.1,111.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C157.1,111,156.2,111.4,155.1,111.4z M155.1,115.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C157.1,115,156.2,115.4,155.1,115.4z M155.1,119.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C157.1,119,156.2,119.4,155.1,119.4z M155.1,123.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C157.1,123,156.2,123.4,155.1,123.4z M155.1,127.3c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C157.1,127,156.2,127.3,155.1,127.3z M155.1,135.3c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C157.1,134.9,156.2,135.3,155.1,135.3z M155.1,139.3c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C157.1,138.9,156.2,139.3,155.1,139.3z M163,115.4c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C162.6,113.4,163,114.3,163,115.4z M163,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C162.6,117.3,163,118.3,163,119.4z M163,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C162.6,121.3,163,122.3,163,123.4z M163,127.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C162.6,125.3,163,126.3,163,127.3z M163,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C162.6,133.3,163,134.2,163,135.3z"/>
					<path class="st0" d="M171,103.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C170.6,101.4,171,102.4,171,103.5z
						M171,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C170.6,105.4,171,106.4,171,107.5z M171,111.4
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C170.6,109.4,171,110.3,171,111.4z M171,115.4c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C170.6,113.4,171,114.3,171,115.4z M171,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C170.6,117.3,171,118.3,171,119.4z M171,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C170.6,121.3,171,122.3,171,123.4z M171,127.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C170.6,125.3,171,126.3,171,127.3z M171,131.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C170.6,129.3,171,130.2,171,131.3z M171,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C170.6,133.3,171,134.2,171,135.3z M171,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C170.6,137.3,171,138.2,171,139.3z M171,143.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C170.6,141.2,171,142.2,171,143.2z M171,147.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C170.6,145.2,171,146.1,171,147.2z M171,103.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C173,103.1,172.1,103.5,171,103.5z M171,107.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C173,107.1,172.1,107.5,171,107.5z M171,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C173,111,172.1,111.4,171,111.4z M171,115.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C173,115,172.1,115.4,171,115.4z M171,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C173,119,172.1,119.4,171,119.4z M171,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C173,123,172.1,123.4,171,123.4z M171,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C173,127,172.1,127.3,171,127.3z M171,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C173,130.9,172.1,131.3,171,131.3z M171,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C173,134.9,172.1,135.3,171,135.3z M171,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C173,138.9,172.1,139.3,171,139.3z M171,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C173,142.9,172.1,143.2,171,143.2z M171,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C173,146.8,172.1,147.2,171,147.2z M178.9,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C178.5,105.4,178.9,106.4,178.9,107.5z M178.9,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C178.5,109.4,178.9,110.3,178.9,111.4z M178.9,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C178.5,113.4,178.9,114.3,178.9,115.4z M178.9,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C178.5,117.3,178.9,118.3,178.9,119.4z M178.9,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C178.5,121.3,178.9,122.3,178.9,123.4z M178.9,127.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C178.5,125.3,178.9,126.3,178.9,127.3z M178.9,131.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C178.5,129.3,178.9,130.2,178.9,131.3z M178.9,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C178.5,133.3,178.9,134.2,178.9,135.3z M178.9,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C178.5,137.3,178.9,138.2,178.9,139.3z M178.9,143.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C178.5,141.2,178.9,142.2,178.9,143.2z M178.9,147.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C178.5,145.2,178.9,146.1,178.9,147.2z M178.9,103.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C181,103.1,180,103.5,178.9,103.5z M178.9,107.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C181,107.1,180,107.5,178.9,107.5z M178.9,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C181,111,180,111.4,178.9,111.4z M178.9,115.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C181,115,180,115.4,178.9,115.4z M178.9,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C181,119,180,119.4,178.9,119.4z M178.9,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C181,123,180,123.4,178.9,123.4z M178.9,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C181,127,180,127.3,178.9,127.3z M178.9,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C181,130.9,180,131.3,178.9,131.3z M178.9,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C181,134.9,180,135.3,178.9,135.3z M178.9,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C181,138.9,180,139.3,178.9,139.3z M178.9,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C181,142.9,180,143.2,178.9,143.2z M178.9,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C181,146.8,180,147.2,178.9,147.2z M186.9,103.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C186.5,101.4,186.9,102.4,186.9,103.5z M186.9,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C186.5,105.4,186.9,106.4,186.9,107.5z M186.9,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C186.5,109.4,186.9,110.3,186.9,111.4z M186.9,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C186.5,113.4,186.9,114.3,186.9,115.4z M186.9,103.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C188.9,103.1,188,103.5,186.9,103.5z M186.9,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C188.9,107.1,188,107.5,186.9,107.5z M186.9,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C188.9,111,188,111.4,186.9,111.4z M194.8,103.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C194.5,101.4,194.8,102.4,194.8,103.5z M194.8,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C194.5,105.4,194.8,106.4,194.8,107.5z M194.8,111.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C194.5,109.4,194.8,110.3,194.8,111.4z M194.8,115.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C194.5,113.4,194.8,114.3,194.8,115.4z M194.8,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S195.9,107.5,194.8,107.5z M194.8,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S195.9,111.4,194.8,111.4
						z M194.8,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S195.9,115.4,194.8,115.4z"/>
				</g>

				<g id='g4'>
					<path class="st0" d="M234.6,87.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,85.5,234.6,86.5,234.6,87.6z M234.6,91.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,89.5,234.6,90.5,234.6,91.6z M234.6,95.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,93.5,234.6,94.4,234.6,95.5z M234.6,99.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,97.5,234.6,98.4,234.6,99.5z M234.6,103.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,101.4,234.6,102.4,234.6,103.5z M234.6,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,105.4,234.6,106.4,234.6,107.5z M234.6,111.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,109.4,234.6,110.3,234.6,111.4z M234.6,115.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,113.4,234.6,114.3,234.6,115.4z M234.6,119.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,117.3,234.6,118.3,234.6,119.4z M234.6,123.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,121.3,234.6,122.3,234.6,123.4z M234.6,127.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,125.3,234.6,126.3,234.6,127.3z M234.6,131.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,129.3,234.6,130.2,234.6,131.3z M234.6,135.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,133.3,234.6,134.2,234.6,135.3z M234.6,139.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,137.3,234.6,138.2,234.6,139.3z M234.6,143.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,141.2,234.6,142.2,234.6,143.2z M234.6,147.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C234.2,145.2,234.6,146.1,234.6,147.2z M234.6,87.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.7,87.2,235.7,87.6,234.6,87.6z M234.6,91.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.7,91.2,235.7,91.6,234.6,91.6z M234.6,95.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.7,95.1,235.7,95.5,234.6,95.5z M234.6,99.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.7,99.1,235.7,99.5,234.6,99.5z M234.6,103.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.7,103.1,235.7,103.5,234.6,103.5z M234.6,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.7,107.1,235.7,107.5,234.6,107.5z M234.6,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.7,111,235.7,111.4,234.6,111.4z M234.6,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.7,115,235.7,115.4,234.6,115.4z M234.6,119.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.7,119,235.7,119.4,234.6,119.4z M234.6,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.7,123,235.7,123.4,234.6,123.4z M234.6,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.7,127,235.7,127.3,234.6,127.3z M234.6,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.7,130.9,235.7,131.3,234.6,131.3z M234.6,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.7,134.9,235.7,135.3,234.6,135.3z M234.6,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.7,138.9,235.7,139.3,234.6,139.3z M234.6,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.7,142.9,235.7,143.2,234.6,143.2z M234.6,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C236.7,146.8,235.7,147.2,234.6,147.2z M242.6,87.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C242.2,85.5,242.6,86.5,242.6,87.6z M242.6,91.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C242.2,89.5,242.6,90.5,242.6,91.6z M242.6,95.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C242.2,93.5,242.6,94.4,242.6,95.5z M242.6,99.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C242.2,97.5,242.6,98.4,242.6,99.5z M242.6,103.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C242.2,101.4,242.6,102.4,242.6,103.5z M242.6,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C242.2,105.4,242.6,106.4,242.6,107.5z M242.6,111.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C242.2,109.4,242.6,110.3,242.6,111.4z M242.6,115.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C242.2,113.4,242.6,114.3,242.6,115.4z M242.6,119.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C242.2,117.3,242.6,118.3,242.6,119.4z M242.6,123.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C242.2,121.3,242.6,122.3,242.6,123.4z M242.6,127.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C242.2,125.3,242.6,126.3,242.6,127.3z M242.6,131.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C242.2,129.3,242.6,130.2,242.6,131.3z M242.6,135.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C242.2,133.3,242.6,134.2,242.6,135.3z M242.6,139.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C242.2,137.3,242.6,138.2,242.6,139.3z M242.6,143.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C242.2,141.2,242.6,142.2,242.6,143.2z M242.6,147.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C242.2,145.2,242.6,146.1,242.6,147.2z M242.6,87.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,87.2,243.7,87.6,242.6,87.6z M242.6,91.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,91.2,243.7,91.6,242.6,91.6z M242.6,95.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,95.1,243.7,95.5,242.6,95.5z M242.6,99.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,99.1,243.7,99.5,242.6,99.5z M242.6,103.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,103.1,243.7,103.5,242.6,103.5z M242.6,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,107.1,243.7,107.5,242.6,107.5z M242.6,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,111,243.7,111.4,242.6,111.4z M242.6,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,115,243.7,115.4,242.6,115.4z M242.6,119.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,119,243.7,119.4,242.6,119.4z M242.6,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,123,243.7,123.4,242.6,123.4z M242.6,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,127,243.7,127.3,242.6,127.3z M242.6,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,130.9,243.7,131.3,242.6,131.3z M242.6,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,134.9,243.7,135.3,242.6,135.3z M242.6,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,138.9,243.7,139.3,242.6,139.3z M242.6,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,142.9,243.7,143.2,242.6,143.2z M242.6,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C244.6,146.8,243.7,147.2,242.6,147.2z M250.5,87.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C250.2,85.5,250.5,86.5,250.5,87.6z M250.5,91.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C250.2,89.5,250.5,90.5,250.5,91.6z M250.5,95.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C250.2,93.5,250.5,94.4,250.5,95.5z M250.5,99.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C250.2,97.5,250.5,98.4,250.5,99.5z M250.5,111.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C250.2,109.4,250.5,110.3,250.5,111.4z M250.5,115.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C250.2,113.4,250.5,114.3,250.5,115.4z M250.5,119.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C250.2,117.3,250.5,118.3,250.5,119.4z M250.5,123.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C250.2,121.3,250.5,122.3,250.5,123.4z M250.5,87.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,87.2,251.6,87.6,250.5,87.6z M250.5,91.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,91.2,251.6,91.6,250.5,91.6z M250.5,95.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,95.1,251.6,95.5,250.5,95.5z M250.5,99.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,99.1,251.6,99.5,250.5,99.5z M250.5,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,111,251.6,111.4,250.5,111.4z M250.5,115.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,115,251.6,115.4,250.5,115.4z M250.5,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,119,251.6,119.4,250.5,119.4z M250.5,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C252.6,123,251.6,123.4,250.5,123.4z M258.5,87.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,85.5,258.5,86.5,258.5,87.6z M258.5,91.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,89.5,258.5,90.5,258.5,91.6z M258.5,95.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,93.5,258.5,94.4,258.5,95.5z M258.5,99.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,97.5,258.5,98.4,258.5,99.5z M258.5,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,109.4,258.5,110.3,258.5,111.4z M258.5,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,113.4,258.5,114.3,258.5,115.4z M258.5,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,117.3,258.5,118.3,258.5,119.4z M258.5,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C258.1,121.3,258.5,122.3,258.5,123.4z M258.5,87.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C260.5,87.2,259.6,87.6,258.5,87.6z M258.5,91.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C260.5,91.2,259.6,91.6,258.5,91.6z M258.5,95.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C260.5,95.1,259.6,95.5,258.5,95.5z M258.5,99.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C260.5,99.1,259.6,99.5,258.5,99.5z M258.5,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C260.5,111,259.6,111.4,258.5,111.4z M258.5,115.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C260.5,115,259.6,115.4,258.5,115.4z M258.5,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C260.5,119,259.6,119.4,258.5,119.4z M258.5,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C260.5,123,259.6,123.4,258.5,123.4z M266.4,87.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C266.1,85.5,266.4,86.5,266.4,87.6z M266.4,91.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C266.1,89.5,266.4,90.5,266.4,91.6z M266.4,95.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C266.1,93.5,266.4,94.4,266.4,95.5z M266.4,99.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C266.1,97.5,266.4,98.4,266.4,99.5z M266.4,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C266.1,109.4,266.4,110.3,266.4,111.4z M266.4,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C266.1,113.4,266.4,114.3,266.4,115.4z M266.4,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C266.1,117.3,266.4,118.3,266.4,119.4z M266.4,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C266.1,121.3,266.4,122.3,266.4,123.4z M266.4,87.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C268.5,87.2,267.5,87.6,266.4,87.6z M266.4,91.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C268.5,91.2,267.5,91.6,266.4,91.6z M266.4,95.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C268.5,95.1,267.5,95.5,266.4,95.5z M266.4,99.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C268.5,99.1,267.5,99.5,266.4,99.5z M266.4,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C268.5,111,267.5,111.4,266.4,111.4z M266.4,115.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C268.5,115,267.5,115.4,266.4,115.4z M266.4,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C268.5,119,267.5,119.4,266.4,119.4z M266.4,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C268.5,123,267.5,123.4,266.4,123.4z M274.4,87.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S274.4,86.5,274.4,87.6z M274.4,91.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S274.4,90.5,274.4,91.6z
						M274.4,95.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S274.4,94.4,274.4,95.5z M274.4,99.5
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S274.4,98.4,274.4,99.5z M274.4,87.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C276.4,87.2,275.5,87.6,274.4,87.6z M274.4,91.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S275.5,91.6,274.4,91.6z M274.4,95.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S275.5,95.5,274.4,95.5z M274.4,99.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S275.5,99.5,274.4,99.5z"/>
					<path class="st1" d="M282.3,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C281.9,109.4,282.3,110.3,282.3,111.4
						z M282.3,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C281.9,113.4,282.3,114.3,282.3,115.4z M282.3,127.3
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C281.9,125.3,282.3,126.3,282.3,127.3z M282.3,131.3
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C281.9,129.3,282.3,130.2,282.3,131.3z M282.3,135.3
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C281.9,133.3,282.3,134.2,282.3,135.3z M282.3,139.3
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C281.9,137.3,282.3,138.2,282.3,139.3z M282.3,107.5
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C284.3,107.1,283.4,107.5,282.3,107.5z M282.3,111.4c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C284.3,111,283.4,111.4,282.3,111.4z M282.3,115.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C284.3,115,283.4,115.4,282.3,115.4z M282.3,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.3,123,283.4,123.4,282.3,123.4z M282.3,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.3,127,283.4,127.3,282.3,127.3z M282.3,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.3,130.9,283.4,131.3,282.3,131.3z M282.3,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.3,134.9,283.4,135.3,282.3,135.3z M282.3,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.3,138.9,283.4,139.3,282.3,139.3z M282.3,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.3,142.9,283.4,143.2,282.3,143.2z M290.3,103.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,101.4,290.3,102.4,290.3,103.5z M290.3,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,105.4,290.3,106.4,290.3,107.5z M290.3,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,109.4,290.3,110.3,290.3,111.4z M290.3,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,121.3,290.3,122.3,290.3,123.4z M290.3,127.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,125.3,290.3,126.3,290.3,127.3z M290.3,131.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,129.3,290.3,130.2,290.3,131.3z M290.3,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,133.3,290.3,134.2,290.3,135.3z M290.3,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,137.3,290.3,138.2,290.3,139.3z M290.3,143.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,141.2,290.3,142.2,290.3,143.2z M290.3,147.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,145.2,290.3,146.1,290.3,147.2z M290.3,103.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,103.1,291.4,103.5,290.3,103.5z M290.3,107.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,107.1,291.4,107.5,290.3,107.5z M290.3,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,111,291.4,111.4,290.3,111.4z M290.3,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,119,291.4,119.4,290.3,119.4z M290.3,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,123,291.4,123.4,290.3,123.4z M290.3,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,127,291.4,127.3,290.3,127.3z M290.3,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,134.9,291.4,135.3,290.3,135.3z M290.3,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,138.9,291.4,139.3,290.3,139.3z M290.3,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,142.9,291.4,143.2,290.3,143.2z M290.3,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,146.8,291.4,147.2,290.3,147.2z M298.2,103.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,101.4,298.2,102.4,298.2,103.5z M298.2,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,105.4,298.2,106.4,298.2,107.5z M298.2,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,109.4,298.2,110.3,298.2,111.4z M298.2,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,117.3,298.2,118.3,298.2,119.4z M298.2,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,121.3,298.2,122.3,298.2,123.4z M298.2,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,137.3,298.2,138.2,298.2,139.3z M298.2,143.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,141.2,298.2,142.2,298.2,143.2z M298.2,147.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,145.2,298.2,146.1,298.2,147.2z M298.2,103.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C300.3,103.1,299.3,103.5,298.2,103.5z M298.2,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C300.3,107.1,299.3,107.5,298.2,107.5z M298.2,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C300.3,111,299.3,111.4,298.2,111.4z M298.2,119.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C300.3,119,299.3,119.4,298.2,119.4z M298.2,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C300.3,123,299.3,123.4,298.2,123.4z M298.2,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C300.3,138.9,299.3,139.3,298.2,139.3z M298.2,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C300.3,142.9,299.3,143.2,298.2,143.2z M298.2,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C300.3,146.8,299.3,147.2,298.2,147.2z M306.2,103.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S306.2,102.4,306.2,103.5z M306.2,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S306.2,106.4,306.2,107.5z M306.2,111.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S306.2,110.3,306.2,111.4z M306.2,115.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S306.2,114.3,306.2,115.4z M306.2,119.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S306.2,118.3,306.2,119.4z M306.2,123.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S306.2,122.3,306.2,123.4z M306.2,127.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,125.3,306.2,126.3,306.2,127.3z M306.2,135.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,133.3,306.2,134.2,306.2,135.3z M306.2,139.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,137.3,306.2,138.2,306.2,139.3z M306.2,143.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,141.2,306.2,142.2,306.2,143.2z M306.2,103.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S307.3,103.5,306.2,103.5z M306.2,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S307.3,107.5,306.2,107.5
						z M306.2,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S307.3,111.4,306.2,111.4z M306.2,115.4
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S307.3,115.4,306.2,115.4z M306.2,119.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S307.3,119.4,306.2,119.4z M306.2,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S307.3,123.4,306.2,123.4z M306.2,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S307.3,127.3,306.2,127.3z M306.2,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S307.3,131.3,306.2,131.3
						z M306.2,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S307.3,135.3,306.2,135.3z M306.2,139.3
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S307.3,139.3,306.2,139.3z M306.2,143.2c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S307.3,143.2,306.2,143.2z M306.2,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S307.3,147.2,306.2,147.2z M314.1,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S314.1,106.4,314.1,107.5z M314.1,111.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S314.1,110.3,314.1,111.4z M314.1,115.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S314.1,114.3,314.1,115.4z M314.1,119.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S314.1,118.3,314.1,119.4z M314.1,123.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S314.1,122.3,314.1,123.4z M314.1,127.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.8,125.3,314.1,126.3,314.1,127.3z M314.1,131.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.8,129.3,314.1,130.2,314.1,131.3z M314.1,135.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.8,133.3,314.1,134.2,314.1,135.3z M314.1,139.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.8,137.3,314.1,138.2,314.1,139.3z M314.1,143.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.8,141.2,314.1,142.2,314.1,143.2z M314.1,147.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.8,145.2,314.1,146.1,314.1,147.2z M314.1,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,111,315.2,111.4,314.1,111.4z M314.1,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,115,315.2,115.4,314.1,115.4z M314.1,119.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,119,315.2,119.4,314.1,119.4z M314.1,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,123,315.2,123.4,314.1,123.4z M314.1,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,127,315.2,127.3,314.1,127.3z M314.1,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,130.9,315.2,131.3,314.1,131.3z M314.1,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,134.9,315.2,135.3,314.1,135.3z M314.1,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,138.9,315.2,139.3,314.1,139.3z M314.1,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,142.9,315.2,143.2,314.1,143.2z M314.1,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,146.8,315.2,147.2,314.1,147.2z"/>
					<path class="st0" d="M326.1,103.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C325.7,101.4,326.1,102.4,326.1,103.5z M326.1,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C325.7,105.4,326.1,106.4,326.1,107.5z M326.1,111.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C325.7,109.4,326.1,110.3,326.1,111.4z M326.1,115.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C325.7,113.4,326.1,114.3,326.1,115.4z M326.1,119.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C325.7,117.3,326.1,118.3,326.1,119.4z M326.1,123.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C325.7,121.3,326.1,122.3,326.1,123.4z M326.1,127.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C325.7,125.3,326.1,126.3,326.1,127.3z M326.1,131.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C325.7,129.3,326.1,130.2,326.1,131.3z M326.1,135.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C325.7,133.3,326.1,134.2,326.1,135.3z M326.1,139.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C325.7,137.3,326.1,138.2,326.1,139.3z M326.1,143.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C325.7,141.2,326.1,142.2,326.1,143.2z M326.1,147.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C325.7,145.2,326.1,146.1,326.1,147.2z M326.1,103.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C328.1,103.1,327.2,103.5,326.1,103.5z M326.1,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C328.1,107.1,327.2,107.5,326.1,107.5z M326.1,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C328.1,111,327.2,111.4,326.1,111.4z M326.1,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C328.1,115,327.2,115.4,326.1,115.4z M326.1,119.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C328.1,119,327.2,119.4,326.1,119.4z M326.1,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C328.1,123,327.2,123.4,326.1,123.4z M326.1,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C328.1,127,327.2,127.3,326.1,127.3z M326.1,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C328.1,130.9,327.2,131.3,326.1,131.3z M326.1,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C328.1,134.9,327.2,135.3,326.1,135.3z M326.1,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C328.1,138.9,327.2,139.3,326.1,139.3z M326.1,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C328.1,142.9,327.2,143.2,326.1,143.2z M326.1,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C328.1,146.8,327.2,147.2,326.1,147.2z M334,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C333.6,105.4,334,106.4,334,107.5z M334,111.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C333.6,109.4,334,110.3,334,111.4z M334,115.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C333.6,113.4,334,114.3,334,115.4z M334,119.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C333.6,117.3,334,118.3,334,119.4z M334,123.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C333.6,121.3,334,122.3,334,123.4z M334,127.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C333.6,125.3,334,126.3,334,127.3z M334,131.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C333.6,129.3,334,130.2,334,131.3z M334,135.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C333.6,133.3,334,134.2,334,135.3z M334,139.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C333.6,137.3,334,138.2,334,139.3z M334,143.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C333.6,141.2,334,142.2,334,143.2z M334,147.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C333.6,145.2,334,146.1,334,147.2z M334,103.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C336,103.1,335.1,103.5,334,103.5z M334,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C336,107.1,335.1,107.5,334,107.5z M334,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C336,111,335.1,111.4,334,111.4z M334,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C336,115,335.1,115.4,334,115.4z M334,119.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C336,119,335.1,119.4,334,119.4z M334,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C336,123,335.1,123.4,334,123.4z M334,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C336,127,335.1,127.3,334,127.3z M334,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C336,130.9,335.1,131.3,334,131.3z M334,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C336,134.9,335.1,135.3,334,135.3z M334,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C336,138.9,335.1,139.3,334,139.3z M334,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C336,142.9,335.1,143.2,334,143.2z M334,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C336,146.8,335.1,147.2,334,147.2z M342,103.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C341.6,101.4,342,102.4,342,103.5z M342,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C341.6,105.4,342,106.4,342,107.5z M342,111.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C341.6,109.4,342,110.3,342,111.4z M342,115.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C341.6,113.4,342,114.3,342,115.4z M342,103.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C344,103.1,343.1,103.5,342,103.5z M342,107.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C344,107.1,343.1,107.5,342,107.5z M342,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C344,111,343.1,111.4,342,111.4z M349.9,103.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C349.5,101.4,349.9,102.4,349.9,103.5z M349.9,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C349.5,105.4,349.9,106.4,349.9,107.5z M349.9,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C349.5,109.4,349.9,110.3,349.9,111.4z M349.9,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C349.5,113.4,349.9,114.3,349.9,115.4z M349.9,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C349.5,117.3,349.9,118.3,349.9,119.4z M349.9,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C349.5,121.3,349.9,122.3,349.9,123.4z M349.9,127.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C349.5,125.3,349.9,126.3,349.9,127.3z M349.9,131.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C349.5,129.3,349.9,130.2,349.9,131.3z M349.9,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C349.5,133.3,349.9,134.2,349.9,135.3z M349.9,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C349.5,137.3,349.9,138.2,349.9,139.3z M349.9,143.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C349.5,141.2,349.9,142.2,349.9,143.2z M349.9,147.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C349.5,145.2,349.9,146.1,349.9,147.2z M349.9,103.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C352,103.1,351,103.5,349.9,103.5z M349.9,107.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C352,107.1,351,107.5,349.9,107.5z M349.9,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C352,111,351,111.4,349.9,111.4z M349.9,115.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C352,115,351,115.4,349.9,115.4z M349.9,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C352,119,351,119.4,349.9,119.4z M349.9,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C352,123,351,123.4,349.9,123.4z M349.9,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C352,127,351,127.3,349.9,127.3z M349.9,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C352,130.9,351,131.3,349.9,131.3z M349.9,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C352,134.9,351,135.3,349.9,135.3z M349.9,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C352,138.9,351,139.3,349.9,139.3z M349.9,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C352,142.9,351,143.2,349.9,143.2z M349.9,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C352,146.8,351,147.2,349.9,147.2z M357.9,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C357.5,105.4,357.9,106.4,357.9,107.5z M357.9,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C357.5,109.4,357.9,110.3,357.9,111.4z M357.9,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C357.5,113.4,357.9,114.3,357.9,115.4z M357.9,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C357.5,117.3,357.9,118.3,357.9,119.4z M357.9,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C357.5,121.3,357.9,122.3,357.9,123.4z M357.9,127.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C357.5,125.3,357.9,126.3,357.9,127.3z M357.9,131.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C357.5,129.3,357.9,130.2,357.9,131.3z M357.9,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C357.5,133.3,357.9,134.2,357.9,135.3z M357.9,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C357.5,137.3,357.9,138.2,357.9,139.3z M357.9,143.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C357.5,141.2,357.9,142.2,357.9,143.2z M357.9,147.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C357.5,145.2,357.9,146.1,357.9,147.2z M357.9,103.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S359,103.5,357.9,103.5z M357.9,107.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S359,107.5,357.9,107.5z
						M357.9,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S359,111.4,357.9,111.4z M357.9,115.4c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S359,115.4,357.9,115.4z M357.9,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S359,119.4,357.9,119.4z M357.9,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S359,123.4,357.9,123.4z M357.9,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S359,127.3,357.9,127.3z
						M357.9,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S359,131.3,357.9,131.3z M357.9,135.3
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S359,135.3,357.9,135.3z M357.9,139.3c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S359,139.3,357.9,139.3z M357.9,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S359,143.2,357.9,143.2z M357.9,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S359,147.2,357.9,147.2z M365.8,103.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S365.8,102.4,365.8,103.5
						z M365.8,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S365.8,106.4,365.8,107.5z M365.8,111.4
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S365.8,110.3,365.8,111.4z M365.8,115.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S365.8,114.3,365.8,115.4z M365.8,103.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S366.9,103.5,365.8,103.5z M365.8,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S366.9,107.5,365.8,107.5z M365.8,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S366.9,111.4,365.8,111.4z M373.8,103.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S373.8,102.4,373.8,103.5z M373.8,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S373.8,106.4,373.8,107.5z M373.8,111.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S373.8,110.3,373.8,111.4z M373.8,115.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S373.8,114.3,373.8,115.4z M373.8,119.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S373.8,118.3,373.8,119.4z M373.8,123.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S373.8,122.3,373.8,123.4z M373.8,127.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C373.4,125.3,373.8,126.3,373.8,127.3z M373.8,131.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C373.4,129.3,373.8,130.2,373.8,131.3z M373.8,135.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C373.4,133.3,373.8,134.2,373.8,135.3z M373.8,139.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C373.4,137.3,373.8,138.2,373.8,139.3z M373.8,143.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C373.4,141.2,373.8,142.2,373.8,143.2z M373.8,147.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C373.4,145.2,373.8,146.1,373.8,147.2z M373.8,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,107.1,374.9,107.5,373.8,107.5z M373.8,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,111,374.9,111.4,373.8,111.4z M373.8,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,115,374.9,115.4,373.8,115.4z M373.8,119.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,119,374.9,119.4,373.8,119.4z M373.8,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,123,374.9,123.4,373.8,123.4z M373.8,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,127,374.9,127.3,373.8,127.3z M373.8,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,130.9,374.9,131.3,373.8,131.3z M373.8,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,134.9,374.9,135.3,373.8,135.3z M373.8,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,138.9,374.9,139.3,373.8,139.3z M373.8,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,142.9,374.9,143.2,373.8,143.2z M373.8,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,146.8,374.9,147.2,373.8,147.2z M381.7,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C381.4,109.4,381.7,110.3,381.7,111.4z M381.7,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C381.4,113.4,381.7,114.3,381.7,115.4z M381.7,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C381.4,117.3,381.7,118.3,381.7,119.4z M381.7,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C381.4,121.3,381.7,122.3,381.7,123.4z M381.7,127.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C381.4,125.3,381.7,126.3,381.7,127.3z M381.7,131.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C381.4,129.3,381.7,130.2,381.7,131.3z M381.7,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C381.4,133.3,381.7,134.2,381.7,135.3z M381.7,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C381.4,137.3,381.7,138.2,381.7,139.3z M381.7,143.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C381.4,141.2,381.7,142.2,381.7,143.2z M381.7,147.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C381.4,145.2,381.7,146.1,381.7,147.2z M381.7,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C383.8,115,382.8,115.4,381.7,115.4z M381.7,119.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C383.8,119,382.8,119.4,381.7,119.4z M381.7,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C383.8,123,382.8,123.4,381.7,123.4z M381.7,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C383.8,127,382.8,127.3,381.7,127.3z M381.7,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C383.8,130.9,382.8,131.3,381.7,131.3z M381.7,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C383.8,134.9,382.8,135.3,381.7,135.3z M381.7,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C383.8,138.9,382.8,139.3,381.7,139.3z M381.7,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C383.8,142.9,382.8,143.2,381.7,143.2z M381.7,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C383.8,146.8,382.8,147.2,381.7,147.2z"/>
					<path class="st0" d="M397.7,91.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C397.3,89.5,397.7,90.5,397.7,91.6z
						M397.7,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C397.3,105.4,397.7,106.4,397.7,107.5z M397.7,111.4
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C397.3,109.4,397.7,110.3,397.7,111.4z M397.7,115.4
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C397.3,113.4,397.7,114.3,397.7,115.4z M397.7,119.4
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C397.3,117.3,397.7,118.3,397.7,119.4z M397.7,123.4
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C397.3,121.3,397.7,122.3,397.7,123.4z M397.7,127.3
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C397.3,125.3,397.7,126.3,397.7,127.3z M397.7,131.3
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C397.3,129.3,397.7,130.2,397.7,131.3z M397.7,135.3
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C397.3,133.3,397.7,134.2,397.7,135.3z M397.7,139.3
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C397.3,137.3,397.7,138.2,397.7,139.3z M397.7,143.2
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C397.3,141.2,397.7,142.2,397.7,143.2z M397.7,147.2
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C397.3,145.2,397.7,146.1,397.7,147.2z M397.7,87.6
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C399.7,87.2,398.8,87.6,397.7,87.6z M397.7,91.6c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C399.7,91.2,398.8,91.6,397.7,91.6z M397.7,95.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C399.7,95.1,398.8,95.5,397.7,95.5z M397.7,103.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,103.1,398.8,103.5,397.7,103.5z M397.7,107.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,107.1,398.8,107.5,397.7,107.5z M397.7,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,111,398.8,111.4,397.7,111.4z M397.7,115.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,115,398.8,115.4,397.7,115.4z M397.7,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,119,398.8,119.4,397.7,119.4z M397.7,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,123,398.8,123.4,397.7,123.4z M397.7,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,127,398.8,127.3,397.7,127.3z M397.7,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,130.9,398.8,131.3,397.7,131.3z M397.7,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,134.9,398.8,135.3,397.7,135.3z M397.7,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,138.9,398.8,139.3,397.7,139.3z M397.7,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,142.9,398.8,143.2,397.7,143.2z M397.7,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,146.8,398.8,147.2,397.7,147.2z M405.6,87.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,85.5,405.6,86.5,405.6,87.6z M405.6,91.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,89.5,405.6,90.5,405.6,91.6z M405.6,95.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,93.5,405.6,94.4,405.6,95.5z M405.6,103.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,101.4,405.6,102.4,405.6,103.5z M405.6,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,105.4,405.6,106.4,405.6,107.5z M405.6,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,109.4,405.6,110.3,405.6,111.4z M405.6,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,113.4,405.6,114.3,405.6,115.4z M405.6,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,117.3,405.6,118.3,405.6,119.4z M405.6,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,121.3,405.6,122.3,405.6,123.4z M405.6,127.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,125.3,405.6,126.3,405.6,127.3z M405.6,131.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,129.3,405.6,130.2,405.6,131.3z M405.6,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,133.3,405.6,134.2,405.6,135.3z M405.6,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,137.3,405.6,138.2,405.6,139.3z M405.6,143.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,141.2,405.6,142.2,405.6,143.2z M405.6,147.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,145.2,405.6,146.1,405.6,147.2z M405.6,91.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,91.2,406.7,91.6,405.6,91.6z M405.6,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,107.1,406.7,107.5,405.6,107.5z M405.6,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,111,406.7,111.4,405.6,111.4z M405.6,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,115,406.7,115.4,405.6,115.4z M405.6,119.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,119,406.7,119.4,405.6,119.4z M405.6,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,123,406.7,123.4,405.6,123.4z M405.6,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,127,406.7,127.3,405.6,127.3z M405.6,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,130.9,406.7,131.3,405.6,131.3z M405.6,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,134.9,406.7,135.3,405.6,135.3z M405.6,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,138.9,406.7,139.3,405.6,139.3z M405.6,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,142.9,406.7,143.2,405.6,143.2z M405.6,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,146.8,406.7,147.2,405.6,147.2z"/>
					<path class="st0" d="M421.6,87.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.2,85.5,421.6,86.5,421.6,87.6z M421.6,91.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.2,89.5,421.6,90.5,421.6,91.6z M421.6,95.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.2,93.5,421.6,94.4,421.6,95.5z M421.6,99.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.2,97.5,421.6,98.4,421.6,99.5z M421.6,103.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.2,101.4,421.6,102.4,421.6,103.5z M421.6,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.2,105.4,421.6,106.4,421.6,107.5z M421.6,111.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.2,109.4,421.6,110.3,421.6,111.4z M421.6,115.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.2,113.4,421.6,114.3,421.6,115.4z M421.6,119.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.2,117.3,421.6,118.3,421.6,119.4z M421.6,123.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.2,121.3,421.6,122.3,421.6,123.4z M421.6,127.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.2,125.3,421.6,126.3,421.6,127.3z M421.6,131.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.2,129.3,421.6,130.2,421.6,131.3z M421.6,135.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.2,133.3,421.6,134.2,421.6,135.3z M421.6,139.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.2,137.3,421.6,138.2,421.6,139.3z M421.6,143.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.2,141.2,421.6,142.2,421.6,143.2z M421.6,147.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.2,145.2,421.6,146.1,421.6,147.2z M421.6,87.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.6,87.2,422.6,87.6,421.6,87.6z M421.6,91.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.6,91.2,422.6,91.6,421.6,91.6z M421.6,95.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.6,95.1,422.6,95.5,421.6,95.5z M421.6,99.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.6,99.1,422.6,99.5,421.6,99.5z M421.6,103.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.6,103.1,422.6,103.5,421.6,103.5z M421.6,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.6,107.1,422.6,107.5,421.6,107.5z M421.6,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.6,111,422.6,111.4,421.6,111.4z M421.6,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.6,115,422.6,115.4,421.6,115.4z M421.6,119.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.6,119,422.6,119.4,421.6,119.4z M421.6,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.6,123,422.6,123.4,421.6,123.4z M421.6,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.6,127,422.6,127.3,421.6,127.3z M421.6,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.6,130.9,422.6,131.3,421.6,131.3z M421.6,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.6,134.9,422.6,135.3,421.6,135.3z M421.6,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.6,138.9,422.6,139.3,421.6,139.3z M421.6,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.6,142.9,422.6,143.2,421.6,143.2z M421.6,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.6,146.8,422.6,147.2,421.6,147.2z M429.5,87.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,85.5,429.5,86.5,429.5,87.6z M429.5,91.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,89.5,429.5,90.5,429.5,91.6z M429.5,95.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,93.5,429.5,94.4,429.5,95.5z M429.5,99.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,97.5,429.5,98.4,429.5,99.5z M429.5,103.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,101.4,429.5,102.4,429.5,103.5z M429.5,107.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,105.4,429.5,106.4,429.5,107.5z M429.5,111.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,109.4,429.5,110.3,429.5,111.4z M429.5,115.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,113.4,429.5,114.3,429.5,115.4z M429.5,119.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,117.3,429.5,118.3,429.5,119.4z M429.5,123.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,121.3,429.5,122.3,429.5,123.4z M429.5,127.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,125.3,429.5,126.3,429.5,127.3z M429.5,131.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,129.3,429.5,130.2,429.5,131.3z M429.5,135.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,133.3,429.5,134.2,429.5,135.3z M429.5,139.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,137.3,429.5,138.2,429.5,139.3z M429.5,143.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,141.2,429.5,142.2,429.5,143.2z M429.5,147.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,145.2,429.5,146.1,429.5,147.2z M429.5,87.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,87.2,430.6,87.6,429.5,87.6z M429.5,91.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,91.2,430.6,91.6,429.5,91.6z M429.5,95.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,95.1,430.6,95.5,429.5,95.5z M429.5,99.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,99.1,430.6,99.5,429.5,99.5z M429.5,103.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,103.1,430.6,103.5,429.5,103.5z M429.5,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,107.1,430.6,107.5,429.5,107.5z M429.5,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,111,430.6,111.4,429.5,111.4z M429.5,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,115,430.6,115.4,429.5,115.4z M429.5,119.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,119,430.6,119.4,429.5,119.4z M429.5,123.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,123,430.6,123.4,429.5,123.4z M429.5,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,127,430.6,127.3,429.5,127.3z M429.5,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,130.9,430.6,131.3,429.5,131.3z M429.5,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,134.9,430.6,135.3,429.5,135.3z M429.5,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,138.9,430.6,139.3,429.5,139.3z M429.5,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,142.9,430.6,143.2,429.5,143.2z M429.5,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,146.8,430.6,147.2,429.5,147.2z"/>
					<path class="st0" d="M437.5,103.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C439.5,103.1,438.5,103.5,437.5,103.5z
						M437.5,107.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C439.5,107.1,438.5,107.5,437.5,107.5z M437.5,143.2
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C439.5,142.9,438.5,143.2,437.5,143.2z M437.5,147.2
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C439.5,146.8,438.5,147.2,437.5,147.2z M445.4,103.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C445,101.4,445.4,102.4,445.4,103.5z M445.4,107.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C445,105.4,445.4,106.4,445.4,107.5z M445.4,111.4
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C445,109.4,445.4,110.3,445.4,111.4z M445.4,115.4
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C445,113.4,445.4,114.3,445.4,115.4z M445.4,139.3
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C445,137.3,445.4,138.2,445.4,139.3z M445.4,143.2
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C445,141.2,445.4,142.2,445.4,143.2z M445.4,147.2
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C445,145.2,445.4,146.1,445.4,147.2z M445.4,103.5c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C447.4,103.1,446.5,103.5,445.4,103.5z M445.4,107.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C447.4,107.1,446.5,107.5,445.4,107.5z M445.4,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C447.4,111,446.5,111.4,445.4,111.4z M445.4,115.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C447.4,115,446.5,115.4,445.4,115.4z M445.4,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C447.4,119,446.5,119.4,445.4,119.4z M445.4,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C447.4,134.9,446.5,135.3,445.4,135.3z M445.4,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C447.4,138.9,446.5,139.3,445.4,139.3z M445.4,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C447.4,142.9,446.5,143.2,445.4,143.2z M445.4,147.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C447.4,146.8,446.5,147.2,445.4,147.2z M453.4,103.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C453,101.4,453.4,102.4,453.4,103.5z M453.4,107.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C453,105.4,453.4,106.4,453.4,107.5z M453.4,111.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C453,109.4,453.4,110.3,453.4,111.4z M453.4,115.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C453,113.4,453.4,114.3,453.4,115.4z M453.4,119.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C453,117.3,453.4,118.3,453.4,119.4z M453.4,123.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C453,121.3,453.4,122.3,453.4,123.4z M453.4,127.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C453,125.3,453.4,126.3,453.4,127.3z M453.4,131.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C453,129.3,453.4,130.2,453.4,131.3z M453.4,135.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C453,133.3,453.4,134.2,453.4,135.3z M453.4,139.3c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C453,137.3,453.4,138.2,453.4,139.3z M453.4,143.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C453,141.2,453.4,142.2,453.4,143.2z M453.4,147.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C453,145.2,453.4,146.1,453.4,147.2z M453.4,107.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C455.4,107.1,454.5,107.5,453.4,107.5z M453.4,111.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C455.4,111,454.5,111.4,453.4,111.4z M453.4,115.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C455.4,115,454.5,115.4,453.4,115.4z M453.4,119.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C455.4,119,454.5,119.4,453.4,119.4z M453.4,123.4c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C455.4,123,454.5,123.4,453.4,123.4z M453.4,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C455.4,127,454.5,127.3,453.4,127.3z M453.4,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C455.4,130.9,454.5,131.3,453.4,131.3z M453.4,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C455.4,134.9,454.5,135.3,453.4,135.3z M453.4,139.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C455.4,138.9,454.5,139.3,453.4,139.3z M453.4,143.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C455.4,142.9,454.5,143.2,453.4,143.2z M461.3,119.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C460.9,117.3,461.3,118.3,461.3,119.4z M461.3,123.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C460.9,121.3,461.3,122.3,461.3,123.4z M461.3,127.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C460.9,125.3,461.3,126.3,461.3,127.3z M461.3,131.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C460.9,129.3,461.3,130.2,461.3,131.3z M461.3,135.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C460.9,133.3,461.3,134.2,461.3,135.3z M461.3,139.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C460.9,137.3,461.3,138.2,461.3,139.3z M461.3,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S462.4,107.5,461.3,107.5z M461.3,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S462.4,111.4,461.3,111.4
						z M461.3,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S462.4,115.4,461.3,115.4z M461.3,119.4
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S462.4,119.4,461.3,119.4z M461.3,123.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S462.4,123.4,461.3,123.4z M461.3,127.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S462.4,127.3,461.3,127.3z M461.3,131.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S462.4,131.3,461.3,131.3z M461.3,135.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S462.4,135.3,461.3,135.3
						z M469.3,103.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S469.3,102.4,469.3,103.5z M469.3,107.5
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S469.3,106.4,469.3,107.5z M469.3,111.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S469.3,110.3,469.3,111.4z M469.3,115.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S469.3,114.3,469.3,115.4z M469.3,119.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S469.3,118.3,469.3,119.4z M469.3,123.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S469.3,122.3,469.3,123.4z M469.3,127.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C468.9,125.3,469.3,126.3,469.3,127.3z M469.3,131.3c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C468.9,129.3,469.3,130.2,469.3,131.3z M469.3,103.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S470.4,103.5,469.3,103.5z M469.3,107.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S470.4,107.5,469.3,107.5z M469.3,111.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S470.4,111.4,469.3,111.4z M469.3,115.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S470.4,115.4,469.3,115.4
						z M469.3,119.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S470.4,119.4,469.3,119.4z M477.2,103.5
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C476.8,101.4,477.2,102.4,477.2,103.5z M477.2,107.5
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C476.8,105.4,477.2,106.4,477.2,107.5z M477.2,111.4
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C476.8,109.4,477.2,110.3,477.2,111.4z M477.2,115.4
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C476.8,113.4,477.2,114.3,477.2,115.4z M477.2,103.5
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C479.3,103.1,478.3,103.5,477.2,103.5z M477.2,107.5
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C479.3,107.1,478.3,107.5,477.2,107.5z"/>
				</g>

				<g id='g5'>
					<path class="st0" d="M4,183.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,181.1,4,182,4,183.1z
						M4,187.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,185,4,186,4,187.1z M4,191.1
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,189,4,190,4,191.1z M4,195c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,193,4,193.9,4,195z M4,199c-1.1,0-2-0.4-2.8-1.2C0.4,197.1,0,196.1,0,195
						c1.1,0,2,0.4,2.8,1.2C3.6,197,4,197.9,4,199z M4,203c-1.1,0-2-0.4-2.8-1.2C0.4,201.1,0,200.1,0,199c1.1,0,2,0.4,2.8,1.2
						C3.6,200.9,4,201.9,4,203z M4,207c-1.1,0-2-0.4-2.8-1.2C0.4,205,0,204.1,0,203c1.1,0,2,0.4,2.8,1.2C3.6,204.9,4,205.9,4,207z
						M4,210.9c-1.1,0-2-0.4-2.8-1.2C0.4,209,0,208.1,0,207c1.1,0,2,0.4,2.8,1.2C3.6,208.9,4,209.9,4,210.9z M4,214.9
						c-1.1,0-2-0.4-2.8-1.2C0.4,213,0,212,0,210.9c1.1,0,2,0.4,2.8,1.2C3.6,212.9,4,213.8,4,214.9z M4,218.9c-1.1,0-2-0.4-2.8-1.2
						C0.4,217,0,216,0,214.9c1.1,0,2,0.4,2.8,1.2C3.6,216.9,4,217.8,4,218.9z M4,179.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C6,178.7,5.1,179.1,4,179.1z M4,183.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C6,182.7,5.1,183.1,4,183.1z M4,187.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,186.7,5.1,187.1,4,187.1
						z M4,191.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,190.7,5.1,191.1,4,191.1z M4,195
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,194.6,5.1,195,4,195z M4,199c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,198.6,5.1,199,4,199z M4,203c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C6,202.6,5.1,203,4,203z M4,207c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C6,206.6,5.1,207,4,207z M4,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,210.6,5.1,210.9,4,210.9z
						M4,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,214.5,5.1,214.9,4,214.9z M4,218.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,218.5,5.1,218.9,4,218.9z M4,222.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,222.5,5.1,222.9,4,222.9z M11.9,175.2c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,173.1,11.9,174.1,11.9,175.2z M11.9,179.1c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,177.1,11.9,178,11.9,179.1z M11.9,183.1c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,181.1,11.9,182,11.9,183.1z M11.9,187.1c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,185,11.9,186,11.9,187.1z M11.9,191.1c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,189,11.9,190,11.9,191.1z M11.9,195c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,193,11.9,193.9,11.9,195z M11.9,199c-1.1,0-2-0.4-2.8-1.2
						C8.3,197.1,8,196.1,8,195c1.1,0,2,0.4,2.8,1.2C11.5,197,11.9,197.9,11.9,199z M11.9,203c-1.1,0-2-0.4-2.8-1.2
						C8.3,201.1,8,200.1,8,199c1.1,0,2,0.4,2.8,1.2C11.5,200.9,11.9,201.9,11.9,203z M11.9,207c-1.1,0-2-0.4-2.8-1.2
						C8.3,205,8,204.1,8,203c1.1,0,2,0.4,2.8,1.2C11.5,204.9,11.9,205.9,11.9,207z M11.9,210.9c-1.1,0-2-0.4-2.8-1.2
						C8.3,209,8,208.1,8,207c1.1,0,2,0.4,2.8,1.2C11.5,208.9,11.9,209.9,11.9,210.9z M11.9,214.9c-1.1,0-2-0.4-2.8-1.2
						C8.3,213,8,212,8,210.9c1.1,0,2,0.4,2.8,1.2C11.5,212.9,11.9,213.8,11.9,214.9z M11.9,218.9c-1.1,0-2-0.4-2.8-1.2
						C8.3,217,8,216,8,214.9c1.1,0,2,0.4,2.8,1.2C11.5,216.9,11.9,217.8,11.9,218.9z M11.9,222.9c-1.1,0-2-0.4-2.8-1.2
						C8.3,220.9,8,220,8,218.9c1.1,0,2,0.4,2.8,1.2C11.5,220.9,11.9,221.8,11.9,222.9z M11.9,226.8c-1.1,0-2-0.4-2.8-1.2
						C8.3,224.9,8,224,8,222.9c1.1,0,2,0.4,2.8,1.2C11.5,224.8,11.9,225.8,11.9,226.8z M11.9,171.2c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,170.8,13,171.2,11.9,171.2z M11.9,175.2c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,174.8,13,175.2,11.9,175.2z M11.9,179.1c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,178.7,13,179.1,11.9,179.1z M11.9,183.1c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,182.7,13,183.1,11.9,183.1z M11.9,187.1c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,186.7,13,187.1,11.9,187.1z M11.9,191.1c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,190.7,13,191.1,11.9,191.1z M11.9,195c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,194.6,13,195,11.9,195z M11.9,199c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C14,198.6,13,199,11.9,199z M11.9,203c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C14,202.6,13,203,11.9,203z M11.9,207c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,206.6,13,207,11.9,207z
						M11.9,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,210.6,13,210.9,11.9,210.9z M11.9,214.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,214.5,13,214.9,11.9,214.9z M11.9,218.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,218.5,13,218.9,11.9,218.9z M11.9,222.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,222.5,13,222.9,11.9,222.9z M11.9,226.8c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,226.5,13,226.8,11.9,226.8z M11.9,230.8c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,230.4,13,230.8,11.9,230.8z M19.9,171.2c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,169.1,19.9,170.1,19.9,171.2z M19.9,175.2c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,173.1,19.9,174.1,19.9,175.2z M19.9,179.1c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,177.1,19.9,178,19.9,179.1z M19.9,183.1c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,181.1,19.9,182,19.9,183.1z M19.9,187.1c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,185,19.9,186,19.9,187.1z M19.9,214.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,212.9,19.9,213.8,19.9,214.9z M19.9,218.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,216.9,19.9,217.8,19.9,218.9z M19.9,222.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,220.9,19.9,221.8,19.9,222.9z M19.9,226.8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,224.8,19.9,225.8,19.9,226.8z M19.9,230.8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,228.8,19.9,229.7,19.9,230.8z M19.9,171.2c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,170.8,21,171.2,19.9,171.2z M19.9,175.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C21.9,174.8,21,175.2,19.9,175.2z M19.9,179.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,178.7,21,179.1,19.9,179.1z M19.9,183.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,182.7,21,183.1,19.9,183.1z M19.9,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,218.5,21,218.9,19.9,218.9z M19.9,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,222.5,21,222.9,19.9,222.9z M19.9,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,226.5,21,226.8,19.9,226.8z M19.9,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,230.4,21,230.8,19.9,230.8z M27.8,171.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,169.1,27.8,170.1,27.8,171.2z M27.8,175.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,173.1,27.8,174.1,27.8,175.2z M27.8,179.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,177.1,27.8,178,27.8,179.1z M27.8,183.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,181.1,27.8,182,27.8,183.1z M27.8,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,216.9,27.8,217.8,27.8,218.9z M27.8,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,220.9,27.8,221.8,27.8,222.9z M27.8,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,224.8,27.8,225.8,27.8,226.8z M27.8,230.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,228.8,27.8,229.7,27.8,230.8z M27.8,171.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,170.8,28.9,171.2,27.8,171.2z M27.8,175.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,174.8,28.9,175.2,27.8,175.2z M27.8,179.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,178.7,28.9,179.1,27.8,179.1z M27.8,183.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,182.7,28.9,183.1,27.8,183.1z M27.8,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,218.5,28.9,218.9,27.8,218.9z M27.8,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,222.5,28.9,222.9,27.8,222.9z M27.8,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,226.5,28.9,226.8,27.8,226.8z M27.8,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,230.4,28.9,230.8,27.8,230.8z M35.8,171.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,169.1,35.8,170.1,35.8,171.2z M35.8,175.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,173.1,35.8,174.1,35.8,175.2z M35.8,179.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,177.1,35.8,178,35.8,179.1z M35.8,183.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,181.1,35.8,182,35.8,183.1z M35.8,187.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,185,35.8,186,35.8,187.1z M35.8,214.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,212.9,35.8,213.8,35.8,214.9z M35.8,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,216.9,35.8,217.8,35.8,218.9z M35.8,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,220.9,35.8,221.8,35.8,222.9z M35.8,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,224.8,35.8,225.8,35.8,226.8z M35.8,230.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,228.8,35.8,229.7,35.8,230.8z M35.8,175.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,175.2,35.8,175.2z
						M35.8,179.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,179.1,35.8,179.1z M35.8,183.1c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,183.1,35.8,183.1z M35.8,187.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S36.9,187.1,35.8,187.1z M35.8,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S36.9,214.9,35.8,214.9z M35.8,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,218.9,35.8,218.9z
						M35.8,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,222.9,35.8,222.9z M35.8,226.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,226.8,35.8,226.8z M43.7,179.1c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S43.7,178,43.7,179.1z M43.7,183.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S43.7,182,43.7,183.1z M43.7,187.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S43.7,186,43.7,187.1z M43.7,214.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C43.4,212.9,43.7,213.8,43.7,214.9z M43.7,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C43.4,216.9,43.7,217.8,43.7,218.9z M43.7,222.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C43.4,220.9,43.7,221.8,43.7,222.9z M43.7,183.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S44.8,183.1,43.7,183.1z M43.7,187.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,187.1,43.7,187.1z
						M43.7,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,214.9,43.7,214.9z M43.7,218.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,218.9,43.7,218.9z"/>
					<path class="st0" d="M55.7,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C55.3,193,55.7,193.9,55.7,195z
						M55.7,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C55.3,197,55.7,197.9,55.7,199z M55.7,210.9
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C55.3,208.9,55.7,209.9,55.7,210.9z M55.7,214.9c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C55.3,212.9,55.7,213.8,55.7,214.9z M55.7,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C55.3,216.9,55.7,217.8,55.7,218.9z M55.7,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C55.3,220.9,55.7,221.8,55.7,222.9z M55.7,191.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,190.7,56.8,191.1,55.7,191.1z M55.7,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,194.6,56.8,195,55.7,195z M55.7,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C57.7,198.6,56.8,199,55.7,199z
						M55.7,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C57.7,206.6,56.8,207,55.7,207z M55.7,210.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C57.7,210.6,56.8,210.9,55.7,210.9z M55.7,214.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C57.7,214.5,56.8,214.9,55.7,214.9z M55.7,218.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C57.7,218.5,56.8,218.9,55.7,218.9z M55.7,222.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C57.7,222.5,56.8,222.9,55.7,222.9z M55.7,226.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C57.7,226.5,56.8,226.8,55.7,226.8z M63.6,187.1
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,185,63.6,186,63.6,187.1z M63.6,191.1
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,189,63.6,190,63.6,191.1z M63.6,195
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,193,63.6,193.9,63.6,195z M63.6,207
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,204.9,63.6,205.9,63.6,207z M63.6,210.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,208.9,63.6,209.9,63.6,210.9z M63.6,214.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,212.9,63.6,213.8,63.6,214.9z M63.6,218.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,216.9,63.6,217.8,63.6,218.9z M63.6,222.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,220.9,63.6,221.8,63.6,222.9z M63.6,226.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,224.8,63.6,225.8,63.6,226.8z M63.6,230.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C63.2,228.8,63.6,229.7,63.6,230.8z M63.6,187.1
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C65.6,186.7,64.7,187.1,63.6,187.1z M63.6,191.1c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C65.6,190.7,64.7,191.1,63.6,191.1z M63.6,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C65.6,194.6,64.7,195,63.6,195z M63.6,203c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,202.6,64.7,203,63.6,203z M63.6,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C65.6,206.6,64.7,207,63.6,207z
						M63.6,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C65.6,210.6,64.7,210.9,63.6,210.9z M63.6,218.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C65.6,218.5,64.7,218.9,63.6,218.9z M63.6,222.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C65.6,222.5,64.7,222.9,63.6,222.9z M63.6,226.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C65.6,226.5,64.7,226.8,63.6,226.8z M63.6,230.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C65.6,230.4,64.7,230.8,63.6,230.8z M71.6,187.1
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C71.2,185,71.6,186,71.6,187.1z M71.6,191.1c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C71.2,189,71.6,190,71.6,191.1z M71.6,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C71.2,193,71.6,193.9,71.6,195z M71.6,203c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,200.9,71.6,201.9,71.6,203z M71.6,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,204.9,71.6,205.9,71.6,207z M71.6,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,220.9,71.6,221.8,71.6,222.9z M71.6,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,224.8,71.6,225.8,71.6,226.8z M71.6,230.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,228.8,71.6,229.7,71.6,230.8z M71.6,187.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,186.7,72.7,187.1,71.6,187.1z M71.6,191.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,190.7,72.7,191.1,71.6,191.1z M71.6,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,194.6,72.7,195,71.6,195z M71.6,203c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,202.6,72.7,203,71.6,203z M71.6,207c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,206.6,72.7,207,71.6,207z M71.6,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,222.5,72.7,222.9,71.6,222.9z M71.6,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,226.5,72.7,226.8,71.6,226.8z M71.6,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,230.4,72.7,230.8,71.6,230.8z M79.5,187.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S79.5,186,79.5,187.1z M79.5,191.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S79.5,190,79.5,191.1z
						M79.5,195c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S79.5,193.9,79.5,195z M79.5,199
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S79.5,197.9,79.5,199z M79.5,203c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S79.5,201.9,79.5,203z M79.5,207c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S79.5,205.9,79.5,207z M79.5,210.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C79.1,208.9,79.5,209.9,79.5,210.9z M79.5,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C79.1,216.9,79.5,217.8,79.5,218.9z M79.5,222.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C79.1,220.9,79.5,221.8,79.5,222.9z M79.5,226.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C79.1,224.8,79.5,225.8,79.5,226.8z M79.5,187.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S80.6,187.1,79.5,187.1z M79.5,191.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,191.1,79.5,191.1z
						M79.5,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,195,79.5,195z M79.5,199c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,199,79.5,199z M79.5,203c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S80.6,203,79.5,203z M79.5,207c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S80.6,207,79.5,207z M79.5,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,210.9,79.5,210.9z
						M79.5,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,214.9,79.5,214.9z M79.5,218.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,218.9,79.5,218.9z M79.5,222.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,222.9,79.5,222.9z M79.5,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S80.6,226.8,79.5,226.8z M79.5,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S80.6,230.8,79.5,230.8z M87.5,191.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,190,87.5,191.1z
						M87.5,195c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,193.9,87.5,195z M87.5,199
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,197.9,87.5,199z M87.5,203c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,201.9,87.5,203z M87.5,207c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S87.5,205.9,87.5,207z M87.5,210.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C87.1,208.9,87.5,209.9,87.5,210.9z M87.5,214.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C87.1,212.9,87.5,213.8,87.5,214.9z M87.5,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C87.1,216.9,87.5,217.8,87.5,218.9z M87.5,222.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C87.1,220.9,87.5,221.8,87.5,222.9z M87.5,226.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C87.1,224.8,87.5,225.8,87.5,226.8z M87.5,230.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C87.1,228.8,87.5,229.7,87.5,230.8z M87.5,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,194.6,88.6,195,87.5,195z M87.5,199c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,198.6,88.6,199,87.5,199z M87.5,203c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,202.6,88.6,203,87.5,203z M87.5,207c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,206.6,88.6,207,87.5,207z M87.5,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,210.6,88.6,210.9,87.5,210.9z M87.5,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,214.5,88.6,214.9,87.5,214.9z M87.5,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,218.5,88.6,218.9,87.5,218.9z M87.5,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,222.5,88.6,222.9,87.5,222.9z M87.5,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,226.5,88.6,226.8,87.5,226.8z M87.5,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,230.4,88.6,230.8,87.5,230.8z"/>
					<path class="st0" d="M99.4,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C99,189,99.4,190,99.4,191.1z
						M99.4,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C99,193,99.4,193.9,99.4,195z M99.4,199
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C99,197,99.4,197.9,99.4,199z M99.4,191.1c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C101.4,190.7,100.5,191.1,99.4,191.1z M99.4,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C101.4,194.6,100.5,195,99.4,195z M99.4,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C101.4,198.6,100.5,199,99.4,199z M107.4,183.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,181.1,107.4,182,107.4,183.1z M107.4,187.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,185,107.4,186,107.4,187.1z M107.4,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,189,107.4,190,107.4,191.1z M107.4,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,193,107.4,193.9,107.4,195z M107.4,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,197,107.4,197.9,107.4,199z M107.4,203c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,200.9,107.4,201.9,107.4,203z M107.4,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,204.9,107.4,205.9,107.4,207z M107.4,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,208.9,107.4,209.9,107.4,210.9z M107.4,214.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,212.9,107.4,213.8,107.4,214.9z M107.4,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,216.9,107.4,217.8,107.4,218.9z M107.4,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,220.9,107.4,221.8,107.4,222.9z M107.4,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,224.8,107.4,225.8,107.4,226.8z M107.4,183.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,182.7,108.5,183.1,107.4,183.1z M107.4,187.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,186.7,108.5,187.1,107.4,187.1z M107.4,191.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,190.7,108.5,191.1,107.4,191.1z M107.4,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,194.6,108.5,195,107.4,195z M107.4,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,198.6,108.5,199,107.4,199z M107.4,203c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,202.6,108.5,203,107.4,203z M107.4,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,206.6,108.5,207,107.4,207z M107.4,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,210.6,108.5,210.9,107.4,210.9z M107.4,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,214.5,108.5,214.9,107.4,214.9z M107.4,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,218.5,108.5,218.9,107.4,218.9z M107.4,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,222.5,108.5,222.9,107.4,222.9z M107.4,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,226.5,108.5,226.8,107.4,226.8z M107.4,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,230.4,108.5,230.8,107.4,230.8z M115.3,183.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,181.1,115.3,182,115.3,183.1z M115.3,187.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,185,115.3,186,115.3,187.1z M115.3,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,189,115.3,190,115.3,191.1z M115.3,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,193,115.3,193.9,115.3,195z M115.3,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,197,115.3,197.9,115.3,199z M115.3,203c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,200.9,115.3,201.9,115.3,203z M115.3,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,204.9,115.3,205.9,115.3,207z M115.3,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,208.9,115.3,209.9,115.3,210.9z M115.3,214.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,212.9,115.3,213.8,115.3,214.9z M115.3,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,216.9,115.3,217.8,115.3,218.9z M115.3,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,220.9,115.3,221.8,115.3,222.9z M115.3,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,224.8,115.3,225.8,115.3,226.8z M115.3,230.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,228.8,115.3,229.7,115.3,230.8z M115.3,191.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C117.3,190.7,116.4,191.1,115.3,191.1z M115.3,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C117.3,194.6,116.4,195,115.3,195z M115.3,199c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C117.3,198.6,116.4,199,115.3,199z M115.3,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C117.3,218.5,116.4,218.9,115.3,218.9z M115.3,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C117.3,222.5,116.4,222.9,115.3,222.9z M115.3,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C117.3,226.5,116.4,226.8,115.3,226.8z M115.3,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C117.3,230.4,116.4,230.8,115.3,230.8z M123.3,191.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S123.3,190,123.3,191.1z M123.3,195c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S123.3,193.9,123.3,195z
						M123.3,199c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S123.3,197.9,123.3,199z M123.3,222.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,220.9,123.3,221.8,123.3,222.9z M123.3,226.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,224.8,123.3,225.8,123.3,226.8z M123.3,230.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,228.8,123.3,229.7,123.3,230.8z M123.3,191.1
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S124.4,191.1,123.3,191.1z M123.3,195c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S124.4,195,123.3,195z M123.3,199c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S124.4,199,123.3,199z M123.3,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S124.4,222.9,123.3,222.9z M123.3,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S124.4,226.8,123.3,226.8
						z M123.3,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S124.4,230.8,123.3,230.8z"/>
					<path class="st0" d="M135.2,171.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C134.8,169.1,135.2,170.1,135.2,171.2z M135.2,175.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C134.8,173.1,135.2,174.1,135.2,175.2z M135.2,179.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C134.8,177.1,135.2,178,135.2,179.1z M135.2,183.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C134.8,181.1,135.2,182,135.2,183.1z M135.2,187.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C134.8,185,135.2,186,135.2,187.1z M135.2,191.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C134.8,189,135.2,190,135.2,191.1z M135.2,195c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C134.8,193,135.2,193.9,135.2,195z M135.2,199c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C134.8,197,135.2,197.9,135.2,199z M135.2,203c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C134.8,200.9,135.2,201.9,135.2,203z M135.2,207c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C134.8,204.9,135.2,205.9,135.2,207z M135.2,210.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C134.8,208.9,135.2,209.9,135.2,210.9z M135.2,214.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C134.8,212.9,135.2,213.8,135.2,214.9z M135.2,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C134.8,216.9,135.2,217.8,135.2,218.9z M135.2,222.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C134.8,220.9,135.2,221.8,135.2,222.9z M135.2,226.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C134.8,224.8,135.2,225.8,135.2,226.8z M135.2,230.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C134.8,228.8,135.2,229.7,135.2,230.8z M135.2,171.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C137.2,170.8,136.3,171.2,135.2,171.2z M135.2,175.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C137.2,174.8,136.3,175.2,135.2,175.2z M135.2,179.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C137.2,178.7,136.3,179.1,135.2,179.1z M135.2,183.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C137.2,182.7,136.3,183.1,135.2,183.1z M135.2,187.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C137.2,186.7,136.3,187.1,135.2,187.1z M135.2,191.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C137.2,190.7,136.3,191.1,135.2,191.1z M135.2,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C137.2,194.6,136.3,195,135.2,195z M135.2,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C137.2,198.6,136.3,199,135.2,199z M135.2,203c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C137.2,202.6,136.3,203,135.2,203z M135.2,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C137.2,206.6,136.3,207,135.2,207z M135.2,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C137.2,210.6,136.3,210.9,135.2,210.9z M135.2,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C137.2,214.5,136.3,214.9,135.2,214.9z M135.2,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C137.2,218.5,136.3,218.9,135.2,218.9z M135.2,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C137.2,222.5,136.3,222.9,135.2,222.9z M135.2,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C137.2,226.5,136.3,226.8,135.2,226.8z M135.2,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C137.2,230.4,136.3,230.8,135.2,230.8z M143.2,171.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,169.1,143.2,170.1,143.2,171.2z M143.2,175.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,173.1,143.2,174.1,143.2,175.2z M143.2,179.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,177.1,143.2,178,143.2,179.1z M143.2,183.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,181.1,143.2,182,143.2,183.1z M143.2,187.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,185,143.2,186,143.2,187.1z M143.2,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,189,143.2,190,143.2,191.1z M143.2,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,193,143.2,193.9,143.2,195z M143.2,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,197,143.2,197.9,143.2,199z M143.2,203c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,200.9,143.2,201.9,143.2,203z M143.2,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,204.9,143.2,205.9,143.2,207z M143.2,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,208.9,143.2,209.9,143.2,210.9z M143.2,214.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,212.9,143.2,213.8,143.2,214.9z M143.2,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,216.9,143.2,217.8,143.2,218.9z M143.2,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,220.9,143.2,221.8,143.2,222.9z M143.2,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,224.8,143.2,225.8,143.2,226.8z M143.2,230.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,228.8,143.2,229.7,143.2,230.8z M143.2,171.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,170.8,144.2,171.2,143.2,171.2z M143.2,175.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,174.8,144.2,175.2,143.2,175.2z M143.2,179.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,178.7,144.2,179.1,143.2,179.1z M143.2,183.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,182.7,144.2,183.1,143.2,183.1z M143.2,187.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,186.7,144.2,187.1,143.2,187.1z M143.2,191.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,190.7,144.2,191.1,143.2,191.1z M143.2,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,194.6,144.2,195,143.2,195z M143.2,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,198.6,144.2,199,143.2,199z M143.2,203c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,202.6,144.2,203,143.2,203z M143.2,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,206.6,144.2,207,143.2,207z M143.2,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,210.6,144.2,210.9,143.2,210.9z M143.2,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,214.5,144.2,214.9,143.2,214.9z M143.2,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,218.5,144.2,218.9,143.2,218.9z M143.2,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,222.5,144.2,222.9,143.2,222.9z M143.2,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,226.5,144.2,226.8,143.2,226.8z M143.2,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,230.4,144.2,230.8,143.2,230.8z M151.1,187.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C150.7,185,151.1,186,151.1,187.1z M151.1,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C150.7,189,151.1,190,151.1,191.1z M151.1,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C150.7,193,151.1,193.9,151.1,195z M151.1,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C150.7,197,151.1,197.9,151.1,199z M151.1,187.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C153.1,186.7,152.2,187.1,151.1,187.1z M151.1,191.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C153.1,190.7,152.2,191.1,151.1,191.1z M151.1,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C153.1,194.6,152.2,195,151.1,195z M159.1,187.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S159.1,186,159.1,187.1z M159.1,191.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S159.1,190,159.1,191.1z
						M159.1,195c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S159.1,193.9,159.1,195z M159.1,199
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S159.1,197.9,159.1,199z M159.1,187.1c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S160.2,187.1,159.1,187.1z M159.1,191.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S160.2,191.1,159.1,191.1z M159.1,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S160.2,195,159.1,195z M159.1,199c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S160.2,199,159.1,199z
						M159.1,203c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S160.2,203,159.1,203z M159.1,207
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S160.2,207,159.1,207z M159.1,210.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S160.2,210.9,159.1,210.9z M159.1,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S160.2,214.9,159.1,214.9z M159.1,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S160.2,218.9,159.1,218.9z M159.1,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S160.2,222.9,159.1,222.9
						z M159.1,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S160.2,226.8,159.1,226.8z M159.1,230.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S160.2,230.8,159.1,230.8z M167,191.1c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S167,190,167,191.1z M167,195c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S167,193.9,167,195z M167,199c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S167,197.9,167,199z M167,203c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S167,201.9,167,203z M167,207
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S167,205.9,167,207z M167,210.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C166.6,208.9,167,209.9,167,210.9z M167,214.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C166.6,212.9,167,213.8,167,214.9z M167,218.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C166.6,216.9,167,217.8,167,218.9z M167,222.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C166.6,220.9,167,221.8,167,222.9z M167,226.8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C166.6,224.8,167,225.8,167,226.8z M167,230.8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C166.6,228.8,167,229.7,167,230.8z M167,195c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C169.1,194.6,168.1,195,167,195z M167,199c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C169.1,198.6,168.1,199,167,199z M167,203c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C169.1,202.6,168.1,203,167,203z M167,207c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C169.1,206.6,168.1,207,167,207z M167,210.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C169.1,210.6,168.1,210.9,167,210.9z M167,214.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C169.1,214.5,168.1,214.9,167,214.9z M167,218.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C169.1,218.5,168.1,218.9,167,218.9z M167,222.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C169.1,222.5,168.1,222.9,167,222.9z M167,226.8c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C169.1,226.5,168.1,226.8,167,226.8z M167,230.8c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C169.1,230.4,168.1,230.8,167,230.8z M175,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C174.6,197,175,197.9,175,199z M175,203c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,200.9,175,201.9,175,203z M175,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,204.9,175,205.9,175,207z M175,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,208.9,175,209.9,175,210.9z M175,214.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,212.9,175,213.8,175,214.9z M175,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,216.9,175,217.8,175,218.9z M175,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,220.9,175,221.8,175,222.9z M175,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,224.8,175,225.8,175,226.8z M175,230.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,228.8,175,229.7,175,230.8z"/>
					<path class="st0" d="M182.9,199c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C182.5,197,182.9,197.9,182.9,199z M182.9,203c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C182.5,200.9,182.9,201.9,182.9,203z M182.9,207c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C182.5,204.9,182.9,205.9,182.9,207z M182.9,210.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C182.5,208.9,182.9,209.9,182.9,210.9z M182.9,214.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C182.5,212.9,182.9,213.8,182.9,214.9z M182.9,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C182.5,216.9,182.9,217.8,182.9,218.9z M182.9,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,194.6,184,195,182.9,195z M182.9,199c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,198.6,184,199,182.9,199z M182.9,203c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,202.6,184,203,182.9,203z M182.9,207c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,206.6,184,207,182.9,207z M182.9,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,210.6,184,210.9,182.9,210.9z M182.9,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,214.5,184,214.9,182.9,214.9z M182.9,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,218.5,184,218.9,182.9,218.9z M182.9,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C184.9,222.5,184,222.9,182.9,222.9z M190.9,191.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,189,190.9,190,190.9,191.1z M190.9,195c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,193,190.9,193.9,190.9,195z M190.9,199c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,197,190.9,197.9,190.9,199z M190.9,203c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,200.9,190.9,201.9,190.9,203z M190.9,207c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,204.9,190.9,205.9,190.9,207z M190.9,210.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,208.9,190.9,209.9,190.9,210.9z M190.9,214.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,212.9,190.9,213.8,190.9,214.9z M190.9,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,216.9,190.9,217.8,190.9,218.9z M190.9,222.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,220.9,190.9,221.8,190.9,222.9z M190.9,226.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,224.8,190.9,225.8,190.9,226.8z M190.9,187.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,186.7,192,187.1,190.9,187.1z M190.9,191.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,190.7,192,191.1,190.9,191.1z M190.9,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,194.6,192,195,190.9,195z M190.9,199c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,198.6,192,199,190.9,199z M190.9,203c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,202.6,192,203,190.9,203z M190.9,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,214.5,192,214.9,190.9,214.9z M190.9,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,218.5,192,218.9,190.9,218.9z M190.9,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,222.5,192,222.9,190.9,222.9z M190.9,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,226.5,192,226.8,190.9,226.8z M190.9,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,230.4,192,230.8,190.9,230.8z M198.8,187.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,185,198.8,186,198.8,187.1z M198.8,191.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,189,198.8,190,198.8,191.1z M198.8,195c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,193,198.8,193.9,198.8,195z M198.8,199c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,197,198.8,197.9,198.8,199z M198.8,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,216.9,198.8,217.8,198.8,218.9z M198.8,222.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,220.9,198.8,221.8,198.8,222.9z M198.8,226.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,224.8,198.8,225.8,198.8,226.8z M198.8,230.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,228.8,198.8,229.7,198.8,230.8z M198.8,187.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.8,186.7,199.9,187.1,198.8,187.1z M198.8,191.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.8,190.7,199.9,191.1,198.8,191.1z M198.8,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.8,194.6,199.9,195,198.8,195z M198.8,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.8,222.5,199.9,222.9,198.8,222.9z M198.8,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.8,226.5,199.9,226.8,198.8,226.8z M198.8,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.8,230.4,199.9,230.8,198.8,230.8z M206.8,187.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,185,206.8,186,206.8,187.1z M206.8,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,189,206.8,190,206.8,191.1z M206.8,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,193,206.8,193.9,206.8,195z M206.8,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,197,206.8,197.9,206.8,199z M206.8,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,216.9,206.8,217.8,206.8,218.9z M206.8,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,220.9,206.8,221.8,206.8,222.9z M206.8,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,224.8,206.8,225.8,206.8,226.8z M206.8,230.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,228.8,206.8,229.7,206.8,230.8z M206.8,187.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,186.7,207.9,187.1,206.8,187.1z M206.8,191.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,190.7,207.9,191.1,206.8,191.1z M206.8,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,194.6,207.9,195,206.8,195z M206.8,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,198.6,207.9,199,206.8,199z M206.8,203c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,202.6,207.9,203,206.8,203z M206.8,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,214.5,207.9,214.9,206.8,214.9z M206.8,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,218.5,207.9,218.9,206.8,218.9z M206.8,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,222.5,207.9,222.9,206.8,222.9z M206.8,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,226.5,207.9,226.8,206.8,226.8z M206.8,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,230.4,207.9,230.8,206.8,230.8z M214.7,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,189,214.7,190,214.7,191.1z M214.7,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,193,214.7,193.9,214.7,195z M214.7,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,197,214.7,197.9,214.7,199z M214.7,203c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,200.9,214.7,201.9,214.7,203z M214.7,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,204.9,214.7,205.9,214.7,207z M214.7,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,208.9,214.7,209.9,214.7,210.9z M214.7,214.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,212.9,214.7,213.8,214.7,214.9z M214.7,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,216.9,214.7,217.8,214.7,218.9z M214.7,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,220.9,214.7,221.8,214.7,222.9z M214.7,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,224.8,214.7,225.8,214.7,226.8z M214.7,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S215.8,195,214.7,195z
						M214.7,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S215.8,199,214.7,199z M214.7,203c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S215.8,203,214.7,203z M214.7,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S215.8,207,214.7,207z M214.7,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S215.8,210.9,214.7,210.9z
						M214.7,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S215.8,214.9,214.7,214.9z M214.7,218.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S215.8,218.9,214.7,218.9z M214.7,222.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S215.8,222.9,214.7,222.9z M222.7,199c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S222.7,197.9,222.7,199z M222.7,203c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S222.7,201.9,222.7,203z M222.7,207c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S222.7,205.9,222.7,207z
						M222.7,210.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C222.3,208.9,222.7,209.9,222.7,210.9z
						M222.7,214.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C222.3,212.9,222.7,213.8,222.7,214.9z
						M222.7,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C222.3,216.9,222.7,217.8,222.7,218.9z"/>
					<path class="st0" d="M230.6,214.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C230.2,212.9,230.6,213.8,230.6,214.9z M230.6,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C230.2,216.9,230.6,217.8,230.6,218.9z M230.6,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C232.7,214.5,231.7,214.9,230.6,214.9z M230.6,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C232.7,218.5,231.7,218.9,230.6,218.9z M230.6,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C232.7,222.5,231.7,222.9,230.6,222.9z M238.6,214.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C238.2,212.9,238.6,213.8,238.6,214.9z M238.6,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C238.2,216.9,238.6,217.8,238.6,218.9z M238.6,222.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C238.2,220.9,238.6,221.8,238.6,222.9z M238.6,226.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C238.2,224.8,238.6,225.8,238.6,226.8z M238.6,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C240.6,214.5,239.7,214.9,238.6,214.9z M238.6,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C240.6,218.5,239.7,218.9,238.6,218.9z M238.6,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C240.6,222.5,239.7,222.9,238.6,222.9z M238.6,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C240.6,226.5,239.7,226.8,238.6,226.8z M238.6,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C240.6,230.4,239.7,230.8,238.6,230.8z M246.5,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C246.2,216.9,246.5,217.8,246.5,218.9z M246.5,222.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C246.2,220.9,246.5,221.8,246.5,222.9z M246.5,226.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C246.2,224.8,246.5,225.8,246.5,226.8z M246.5,230.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C246.2,228.8,246.5,229.7,246.5,230.8z M246.5,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C248.6,222.5,247.6,222.9,246.5,222.9z M246.5,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C248.6,226.5,247.6,226.8,246.5,226.8z M246.5,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C248.6,230.4,247.6,230.8,246.5,230.8z M254.5,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C254.1,220.9,254.5,221.8,254.5,222.9z M254.5,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C254.1,224.8,254.5,225.8,254.5,226.8z M254.5,230.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C254.1,228.8,254.5,229.7,254.5,230.8z M254.5,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C256.5,218.5,255.6,218.9,254.5,218.9z M254.5,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C256.5,222.5,255.6,222.9,254.5,222.9z M254.5,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C256.5,226.5,255.6,226.8,254.5,226.8z M254.5,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C256.5,230.4,255.6,230.8,254.5,230.8z M262.4,171.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C262.1,169.1,262.4,170.1,262.4,171.2z M262.4,175.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C262.1,173.1,262.4,174.1,262.4,175.2z M262.4,179.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C262.1,177.1,262.4,178,262.4,179.1z M262.4,183.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C262.1,181.1,262.4,182,262.4,183.1z M262.4,187.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C262.1,185,262.4,186,262.4,187.1z M262.4,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C262.1,189,262.4,190,262.4,191.1z M262.4,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C262.1,193,262.4,193.9,262.4,195z M262.4,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C262.1,197,262.4,197.9,262.4,199z M262.4,203c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C262.1,200.9,262.4,201.9,262.4,203z M262.4,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C262.1,204.9,262.4,205.9,262.4,207z M262.4,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C262.1,208.9,262.4,209.9,262.4,210.9z M262.4,214.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C262.1,212.9,262.4,213.8,262.4,214.9z M262.4,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C262.1,216.9,262.4,217.8,262.4,218.9z M262.4,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C262.1,220.9,262.4,221.8,262.4,222.9z M262.4,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C262.1,224.8,262.4,225.8,262.4,226.8z M262.4,230.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C262.1,228.8,262.4,229.7,262.4,230.8z M262.4,171.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C264.5,170.8,263.5,171.2,262.4,171.2z M262.4,175.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C264.5,174.8,263.5,175.2,262.4,175.2z M262.4,179.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C264.5,178.7,263.5,179.1,262.4,179.1z M262.4,183.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C264.5,182.7,263.5,183.1,262.4,183.1z M262.4,187.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C264.5,186.7,263.5,187.1,262.4,187.1z M262.4,191.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C264.5,190.7,263.5,191.1,262.4,191.1z M262.4,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C264.5,194.6,263.5,195,262.4,195z M262.4,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C264.5,198.6,263.5,199,262.4,199z M262.4,203c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C264.5,202.6,263.5,203,262.4,203z M262.4,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C264.5,206.6,263.5,207,262.4,207z M262.4,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C264.5,210.6,263.5,210.9,262.4,210.9z M262.4,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C264.5,214.5,263.5,214.9,262.4,214.9z M262.4,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C264.5,218.5,263.5,218.9,262.4,218.9z M262.4,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C264.5,222.5,263.5,222.9,262.4,222.9z M262.4,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C264.5,226.5,263.5,226.8,262.4,226.8z M270.4,171.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S270.4,170.1,270.4,171.2z M270.4,175.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S270.4,174.1,270.4,175.2z M270.4,179.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S270.4,178,270.4,179.1
						z M270.4,183.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S270.4,182,270.4,183.1z M270.4,187.1
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S270.4,186,270.4,187.1z M270.4,191.1c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S270.4,190,270.4,191.1z M270.4,195c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S270.4,193.9,270.4,195z M270.4,199c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S270.4,197.9,270.4,199z M270.4,203c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S270.4,201.9,270.4,203z
						M270.4,207c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S270.4,205.9,270.4,207z M270.4,210.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C270,208.9,270.4,209.9,270.4,210.9z M270.4,214.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C270,212.9,270.4,213.8,270.4,214.9z M270.4,218.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C270,216.9,270.4,217.8,270.4,218.9z M270.4,222.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C270,220.9,270.4,221.8,270.4,222.9z M270.4,171.2
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C272.4,170.8,271.5,171.2,270.4,171.2z M270.4,175.2
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S271.5,175.2,270.4,175.2z M270.4,179.1c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S271.5,179.1,270.4,179.1z M270.4,183.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S271.5,183.1,270.4,183.1z M270.4,187.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S271.5,187.1,270.4,187.1z M270.4,191.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S271.5,191.1,270.4,191.1
						z M270.4,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S271.5,195,270.4,195z M270.4,199
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S271.5,199,270.4,199z M270.4,203c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S271.5,203,270.4,203z M270.4,207c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S271.5,207,270.4,207z M270.4,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S271.5,210.9,270.4,210.9z M270.4,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S271.5,214.9,270.4,214.9
						z M270.4,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S271.5,218.9,270.4,218.9z"/>
					<path class="st0" d="M282.3,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C281.9,197,282.3,197.9,282.3,199z
						M282.3,203c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C281.9,200.9,282.3,201.9,282.3,203z M282.3,207
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C281.9,204.9,282.3,205.9,282.3,207z M282.3,210.9
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C281.9,208.9,282.3,209.9,282.3,210.9z M282.3,214.9
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C281.9,212.9,282.3,213.8,282.3,214.9z M282.3,218.9
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C281.9,216.9,282.3,217.8,282.3,218.9z M282.3,195c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C284.3,194.6,283.4,195,282.3,195z M282.3,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C284.3,198.6,283.4,199,282.3,199z M282.3,203c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.3,202.6,283.4,203,282.3,203z M282.3,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.3,206.6,283.4,207,282.3,207z M282.3,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.3,210.6,283.4,210.9,282.3,210.9z M282.3,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.3,214.5,283.4,214.9,282.3,214.9z M282.3,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.3,218.5,283.4,218.9,282.3,218.9z M282.3,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C284.3,222.5,283.4,222.9,282.3,222.9z M290.3,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,189,290.3,190,290.3,191.1z M290.3,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,193,290.3,193.9,290.3,195z M290.3,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,197,290.3,197.9,290.3,199z M290.3,203c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,200.9,290.3,201.9,290.3,203z M290.3,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,204.9,290.3,205.9,290.3,207z M290.3,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,208.9,290.3,209.9,290.3,210.9z M290.3,214.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,212.9,290.3,213.8,290.3,214.9z M290.3,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,216.9,290.3,217.8,290.3,218.9z M290.3,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,220.9,290.3,221.8,290.3,222.9z M290.3,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C289.9,224.8,290.3,225.8,290.3,226.8z M290.3,187.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,186.7,291.4,187.1,290.3,187.1z M290.3,191.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,190.7,291.4,191.1,290.3,191.1z M290.3,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,194.6,291.4,195,290.3,195z M290.3,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,198.6,291.4,199,290.3,199z M290.3,203c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,202.6,291.4,203,290.3,203z M290.3,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,206.6,291.4,207,290.3,207z M290.3,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,210.6,291.4,210.9,290.3,210.9z M290.3,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,214.5,291.4,214.9,290.3,214.9z M290.3,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,218.5,291.4,218.9,290.3,218.9z M290.3,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,222.5,291.4,222.9,290.3,222.9z M290.3,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,226.5,291.4,226.8,290.3,226.8z M290.3,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C292.3,230.4,291.4,230.8,290.3,230.8z M298.2,187.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,185,298.2,186,298.2,187.1z M298.2,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,189,298.2,190,298.2,191.1z M298.2,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,193,298.2,193.9,298.2,195z M298.2,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,197,298.2,197.9,298.2,199z M298.2,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,204.9,298.2,205.9,298.2,207z M298.2,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,208.9,298.2,209.9,298.2,210.9z M298.2,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,216.9,298.2,217.8,298.2,218.9z M298.2,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,220.9,298.2,221.8,298.2,222.9z M298.2,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,224.8,298.2,225.8,298.2,226.8z M298.2,230.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C297.8,228.8,298.2,229.7,298.2,230.8z M298.2,187.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C300.3,186.7,299.3,187.1,298.2,187.1z M298.2,191.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C300.3,190.7,299.3,191.1,298.2,191.1z M298.2,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C300.3,194.6,299.3,195,298.2,195z M298.2,207c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C300.3,206.6,299.3,207,298.2,207z M298.2,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C300.3,210.6,299.3,210.9,298.2,210.9z M298.2,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C300.3,222.5,299.3,222.9,298.2,222.9z M298.2,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C300.3,226.5,299.3,226.8,298.2,226.8z M298.2,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C300.3,230.4,299.3,230.8,298.2,230.8z M306.2,187.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S306.2,186,306.2,187.1z M306.2,191.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S306.2,190,306.2,191.1z
						M306.2,195c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S306.2,193.9,306.2,195z M306.2,199
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S306.2,197.9,306.2,199z M306.2,207c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S306.2,205.9,306.2,207z M306.2,210.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C305.8,208.9,306.2,209.9,306.2,210.9z M306.2,218.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C305.8,216.9,306.2,217.8,306.2,218.9z M306.2,222.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C305.8,220.9,306.2,221.8,306.2,222.9z M306.2,226.8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C305.8,224.8,306.2,225.8,306.2,226.8z M306.2,230.8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C305.8,228.8,306.2,229.7,306.2,230.8z M306.2,187.1c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S307.3,187.1,306.2,187.1z M306.2,191.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S307.3,191.1,306.2,191.1z M306.2,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S307.3,195,306.2,195z M306.2,199c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S307.3,199,306.2,199z
						M306.2,203c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S307.3,203,306.2,203z M306.2,207
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S307.3,207,306.2,207z M306.2,210.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S307.3,210.9,306.2,210.9z M306.2,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S307.3,218.9,306.2,218.9z M306.2,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S307.3,222.9,306.2,222.9z M306.2,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S307.3,226.8,306.2,226.8
						z M306.2,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S307.3,230.8,306.2,230.8z M314.1,191.1
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S314.1,190,314.1,191.1z M314.1,195c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S314.1,193.9,314.1,195z M314.1,199c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S314.1,197.9,314.1,199z M314.1,203c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S314.1,201.9,314.1,203z M314.1,207c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S314.1,205.9,314.1,207z
						M314.1,210.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C313.8,208.9,314.1,209.9,314.1,210.9z
						M314.1,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C313.8,216.9,314.1,217.8,314.1,218.9z
						M314.1,222.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C313.8,220.9,314.1,221.8,314.1,222.9z
						M314.1,226.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C313.8,224.8,314.1,225.8,314.1,226.8z
						M314.1,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C316.2,194.6,315.2,195,314.1,195z M314.1,199
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C316.2,198.6,315.2,199,314.1,199z M314.1,203
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C316.2,202.6,315.2,203,314.1,203z M314.1,207
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C316.2,206.6,315.2,207,314.1,207z M314.1,210.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C316.2,210.6,315.2,210.9,314.1,210.9z M314.1,218.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C316.2,218.5,315.2,218.9,314.1,218.9z M314.1,222.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C316.2,222.5,315.2,222.9,314.1,222.9z M322.1,199
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C321.7,197,322.1,197.9,322.1,199z M322.1,203c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C321.7,200.9,322.1,201.9,322.1,203z M322.1,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C321.7,204.9,322.1,205.9,322.1,207z M322.1,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,208.9,322.1,209.9,322.1,210.9z M322.1,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,216.9,322.1,217.8,322.1,218.9z"/>
					<path class="st1" d="M330,187.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C329.7,185,330,186,330,187.1z
						M330,191.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C329.7,189,330,190,330,191.1z M330,195
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C329.7,193,330,193.9,330,195z M330,199c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C329.7,197,330,197.9,330,199z M330,203c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C329.7,200.9,330,201.9,330,203z M330,207c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C329.7,204.9,330,205.9,330,207z M330,210.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C329.7,208.9,330,209.9,330,210.9z M330,214.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C329.7,212.9,330,213.8,330,214.9z M330,187.1c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C332.1,186.7,331.1,187.1,330,187.1z M330,191.1c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C332.1,190.7,331.1,191.1,330,191.1z M330,195c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C332.1,194.6,331.1,195,330,195z M330,199c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C332.1,198.6,331.1,199,330,199z M330,203c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C332.1,202.6,331.1,203,330,203z M330,207c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C332.1,206.6,331.1,207,330,207z M330,210.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C332.1,210.6,331.1,210.9,330,210.9z M330,214.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C332.1,214.5,331.1,214.9,330,214.9z M330,218.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C332.1,218.5,331.1,218.9,330,218.9z M338,187.1c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C337.6,185,338,186,338,187.1z M338,191.1c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C337.6,189,338,190,338,191.1z M338,195c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C337.6,193,338,193.9,338,195z M338,199c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C337.6,197,338,197.9,338,199z M338,203c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C337.6,200.9,338,201.9,338,203z M338,207c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C337.6,204.9,338,205.9,338,207z M338,210.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C337.6,208.9,338,209.9,338,210.9z M338,214.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C337.6,212.9,338,213.8,338,214.9z M338,218.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C337.6,216.9,338,217.8,338,218.9z M338,222.9c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C337.6,220.9,338,221.8,338,222.9z M338,187.1c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C340,186.7,339.1,187.1,338,187.1z M338,191.1c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C340,190.7,339.1,191.1,338,191.1z M338,195c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C340,194.6,339.1,195,338,195z M338,199c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C340,198.6,339.1,199,338,199z M338,203c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C340,202.6,339.1,203,338,203z M338,207c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C340,206.6,339.1,207,338,207z M338,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C340,210.6,339.1,210.9,338,210.9z M338,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C340,214.5,339.1,214.9,338,214.9z M338,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C340,218.5,339.1,218.9,338,218.9z M338,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C340,222.5,339.1,222.9,338,222.9z M338,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C340,226.5,339.1,226.8,338,226.8z M346,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C345.6,216.9,346,217.8,346,218.9z M346,222.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C345.6,220.9,346,221.8,346,222.9z M346,226.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C345.6,224.8,346,225.8,346,226.8z M346,230.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C345.6,228.8,346,229.7,346,230.8z M346,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C348,218.5,347,218.9,346,218.9z M346,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C348,222.5,347,222.9,346,222.9z M346,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C348,226.5,347,226.8,346,226.8z M346,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C348,230.4,347,230.8,346,230.8z M353.9,187.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C353.5,185,353.9,186,353.9,187.1z M353.9,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C353.5,189,353.9,190,353.9,191.1z M353.9,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C353.5,193,353.9,193.9,353.9,195z M353.9,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C353.5,197,353.9,197.9,353.9,199z M353.9,203c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C353.5,200.9,353.9,201.9,353.9,203z M353.9,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C353.5,204.9,353.9,205.9,353.9,207z M353.9,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C353.5,208.9,353.9,209.9,353.9,210.9z M353.9,214.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C353.5,212.9,353.9,213.8,353.9,214.9z M353.9,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C353.5,216.9,353.9,217.8,353.9,218.9z M353.9,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C353.5,220.9,353.9,221.8,353.9,222.9z M353.9,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C353.5,224.8,353.9,225.8,353.9,226.8z M353.9,187.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C355.9,186.7,355,187.1,353.9,187.1z M353.9,191.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C355.9,190.7,355,191.1,353.9,191.1z M353.9,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C355.9,194.6,355,195,353.9,195z M353.9,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C355.9,198.6,355,199,353.9,199z M353.9,203c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C355.9,202.6,355,203,353.9,203z M353.9,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C355.9,206.6,355,207,353.9,207z M353.9,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C355.9,210.6,355,210.9,353.9,210.9z M353.9,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C355.9,214.5,355,214.9,353.9,214.9z M353.9,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C355.9,218.5,355,218.9,353.9,218.9z M353.9,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C355.9,222.5,355,222.9,353.9,222.9z M361.9,187.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C361.5,185,361.9,186,361.9,187.1z M361.9,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C361.5,189,361.9,190,361.9,191.1z M361.9,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C361.5,193,361.9,193.9,361.9,195z M361.9,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C361.5,197,361.9,197.9,361.9,199z M361.9,203c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C361.5,200.9,361.9,201.9,361.9,203z M361.9,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C361.5,204.9,361.9,205.9,361.9,207z M361.9,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C361.5,208.9,361.9,209.9,361.9,210.9z M361.9,214.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C361.5,212.9,361.9,213.8,361.9,214.9z M361.9,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C361.5,216.9,361.9,217.8,361.9,218.9z M361.9,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C361.5,220.9,361.9,221.8,361.9,222.9z M361.9,187.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S363,187.1,361.9,187.1z M361.9,191.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S363,191.1,361.9,191.1z M361.9,195
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S363,195,361.9,195z M361.9,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S363,199,361.9,199z M361.9,203c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S363,203,361.9,203z
						M361.9,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S363,207,361.9,207z M361.9,210.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S363,210.9,361.9,210.9z M361.9,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S363,214.9,361.9,214.9z M361.9,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S363,218.9,361.9,218.9z M361.9,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S363,222.9,361.9,222.9z
						M361.9,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S363,226.8,361.9,226.8z M369.8,218.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C369.4,216.9,369.8,217.8,369.8,218.9z M369.8,222.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C369.4,220.9,369.8,221.8,369.8,222.9z M369.8,226.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C369.4,224.8,369.8,225.8,369.8,226.8z M369.8,230.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C369.4,228.8,369.8,229.7,369.8,230.8z M369.8,218.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S370.9,218.9,369.8,218.9z M369.8,222.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S370.9,222.9,369.8,222.9z M369.8,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S370.9,226.8,369.8,226.8z M369.8,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S370.9,230.8,369.8,230.8z M377.8,187.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S377.8,186,377.8,187.1
						z M377.8,191.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S377.8,190,377.8,191.1z M377.8,195
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S377.8,193.9,377.8,195z M377.8,199c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S377.8,197.9,377.8,199z M377.8,203c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S377.8,201.9,377.8,203z M377.8,207c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S377.8,205.9,377.8,207z M377.8,210.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C377.4,208.9,377.8,209.9,377.8,210.9z M377.8,214.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C377.4,212.9,377.8,213.8,377.8,214.9z M377.8,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C377.4,216.9,377.8,217.8,377.8,218.9z M377.8,222.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C377.4,220.9,377.8,221.8,377.8,222.9z M377.8,226.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C377.4,224.8,377.8,225.8,377.8,226.8z M377.8,187.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C379.8,186.7,378.9,187.1,377.8,187.1z M377.8,191.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C379.8,190.7,378.9,191.1,377.8,191.1z M377.8,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C379.8,194.6,378.9,195,377.8,195z M377.8,199c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C379.8,198.6,378.9,199,377.8,199z M377.8,203c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C379.8,202.6,378.9,203,377.8,203z M377.8,207c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C379.8,206.6,378.9,207,377.8,207z M377.8,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C379.8,210.6,378.9,210.9,377.8,210.9z M377.8,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C379.8,214.5,378.9,214.9,377.8,214.9z M377.8,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C379.8,218.5,378.9,218.9,377.8,218.9z M377.8,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C379.8,222.5,378.9,222.9,377.8,222.9z M385.7,187.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C385.3,185,385.7,186,385.7,187.1z M385.7,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C385.3,189,385.7,190,385.7,191.1z M385.7,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C385.3,193,385.7,193.9,385.7,195z M385.7,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C385.3,197,385.7,197.9,385.7,199z M385.7,203c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C385.3,200.9,385.7,201.9,385.7,203z M385.7,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C385.3,204.9,385.7,205.9,385.7,207z M385.7,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C385.3,208.9,385.7,209.9,385.7,210.9z M385.7,214.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C385.3,212.9,385.7,213.8,385.7,214.9z M385.7,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C385.3,216.9,385.7,217.8,385.7,218.9z M385.7,187.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C387.8,186.7,386.8,187.1,385.7,187.1z M385.7,191.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C387.8,190.7,386.8,191.1,385.7,191.1z M385.7,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C387.8,194.6,386.8,195,385.7,195z M385.7,199c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C387.8,198.6,386.8,199,385.7,199z M385.7,203c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C387.8,202.6,386.8,203,385.7,203z M385.7,207c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C387.8,206.6,386.8,207,385.7,207z M385.7,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C387.8,210.6,386.8,210.9,385.7,210.9z M385.7,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C387.8,214.5,386.8,214.9,385.7,214.9z"/>
					<path class="st0" d="M397.6,175.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C397.3,173.1,397.6,174.1,397.6,175.2
						z M397.6,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C397.3,189,397.6,190,397.6,191.1z M397.6,195
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C397.3,193,397.6,193.9,397.6,195z M397.6,199c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C397.3,197,397.6,197.9,397.6,199z M397.6,203c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C397.3,200.9,397.6,201.9,397.6,203z M397.6,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C397.3,204.9,397.6,205.9,397.6,207z M397.6,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C397.3,208.9,397.6,209.9,397.6,210.9z M397.6,214.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C397.3,212.9,397.6,213.8,397.6,214.9z M397.6,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C397.3,216.9,397.6,217.8,397.6,218.9z M397.6,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C397.3,220.9,397.6,221.8,397.6,222.9z M397.6,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C397.3,224.8,397.6,225.8,397.6,226.8z M397.6,230.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C397.3,228.8,397.6,229.7,397.6,230.8z M397.6,171.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,170.8,398.7,171.2,397.6,171.2z M397.6,175.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,174.8,398.7,175.2,397.6,175.2z M397.6,179.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,178.7,398.7,179.1,397.6,179.1z M397.6,187.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,186.7,398.7,187.1,397.6,187.1z M397.6,191.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,190.7,398.7,191.1,397.6,191.1z M397.6,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,194.6,398.7,195,397.6,195z M397.6,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,198.6,398.7,199,397.6,199z M397.6,203c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,202.6,398.7,203,397.6,203z M397.6,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,206.6,398.7,207,397.6,207z M397.6,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,210.6,398.7,210.9,397.6,210.9z M397.6,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,214.5,398.7,214.9,397.6,214.9z M397.6,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,218.5,398.7,218.9,397.6,218.9z M397.6,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,222.5,398.7,222.9,397.6,222.9z M397.6,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,226.5,398.7,226.8,397.6,226.8z M397.6,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C399.7,230.4,398.7,230.8,397.6,230.8z M405.6,171.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,169.1,405.6,170.1,405.6,171.2z M405.6,175.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,173.1,405.6,174.1,405.6,175.2z M405.6,179.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,177.1,405.6,178,405.6,179.1z M405.6,187.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,185,405.6,186,405.6,187.1z M405.6,191.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,189,405.6,190,405.6,191.1z M405.6,195c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,193,405.6,193.9,405.6,195z M405.6,199c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,197,405.6,197.9,405.6,199z M405.6,203c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,200.9,405.6,201.9,405.6,203z M405.6,207c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,204.9,405.6,205.9,405.6,207z M405.6,210.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,208.9,405.6,209.9,405.6,210.9z M405.6,214.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,212.9,405.6,213.8,405.6,214.9z M405.6,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,216.9,405.6,217.8,405.6,218.9z M405.6,222.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,220.9,405.6,221.8,405.6,222.9z M405.6,226.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,224.8,405.6,225.8,405.6,226.8z M405.6,230.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C405.2,228.8,405.6,229.7,405.6,230.8z M405.6,175.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,174.8,406.7,175.2,405.6,175.2z M405.6,191.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,190.7,406.7,191.1,405.6,191.1z M405.6,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,194.6,406.7,195,405.6,195z M405.6,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,198.6,406.7,199,405.6,199z M405.6,203c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,202.6,406.7,203,405.6,203z M405.6,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,206.6,406.7,207,405.6,207z M405.6,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,210.6,406.7,210.9,405.6,210.9z M405.6,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,214.5,406.7,214.9,405.6,214.9z M405.6,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,218.5,406.7,218.9,405.6,218.9z M405.6,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,222.5,406.7,222.9,405.6,222.9z M405.6,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,226.5,406.7,226.8,405.6,226.8z M405.6,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C407.6,230.4,406.7,230.8,405.6,230.8z"/>
					<path class="st0" d="M413.6,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C415.6,194.6,414.6,195,413.6,195z
						M413.6,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C415.6,198.6,414.6,199,413.6,199z M413.6,203
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C415.6,202.6,414.6,203,413.6,203z M413.6,207c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C415.6,206.6,414.6,207,413.6,207z M413.6,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C415.6,222.5,414.6,222.9,413.6,222.9z M413.6,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C415.6,226.5,414.6,226.8,413.6,226.8z M421.5,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C421.1,189,421.5,190,421.5,191.1z M421.5,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.1,193,421.5,193.9,421.5,195z M421.5,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.1,197,421.5,197.9,421.5,199z M421.5,203c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.1,200.9,421.5,201.9,421.5,203z M421.5,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.1,204.9,421.5,205.9,421.5,207z M421.5,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.1,208.9,421.5,209.9,421.5,210.9z M421.5,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.1,220.9,421.5,221.8,421.5,222.9z M421.5,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.1,224.8,421.5,225.8,421.5,226.8z M421.5,230.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C421.1,228.8,421.5,229.7,421.5,230.8z M421.5,187.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.5,186.7,422.6,187.1,421.5,187.1z M421.5,191.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.5,190.7,422.6,191.1,421.5,191.1z M421.5,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.5,194.6,422.6,195,421.5,195z M421.5,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.5,198.6,422.6,199,421.5,199z M421.5,203c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.5,202.6,422.6,203,421.5,203z M421.5,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.5,206.6,422.6,207,421.5,207z M421.5,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.5,210.6,422.6,210.9,421.5,210.9z M421.5,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.5,214.5,422.6,214.9,421.5,214.9z M421.5,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.5,222.5,422.6,222.9,421.5,222.9z M421.5,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.5,226.5,422.6,226.8,421.5,226.8z M421.5,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C423.5,230.4,422.6,230.8,421.5,230.8z M429.5,187.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,185,429.5,186,429.5,187.1z M429.5,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,189,429.5,190,429.5,191.1z M429.5,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,193,429.5,193.9,429.5,195z M429.5,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,197,429.5,197.9,429.5,199z M429.5,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,204.9,429.5,205.9,429.5,207z M429.5,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,208.9,429.5,209.9,429.5,210.9z M429.5,214.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,212.9,429.5,213.8,429.5,214.9z M429.5,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,220.9,429.5,221.8,429.5,222.9z M429.5,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,224.8,429.5,225.8,429.5,226.8z M429.5,230.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C429.1,228.8,429.5,229.7,429.5,230.8z M429.5,187.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,186.7,430.5,187.1,429.5,187.1z M429.5,191.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,190.7,430.5,191.1,429.5,191.1z M429.5,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,194.6,430.5,195,429.5,195z M429.5,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,206.6,430.5,207,429.5,207z M429.5,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,210.6,430.5,210.9,429.5,210.9z M429.5,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,214.5,430.5,214.9,429.5,214.9z M429.5,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,222.5,430.5,222.9,429.5,222.9z M429.5,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,226.5,430.5,226.8,429.5,226.8z M429.5,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C431.5,230.4,430.5,230.8,429.5,230.8z M437.4,187.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C437,185,437.4,186,437.4,187.1z M437.4,191.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C437,189,437.4,190,437.4,191.1z M437.4,195c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C437,193,437.4,193.9,437.4,195z M437.4,199c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C437,197,437.4,197.9,437.4,199z M437.4,207c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C437,204.9,437.4,205.9,437.4,207z M437.4,210.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C437,208.9,437.4,209.9,437.4,210.9z M437.4,214.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C437,212.9,437.4,213.8,437.4,214.9z M437.4,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C437,216.9,437.4,217.8,437.4,218.9z M437.4,222.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C437,220.9,437.4,221.8,437.4,222.9z M437.4,226.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C437,224.8,437.4,225.8,437.4,226.8z M437.4,230.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C437,228.8,437.4,229.7,437.4,230.8z M437.4,187.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S438.5,187.1,437.4,187.1z M437.4,191.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S438.5,191.1,437.4,191.1
						z M437.4,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S438.5,195,437.4,195z M437.4,199
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S438.5,199,437.4,199z M437.4,207c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S438.5,207,437.4,207z M437.4,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S438.5,210.9,437.4,210.9z M437.4,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S438.5,214.9,437.4,214.9z M437.4,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S438.5,218.9,437.4,218.9
						z M437.4,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S438.5,222.9,437.4,222.9z M437.4,226.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S438.5,226.8,437.4,226.8z M437.4,230.8c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S438.5,230.8,437.4,230.8z M445.4,191.1c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S445.4,190,445.4,191.1z M445.4,195c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S445.4,193.9,445.4,195z M445.4,199c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S445.4,197.9,445.4,199z M445.4,210.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C445,208.9,445.4,209.9,445.4,210.9z M445.4,214.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C445,212.9,445.4,213.8,445.4,214.9z M445.4,218.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C445,216.9,445.4,217.8,445.4,218.9z M445.4,222.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C445,220.9,445.4,221.8,445.4,222.9z M445.4,226.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C445,224.8,445.4,225.8,445.4,226.8z M445.4,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S446.5,195,445.4,195z M445.4,199c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S446.5,199,445.4,199z
						M445.4,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S446.5,214.9,445.4,214.9z M445.4,218.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S446.5,218.9,445.4,218.9z M445.4,222.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S446.5,222.9,445.4,222.9z"/>
					<path class="st0" d="M457.3,171.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,169.1,457.3,170.1,457.3,171.2z M457.3,175.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,173.1,457.3,174.1,457.3,175.2z M457.3,179.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,177.1,457.3,178,457.3,179.1z M457.3,183.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,181.1,457.3,182,457.3,183.1z M457.3,187.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,185,457.3,186,457.3,187.1z M457.3,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,189,457.3,190,457.3,191.1z M457.3,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,193,457.3,193.9,457.3,195z M457.3,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,197,457.3,197.9,457.3,199z M457.3,203c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,200.9,457.3,201.9,457.3,203z M457.3,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,204.9,457.3,205.9,457.3,207z M457.3,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,208.9,457.3,209.9,457.3,210.9z M457.3,214.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,212.9,457.3,213.8,457.3,214.9z M457.3,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,216.9,457.3,217.8,457.3,218.9z M457.3,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,220.9,457.3,221.8,457.3,222.9z M457.3,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,224.8,457.3,225.8,457.3,226.8z M457.3,230.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,228.8,457.3,229.7,457.3,230.8z M457.3,171.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,170.8,458.4,171.2,457.3,171.2z M457.3,175.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,174.8,458.4,175.2,457.3,175.2z M457.3,179.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,178.7,458.4,179.1,457.3,179.1z M457.3,183.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,182.7,458.4,183.1,457.3,183.1z M457.3,187.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,186.7,458.4,187.1,457.3,187.1z M457.3,191.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,190.7,458.4,191.1,457.3,191.1z M457.3,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,194.6,458.4,195,457.3,195z M457.3,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,198.6,458.4,199,457.3,199z M457.3,203c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,202.6,458.4,203,457.3,203z M457.3,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,206.6,458.4,207,457.3,207z M457.3,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,210.6,458.4,210.9,457.3,210.9z M457.3,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,214.5,458.4,214.9,457.3,214.9z M457.3,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,218.5,458.4,218.9,457.3,218.9z M457.3,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,222.5,458.4,222.9,457.3,222.9z M457.3,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,226.5,458.4,226.8,457.3,226.8z M457.3,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,230.4,458.4,230.8,457.3,230.8z M465.2,171.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,169.1,465.2,170.1,465.2,171.2z M465.2,175.2c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,173.1,465.2,174.1,465.2,175.2z M465.2,179.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,177.1,465.2,178,465.2,179.1z M465.2,183.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,181.1,465.2,182,465.2,183.1z M465.2,187.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,185,465.2,186,465.2,187.1z M465.2,191.1c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,189,465.2,190,465.2,191.1z M465.2,195c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,193,465.2,193.9,465.2,195z M465.2,199c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,197,465.2,197.9,465.2,199z M465.2,203c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,200.9,465.2,201.9,465.2,203z M465.2,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,204.9,465.2,205.9,465.2,207z M465.2,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,208.9,465.2,209.9,465.2,210.9z M465.2,214.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,212.9,465.2,213.8,465.2,214.9z M465.2,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,216.9,465.2,217.8,465.2,218.9z M465.2,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,220.9,465.2,221.8,465.2,222.9z M465.2,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,224.8,465.2,225.8,465.2,226.8z M465.2,230.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,228.8,465.2,229.7,465.2,230.8z M465.2,171.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,170.8,466.3,171.2,465.2,171.2z M465.2,175.2c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,174.8,466.3,175.2,465.2,175.2z M465.2,179.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,178.7,466.3,179.1,465.2,179.1z M465.2,183.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,182.7,466.3,183.1,465.2,183.1z M465.2,187.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,186.7,466.3,187.1,465.2,187.1z M465.2,191.1c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,190.7,466.3,191.1,465.2,191.1z M465.2,195c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,194.6,466.3,195,465.2,195z M465.2,199c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,198.6,466.3,199,465.2,199z M465.2,203c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,202.6,466.3,203,465.2,203z M465.2,207c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,206.6,466.3,207,465.2,207z M465.2,210.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,210.6,466.3,210.9,465.2,210.9z M465.2,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,214.5,466.3,214.9,465.2,214.9z M465.2,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,218.5,466.3,218.9,465.2,218.9z M465.2,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,222.5,466.3,222.9,465.2,222.9z M465.2,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,226.5,466.3,226.8,465.2,226.8z M465.2,230.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,230.4,466.3,230.8,465.2,230.8z M473.2,187.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C472.8,185,473.2,186,473.2,187.1z M473.2,191.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C472.8,189,473.2,190,473.2,191.1z M473.2,195c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C472.8,193,473.2,193.9,473.2,195z M473.2,199c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C472.8,197,473.2,197.9,473.2,199z M473.2,187.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C475.2,186.7,474.3,187.1,473.2,187.1z M473.2,191.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C475.2,190.7,474.3,191.1,473.2,191.1z M473.2,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C475.2,194.6,474.3,195,473.2,195z M481.2,187.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S481.2,186,481.2,187.1z M481.2,191.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S481.2,190,481.2,191.1z
						M481.2,195c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S481.2,193.9,481.2,195z M481.2,199
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S481.2,197.9,481.2,199z M481.2,187.1c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S482.3,187.1,481.2,187.1z M481.2,191.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S482.3,191.1,481.2,191.1z M481.2,195c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S482.3,195,481.2,195z M481.2,199c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S482.3,199,481.2,199z
						M481.2,203c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S482.3,203,481.2,203z M481.2,207
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S482.3,207,481.2,207z M481.2,210.9c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S482.3,210.9,481.2,210.9z M481.2,214.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S482.3,214.9,481.2,214.9z M481.2,218.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S482.3,218.9,481.2,218.9z M481.2,222.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S482.3,222.9,481.2,222.9
						z M481.2,226.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S482.3,226.8,481.2,226.8z M481.2,230.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S482.3,230.8,481.2,230.8z M489.1,191.1c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S489.1,190,489.1,191.1z M489.1,195c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S489.1,193.9,489.1,195z M489.1,199c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S489.1,197.9,489.1,199z M489.1,203c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S489.1,201.9,489.1,203z
						M489.1,207c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S489.1,205.9,489.1,207z M489.1,210.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C488.7,208.9,489.1,209.9,489.1,210.9z M489.1,214.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C488.7,212.9,489.1,213.8,489.1,214.9z M489.1,218.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C488.7,216.9,489.1,217.8,489.1,218.9z M489.1,222.9
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C488.7,220.9,489.1,221.8,489.1,222.9z M489.1,226.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C488.7,224.8,489.1,225.8,489.1,226.8z M489.1,230.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C488.7,228.8,489.1,229.7,489.1,230.8z M489.1,195
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C491.1,194.6,490.2,195,489.1,195z M489.1,199
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C491.1,198.6,490.2,199,489.1,199z M489.1,203
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C491.1,202.6,490.2,203,489.1,203z M489.1,207
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C491.1,206.6,490.2,207,489.1,207z M489.1,210.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C491.1,210.6,490.2,210.9,489.1,210.9z M489.1,214.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C491.1,214.5,490.2,214.9,489.1,214.9z M489.1,218.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C491.1,218.5,490.2,218.9,489.1,218.9z M489.1,222.9
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C491.1,222.5,490.2,222.9,489.1,222.9z M489.1,226.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C491.1,226.5,490.2,226.8,489.1,226.8z M489.1,230.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C491.1,230.4,490.2,230.8,489.1,230.8z M497.1,199
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C496.7,197,497.1,197.9,497.1,199z M497.1,203c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C496.7,200.9,497.1,201.9,497.1,203z M497.1,207c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C496.7,204.9,497.1,205.9,497.1,207z M497.1,210.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C496.7,208.9,497.1,209.9,497.1,210.9z M497.1,214.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C496.7,212.9,497.1,213.8,497.1,214.9z M497.1,218.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C496.7,216.9,497.1,217.8,497.1,218.9z M497.1,222.9c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C496.7,220.9,497.1,221.8,497.1,222.9z M497.1,226.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C496.7,224.8,497.1,225.8,497.1,226.8z M497.1,230.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C496.7,228.8,497.1,229.7,497.1,230.8z"/>
				</g>

				<g id='g6'>
					<path class="st0" d="M4,254.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,252.7,4,253.7,4,254.8z
						M4,258.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,256.7,4,257.7,4,258.8z M4,262.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,260.7,4,261.6,4,262.7z M4,266.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,264.7,4,265.6,4,266.7z M4,270.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,268.6,4,269.6,4,270.7z M4,274.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,272.6,4,273.6,4,274.7z M4,278.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,276.6,4,277.5,4,278.6z M4,282.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,280.6,4,281.5,4,282.6z M4,286.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,284.5,4,285.5,4,286.6z M4,290.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,288.5,4,289.5,4,290.6z M4,294.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,292.5,4,293.5,4,294.5z M4,298.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,296.5,4,297.4,4,298.5z M4,302.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,300.5,4,301.4,4,302.5z M4,306.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,304.5,4,305.4,4,306.5z M4,310.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,308.4,4,309.4,4,310.4z M4,314.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,312.4,4,313.3,4,314.4z M4,254.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C6,254.4,5.1,254.8,4,254.8z M4,258.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C6,258.4,5.1,258.8,4,258.8z M4,262.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,262.3,5.1,262.7,4,262.7
						z M4,266.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,266.3,5.1,266.7,4,266.7z M4,270.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,270.3,5.1,270.7,4,270.7z M4,274.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,274.3,5.1,274.7,4,274.7z M4,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C6,278.2,5.1,278.6,4,278.6z M4,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C6,282.2,5.1,282.6,4,282.6z M4,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,286.2,5.1,286.6,4,286.6
						z M4,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,290.2,5.1,290.6,4,290.6z M4,294.5
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,294.2,5.1,294.5,4,294.5z M4,298.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,298.1,5.1,298.5,4,298.5z M4,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C6,302.1,5.1,302.5,4,302.5z M4,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C6,306.1,5.1,306.5,4,306.5z M4,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,310.1,5.1,310.4,4,310.4
						z M4,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,314,5.1,314.4,4,314.4z M11.9,254.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,252.7,11.9,253.7,11.9,254.8z M11.9,258.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,256.7,11.9,257.7,11.9,258.8z M11.9,262.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,260.7,11.9,261.6,11.9,262.7z M11.9,266.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,264.7,11.9,265.6,11.9,266.7z M11.9,270.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,268.6,11.9,269.6,11.9,270.7z M11.9,274.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,272.6,11.9,273.6,11.9,274.7z M11.9,278.6
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,276.6,11.9,277.5,11.9,278.6z M11.9,282.6
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,280.6,11.9,281.5,11.9,282.6z M11.9,286.6
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,284.5,11.9,285.5,11.9,286.6z M11.9,290.6
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,288.5,11.9,289.5,11.9,290.6z M11.9,294.5
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,292.5,11.9,293.5,11.9,294.5z M11.9,298.5
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,296.5,11.9,297.4,11.9,298.5z M11.9,302.5
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,300.5,11.9,301.4,11.9,302.5z M11.9,306.5
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,304.5,11.9,305.4,11.9,306.5z M11.9,310.4
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,308.4,11.9,309.4,11.9,310.4z M11.9,314.4
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C11.5,312.4,11.9,313.3,11.9,314.4z M11.9,254.8
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,254.4,13,254.8,11.9,254.8z M11.9,258.8c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,258.4,13,258.8,11.9,258.8z M11.9,262.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,262.3,13,262.7,11.9,262.7z M11.9,266.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,266.3,13,266.7,11.9,266.7z M11.9,270.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,270.3,13,270.7,11.9,270.7z M11.9,274.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,274.3,13,274.7,11.9,274.7z M11.9,278.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,278.2,13,278.6,11.9,278.6z M11.9,282.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,282.2,13,282.6,11.9,282.6z M11.9,286.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,286.2,13,286.6,11.9,286.6z M11.9,290.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,290.2,13,290.6,11.9,290.6z M11.9,294.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,294.2,13,294.5,11.9,294.5z M11.9,298.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,298.1,13,298.5,11.9,298.5z M11.9,302.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,302.1,13,302.5,11.9,302.5z M11.9,306.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,306.1,13,306.5,11.9,306.5z M11.9,310.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,310.1,13,310.4,11.9,310.4z M11.9,314.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C14,314,13,314.4,11.9,314.4z M19.9,278.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,276.6,19.9,277.5,19.9,278.6z M19.9,282.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,280.6,19.9,281.5,19.9,282.6z M19.9,286.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,284.5,19.9,285.5,19.9,286.6z M19.9,290.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C19.5,288.5,19.9,289.5,19.9,290.6z M19.9,278.6c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C21.9,278.2,21,278.6,19.9,278.6z M19.9,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C21.9,282.2,21,282.6,19.9,282.6z M19.9,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,286.2,21,286.6,19.9,286.6z M19.9,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,290.2,21,290.6,19.9,290.6z M27.8,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,276.6,27.8,277.5,27.8,278.6z M27.8,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,280.6,27.8,281.5,27.8,282.6z M27.8,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,284.5,27.8,285.5,27.8,286.6z M27.8,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,288.5,27.8,289.5,27.8,290.6z M27.8,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,278.2,28.9,278.6,27.8,278.6z M27.8,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,282.2,28.9,282.6,27.8,282.6z M27.8,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,286.2,28.9,286.6,27.8,286.6z M27.8,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,290.2,28.9,290.6,27.8,290.6z M35.8,254.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,252.7,35.8,253.7,35.8,254.8z M35.8,258.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,256.7,35.8,257.7,35.8,258.8z M35.8,262.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,260.7,35.8,261.6,35.8,262.7z M35.8,266.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,264.7,35.8,265.6,35.8,266.7z M35.8,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,268.6,35.8,269.6,35.8,270.7z M35.8,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,272.6,35.8,273.6,35.8,274.7z M35.8,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,276.6,35.8,277.5,35.8,278.6z M35.8,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,280.6,35.8,281.5,35.8,282.6z M35.8,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,284.5,35.8,285.5,35.8,286.6z M35.8,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,288.5,35.8,289.5,35.8,290.6z M35.8,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,292.5,35.8,293.5,35.8,294.5z M35.8,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,296.5,35.8,297.4,35.8,298.5z M35.8,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,300.5,35.8,301.4,35.8,302.5z M35.8,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,304.5,35.8,305.4,35.8,306.5z M35.8,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,308.4,35.8,309.4,35.8,310.4z M35.8,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,312.4,35.8,313.3,35.8,314.4z M35.8,254.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,254.4,36.9,254.8,35.8,254.8z M35.8,258.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,258.8,35.8,258.8z
						M35.8,262.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,262.7,35.8,262.7z M35.8,266.7c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,266.7,35.8,266.7z M35.8,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S36.9,270.7,35.8,270.7z M35.8,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S36.9,274.7,35.8,274.7z M35.8,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,278.6,35.8,278.6z M35.8,282.6
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,282.6,35.8,282.6z M35.8,286.6c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,286.6,35.8,286.6z M35.8,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S36.9,290.6,35.8,290.6z M35.8,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S36.9,294.5,35.8,294.5z M35.8,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,298.5,35.8,298.5z
						M35.8,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,302.5,35.8,302.5z M35.8,306.5
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,306.5,35.8,306.5z M35.8,310.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S36.9,310.4,35.8,310.4z M35.8,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S36.9,314.4,35.8,314.4z M43.7,254.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S43.7,253.7,43.7,254.8z M43.7,258.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S43.7,257.7,43.7,258.8z
						M43.7,262.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S43.7,261.6,43.7,262.7z M43.7,266.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S43.7,265.6,43.7,266.7z M43.7,270.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S43.7,269.6,43.7,270.7z M43.7,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S43.7,273.6,43.7,274.7z M43.7,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S43.7,277.5,43.7,278.6z M43.7,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S43.7,281.5,43.7,282.6z
						M43.7,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S43.7,285.5,43.7,286.6z M43.7,290.6
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S43.7,289.5,43.7,290.6z M43.7,294.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C43.4,292.5,43.7,293.5,43.7,294.5z M43.7,298.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C43.4,296.5,43.7,297.4,43.7,298.5z M43.7,302.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C43.4,300.5,43.7,301.4,43.7,302.5z M43.7,306.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C43.4,304.5,43.7,305.4,43.7,306.5z M43.7,310.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C43.4,308.4,43.7,309.4,43.7,310.4z M43.7,314.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C43.4,312.4,43.7,313.3,43.7,314.4z M43.7,254.8c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C45.8,254.4,44.8,254.8,43.7,254.8z M43.7,258.8c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,258.8,43.7,258.8z M43.7,262.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S44.8,262.7,43.7,262.7z M43.7,266.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S44.8,266.7,43.7,266.7z M43.7,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,270.7,43.7,270.7z
						M43.7,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,274.7,43.7,274.7z M43.7,278.6
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,278.6,43.7,278.6z M43.7,282.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,282.6,43.7,282.6z M43.7,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S44.8,286.6,43.7,286.6z M43.7,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S44.8,290.6,43.7,290.6z M43.7,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,294.5,43.7,294.5z
						M43.7,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,298.5,43.7,298.5z M43.7,302.5
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,302.5,43.7,302.5z M43.7,306.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S44.8,306.5,43.7,306.5z M43.7,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S44.8,310.4,43.7,310.4z M43.7,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S44.8,314.4,43.7,314.4z"/>
					<path class="st0" d="M55.7,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C55.3,280.6,55.7,281.5,55.7,282.6z
						M55.7,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C55.3,284.5,55.7,285.5,55.7,286.6z M55.7,290.6
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C55.3,288.5,55.7,289.5,55.7,290.6z M55.7,294.5c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C55.3,292.5,55.7,293.5,55.7,294.5z M55.7,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C55.3,296.5,55.7,297.4,55.7,298.5z M55.7,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C55.3,300.5,55.7,301.4,55.7,302.5z M55.7,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,278.2,56.8,278.6,55.7,278.6z M55.7,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,282.2,56.8,282.6,55.7,282.6z M55.7,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,286.2,56.8,286.6,55.7,286.6z M55.7,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,290.2,56.8,290.6,55.7,290.6z M55.7,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,294.2,56.8,294.5,55.7,294.5z M55.7,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,298.1,56.8,298.5,55.7,298.5z M55.7,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,302.1,56.8,302.5,55.7,302.5z M55.7,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C57.7,306.1,56.8,306.5,55.7,306.5z M63.6,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,272.6,63.6,273.6,63.6,274.7z M63.6,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,276.6,63.6,277.5,63.6,278.6z M63.6,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,280.6,63.6,281.5,63.6,282.6z M63.6,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,284.5,63.6,285.5,63.6,286.6z M63.6,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,288.5,63.6,289.5,63.6,290.6z M63.6,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,292.5,63.6,293.5,63.6,294.5z M63.6,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,296.5,63.6,297.4,63.6,298.5z M63.6,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,300.5,63.6,301.4,63.6,302.5z M63.6,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,304.5,63.6,305.4,63.6,306.5z M63.6,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C63.2,308.4,63.6,309.4,63.6,310.4z M63.6,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,270.3,64.7,270.7,63.6,270.7z M63.6,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,274.3,64.7,274.7,63.6,274.7z M63.6,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,278.2,64.7,278.6,63.6,278.6z M63.6,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,282.2,64.7,282.6,63.6,282.6z M63.6,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,286.2,64.7,286.6,63.6,286.6z M63.6,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,298.1,64.7,298.5,63.6,298.5z M63.6,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,302.1,64.7,302.5,63.6,302.5z M63.6,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,306.1,64.7,306.5,63.6,306.5z M63.6,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,310.1,64.7,310.4,63.6,310.4z M63.6,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C65.6,314,64.7,314.4,63.6,314.4z M71.6,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,268.6,71.6,269.6,71.6,270.7z M71.6,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,272.6,71.6,273.6,71.6,274.7z M71.6,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,276.6,71.6,277.5,71.6,278.6z M71.6,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,280.6,71.6,281.5,71.6,282.6z M71.6,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,300.5,71.6,301.4,71.6,302.5z M71.6,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,304.5,71.6,305.4,71.6,306.5z M71.6,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,308.4,71.6,309.4,71.6,310.4z M71.6,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C71.2,312.4,71.6,313.3,71.6,314.4z M71.6,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,270.3,72.7,270.7,71.6,270.7z M71.6,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,274.3,72.7,274.7,71.6,274.7z M71.6,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,278.2,72.7,278.6,71.6,278.6z M71.6,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,306.1,72.7,306.5,71.6,306.5z M71.6,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,310.1,72.7,310.4,71.6,310.4z M71.6,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C73.6,314,72.7,314.4,71.6,314.4z M79.5,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S79.5,269.6,79.5,270.7z M79.5,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S79.5,273.6,79.5,274.7z
						M79.5,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S79.5,277.5,79.5,278.6z M79.5,282.6
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S79.5,281.5,79.5,282.6z M79.5,302.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C79.1,300.5,79.5,301.4,79.5,302.5z M79.5,306.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C79.1,304.5,79.5,305.4,79.5,306.5z M79.5,310.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C79.1,308.4,79.5,309.4,79.5,310.4z M79.5,314.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C79.1,312.4,79.5,313.3,79.5,314.4z M79.5,270.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,270.7,79.5,270.7z M79.5,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S80.6,274.7,79.5,274.7z M79.5,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S80.6,278.6,79.5,278.6z M79.5,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,282.6,79.5,282.6z
						M79.5,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,286.6,79.5,286.6z M79.5,298.5
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,298.5,79.5,298.5z M79.5,302.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,302.5,79.5,302.5z M79.5,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S80.6,306.5,79.5,306.5z M79.5,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S80.6,310.4,79.5,310.4z M79.5,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S80.6,314.4,79.5,314.4z
						M87.5,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,273.6,87.5,274.7z M87.5,278.6
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,277.5,87.5,278.6z M87.5,282.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S87.5,281.5,87.5,282.6z M87.5,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S87.5,285.5,87.5,286.6z M87.5,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S87.5,289.5,87.5,290.6z M87.5,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C87.1,292.5,87.5,293.5,87.5,294.5z M87.5,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C87.1,296.5,87.5,297.4,87.5,298.5z M87.5,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C87.1,300.5,87.5,301.4,87.5,302.5z M87.5,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C87.1,304.5,87.5,305.4,87.5,306.5z M87.5,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C87.1,308.4,87.5,309.4,87.5,310.4z M87.5,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,278.2,88.6,278.6,87.5,278.6z M87.5,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,282.2,88.6,282.6,87.5,282.6z M87.5,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,286.2,88.6,286.6,87.5,286.6z M87.5,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,290.2,88.6,290.6,87.5,290.6z M87.5,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,294.2,88.6,294.5,87.5,294.5z M87.5,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,298.1,88.6,298.5,87.5,298.5z M87.5,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,302.1,88.6,302.5,87.5,302.5z M87.5,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C89.5,306.1,88.6,306.5,87.5,306.5z M95.4,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,280.6,95.4,281.5,95.4,282.6z M95.4,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,284.5,95.4,285.5,95.4,286.6z M95.4,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,288.5,95.4,289.5,95.4,290.6z M95.4,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,292.5,95.4,293.5,95.4,294.5z M95.4,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,296.5,95.4,297.4,95.4,298.5z M95.4,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C95,300.5,95.4,301.4,95.4,302.5z"/>
					<path class="st0" d="M103.4,254.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,252.7,103.4,253.7,103.4,254.8z M103.4,258.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,256.7,103.4,257.7,103.4,258.8z M103.4,262.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,260.7,103.4,261.6,103.4,262.7z M103.4,266.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,264.7,103.4,265.6,103.4,266.7z M103.4,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,268.6,103.4,269.6,103.4,270.7z M103.4,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,272.6,103.4,273.6,103.4,274.7z M103.4,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,276.6,103.4,277.5,103.4,278.6z M103.4,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,280.6,103.4,281.5,103.4,282.6z M103.4,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,284.5,103.4,285.5,103.4,286.6z M103.4,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,288.5,103.4,289.5,103.4,290.6z M103.4,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,292.5,103.4,293.5,103.4,294.5z M103.4,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,296.5,103.4,297.4,103.4,298.5z M103.4,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,300.5,103.4,301.4,103.4,302.5z M103.4,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,304.5,103.4,305.4,103.4,306.5z M103.4,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,308.4,103.4,309.4,103.4,310.4z M103.4,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C103,312.4,103.4,313.3,103.4,314.4z M103.4,254.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,254.4,104.5,254.8,103.4,254.8z M103.4,258.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,258.4,104.5,258.8,103.4,258.8z M103.4,262.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,262.3,104.5,262.7,103.4,262.7z M103.4,266.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,266.3,104.5,266.7,103.4,266.7z M103.4,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,270.3,104.5,270.7,103.4,270.7z M103.4,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,274.3,104.5,274.7,103.4,274.7z M103.4,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,278.2,104.5,278.6,103.4,278.6z M103.4,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,282.2,104.5,282.6,103.4,282.6z M103.4,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,286.2,104.5,286.6,103.4,286.6z M103.4,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,290.2,104.5,290.6,103.4,290.6z M103.4,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,294.2,104.5,294.5,103.4,294.5z M103.4,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,298.1,104.5,298.5,103.4,298.5z M103.4,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,302.1,104.5,302.5,103.4,302.5z M103.4,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,306.1,104.5,306.5,103.4,306.5z M103.4,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,310.1,104.5,310.4,103.4,310.4z M103.4,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C105.4,314,104.5,314.4,103.4,314.4z M111.3,254.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,252.7,111.3,253.7,111.3,254.8z M111.3,258.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,256.7,111.3,257.7,111.3,258.8z M111.3,262.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,260.7,111.3,261.6,111.3,262.7z M111.3,266.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,264.7,111.3,265.6,111.3,266.7z M111.3,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,268.6,111.3,269.6,111.3,270.7z M111.3,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,272.6,111.3,273.6,111.3,274.7z M111.3,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,276.6,111.3,277.5,111.3,278.6z M111.3,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,280.6,111.3,281.5,111.3,282.6z M111.3,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,284.5,111.3,285.5,111.3,286.6z M111.3,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,288.5,111.3,289.5,111.3,290.6z M111.3,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,292.5,111.3,293.5,111.3,294.5z M111.3,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,296.5,111.3,297.4,111.3,298.5z M111.3,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,300.5,111.3,301.4,111.3,302.5z M111.3,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,304.5,111.3,305.4,111.3,306.5z M111.3,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,308.4,111.3,309.4,111.3,310.4z M111.3,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C110.9,312.4,111.3,313.3,111.3,314.4z M111.3,254.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,254.4,112.4,254.8,111.3,254.8z M111.3,258.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,258.4,112.4,258.8,111.3,258.8z M111.3,262.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,262.3,112.4,262.7,111.3,262.7z M111.3,266.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,266.3,112.4,266.7,111.3,266.7z M111.3,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,270.3,112.4,270.7,111.3,270.7z M111.3,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,274.3,112.4,274.7,111.3,274.7z M111.3,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,278.2,112.4,278.6,111.3,278.6z M111.3,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,282.2,112.4,282.6,111.3,282.6z M111.3,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,286.2,112.4,286.6,111.3,286.6z M111.3,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,290.2,112.4,290.6,111.3,290.6z M111.3,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,294.2,112.4,294.5,111.3,294.5z M111.3,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,298.1,112.4,298.5,111.3,298.5z M111.3,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,302.1,112.4,302.5,111.3,302.5z M111.3,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,306.1,112.4,306.5,111.3,306.5z M111.3,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,310.1,112.4,310.4,111.3,310.4z M111.3,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C113.4,314,112.4,314.4,111.3,314.4z"/>
					<path class="st0" d="M123.3,258.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,256.7,123.3,257.7,123.3,258.8
						z M123.3,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,272.6,123.3,273.6,123.3,274.7z M123.3,278.6
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,276.6,123.3,277.5,123.3,278.6z M123.3,282.6
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,280.6,123.3,281.5,123.3,282.6z M123.3,286.6
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,284.5,123.3,285.5,123.3,286.6z M123.3,290.6
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,288.5,123.3,289.5,123.3,290.6z M123.3,294.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,292.5,123.3,293.5,123.3,294.5z M123.3,298.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,296.5,123.3,297.4,123.3,298.5z M123.3,302.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,300.5,123.3,301.4,123.3,302.5z M123.3,306.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,304.5,123.3,305.4,123.3,306.5z M123.3,310.4
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,308.4,123.3,309.4,123.3,310.4z M123.3,314.4
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C122.9,312.4,123.3,313.3,123.3,314.4z M123.3,254.8
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C125.3,254.4,124.4,254.8,123.3,254.8z M123.3,258.8c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C125.3,258.4,124.4,258.8,123.3,258.8z M123.3,262.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C125.3,262.3,124.4,262.7,123.3,262.7z M123.3,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,270.3,124.4,270.7,123.3,270.7z M123.3,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,274.3,124.4,274.7,123.3,274.7z M123.3,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,278.2,124.4,278.6,123.3,278.6z M123.3,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,282.2,124.4,282.6,123.3,282.6z M123.3,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,286.2,124.4,286.6,123.3,286.6z M123.3,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,290.2,124.4,290.6,123.3,290.6z M123.3,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,294.2,124.4,294.5,123.3,294.5z M123.3,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,298.1,124.4,298.5,123.3,298.5z M123.3,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,302.1,124.4,302.5,123.3,302.5z M123.3,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,306.1,124.4,306.5,123.3,306.5z M123.3,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,310.1,124.4,310.4,123.3,310.4z M123.3,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,314,124.4,314.4,123.3,314.4z M131.2,254.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,252.7,131.2,253.7,131.2,254.8z M131.2,258.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,256.7,131.2,257.7,131.2,258.8z M131.2,262.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,260.7,131.2,261.6,131.2,262.7z M131.2,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,268.6,131.2,269.6,131.2,270.7z M131.2,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,272.6,131.2,273.6,131.2,274.7z M131.2,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,276.6,131.2,277.5,131.2,278.6z M131.2,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,280.6,131.2,281.5,131.2,282.6z M131.2,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,284.5,131.2,285.5,131.2,286.6z M131.2,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,288.5,131.2,289.5,131.2,290.6z M131.2,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,292.5,131.2,293.5,131.2,294.5z M131.2,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,296.5,131.2,297.4,131.2,298.5z M131.2,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,300.5,131.2,301.4,131.2,302.5z M131.2,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,304.5,131.2,305.4,131.2,306.5z M131.2,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,308.4,131.2,309.4,131.2,310.4z M131.2,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,312.4,131.2,313.3,131.2,314.4z M131.2,258.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,258.4,132.3,258.8,131.2,258.8z M131.2,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,274.3,132.3,274.7,131.2,274.7z M131.2,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,278.2,132.3,278.6,131.2,278.6z M131.2,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,282.2,132.3,282.6,131.2,282.6z M131.2,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,286.2,132.3,286.6,131.2,286.6z M131.2,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,290.2,132.3,290.6,131.2,290.6z M131.2,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,294.2,132.3,294.5,131.2,294.5z M131.2,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,298.1,132.3,298.5,131.2,298.5z M131.2,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,302.1,132.3,302.5,131.2,302.5z M131.2,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,306.1,132.3,306.5,131.2,306.5z M131.2,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,310.1,132.3,310.4,131.2,310.4z M131.2,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.2,314,132.3,314.4,131.2,314.4z"/>
					<path class="st1" d="M143.2,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,280.6,143.2,281.5,143.2,282.6z M143.2,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,284.5,143.2,285.5,143.2,286.6z M143.2,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,288.5,143.2,289.5,143.2,290.6z M143.2,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,292.5,143.2,293.5,143.2,294.5z M143.2,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,296.5,143.2,297.4,143.2,298.5z M143.2,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C142.8,300.5,143.2,301.4,143.2,302.5z M143.2,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,278.2,144.2,278.6,143.2,278.6z M143.2,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,282.2,144.2,282.6,143.2,282.6z M143.2,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,286.2,144.2,286.6,143.2,286.6z M143.2,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,290.2,144.2,290.6,143.2,290.6z M143.2,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,294.2,144.2,294.5,143.2,294.5z M143.2,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,298.1,144.2,298.5,143.2,298.5z M143.2,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,302.1,144.2,302.5,143.2,302.5z M143.2,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C145.2,306.1,144.2,306.5,143.2,306.5z M151.1,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C150.7,272.6,151.1,273.6,151.1,274.7z M151.1,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C150.7,276.6,151.1,277.5,151.1,278.6z M151.1,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C150.7,280.6,151.1,281.5,151.1,282.6z M151.1,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C150.7,284.5,151.1,285.5,151.1,286.6z M151.1,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C150.7,288.5,151.1,289.5,151.1,290.6z M151.1,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C150.7,292.5,151.1,293.5,151.1,294.5z M151.1,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C150.7,296.5,151.1,297.4,151.1,298.5z M151.1,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C150.7,300.5,151.1,301.4,151.1,302.5z M151.1,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C150.7,304.5,151.1,305.4,151.1,306.5z M151.1,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C150.7,308.4,151.1,309.4,151.1,310.4z M151.1,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C153.1,270.3,152.2,270.7,151.1,270.7z M151.1,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C153.1,274.3,152.2,274.7,151.1,274.7z M151.1,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C153.1,278.2,152.2,278.6,151.1,278.6z M151.1,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C153.1,282.2,152.2,282.6,151.1,282.6z M151.1,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C153.1,286.2,152.2,286.6,151.1,286.6z M151.1,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C153.1,290.2,152.2,290.6,151.1,290.6z M151.1,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C153.1,294.2,152.2,294.5,151.1,294.5z M151.1,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C153.1,298.1,152.2,298.5,151.1,298.5z M151.1,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C153.1,302.1,152.2,302.5,151.1,302.5z M151.1,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C153.1,306.1,152.2,306.5,151.1,306.5z M151.1,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C153.1,310.1,152.2,310.4,151.1,310.4z M151.1,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C153.1,314,152.2,314.4,151.1,314.4z M159.1,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C158.7,268.6,159.1,269.6,159.1,270.7z M159.1,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C158.7,272.6,159.1,273.6,159.1,274.7z M159.1,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C158.7,276.6,159.1,277.5,159.1,278.6z M159.1,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C158.7,280.6,159.1,281.5,159.1,282.6z M159.1,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C158.7,284.5,159.1,285.5,159.1,286.6z M159.1,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C158.7,296.5,159.1,297.4,159.1,298.5z M159.1,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C158.7,300.5,159.1,301.4,159.1,302.5z M159.1,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C158.7,304.5,159.1,305.4,159.1,306.5z M159.1,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C158.7,308.4,159.1,309.4,159.1,310.4z M159.1,314.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C158.7,312.4,159.1,313.3,159.1,314.4z M159.1,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C161.1,270.3,160.1,270.7,159.1,270.7z M159.1,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C161.1,274.3,160.1,274.7,159.1,274.7z M159.1,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C161.1,278.2,160.1,278.6,159.1,278.6z M159.1,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C161.1,282.2,160.1,282.6,159.1,282.6z M159.1,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C161.1,302.1,160.1,302.5,159.1,302.5z M159.1,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C161.1,306.1,160.1,306.5,159.1,306.5z M159.1,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C161.1,310.1,160.1,310.4,159.1,310.4z M159.1,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C161.1,314,160.1,314.4,159.1,314.4z M167,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C166.6,268.6,167,269.6,167,270.7z M167,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C166.6,272.6,167,273.6,167,274.7z M167,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C166.6,276.6,167,277.5,167,278.6z M167,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C166.6,280.6,167,281.5,167,282.6z M167,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C166.6,300.5,167,301.4,167,302.5z M167,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C166.6,304.5,167,305.4,167,306.5z M167,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C166.6,308.4,167,309.4,167,310.4z M167,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C166.6,312.4,167,313.3,167,314.4z M167,254.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C169.1,254.4,168.1,254.8,167,254.8z M167,258.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C169.1,258.4,168.1,258.8,167,258.8z M167,262.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C169.1,262.3,168.1,262.7,167,262.7z M167,266.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C169.1,266.3,168.1,266.7,167,266.7z M167,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C169.1,270.3,168.1,270.7,167,270.7z M167,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C169.1,274.3,168.1,274.7,167,274.7z M167,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C169.1,278.2,168.1,278.6,167,278.6z M167,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C169.1,282.2,168.1,282.6,167,282.6z M167,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C169.1,286.2,168.1,286.6,167,286.6z M167,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C169.1,290.2,168.1,290.6,167,290.6z M167,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C169.1,294.2,168.1,294.5,167,294.5z M167,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C169.1,298.1,168.1,298.5,167,298.5z M167,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C169.1,302.1,168.1,302.5,167,302.5z M167,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C169.1,306.1,168.1,306.5,167,306.5z M167,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C169.1,310.1,168.1,310.4,167,310.4z M167,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C169.1,314,168.1,314.4,167,314.4z M175,254.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,252.7,175,253.7,175,254.8z M175,258.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,256.7,175,257.7,175,258.8z M175,262.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,260.7,175,261.6,175,262.7z M175,266.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,264.7,175,265.6,175,266.7z M175,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,268.6,175,269.6,175,270.7z M175,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,272.6,175,273.6,175,274.7z M175,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,276.6,175,277.5,175,278.6z M175,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,280.6,175,281.5,175,282.6z M175,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,284.5,175,285.5,175,286.6z M175,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,288.5,175,289.5,175,290.6z M175,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,292.5,175,293.5,175,294.5z M175,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,296.5,175,297.4,175,298.5z M175,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,300.5,175,301.4,175,302.5z M175,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,304.5,175,305.4,175,306.5z M175,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,308.4,175,309.4,175,310.4z M175,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C174.6,312.4,175,313.3,175,314.4z M175,254.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C177,254.4,176.1,254.8,175,254.8z M175,258.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S176.1,258.8,175,258.8z
						M175,262.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S176.1,262.7,175,262.7z M175,266.7c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S176.1,266.7,175,266.7z M175,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S176.1,270.7,175,270.7z M175,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S176.1,274.7,175,274.7z M175,278.6
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S176.1,278.6,175,278.6z M175,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S176.1,282.6,175,282.6z M175,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S176.1,286.6,175,286.6z M175,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S176.1,290.6,175,290.6z M175,294.5
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S176.1,294.5,175,294.5z M175,298.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S176.1,298.5,175,298.5z M175,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S176.1,302.5,175,302.5z M175,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S176.1,306.5,175,306.5z M175,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S176.1,310.4,175,310.4z
						M175,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S176.1,314.4,175,314.4z M182.9,254.8
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S182.9,253.7,182.9,254.8z M182.9,258.8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S182.9,257.7,182.9,258.8z M182.9,262.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S182.9,261.6,182.9,262.7z M182.9,266.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S182.9,265.6,182.9,266.7z M182.9,270.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S182.9,269.6,182.9,270.7z M182.9,274.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S182.9,273.6,182.9,274.7z M182.9,278.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S182.9,277.5,182.9,278.6z M182.9,282.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S182.9,281.5,182.9,282.6z M182.9,286.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S182.9,285.5,182.9,286.6z M182.9,290.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S182.9,289.5,182.9,290.6z M182.9,294.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C182.5,292.5,182.9,293.5,182.9,294.5z M182.9,298.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C182.5,296.5,182.9,297.4,182.9,298.5z M182.9,302.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C182.5,300.5,182.9,301.4,182.9,302.5z M182.9,306.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C182.5,304.5,182.9,305.4,182.9,306.5z M182.9,310.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C182.5,308.4,182.9,309.4,182.9,310.4z M182.9,314.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C182.5,312.4,182.9,313.3,182.9,314.4z"/>
					<path class="st2" d="M190.9,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,276.6,190.9,277.5,190.9,278.6z M190.9,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,280.6,190.9,281.5,190.9,282.6z M190.9,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,292.5,190.9,293.5,190.9,294.5z M190.9,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,296.5,190.9,297.4,190.9,298.5z M190.9,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,300.5,190.9,301.4,190.9,302.5z M190.9,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C190.5,304.5,190.9,305.4,190.9,306.5z M190.9,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,274.3,192,274.7,190.9,274.7z M190.9,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,278.2,192,278.6,190.9,278.6z M190.9,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,282.2,192,282.6,190.9,282.6z M190.9,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,290.2,192,290.6,190.9,290.6z M190.9,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,294.2,192,294.5,190.9,294.5z M190.9,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,298.1,192,298.5,190.9,298.5z M190.9,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,302.1,192,302.5,190.9,302.5z M190.9,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,306.1,192,306.5,190.9,306.5z M190.9,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C192.9,310.1,192,310.4,190.9,310.4z M198.8,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,268.6,198.8,269.6,198.8,270.7z M198.8,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,272.6,198.8,273.6,198.8,274.7z M198.8,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,276.6,198.8,277.5,198.8,278.6z M198.8,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,288.5,198.8,289.5,198.8,290.6z M198.8,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,292.5,198.8,293.5,198.8,294.5z M198.8,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,296.5,198.8,297.4,198.8,298.5z M198.8,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,300.5,198.8,301.4,198.8,302.5z M198.8,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,304.5,198.8,305.4,198.8,306.5z M198.8,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,308.4,198.8,309.4,198.8,310.4z M198.8,314.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C198.4,312.4,198.8,313.3,198.8,314.4z M198.8,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.8,270.3,199.9,270.7,198.8,270.7z M198.8,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.8,274.3,199.9,274.7,198.8,274.7z M198.8,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.8,278.2,199.9,278.6,198.8,278.6z M198.8,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.8,286.2,199.9,286.6,198.8,286.6z M198.8,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.8,290.2,199.9,290.6,198.8,290.6z M198.8,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.8,294.2,199.9,294.5,198.8,294.5z M198.8,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.8,302.1,199.9,302.5,198.8,302.5z M198.8,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.8,306.1,199.9,306.5,198.8,306.5z M198.8,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.8,310.1,199.9,310.4,198.8,310.4z M198.8,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C200.8,314,199.9,314.4,198.8,314.4z M206.8,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,268.6,206.8,269.6,206.8,270.7z M206.8,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,272.6,206.8,273.6,206.8,274.7z M206.8,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,276.6,206.8,277.5,206.8,278.6z M206.8,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,284.5,206.8,285.5,206.8,286.6z M206.8,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,288.5,206.8,289.5,206.8,290.6z M206.8,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,304.5,206.8,305.4,206.8,306.5z M206.8,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,308.4,206.8,309.4,206.8,310.4z M206.8,314.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C206.4,312.4,206.8,313.3,206.8,314.4z M206.8,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,270.3,207.9,270.7,206.8,270.7z M206.8,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,274.3,207.9,274.7,206.8,274.7z M206.8,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,278.2,207.9,278.6,206.8,278.6z M206.8,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,286.2,207.9,286.6,206.8,286.6z M206.8,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,290.2,207.9,290.6,206.8,290.6z M206.8,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,306.1,207.9,306.5,206.8,306.5z M206.8,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,310.1,207.9,310.4,206.8,310.4z M206.8,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C208.8,314,207.9,314.4,206.8,314.4z M214.7,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,268.6,214.7,269.6,214.7,270.7z M214.7,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,272.6,214.7,273.6,214.7,274.7z M214.7,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,276.6,214.7,277.5,214.7,278.6z M214.7,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,280.6,214.7,281.5,214.7,282.6z M214.7,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,284.5,214.7,285.5,214.7,286.6z M214.7,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,288.5,214.7,289.5,214.7,290.6z M214.7,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,292.5,214.7,293.5,214.7,294.5z M214.7,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,300.5,214.7,301.4,214.7,302.5z M214.7,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,304.5,214.7,305.4,214.7,306.5z M214.7,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C214.3,308.4,214.7,309.4,214.7,310.4z M214.7,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,270.3,215.8,270.7,214.7,270.7z M214.7,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,274.3,215.8,274.7,214.7,274.7z M214.7,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,278.2,215.8,278.6,214.7,278.6z M214.7,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,282.2,215.8,282.6,214.7,282.6z M214.7,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,286.2,215.8,286.6,214.7,286.6z M214.7,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,290.2,215.8,290.6,214.7,290.6z M214.7,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,294.2,215.8,294.5,214.7,294.5z M214.7,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,298.1,215.8,298.5,214.7,298.5z M214.7,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,302.1,215.8,302.5,214.7,302.5z M214.7,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,306.1,215.8,306.5,214.7,306.5z M214.7,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,310.1,215.8,310.4,214.7,310.4z M214.7,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C216.8,314,215.8,314.4,214.7,314.4z M222.7,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C222.3,272.6,222.7,273.6,222.7,274.7z M222.7,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C222.3,276.6,222.7,277.5,222.7,278.6z M222.7,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C222.3,280.6,222.7,281.5,222.7,282.6z M222.7,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C222.3,284.5,222.7,285.5,222.7,286.6z M222.7,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C222.3,288.5,222.7,289.5,222.7,290.6z M222.7,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C222.3,292.5,222.7,293.5,222.7,294.5z M222.7,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C222.3,296.5,222.7,297.4,222.7,298.5z M222.7,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C222.3,300.5,222.7,301.4,222.7,302.5z M222.7,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C222.3,304.5,222.7,305.4,222.7,306.5z M222.7,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C222.3,308.4,222.7,309.4,222.7,310.4z M222.7,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C222.3,312.4,222.7,313.3,222.7,314.4z M222.7,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S223.8,278.6,222.7,278.6z M222.7,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S223.8,282.6,222.7,282.6z
						M222.7,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S223.8,286.6,222.7,286.6z M222.7,290.6
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S223.8,290.6,222.7,290.6z M222.7,294.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S223.8,294.5,222.7,294.5z M222.7,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S223.8,298.5,222.7,298.5z M222.7,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S223.8,302.5,222.7,302.5z M222.7,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S223.8,306.5,222.7,306.5
						z M222.7,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S223.8,310.4,222.7,310.4z M222.7,314.4
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S223.8,314.4,222.7,314.4z"/>
					<path class="st0" d="M230.6,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C232.7,270.3,231.7,270.7,230.6,270.7z
						M230.6,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C232.7,274.3,231.7,274.7,230.6,274.7z M230.6,310.4
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C232.7,310.1,231.7,310.4,230.6,310.4z M230.6,314.4
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C232.7,314,231.7,314.4,230.6,314.4z M238.6,270.7
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C238.2,268.6,238.6,269.6,238.6,270.7z M238.6,274.7
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C238.2,272.6,238.6,273.6,238.6,274.7z M238.6,278.6
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C238.2,276.6,238.6,277.5,238.6,278.6z M238.6,282.6
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C238.2,280.6,238.6,281.5,238.6,282.6z M238.6,306.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C238.2,304.5,238.6,305.4,238.6,306.5z M238.6,310.4
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C238.2,308.4,238.6,309.4,238.6,310.4z M238.6,314.4
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C238.2,312.4,238.6,313.3,238.6,314.4z M238.6,270.7
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C240.6,270.3,239.7,270.7,238.6,270.7z M238.6,274.7c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C240.6,274.3,239.7,274.7,238.6,274.7z M238.6,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C240.6,278.2,239.7,278.6,238.6,278.6z M238.6,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C240.6,282.2,239.7,282.6,238.6,282.6z M238.6,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C240.6,286.2,239.7,286.6,238.6,286.6z M238.6,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C240.6,302.1,239.7,302.5,238.6,302.5z M238.6,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C240.6,306.1,239.7,306.5,238.6,306.5z M238.6,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C240.6,310.1,239.7,310.4,238.6,310.4z M238.6,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C240.6,314,239.7,314.4,238.6,314.4z M246.5,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C246.2,268.6,246.5,269.6,246.5,270.7z M246.5,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C246.2,272.6,246.5,273.6,246.5,274.7z M246.5,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C246.2,276.6,246.5,277.5,246.5,278.6z M246.5,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C246.2,280.6,246.5,281.5,246.5,282.6z M246.5,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C246.2,284.5,246.5,285.5,246.5,286.6z M246.5,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C246.2,288.5,246.5,289.5,246.5,290.6z M246.5,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C246.2,292.5,246.5,293.5,246.5,294.5z M246.5,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C246.2,296.5,246.5,297.4,246.5,298.5z M246.5,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C246.2,300.5,246.5,301.4,246.5,302.5z M246.5,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C246.2,304.5,246.5,305.4,246.5,306.5z M246.5,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C246.2,308.4,246.5,309.4,246.5,310.4z M246.5,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C246.2,312.4,246.5,313.3,246.5,314.4z M246.5,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C248.6,274.3,247.6,274.7,246.5,274.7z M246.5,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C248.6,278.2,247.6,278.6,246.5,278.6z M246.5,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C248.6,282.2,247.6,282.6,246.5,282.6z M246.5,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C248.6,286.2,247.6,286.6,246.5,286.6z M246.5,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C248.6,290.2,247.6,290.6,246.5,290.6z M246.5,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C248.6,294.2,247.6,294.5,246.5,294.5z M246.5,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C248.6,298.1,247.6,298.5,246.5,298.5z M246.5,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C248.6,302.1,247.6,302.5,246.5,302.5z M246.5,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C248.6,306.1,247.6,306.5,246.5,306.5z M246.5,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C248.6,310.1,247.6,310.4,246.5,310.4z M254.5,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C254.1,284.5,254.5,285.5,254.5,286.6z M254.5,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C254.1,288.5,254.5,289.5,254.5,290.6z M254.5,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C254.1,292.5,254.5,293.5,254.5,294.5z M254.5,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C254.1,296.5,254.5,297.4,254.5,298.5z M254.5,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C254.1,300.5,254.5,301.4,254.5,302.5z M254.5,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C254.1,304.5,254.5,305.4,254.5,306.5z M254.5,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S255.6,274.7,254.5,274.7z M254.5,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S255.6,278.6,254.5,278.6
						z M254.5,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S255.6,282.6,254.5,282.6z M254.5,286.6
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S255.6,286.6,254.5,286.6z M254.5,290.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S255.6,290.6,254.5,290.6z M254.5,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S255.6,294.5,254.5,294.5z M254.5,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S255.6,298.5,254.5,298.5z M254.5,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S255.6,302.5,254.5,302.5
						z M262.4,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S262.4,269.6,262.4,270.7z M262.4,274.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S262.4,273.6,262.4,274.7z M262.4,278.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S262.4,277.5,262.4,278.6z M262.4,282.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S262.4,281.5,262.4,282.6z M262.4,286.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S262.4,285.5,262.4,286.6z M262.4,290.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S262.4,289.5,262.4,290.6z M262.4,294.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C262.1,292.5,262.4,293.5,262.4,294.5z M262.4,298.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C262.1,296.5,262.4,297.4,262.4,298.5z M262.4,270.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C264.5,270.3,263.5,270.7,262.4,270.7z M262.4,274.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C264.5,274.3,263.5,274.7,262.4,274.7z M262.4,278.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C264.5,278.2,263.5,278.6,262.4,278.6z M262.4,282.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C264.5,282.2,263.5,282.6,262.4,282.6z M262.4,286.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C264.5,286.2,263.5,286.6,262.4,286.6z M270.4,270.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C270,268.6,270.4,269.6,270.4,270.7z M270.4,274.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C270,272.6,270.4,273.6,270.4,274.7z M270.4,278.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C270,276.6,270.4,277.5,270.4,278.6z M270.4,282.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C270,280.6,270.4,281.5,270.4,282.6z M270.4,270.7c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C272.4,270.3,271.5,270.7,270.4,270.7z M270.4,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C272.4,274.3,271.5,274.7,270.4,274.7z"/>
				</g>

				<g id='g7'>
					<path class="st0" d="M306.2,254.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,252.7,306.2,253.7,306.2,254.8z M306.2,258.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,256.7,306.2,257.7,306.2,258.8z M306.2,262.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,260.7,306.2,261.6,306.2,262.7z M306.2,266.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,264.7,306.2,265.6,306.2,266.7z M306.2,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,268.6,306.2,269.6,306.2,270.7z M306.2,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,272.6,306.2,273.6,306.2,274.7z M306.2,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,276.6,306.2,277.5,306.2,278.6z M306.2,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,280.6,306.2,281.5,306.2,282.6z M306.2,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,284.5,306.2,285.5,306.2,286.6z M306.2,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,288.5,306.2,289.5,306.2,290.6z M306.2,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,292.5,306.2,293.5,306.2,294.5z M306.2,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,296.5,306.2,297.4,306.2,298.5z M306.2,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,300.5,306.2,301.4,306.2,302.5z M306.2,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,304.5,306.2,305.4,306.2,306.5z M306.2,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,308.4,306.2,309.4,306.2,310.4z M306.2,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C305.8,312.4,306.2,313.3,306.2,314.4z M306.2,254.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C308.2,254.4,307.3,254.8,306.2,254.8z M306.2,258.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C308.2,258.4,307.3,258.8,306.2,258.8z M306.2,262.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C308.2,262.3,307.3,262.7,306.2,262.7z M306.2,266.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C308.2,266.3,307.3,266.7,306.2,266.7z M306.2,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C308.2,270.3,307.3,270.7,306.2,270.7z M306.2,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C308.2,274.3,307.3,274.7,306.2,274.7z M306.2,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C308.2,278.2,307.3,278.6,306.2,278.6z M306.2,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C308.2,282.2,307.3,282.6,306.2,282.6z M306.2,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C308.2,286.2,307.3,286.6,306.2,286.6z M306.2,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C308.2,290.2,307.3,290.6,306.2,290.6z M306.2,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C308.2,294.2,307.3,294.5,306.2,294.5z M306.2,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C308.2,298.1,307.3,298.5,306.2,298.5z M306.2,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C308.2,302.1,307.3,302.5,306.2,302.5z M306.2,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C308.2,306.1,307.3,306.5,306.2,306.5z M306.2,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C308.2,310.1,307.3,310.4,306.2,310.4z M306.2,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C308.2,314,307.3,314.4,306.2,314.4z M314.1,254.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.7,252.7,314.1,253.7,314.1,254.8z M314.1,258.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.7,256.7,314.1,257.7,314.1,258.8z M314.1,262.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.7,260.7,314.1,261.6,314.1,262.7z M314.1,266.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.7,264.7,314.1,265.6,314.1,266.7z M314.1,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.7,268.6,314.1,269.6,314.1,270.7z M314.1,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.7,272.6,314.1,273.6,314.1,274.7z M314.1,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.7,276.6,314.1,277.5,314.1,278.6z M314.1,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.7,280.6,314.1,281.5,314.1,282.6z M314.1,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.7,284.5,314.1,285.5,314.1,286.6z M314.1,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.7,288.5,314.1,289.5,314.1,290.6z M314.1,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.7,292.5,314.1,293.5,314.1,294.5z M314.1,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.7,296.5,314.1,297.4,314.1,298.5z M314.1,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.7,300.5,314.1,301.4,314.1,302.5z M314.1,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.7,304.5,314.1,305.4,314.1,306.5z M314.1,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.7,308.4,314.1,309.4,314.1,310.4z M314.1,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C313.7,312.4,314.1,313.3,314.1,314.4z M314.1,254.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,254.4,315.2,254.8,314.1,254.8z M314.1,258.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,258.4,315.2,258.8,314.1,258.8z M314.1,262.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,262.3,315.2,262.7,314.1,262.7z M314.1,266.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,266.3,315.2,266.7,314.1,266.7z M314.1,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,270.3,315.2,270.7,314.1,270.7z M314.1,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,274.3,315.2,274.7,314.1,274.7z M314.1,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,278.2,315.2,278.6,314.1,278.6z M314.1,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,282.2,315.2,282.6,314.1,282.6z M314.1,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,286.2,315.2,286.6,314.1,286.6z M314.1,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,290.2,315.2,290.6,314.1,290.6z M314.1,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,294.2,315.2,294.5,314.1,294.5z M314.1,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,298.1,315.2,298.5,314.1,298.5z M314.1,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,302.1,315.2,302.5,314.1,302.5z M314.1,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,306.1,315.2,306.5,314.1,306.5z M314.1,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,310.1,315.2,310.4,314.1,310.4z M314.1,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C316.2,314,315.2,314.4,314.1,314.4z M322.1,254.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,252.7,322.1,253.7,322.1,254.8z M322.1,258.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,256.7,322.1,257.7,322.1,258.8z M322.1,262.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,260.7,322.1,261.6,322.1,262.7z M322.1,266.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,264.7,322.1,265.6,322.1,266.7z M322.1,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,300.5,322.1,301.4,322.1,302.5z M322.1,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,304.5,322.1,305.4,322.1,306.5z M322.1,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,308.4,322.1,309.4,322.1,310.4z M322.1,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C321.7,312.4,322.1,313.3,322.1,314.4z M322.1,254.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C324.1,254.4,323.2,254.8,322.1,254.8z M322.1,258.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C324.1,258.4,323.2,258.8,322.1,258.8z M322.1,262.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C324.1,262.3,323.2,262.7,322.1,262.7z M322.1,266.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C324.1,266.3,323.2,266.7,322.1,266.7z M322.1,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C324.1,302.1,323.2,302.5,322.1,302.5z M322.1,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C324.1,306.1,323.2,306.5,322.1,306.5z M322.1,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C324.1,310.1,323.2,310.4,322.1,310.4z M322.1,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C324.1,314,323.2,314.4,322.1,314.4z M330,254.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S330,253.7,330,254.8z M330,258.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S330,257.7,330,258.8z
						M330,262.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S330,261.6,330,262.7z M330,266.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S330,265.6,330,266.7z M330,302.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C329.7,300.5,330,301.4,330,302.5z M330,306.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C329.7,304.5,330,305.4,330,306.5z M330,310.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C329.7,308.4,330,309.4,330,310.4z M330,314.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C329.7,312.4,330,313.3,330,314.4z M330,254.8c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C332.1,254.4,331.1,254.8,330,254.8z M330,258.8c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S331.1,258.8,330,258.8z M330,262.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S331.1,262.7,330,262.7z M330,266.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S331.1,266.7,330,266.7z M330,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S331.1,270.7,330,270.7z
						M330,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S331.1,298.5,330,298.5z M330,302.5
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S331.1,302.5,330,302.5z M330,306.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S331.1,306.5,330,306.5z M330,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S331.1,310.4,330,310.4z M330,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S331.1,314.4,330,314.4z M338,254.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S338,253.7,338,254.8z
						M338,258.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S338,257.7,338,258.8z M338,262.7
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S338,261.6,338,262.7z M338,266.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S338,265.6,338,266.7z M338,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S338,269.6,338,270.7z M338,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S338,273.6,338,274.7z M338,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S338,277.5,338,278.6z
						M338,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S338,281.5,338,282.6z M338,286.6
						c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S338,285.5,338,286.6z M338,290.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S338,289.5,338,290.6z M338,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C337.6,292.5,338,293.5,338,294.5z M338,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C337.6,296.5,338,297.4,338,298.5z M338,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C337.6,300.5,338,301.4,338,302.5z M338,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C337.6,304.5,338,305.4,338,306.5z M338,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C337.6,308.4,338,309.4,338,310.4z M338,314.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C337.6,312.4,338,313.3,338,314.4z M338,258.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C340,258.4,339.1,258.8,338,258.8z M338,262.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C340,262.3,339.1,262.7,338,262.7z M338,266.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C340,266.3,339.1,266.7,338,266.7z M338,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C340,270.3,339.1,270.7,338,270.7z M338,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C340,274.3,339.1,274.7,338,274.7z M338,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C340,278.2,339.1,278.6,338,278.6z M338,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C340,282.2,339.1,282.6,338,282.6z M338,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C340,286.2,339.1,286.6,338,286.6z M338,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C340,290.2,339.1,290.6,338,290.6z M338,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C340,294.2,339.1,294.5,338,294.5z M338,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C340,298.1,339.1,298.5,338,298.5z M338,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C340,302.1,339.1,302.5,338,302.5z M338,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C340,306.1,339.1,306.5,338,306.5z M338,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C340,310.1,339.1,310.4,338,310.4z M346,262.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C345.6,260.7,346,261.6,346,262.7z M346,266.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C345.6,264.7,346,265.6,346,266.7z M346,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C345.6,268.6,346,269.6,346,270.7z M346,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C345.6,272.6,346,273.6,346,274.7z M346,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C345.6,276.6,346,277.5,346,278.6z M346,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C345.6,280.6,346,281.5,346,282.6z M346,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C345.6,284.5,346,285.5,346,286.6z M346,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C345.6,288.5,346,289.5,346,290.6z M346,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C345.6,292.5,346,293.5,346,294.5z M346,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C345.6,296.5,346,297.4,346,298.5z M346,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C345.6,300.5,346,301.4,346,302.5z M346,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C345.6,304.5,346,305.4,346,306.5z M346,266.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C348,266.3,347.1,266.7,346,266.7z M346,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C348,270.3,347.1,270.7,346,270.7z M346,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C348,274.3,347.1,274.7,346,274.7z M346,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C348,278.2,347.1,278.6,346,278.6z M346,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C348,282.2,347.1,282.6,346,282.6z M346,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C348,286.2,347.1,286.6,346,286.6z M346,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C348,290.2,347.1,290.6,346,290.6z M346,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C348,294.2,347.1,294.5,346,294.5z M346,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C348,298.1,347.1,298.5,346,298.5z M346,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C348,302.1,347.1,302.5,346,302.5z"/>
					<path class="st3" d="M357.9,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C357.5,276.6,357.9,277.5,357.9,278.6
						z M357.9,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C357.5,280.6,357.9,281.5,357.9,282.6z M357.9,294.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C357.5,292.5,357.9,293.5,357.9,294.5z M357.9,298.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C357.5,296.5,357.9,297.4,357.9,298.5z M357.9,302.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C357.5,300.5,357.9,301.4,357.9,302.5z M357.9,306.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C357.5,304.5,357.9,305.4,357.9,306.5z M357.9,274.7
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C359.9,274.3,359,274.7,357.9,274.7z M357.9,278.6c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C359.9,278.2,359,278.6,357.9,278.6z M357.9,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C359.9,282.2,359,282.6,357.9,282.6z M357.9,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C359.9,290.2,359,290.6,357.9,290.6z M357.9,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C359.9,294.2,359,294.5,357.9,294.5z M357.9,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C359.9,298.1,359,298.5,357.9,298.5z M357.9,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C359.9,302.1,359,302.5,357.9,302.5z M357.9,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C359.9,306.1,359,306.5,357.9,306.5z M357.9,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C359.9,310.1,359,310.4,357.9,310.4z M365.8,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C365.4,268.6,365.8,269.6,365.8,270.7z M365.8,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C365.4,272.6,365.8,273.6,365.8,274.7z M365.8,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C365.4,276.6,365.8,277.5,365.8,278.6z M365.8,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C365.4,288.5,365.8,289.5,365.8,290.6z M365.8,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C365.4,292.5,365.8,293.5,365.8,294.5z M365.8,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C365.4,296.5,365.8,297.4,365.8,298.5z M365.8,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C365.4,300.5,365.8,301.4,365.8,302.5z M365.8,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C365.4,304.5,365.8,305.4,365.8,306.5z M365.8,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C365.4,308.4,365.8,309.4,365.8,310.4z M365.8,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C365.4,312.4,365.8,313.3,365.8,314.4z M365.8,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C367.9,270.3,366.9,270.7,365.8,270.7z M365.8,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C367.9,274.3,366.9,274.7,365.8,274.7z M365.8,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C367.9,278.2,366.9,278.6,365.8,278.6z M365.8,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C367.9,286.2,366.9,286.6,365.8,286.6z M365.8,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C367.9,290.2,366.9,290.6,365.8,290.6z M365.8,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C367.9,294.2,366.9,294.5,365.8,294.5z M365.8,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C367.9,302.1,366.9,302.5,365.8,302.5z M365.8,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C367.9,306.1,366.9,306.5,365.8,306.5z M365.8,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C367.9,310.1,366.9,310.4,365.8,310.4z M365.8,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C367.9,314,366.9,314.4,365.8,314.4z M373.8,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C373.4,268.6,373.8,269.6,373.8,270.7z M373.8,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C373.4,272.6,373.8,273.6,373.8,274.7z M373.8,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C373.4,276.6,373.8,277.5,373.8,278.6z M373.8,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C373.4,284.5,373.8,285.5,373.8,286.6z M373.8,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C373.4,288.5,373.8,289.5,373.8,290.6z M373.8,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C373.4,304.5,373.8,305.4,373.8,306.5z M373.8,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C373.4,308.4,373.8,309.4,373.8,310.4z M373.8,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C373.4,312.4,373.8,313.3,373.8,314.4z M373.8,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,270.3,374.9,270.7,373.8,270.7z M373.8,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,274.3,374.9,274.7,373.8,274.7z M373.8,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,278.2,374.9,278.6,373.8,278.6z M373.8,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,286.2,374.9,286.6,373.8,286.6z M373.8,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,290.2,374.9,290.6,373.8,290.6z M373.8,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,306.1,374.9,306.5,373.8,306.5z M373.8,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,310.1,374.9,310.4,373.8,310.4z M373.8,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C375.8,314,374.9,314.4,373.8,314.4z M381.7,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S381.7,269.6,381.7,270.7z M381.7,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S381.7,273.6,381.7,274.7z M381.7,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S381.7,277.5,381.7,278.6z M381.7,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S381.7,281.5,381.7,282.6z M381.7,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S381.7,285.5,381.7,286.6z M381.7,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S381.7,289.5,381.7,290.6z M381.7,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C381.4,292.5,381.7,293.5,381.7,294.5z M381.7,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C381.4,300.5,381.7,301.4,381.7,302.5z M381.7,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C381.4,304.5,381.7,305.4,381.7,306.5z M381.7,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C381.4,308.4,381.7,309.4,381.7,310.4z M381.7,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S382.8,270.7,381.7,270.7z M381.7,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S382.8,274.7,381.7,274.7
						z M381.7,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S382.8,278.6,381.7,278.6z M381.7,282.6
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S382.8,282.6,381.7,282.6z M381.7,286.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S382.8,286.6,381.7,286.6z M381.7,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S382.8,290.6,381.7,290.6z M381.7,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S382.8,294.5,381.7,294.5z M381.7,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S382.8,298.5,381.7,298.5
						z M381.7,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S382.8,302.5,381.7,302.5z M381.7,306.5
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S382.8,306.5,381.7,306.5z M381.7,310.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S382.8,310.4,381.7,310.4z M381.7,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S382.8,314.4,381.7,314.4z M389.7,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S389.7,273.6,389.7,274.7z M389.7,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S389.7,277.5,389.7,278.6z M389.7,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S389.7,281.5,389.7,282.6z M389.7,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S389.7,285.5,389.7,286.6z M389.7,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S389.7,289.5,389.7,290.6z M389.7,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C389.3,292.5,389.7,293.5,389.7,294.5z M389.7,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C389.3,296.5,389.7,297.4,389.7,298.5z M389.7,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C389.3,300.5,389.7,301.4,389.7,302.5z M389.7,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C389.3,304.5,389.7,305.4,389.7,306.5z M389.7,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C389.3,308.4,389.7,309.4,389.7,310.4z M389.7,314.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C389.3,312.4,389.7,313.3,389.7,314.4z M389.7,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C391.7,278.2,390.8,278.6,389.7,278.6z M389.7,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C391.7,282.2,390.8,282.6,389.7,282.6z M389.7,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C391.7,286.2,390.8,286.6,389.7,286.6z M389.7,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C391.7,290.2,390.8,290.6,389.7,290.6z M389.7,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C391.7,294.2,390.8,294.5,389.7,294.5z M389.7,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C391.7,298.1,390.8,298.5,389.7,298.5z M389.7,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C391.7,302.1,390.8,302.5,389.7,302.5z M389.7,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C391.7,306.1,390.8,306.5,389.7,306.5z M389.7,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C391.7,310.1,390.8,310.4,389.7,310.4z M389.7,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C391.7,314,390.8,314.4,389.7,314.4z"/>
					<path class="st0" d="M401.6,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C401.2,268.6,401.6,269.6,401.6,270.7z M401.6,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C401.2,272.6,401.6,273.6,401.6,274.7z M401.6,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C401.2,276.6,401.6,277.5,401.6,278.6z M401.6,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C401.2,280.6,401.6,281.5,401.6,282.6z M401.6,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C401.2,284.5,401.6,285.5,401.6,286.6z M401.6,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C401.2,288.5,401.6,289.5,401.6,290.6z M401.6,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C401.2,292.5,401.6,293.5,401.6,294.5z M401.6,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C401.2,296.5,401.6,297.4,401.6,298.5z M401.6,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C401.2,300.5,401.6,301.4,401.6,302.5z M401.6,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C401.2,304.5,401.6,305.4,401.6,306.5z M401.6,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C401.2,308.4,401.6,309.4,401.6,310.4z M401.6,314.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C401.2,312.4,401.6,313.3,401.6,314.4z M401.6,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C403.6,270.3,402.7,270.7,401.6,270.7z M401.6,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C403.6,274.3,402.7,274.7,401.6,274.7z M401.6,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C403.6,278.2,402.7,278.6,401.6,278.6z M401.6,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C403.6,282.2,402.7,282.6,401.6,282.6z M401.6,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C403.6,286.2,402.7,286.6,401.6,286.6z M401.6,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C403.6,290.2,402.7,290.6,401.6,290.6z M401.6,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C403.6,294.2,402.7,294.5,401.6,294.5z M401.6,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C403.6,298.1,402.7,298.5,401.6,298.5z M401.6,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C403.6,302.1,402.7,302.5,401.6,302.5z M401.6,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C403.6,306.1,402.7,306.5,401.6,306.5z M401.6,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C403.6,310.1,402.7,310.4,401.6,310.4z M401.6,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C403.6,314,402.7,314.4,401.6,314.4z M409.6,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C409.2,272.6,409.6,273.6,409.6,274.7z M409.6,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C409.2,276.6,409.6,277.5,409.6,278.6z M409.6,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C409.2,280.6,409.6,281.5,409.6,282.6z M409.6,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C409.2,284.5,409.6,285.5,409.6,286.6z M409.6,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C409.2,288.5,409.6,289.5,409.6,290.6z M409.6,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C409.2,292.5,409.6,293.5,409.6,294.5z M409.6,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C409.2,296.5,409.6,297.4,409.6,298.5z M409.6,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C409.2,300.5,409.6,301.4,409.6,302.5z M409.6,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C409.2,304.5,409.6,305.4,409.6,306.5z M409.6,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C409.2,308.4,409.6,309.4,409.6,310.4z M409.6,314.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C409.2,312.4,409.6,313.3,409.6,314.4z M409.6,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C411.6,270.3,410.7,270.7,409.6,270.7z M409.6,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C411.6,274.3,410.7,274.7,409.6,274.7z M409.6,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C411.6,278.2,410.7,278.6,409.6,278.6z M409.6,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C411.6,282.2,410.7,282.6,409.6,282.6z M409.6,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C411.6,286.2,410.7,286.6,409.6,286.6z M409.6,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C411.6,290.2,410.7,290.6,409.6,290.6z M409.6,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C411.6,294.2,410.7,294.5,409.6,294.5z M409.6,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C411.6,298.1,410.7,298.5,409.6,298.5z M409.6,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C411.6,302.1,410.7,302.5,409.6,302.5z M409.6,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C411.6,306.1,410.7,306.5,409.6,306.5z M409.6,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C411.6,310.1,410.7,310.4,409.6,310.4z M409.6,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C411.6,314,410.7,314.4,409.6,314.4z M417.5,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C417.1,268.6,417.5,269.6,417.5,270.7z M417.5,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C417.1,272.6,417.5,273.6,417.5,274.7z M417.5,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C417.1,276.6,417.5,277.5,417.5,278.6z M417.5,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C417.1,280.6,417.5,281.5,417.5,282.6z M417.5,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C419.6,270.3,418.6,270.7,417.5,270.7z M417.5,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C419.6,274.3,418.6,274.7,417.5,274.7z M417.5,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C419.6,278.2,418.6,278.6,417.5,278.6z M425.5,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C425.1,268.6,425.5,269.6,425.5,270.7z M425.5,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C425.1,272.6,425.5,273.6,425.5,274.7z M425.5,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C425.1,276.6,425.5,277.5,425.5,278.6z M425.5,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C425.1,280.6,425.5,281.5,425.5,282.6z M425.5,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C427.5,270.3,426.6,270.7,425.5,270.7z M425.5,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C427.5,274.3,426.6,274.7,425.5,274.7z M425.5,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C427.5,278.2,426.6,278.6,425.5,278.6z M425.5,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C427.5,282.2,426.6,282.6,425.5,282.6z M425.5,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C427.5,286.2,426.6,286.6,425.5,286.6z M425.5,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C427.5,290.2,426.6,290.6,425.5,290.6z M425.5,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C427.5,294.2,426.6,294.5,425.5,294.5z M425.5,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C427.5,298.1,426.6,298.5,425.5,298.5z M425.5,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C427.5,302.1,426.6,302.5,425.5,302.5z M425.5,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C427.5,306.1,426.6,306.5,425.5,306.5z M425.5,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C427.5,310.1,426.6,310.4,425.5,310.4z M425.5,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C427.5,314,426.6,314.4,425.5,314.4z M433.4,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C433,272.6,433.4,273.6,433.4,274.7z M433.4,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C433,276.6,433.4,277.5,433.4,278.6z M433.4,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C433,280.6,433.4,281.5,433.4,282.6z M433.4,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C433,284.5,433.4,285.5,433.4,286.6z M433.4,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C433,288.5,433.4,289.5,433.4,290.6z M433.4,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C433,292.5,433.4,293.5,433.4,294.5z M433.4,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C433,296.5,433.4,297.4,433.4,298.5z M433.4,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C433,300.5,433.4,301.4,433.4,302.5z M433.4,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C433,304.5,433.4,305.4,433.4,306.5z M433.4,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C433,308.4,433.4,309.4,433.4,310.4z M433.4,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C433,312.4,433.4,313.3,433.4,314.4z M433.4,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S434.5,278.6,433.4,278.6z M433.4,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S434.5,282.6,433.4,282.6z
						M433.4,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S434.5,286.6,433.4,286.6z M433.4,290.6
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S434.5,290.6,433.4,290.6z M433.4,294.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S434.5,294.5,433.4,294.5z M433.4,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S434.5,298.5,433.4,298.5z M433.4,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S434.5,302.5,433.4,302.5z M433.4,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S434.5,306.5,433.4,306.5
						z M433.4,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S434.5,310.4,433.4,310.4z M433.4,314.4
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S434.5,314.4,433.4,314.4z M441.4,282.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S441.4,281.5,441.4,282.6z M441.4,286.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S441.4,285.5,441.4,286.6z M441.4,290.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S441.4,289.5,441.4,290.6z M441.4,294.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C441,292.5,441.4,293.5,441.4,294.5z M441.4,298.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C441,296.5,441.4,297.4,441.4,298.5z M441.4,302.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C441,300.5,441.4,301.4,441.4,302.5z M441.4,306.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C441,304.5,441.4,305.4,441.4,306.5z M441.4,310.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C441,308.4,441.4,309.4,441.4,310.4z M441.4,314.4c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C441,312.4,441.4,313.3,441.4,314.4z"/>
					<path class="st1" d="M449.3,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C448.9,280.6,449.3,281.5,449.3,282.6z M449.3,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C448.9,284.5,449.3,285.5,449.3,286.6z M449.3,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C448.9,288.5,449.3,289.5,449.3,290.6z M449.3,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C448.9,292.5,449.3,293.5,449.3,294.5z M449.3,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C448.9,296.5,449.3,297.4,449.3,298.5z M449.3,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C448.9,300.5,449.3,301.4,449.3,302.5z M449.3,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C451.4,278.2,450.4,278.6,449.3,278.6z M449.3,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C451.4,282.2,450.4,282.6,449.3,282.6z M449.3,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C451.4,286.2,450.4,286.6,449.3,286.6z M449.3,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C451.4,290.2,450.4,290.6,449.3,290.6z M449.3,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C451.4,294.2,450.4,294.5,449.3,294.5z M449.3,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C451.4,298.1,450.4,298.5,449.3,298.5z M449.3,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C451.4,302.1,450.4,302.5,449.3,302.5z M449.3,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C451.4,306.1,450.4,306.5,449.3,306.5z M457.3,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,272.6,457.3,273.6,457.3,274.7z M457.3,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,276.6,457.3,277.5,457.3,278.6z M457.3,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,280.6,457.3,281.5,457.3,282.6z M457.3,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,284.5,457.3,285.5,457.3,286.6z M457.3,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,288.5,457.3,289.5,457.3,290.6z M457.3,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,292.5,457.3,293.5,457.3,294.5z M457.3,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,296.5,457.3,297.4,457.3,298.5z M457.3,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,300.5,457.3,301.4,457.3,302.5z M457.3,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,304.5,457.3,305.4,457.3,306.5z M457.3,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C456.9,308.4,457.3,309.4,457.3,310.4z M457.3,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,270.3,458.4,270.7,457.3,270.7z M457.3,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,274.3,458.4,274.7,457.3,274.7z M457.3,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,278.2,458.4,278.6,457.3,278.6z M457.3,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,282.2,458.4,282.6,457.3,282.6z M457.3,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,286.2,458.4,286.6,457.3,286.6z M457.3,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,298.1,458.4,298.5,457.3,298.5z M457.3,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,302.1,458.4,302.5,457.3,302.5z M457.3,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,306.1,458.4,306.5,457.3,306.5z M457.3,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,310.1,458.4,310.4,457.3,310.4z M457.3,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C459.3,314,458.4,314.4,457.3,314.4z M465.2,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,268.6,465.2,269.6,465.2,270.7z M465.2,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,272.6,465.2,273.6,465.2,274.7z M465.2,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,276.6,465.2,277.5,465.2,278.6z M465.2,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,280.6,465.2,281.5,465.2,282.6z M465.2,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,300.5,465.2,301.4,465.2,302.5z M465.2,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,304.5,465.2,305.4,465.2,306.5z M465.2,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,308.4,465.2,309.4,465.2,310.4z M465.2,314.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C464.9,312.4,465.2,313.3,465.2,314.4z M465.2,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,270.3,466.3,270.7,465.2,270.7z M465.2,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,274.3,466.3,274.7,465.2,274.7z M465.2,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,278.2,466.3,278.6,465.2,278.6z M465.2,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,306.1,466.3,306.5,465.2,306.5z M465.2,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,310.1,466.3,310.4,465.2,310.4z M465.2,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C467.3,314,466.3,314.4,465.2,314.4z M473.2,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C472.8,268.6,473.2,269.6,473.2,270.7z M473.2,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C472.8,272.6,473.2,273.6,473.2,274.7z M473.2,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C472.8,276.6,473.2,277.5,473.2,278.6z M473.2,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C472.8,280.6,473.2,281.5,473.2,282.6z M473.2,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C472.8,300.5,473.2,301.4,473.2,302.5z M473.2,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C472.8,304.5,473.2,305.4,473.2,306.5z M473.2,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C472.8,308.4,473.2,309.4,473.2,310.4z M473.2,314.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C472.8,312.4,473.2,313.3,473.2,314.4z M473.2,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C475.2,270.3,474.3,270.7,473.2,270.7z M473.2,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C475.2,274.3,474.3,274.7,473.2,274.7z M473.2,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C475.2,278.2,474.3,278.6,473.2,278.6z M473.2,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C475.2,282.2,474.3,282.6,473.2,282.6z M473.2,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C475.2,302.1,474.3,302.5,473.2,302.5z M473.2,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C475.2,306.1,474.3,306.5,473.2,306.5z M473.2,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C475.2,310.1,474.3,310.4,473.2,310.4z M473.2,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C475.2,314,474.3,314.4,473.2,314.4z M481.2,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C480.8,272.6,481.2,273.6,481.2,274.7z M481.2,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C480.8,276.6,481.2,277.5,481.2,278.6z M481.2,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C480.8,280.6,481.2,281.5,481.2,282.6z M481.2,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C480.8,300.5,481.2,301.4,481.2,302.5z M481.2,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C480.8,304.5,481.2,305.4,481.2,306.5z M481.2,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C480.8,308.4,481.2,309.4,481.2,310.4z M481.2,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S482.3,278.6,481.2,278.6z M481.2,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S482.3,282.6,481.2,282.6z
						M481.2,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S482.3,302.5,481.2,302.5z M481.2,306.5
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S482.3,306.5,481.2,306.5z"/>
					<path class="st0" d="M493.1,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C492.7,280.6,493.1,281.5,493.1,282.6
						z M493.1,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C492.7,284.5,493.1,285.5,493.1,286.6z M493.1,290.6
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C492.7,288.5,493.1,289.5,493.1,290.6z M493.1,294.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C492.7,292.5,493.1,293.5,493.1,294.5z M493.1,298.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C492.7,296.5,493.1,297.4,493.1,298.5z M493.1,302.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C492.7,300.5,493.1,301.4,493.1,302.5z M493.1,278.6
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C495.1,278.2,494.2,278.6,493.1,278.6z M493.1,282.6c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C495.1,282.2,494.2,282.6,493.1,282.6z M493.1,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C495.1,286.2,494.2,286.6,493.1,286.6z M493.1,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C495.1,290.2,494.2,290.6,493.1,290.6z M493.1,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C495.1,294.2,494.2,294.5,493.1,294.5z M493.1,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C495.1,298.1,494.2,298.5,493.1,298.5z M493.1,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C495.1,302.1,494.2,302.5,493.1,302.5z M493.1,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C495.1,306.1,494.2,306.5,493.1,306.5z M501,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C500.6,272.6,501,273.6,501,274.7z M501,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C500.6,276.6,501,277.5,501,278.6z M501,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C500.6,280.6,501,281.5,501,282.6z M501,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C500.6,284.5,501,285.5,501,286.6z M501,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C500.6,288.5,501,289.5,501,290.6z M501,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C500.6,292.5,501,293.5,501,294.5z M501,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C500.6,296.5,501,297.4,501,298.5z M501,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C500.6,300.5,501,301.4,501,302.5z M501,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C500.6,304.5,501,305.4,501,306.5z M501,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C500.6,308.4,501,309.4,501,310.4z M501,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C503.1,270.3,502.1,270.7,501,270.7z M501,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C503.1,274.3,502.1,274.7,501,274.7z M501,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C503.1,278.2,502.1,278.6,501,278.6z M501,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C503.1,282.2,502.1,282.6,501,282.6z M501,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C503.1,286.2,502.1,286.6,501,286.6z M501,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C503.1,290.2,502.1,290.6,501,290.6z M501,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C503.1,294.2,502.1,294.5,501,294.5z M501,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C503.1,298.1,502.1,298.5,501,298.5z M501,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C503.1,302.1,502.1,302.5,501,302.5z M501,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C503.1,306.1,502.1,306.5,501,306.5z M501,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C503.1,310.1,502.1,310.4,501,310.4z M501,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C503.1,314,502.1,314.4,501,314.4z M509,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C508.6,268.6,509,269.6,509,270.7z M509,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C508.6,272.6,509,273.6,509,274.7z M509,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C508.6,276.6,509,277.5,509,278.6z M509,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C508.6,280.6,509,281.5,509,282.6z M509,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C508.6,288.5,509,289.5,509,290.6z M509,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C508.6,292.5,509,293.5,509,294.5z M509,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C508.6,300.5,509,301.4,509,302.5z M509,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C508.6,304.5,509,305.4,509,306.5z M509,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C508.6,308.4,509,309.4,509,310.4z M509,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C508.6,312.4,509,313.3,509,314.4z M509,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C511,270.3,510.1,270.7,509,270.7z M509,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C511,274.3,510.1,274.7,509,274.7z M509,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C511,278.2,510.1,278.6,509,278.6z M509,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C511,290.2,510.1,290.6,509,290.6z M509,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C511,294.2,510.1,294.5,509,294.5z M509,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C511,306.1,510.1,306.5,509,306.5z M509,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C511,310.1,510.1,310.4,509,310.4z M509,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C511,314,510.1,314.4,509,314.4z M516.9,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S516.9,269.6,516.9,270.7z M516.9,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S516.9,273.6,516.9,274.7z M516.9,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S516.9,277.5,516.9,278.6z M516.9,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S516.9,281.5,516.9,282.6z M516.9,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S516.9,289.5,516.9,290.6z M516.9,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C516.6,292.5,516.9,293.5,516.9,294.5z M516.9,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C516.6,300.5,516.9,301.4,516.9,302.5z M516.9,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C516.6,304.5,516.9,305.4,516.9,306.5z M516.9,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C516.6,308.4,516.9,309.4,516.9,310.4z M516.9,314.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C516.6,312.4,516.9,313.3,516.9,314.4z M516.9,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S518,270.7,516.9,270.7z M516.9,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S518,274.7,516.9,274.7z
						M516.9,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S518,278.6,516.9,278.6z M516.9,282.6
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S518,282.6,516.9,282.6z M516.9,286.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S518,286.6,516.9,286.6z M516.9,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S518,290.6,516.9,290.6z M516.9,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S518,294.5,516.9,294.5z M516.9,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S518,302.5,516.9,302.5z
						M516.9,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S518,306.5,516.9,306.5z M516.9,310.4
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S518,310.4,516.9,310.4z M516.9,314.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S518,314.4,516.9,314.4z M524.9,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2S524.9,273.6,524.9,274.7z M524.9,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S524.9,277.5,524.9,278.6z M524.9,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S524.9,281.5,524.9,282.6z M524.9,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S524.9,285.5,524.9,286.6z M524.9,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S524.9,289.5,524.9,290.6z M524.9,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C524.5,292.5,524.9,293.5,524.9,294.5z M524.9,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C524.5,300.5,524.9,301.4,524.9,302.5z M524.9,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C524.5,304.5,524.9,305.4,524.9,306.5z M524.9,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C524.5,308.4,524.9,309.4,524.9,310.4z M524.9,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C526.9,278.2,526,278.6,524.9,278.6z M524.9,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C526.9,282.2,526,282.6,524.9,282.6z M524.9,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C526.9,286.2,526,286.6,524.9,286.6z M524.9,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C526.9,290.2,526,290.6,524.9,290.6z M524.9,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C526.9,294.2,526,294.5,524.9,294.5z M524.9,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C526.9,302.1,526,302.5,524.9,302.5z M524.9,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C526.9,306.1,526,306.5,524.9,306.5z M532.8,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C532.5,280.6,532.8,281.5,532.8,282.6z M532.8,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C532.5,284.5,532.8,285.5,532.8,286.6z M532.8,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C532.5,288.5,532.8,289.5,532.8,290.6z M532.8,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C532.5,292.5,532.8,293.5,532.8,294.5z M532.8,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C532.5,300.5,532.8,301.4,532.8,302.5z"/>
				</g>

				<g id='g8' >
					<path class="st0" d="M560.7,254.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C560.3,252.7,560.7,253.7,560.7,254.8z M560.7,258.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C560.3,256.7,560.7,257.7,560.7,258.8z M560.7,262.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C560.3,260.7,560.7,261.6,560.7,262.7z M560.7,266.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C560.3,264.7,560.7,265.6,560.7,266.7z M560.7,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C560.3,268.6,560.7,269.6,560.7,270.7z M560.7,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C560.3,272.6,560.7,273.6,560.7,274.7z M560.7,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C560.3,276.6,560.7,277.5,560.7,278.6z M560.7,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C560.3,280.6,560.7,281.5,560.7,282.6z M560.7,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C560.3,284.5,560.7,285.5,560.7,286.6z M560.7,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C560.3,288.5,560.7,289.5,560.7,290.6z M560.7,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C560.3,292.5,560.7,293.5,560.7,294.5z M560.7,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C560.3,296.5,560.7,297.4,560.7,298.5z M560.7,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C560.3,300.5,560.7,301.4,560.7,302.5z M560.7,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C560.3,304.5,560.7,305.4,560.7,306.5z M560.7,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C560.3,308.4,560.7,309.4,560.7,310.4z M560.7,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C560.3,312.4,560.7,313.3,560.7,314.4z M560.7,254.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C562.7,254.4,561.7,254.8,560.7,254.8z M560.7,258.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C562.7,258.4,561.7,258.8,560.7,258.8z M560.7,262.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C562.7,262.3,561.7,262.7,560.7,262.7z M560.7,266.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C562.7,266.3,561.7,266.7,560.7,266.7z M560.7,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C562.7,270.3,561.7,270.7,560.7,270.7z M560.7,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C562.7,274.3,561.7,274.7,560.7,274.7z M560.7,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C562.7,278.2,561.7,278.6,560.7,278.6z M560.7,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C562.7,282.2,561.7,282.6,560.7,282.6z M560.7,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C562.7,286.2,561.7,286.6,560.7,286.6z M560.7,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C562.7,290.2,561.7,290.6,560.7,290.6z M560.7,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C562.7,294.2,561.7,294.5,560.7,294.5z M560.7,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C562.7,298.1,561.7,298.5,560.7,298.5z M560.7,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C562.7,302.1,561.7,302.5,560.7,302.5z M560.7,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C562.7,306.1,561.7,306.5,560.7,306.5z M560.7,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C562.7,310.1,561.7,310.4,560.7,310.4z M560.7,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C562.7,314,561.7,314.4,560.7,314.4z M568.6,254.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C568.2,252.7,568.6,253.7,568.6,254.8z M568.6,258.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C568.2,256.7,568.6,257.7,568.6,258.8z M568.6,262.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C568.2,260.7,568.6,261.6,568.6,262.7z M568.6,266.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C568.2,264.7,568.6,265.6,568.6,266.7z M568.6,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C568.2,268.6,568.6,269.6,568.6,270.7z M568.6,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C568.2,272.6,568.6,273.6,568.6,274.7z M568.6,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C568.2,276.6,568.6,277.5,568.6,278.6z M568.6,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C568.2,280.6,568.6,281.5,568.6,282.6z M568.6,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C568.2,284.5,568.6,285.5,568.6,286.6z M568.6,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C568.2,288.5,568.6,289.5,568.6,290.6z M568.6,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C568.2,292.5,568.6,293.5,568.6,294.5z M568.6,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C568.2,296.5,568.6,297.4,568.6,298.5z M568.6,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C568.2,300.5,568.6,301.4,568.6,302.5z M568.6,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C568.2,304.5,568.6,305.4,568.6,306.5z M568.6,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C568.2,308.4,568.6,309.4,568.6,310.4z M568.6,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C568.2,312.4,568.6,313.3,568.6,314.4z M568.6,254.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C570.6,254.4,569.7,254.8,568.6,254.8z M568.6,258.8c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C570.6,258.4,569.7,258.8,568.6,258.8z M568.6,262.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C570.6,262.3,569.7,262.7,568.6,262.7z M568.6,266.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C570.6,266.3,569.7,266.7,568.6,266.7z M568.6,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C570.6,270.3,569.7,270.7,568.6,270.7z M568.6,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C570.6,274.3,569.7,274.7,568.6,274.7z M568.6,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C570.6,278.2,569.7,278.6,568.6,278.6z M568.6,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C570.6,282.2,569.7,282.6,568.6,282.6z M568.6,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C570.6,286.2,569.7,286.6,568.6,286.6z M568.6,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C570.6,290.2,569.7,290.6,568.6,290.6z M568.6,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C570.6,294.2,569.7,294.5,568.6,294.5z M568.6,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C570.6,298.1,569.7,298.5,568.6,298.5z M568.6,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C570.6,302.1,569.7,302.5,568.6,302.5z M568.6,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C570.6,306.1,569.7,306.5,568.6,306.5z M568.6,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C570.6,310.1,569.7,310.4,568.6,310.4z M568.6,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C570.6,314,569.7,314.4,568.6,314.4z M576.6,254.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C576.2,252.7,576.6,253.7,576.6,254.8z M576.6,258.8c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C576.2,256.7,576.6,257.7,576.6,258.8z M576.6,262.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C576.2,260.7,576.6,261.6,576.6,262.7z M576.6,266.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C576.2,264.7,576.6,265.6,576.6,266.7z M576.6,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C576.2,284.5,576.6,285.5,576.6,286.6z M576.6,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C576.2,288.5,576.6,289.5,576.6,290.6z M576.6,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C576.2,292.5,576.6,293.5,576.6,294.5z M576.6,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C576.2,296.5,576.6,297.4,576.6,298.5z M576.6,254.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C578.6,254.4,577.7,254.8,576.6,254.8z M576.6,258.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C578.6,258.4,577.7,258.8,576.6,258.8z M576.6,262.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C578.6,262.3,577.7,262.7,576.6,262.7z M576.6,266.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C578.6,266.3,577.7,266.7,576.6,266.7z M576.6,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C578.6,286.2,577.7,286.6,576.6,286.6z M576.6,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C578.6,290.2,577.7,290.6,576.6,290.6z M576.6,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C578.6,294.2,577.7,294.5,576.6,294.5z M576.6,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C578.6,298.1,577.7,298.5,576.6,298.5z M584.5,254.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S584.5,253.7,584.5,254.8z M584.5,258.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S584.5,257.7,584.5,258.8z M584.5,262.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S584.5,261.6,584.5,262.7z M584.5,266.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S584.5,265.6,584.5,266.7z M584.5,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S584.5,269.6,584.5,270.7z M584.5,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S584.5,281.5,584.5,282.6z M584.5,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S584.5,285.5,584.5,286.6z M584.5,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S584.5,289.5,584.5,290.6z M584.5,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C584.1,292.5,584.5,293.5,584.5,294.5z M584.5,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C584.1,296.5,584.5,297.4,584.5,298.5z M584.5,254.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C586.6,254.4,585.6,254.8,584.5,254.8z M584.5,258.8c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S585.6,258.8,584.5,258.8z M584.5,262.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S585.6,262.7,584.5,262.7
						z M584.5,266.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S585.6,266.7,584.5,266.7z M584.5,270.7
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S585.6,270.7,584.5,270.7z M584.5,274.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S585.6,274.7,584.5,274.7z M584.5,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S585.6,278.6,584.5,278.6z M584.5,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S585.6,282.6,584.5,282.6z M584.5,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S585.6,286.6,584.5,286.6
						z M584.5,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S585.6,290.6,584.5,290.6z M584.5,294.5
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S585.6,294.5,584.5,294.5z M584.5,298.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S585.6,298.5,584.5,298.5z M592.5,258.8c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S592.5,257.7,592.5,258.8z M592.5,262.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S592.5,261.6,592.5,262.7z M592.5,266.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S592.5,265.6,592.5,266.7z M592.5,270.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S592.5,269.6,592.5,270.7z M592.5,274.7c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S592.5,273.6,592.5,274.7z M592.5,278.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S592.5,277.5,592.5,278.6z M592.5,282.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S592.5,281.5,592.5,282.6z M592.5,286.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S592.5,285.5,592.5,286.6z M592.5,290.6c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S592.5,289.5,592.5,290.6z M592.5,294.5c-1.1,0-2-0.4-2.8-1.2
						c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C592.1,292.5,592.5,293.5,592.5,294.5z M592.5,262.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C594.5,262.3,593.6,262.7,592.5,262.7z M592.5,266.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C594.5,266.3,593.6,266.7,592.5,266.7z M592.5,270.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C594.5,270.3,593.6,270.7,592.5,270.7z M592.5,274.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C594.5,274.3,593.6,274.7,592.5,274.7z M592.5,278.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C594.5,278.2,593.6,278.6,592.5,278.6z M592.5,282.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C594.5,282.2,593.6,282.6,592.5,282.6z M592.5,286.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C594.5,286.2,593.6,286.6,592.5,286.6z M592.5,290.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C594.5,290.2,593.6,290.6,592.5,290.6z M600.4,266.7c-1.1,0-2-0.4-2.8-1.2
						s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C600,264.7,600.4,265.6,600.4,266.7z M600.4,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8
						c1.1,0,2,0.4,2.8,1.2C600,268.6,600.4,269.6,600.4,270.7z M600.4,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C600,272.6,600.4,273.6,600.4,274.7z M600.4,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C600,276.6,600.4,277.5,600.4,278.6z M600.4,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C600,280.6,600.4,281.5,600.4,282.6z M600.4,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C600,284.5,600.4,285.5,600.4,286.6z"/>
					<path class="st0" d="M608.4,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C608,276.6,608.4,277.5,608.4,278.6z
						M608.4,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C608,280.6,608.4,281.5,608.4,282.6z M608.4,294.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C608,292.5,608.4,293.5,608.4,294.5z M608.4,298.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C608,296.5,608.4,297.4,608.4,298.5z M608.4,302.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C608,300.5,608.4,301.4,608.4,302.5z M608.4,306.5
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C608,304.5,608.4,305.4,608.4,306.5z M608.4,274.7c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C610.4,274.3,609.5,274.7,608.4,274.7z M608.4,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C610.4,278.2,609.5,278.6,608.4,278.6z M608.4,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C610.4,282.2,609.5,282.6,608.4,282.6z M608.4,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C610.4,290.2,609.5,290.6,608.4,290.6z M608.4,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C610.4,294.2,609.5,294.5,608.4,294.5z M608.4,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C610.4,298.1,609.5,298.5,608.4,298.5z M608.4,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C610.4,302.1,609.5,302.5,608.4,302.5z M608.4,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C610.4,306.1,609.5,306.5,608.4,306.5z M608.4,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C610.4,310.1,609.5,310.4,608.4,310.4z M616.3,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C615.9,268.6,616.3,269.6,616.3,270.7z M616.3,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C615.9,272.6,616.3,273.6,616.3,274.7z M616.3,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C615.9,276.6,616.3,277.5,616.3,278.6z M616.3,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C615.9,288.5,616.3,289.5,616.3,290.6z M616.3,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C615.9,292.5,616.3,293.5,616.3,294.5z M616.3,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C615.9,296.5,616.3,297.4,616.3,298.5z M616.3,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C615.9,300.5,616.3,301.4,616.3,302.5z M616.3,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C615.9,304.5,616.3,305.4,616.3,306.5z M616.3,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C615.9,308.4,616.3,309.4,616.3,310.4z M616.3,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C615.9,312.4,616.3,313.3,616.3,314.4z M616.3,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C618.4,270.3,617.4,270.7,616.3,270.7z M616.3,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C618.4,274.3,617.4,274.7,616.3,274.7z M616.3,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C618.4,278.2,617.4,278.6,616.3,278.6z M616.3,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C618.4,286.2,617.4,286.6,616.3,286.6z M616.3,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C618.4,290.2,617.4,290.6,616.3,290.6z M616.3,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C618.4,294.2,617.4,294.5,616.3,294.5z M616.3,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C618.4,302.1,617.4,302.5,616.3,302.5z M616.3,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C618.4,306.1,617.4,306.5,616.3,306.5z M616.3,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C618.4,310.1,617.4,310.4,616.3,310.4z M616.3,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C618.4,314,617.4,314.4,616.3,314.4z M624.3,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C623.9,268.6,624.3,269.6,624.3,270.7z M624.3,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C623.9,272.6,624.3,273.6,624.3,274.7z M624.3,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C623.9,276.6,624.3,277.5,624.3,278.6z M624.3,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C623.9,284.5,624.3,285.5,624.3,286.6z M624.3,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C623.9,288.5,624.3,289.5,624.3,290.6z M624.3,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C623.9,304.5,624.3,305.4,624.3,306.5z M624.3,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C623.9,308.4,624.3,309.4,624.3,310.4z M624.3,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C623.9,312.4,624.3,313.3,624.3,314.4z M624.3,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C626.3,270.3,625.4,270.7,624.3,270.7z M624.3,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C626.3,274.3,625.4,274.7,624.3,274.7z M624.3,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C626.3,278.2,625.4,278.6,624.3,278.6z M624.3,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C626.3,286.2,625.4,286.6,624.3,286.6z M624.3,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C626.3,290.2,625.4,290.6,624.3,290.6z M624.3,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C626.3,306.1,625.4,306.5,624.3,306.5z M624.3,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C626.3,310.1,625.4,310.4,624.3,310.4z M624.3,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C626.3,314,625.4,314.4,624.3,314.4z M632.2,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S632.2,269.6,632.2,270.7z M632.2,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S632.2,273.6,632.2,274.7z M632.2,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S632.2,277.5,632.2,278.6z M632.2,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S632.2,281.5,632.2,282.6z M632.2,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S632.2,285.5,632.2,286.6z M632.2,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S632.2,289.5,632.2,290.6z M632.2,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C631.8,292.5,632.2,293.5,632.2,294.5z M632.2,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C631.8,300.5,632.2,301.4,632.2,302.5z M632.2,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C631.8,304.5,632.2,305.4,632.2,306.5z M632.2,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C631.8,308.4,632.2,309.4,632.2,310.4z M632.2,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S633.3,270.7,632.2,270.7z M632.2,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S633.3,274.7,632.2,274.7
						z M632.2,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S633.3,278.6,632.2,278.6z M632.2,282.6
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S633.3,282.6,632.2,282.6z M632.2,286.6c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S633.3,286.6,632.2,286.6z M632.2,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S633.3,290.6,632.2,290.6z M632.2,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S633.3,294.5,632.2,294.5z M632.2,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S633.3,298.5,632.2,298.5
						z M632.2,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S633.3,302.5,632.2,302.5z M632.2,306.5
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S633.3,306.5,632.2,306.5z M632.2,310.4c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S633.3,310.4,632.2,310.4z M632.2,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S633.3,314.4,632.2,314.4z M640.2,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S640.2,273.6,640.2,274.7z M640.2,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S640.2,277.5,640.2,278.6z M640.2,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S640.2,281.5,640.2,282.6z M640.2,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S640.2,285.5,640.2,286.6z M640.2,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S640.2,289.5,640.2,290.6z M640.2,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C639.8,292.5,640.2,293.5,640.2,294.5z M640.2,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C639.8,296.5,640.2,297.4,640.2,298.5z M640.2,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C639.8,300.5,640.2,301.4,640.2,302.5z M640.2,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C639.8,304.5,640.2,305.4,640.2,306.5z M640.2,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C639.8,308.4,640.2,309.4,640.2,310.4z M640.2,314.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C639.8,312.4,640.2,313.3,640.2,314.4z M640.2,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C642.2,278.2,641.3,278.6,640.2,278.6z M640.2,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C642.2,282.2,641.3,282.6,640.2,282.6z M640.2,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C642.2,286.2,641.3,286.6,640.2,286.6z M640.2,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C642.2,290.2,641.3,290.6,640.2,290.6z M640.2,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C642.2,294.2,641.3,294.5,640.2,294.5z M640.2,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C642.2,298.1,641.3,298.5,640.2,298.5z M640.2,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C642.2,302.1,641.3,302.5,640.2,302.5z M640.2,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C642.2,306.1,641.3,306.5,640.2,306.5z M640.2,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C642.2,310.1,641.3,310.4,640.2,310.4z M640.2,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C642.2,314,641.3,314.4,640.2,314.4z"/>
					<path class="st1" d="M652.1,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C651.7,268.6,652.1,269.6,652.1,270.7z M652.1,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C651.7,272.6,652.1,273.6,652.1,274.7z M652.1,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C651.7,276.6,652.1,277.5,652.1,278.6z M652.1,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C651.7,280.6,652.1,281.5,652.1,282.6z M652.1,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C651.7,284.5,652.1,285.5,652.1,286.6z M652.1,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C651.7,288.5,652.1,289.5,652.1,290.6z M652.1,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C651.7,292.5,652.1,293.5,652.1,294.5z M652.1,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C651.7,296.5,652.1,297.4,652.1,298.5z M652.1,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C651.7,300.5,652.1,301.4,652.1,302.5z M652.1,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C651.7,304.5,652.1,305.4,652.1,306.5z M652.1,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C651.7,308.4,652.1,309.4,652.1,310.4z M652.1,314.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C651.7,312.4,652.1,313.3,652.1,314.4z M652.1,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C654.1,270.3,653.2,270.7,652.1,270.7z M652.1,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C654.1,274.3,653.2,274.7,652.1,274.7z M652.1,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C654.1,278.2,653.2,278.6,652.1,278.6z M652.1,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C654.1,282.2,653.2,282.6,652.1,282.6z M652.1,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C654.1,286.2,653.2,286.6,652.1,286.6z M652.1,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C654.1,290.2,653.2,290.6,652.1,290.6z M652.1,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C654.1,294.2,653.2,294.5,652.1,294.5z M652.1,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C654.1,298.1,653.2,298.5,652.1,298.5z M652.1,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C654.1,302.1,653.2,302.5,652.1,302.5z M652.1,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C654.1,306.1,653.2,306.5,652.1,306.5z M652.1,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C654.1,310.1,653.2,310.4,652.1,310.4z M652.1,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C654.1,314,653.2,314.4,652.1,314.4z M660.1,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C659.7,272.6,660.1,273.6,660.1,274.7z M660.1,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C659.7,276.6,660.1,277.5,660.1,278.6z M660.1,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C659.7,280.6,660.1,281.5,660.1,282.6z M660.1,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C659.7,284.5,660.1,285.5,660.1,286.6z M660.1,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C659.7,288.5,660.1,289.5,660.1,290.6z M660.1,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C659.7,292.5,660.1,293.5,660.1,294.5z M660.1,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C659.7,296.5,660.1,297.4,660.1,298.5z M660.1,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C659.7,300.5,660.1,301.4,660.1,302.5z M660.1,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C659.7,304.5,660.1,305.4,660.1,306.5z M660.1,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C659.7,308.4,660.1,309.4,660.1,310.4z M660.1,314.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C659.7,312.4,660.1,313.3,660.1,314.4z M660.1,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C662.1,270.3,661.2,270.7,660.1,270.7z M660.1,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C662.1,274.3,661.2,274.7,660.1,274.7z M660.1,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C662.1,278.2,661.2,278.6,660.1,278.6z M660.1,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C662.1,282.2,661.2,282.6,660.1,282.6z M660.1,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C662.1,286.2,661.2,286.6,660.1,286.6z M660.1,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C662.1,290.2,661.2,290.6,660.1,290.6z M660.1,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C662.1,294.2,661.2,294.5,660.1,294.5z M660.1,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C662.1,298.1,661.2,298.5,660.1,298.5z M660.1,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C662.1,302.1,661.2,302.5,660.1,302.5z M660.1,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C662.1,306.1,661.2,306.5,660.1,306.5z M660.1,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C662.1,310.1,661.2,310.4,660.1,310.4z M660.1,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C662.1,314,661.2,314.4,660.1,314.4z M668,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C667.6,268.6,668,269.6,668,270.7z M668,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C667.6,272.6,668,273.6,668,274.7z M668,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C667.6,276.6,668,277.5,668,278.6z M668,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C667.6,280.6,668,281.5,668,282.6z M668,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C670,270.3,669.1,270.7,668,270.7z M668,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C670,274.3,669.1,274.7,668,274.7z M668,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C670,278.2,669.1,278.6,668,278.6z M676,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C675.6,268.6,676,269.6,676,270.7z M676,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C675.6,272.6,676,273.6,676,274.7z M676,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C675.6,276.6,676,277.5,676,278.6z M676,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C675.6,280.6,676,281.5,676,282.6z M676,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C678,274.3,677.1,274.7,676,274.7z M676,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C678,278.2,677.1,278.6,676,278.6z M676,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C678,282.2,677.1,282.6,676,282.6z"/>
					<path class="st0" d="M687.8,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C687.4,272.6,687.8,273.6,687.8,274.7z M687.8,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C687.4,276.6,687.8,277.5,687.8,278.6z M687.8,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C687.4,280.6,687.8,281.5,687.8,282.6z M687.8,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C689.8,274.3,688.9,274.7,687.8,274.7z M687.8,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C689.8,278.2,688.9,278.6,687.8,278.6z M687.8,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C689.8,282.2,688.9,282.6,687.8,282.6z M695.7,266.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C695.3,264.7,695.7,265.6,695.7,266.7z M695.7,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C695.3,268.6,695.7,269.6,695.7,270.7z M695.7,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C695.3,272.6,695.7,273.6,695.7,274.7z M695.7,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C695.3,276.6,695.7,277.5,695.7,278.6z M695.7,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C695.3,280.6,695.7,281.5,695.7,282.6z M695.7,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C695.3,284.5,695.7,285.5,695.7,286.6z M695.7,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C695.3,288.5,695.7,289.5,695.7,290.6z M695.7,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C695.3,292.5,695.7,293.5,695.7,294.5z M695.7,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C695.3,296.5,695.7,297.4,695.7,298.5z M695.7,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C695.3,300.5,695.7,301.4,695.7,302.5z M695.7,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C695.3,304.5,695.7,305.4,695.7,306.5z M695.7,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C695.3,308.4,695.7,309.4,695.7,310.4z M695.7,266.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C697.8,266.3,696.8,266.7,695.7,266.7z M695.7,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C697.8,270.3,696.8,270.7,695.7,270.7z M695.7,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C697.8,274.3,696.8,274.7,695.7,274.7z M695.7,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C697.8,278.2,696.8,278.6,695.7,278.6z M695.7,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C697.8,282.2,696.8,282.6,695.7,282.6z M695.7,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C697.8,286.2,696.8,286.6,695.7,286.6z M695.7,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C697.8,290.2,696.8,290.6,695.7,290.6z M695.7,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C697.8,294.2,696.8,294.5,695.7,294.5z M695.7,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C697.8,298.1,696.8,298.5,695.7,298.5z M695.7,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C697.8,302.1,696.8,302.5,695.7,302.5z M695.7,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C697.8,306.1,696.8,306.5,695.7,306.5z M695.7,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C697.8,310.1,696.8,310.4,695.7,310.4z M695.7,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C697.8,314,696.8,314.4,695.7,314.4z M703.7,266.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C703.3,264.7,703.7,265.6,703.7,266.7z M703.7,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C703.3,268.6,703.7,269.6,703.7,270.7z M703.7,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C703.3,272.6,703.7,273.6,703.7,274.7z M703.7,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C703.3,276.6,703.7,277.5,703.7,278.6z M703.7,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C703.3,280.6,703.7,281.5,703.7,282.6z M703.7,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C703.3,284.5,703.7,285.5,703.7,286.6z M703.7,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C703.3,288.5,703.7,289.5,703.7,290.6z M703.7,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C703.3,292.5,703.7,293.5,703.7,294.5z M703.7,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C703.3,296.5,703.7,297.4,703.7,298.5z M703.7,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C703.3,300.5,703.7,301.4,703.7,302.5z M703.7,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C703.3,304.5,703.7,305.4,703.7,306.5z M703.7,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C703.3,308.4,703.7,309.4,703.7,310.4z M703.7,314.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C703.3,312.4,703.7,313.3,703.7,314.4z M703.7,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C705.7,274.3,704.8,274.7,703.7,274.7z M703.7,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C705.7,278.2,704.8,278.6,703.7,278.6z M703.7,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C705.7,282.2,704.8,282.6,703.7,282.6z M703.7,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C705.7,302.1,704.8,302.5,703.7,302.5z M703.7,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C705.7,306.1,704.8,306.5,703.7,306.5z M703.7,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C705.7,310.1,704.8,310.4,703.7,310.4z M703.7,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C705.7,314,704.8,314.4,703.7,314.4z M711.6,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C711.3,272.6,711.6,273.6,711.6,274.7z M711.6,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C711.3,276.6,711.6,277.5,711.6,278.6z M711.6,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C711.3,280.6,711.6,281.5,711.6,282.6z M711.6,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C711.3,304.5,711.6,305.4,711.6,306.5z M711.6,310.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C711.3,308.4,711.6,309.4,711.6,310.4z M711.6,314.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C711.3,312.4,711.6,313.3,711.6,314.4z M711.6,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C713.7,274.3,712.7,274.7,711.6,274.7z M711.6,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C713.7,278.2,712.7,278.6,711.6,278.6z M711.6,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C713.7,282.2,712.7,282.6,711.6,282.6z M711.6,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C713.7,306.1,712.7,306.5,711.6,306.5z M711.6,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C713.7,310.1,712.7,310.4,711.6,310.4z M711.6,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C713.7,314,712.7,314.4,711.6,314.4z"/>
					<path class="st0" d="M719.6,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C721.6,270.3,720.7,270.7,719.6,270.7z M719.6,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C721.6,274.3,720.7,274.7,719.6,274.7z M719.6,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C721.6,310.1,720.7,310.4,719.6,310.4z M719.6,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C721.6,314,720.7,314.4,719.6,314.4z M727.6,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C727.2,268.6,727.6,269.6,727.6,270.7z M727.6,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C727.2,272.6,727.6,273.6,727.6,274.7z M727.6,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C727.2,276.6,727.6,277.5,727.6,278.6z M727.6,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C727.2,280.6,727.6,281.5,727.6,282.6z M727.6,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C727.2,304.5,727.6,305.4,727.6,306.5z M727.6,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C727.2,308.4,727.6,309.4,727.6,310.4z M727.6,314.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C727.2,312.4,727.6,313.3,727.6,314.4z M727.6,270.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C729.6,270.3,728.6,270.7,727.6,270.7z M727.6,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C729.6,274.3,728.6,274.7,727.6,274.7z M727.6,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C729.6,278.2,728.6,278.6,727.6,278.6z M727.6,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C729.6,282.2,728.6,282.6,727.6,282.6z M727.6,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C729.6,286.2,728.6,286.6,727.6,286.6z M727.6,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C729.6,302.1,728.6,302.5,727.6,302.5z M727.6,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C729.6,306.1,728.6,306.5,727.6,306.5z M727.6,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C729.6,310.1,728.6,310.4,727.6,310.4z M727.6,314.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C729.6,314,728.6,314.4,727.6,314.4z M735.5,270.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C735.1,268.6,735.5,269.6,735.5,270.7z M735.5,274.7c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C735.1,272.6,735.5,273.6,735.5,274.7z M735.5,278.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C735.1,276.6,735.5,277.5,735.5,278.6z M735.5,282.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C735.1,280.6,735.5,281.5,735.5,282.6z M735.5,286.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C735.1,284.5,735.5,285.5,735.5,286.6z M735.5,290.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C735.1,288.5,735.5,289.5,735.5,290.6z M735.5,294.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C735.1,292.5,735.5,293.5,735.5,294.5z M735.5,298.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C735.1,296.5,735.5,297.4,735.5,298.5z M735.5,302.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C735.1,300.5,735.5,301.4,735.5,302.5z M735.5,306.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C735.1,304.5,735.5,305.4,735.5,306.5z M735.5,310.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C735.1,308.4,735.5,309.4,735.5,310.4z M735.5,314.4c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C735.1,312.4,735.5,313.3,735.5,314.4z M735.5,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C737.5,274.3,736.6,274.7,735.5,274.7z M735.5,278.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C737.5,278.2,736.6,278.6,735.5,278.6z M735.5,282.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C737.5,282.2,736.6,282.6,735.5,282.6z M735.5,286.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C737.5,286.2,736.6,286.6,735.5,286.6z M735.5,290.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C737.5,290.2,736.6,290.6,735.5,290.6z M735.5,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C737.5,294.2,736.6,294.5,735.5,294.5z M735.5,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C737.5,298.1,736.6,298.5,735.5,298.5z M735.5,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C737.5,302.1,736.6,302.5,735.5,302.5z M735.5,306.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C737.5,306.1,736.6,306.5,735.5,306.5z M735.5,310.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C737.5,310.1,736.6,310.4,735.5,310.4z M743.5,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C743.1,284.5,743.5,285.5,743.5,286.6z M743.5,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C743.1,288.5,743.5,289.5,743.5,290.6z M743.5,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C743.1,292.5,743.5,293.5,743.5,294.5z M743.5,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C743.1,296.5,743.5,297.4,743.5,298.5z M743.5,302.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C743.1,300.5,743.5,301.4,743.5,302.5z M743.5,306.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C743.1,304.5,743.5,305.4,743.5,306.5z M743.5,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C745.5,274.3,744.6,274.7,743.5,274.7z M743.5,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C745.5,278.2,744.6,278.6,743.5,278.6z M743.5,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C745.5,282.2,744.6,282.6,743.5,282.6z M743.5,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C745.5,286.2,744.6,286.6,743.5,286.6z M743.5,290.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C745.5,290.2,744.6,290.6,743.5,290.6z M743.5,294.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C745.5,294.2,744.6,294.5,743.5,294.5z M743.5,298.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C745.5,298.1,744.6,298.5,743.5,298.5z M743.5,302.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C745.5,302.1,744.6,302.5,743.5,302.5z M751.4,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C751,268.6,751.4,269.6,751.4,270.7z M751.4,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C751,272.6,751.4,273.6,751.4,274.7z M751.4,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C751,276.6,751.4,277.5,751.4,278.6z M751.4,282.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C751,280.6,751.4,281.5,751.4,282.6z M751.4,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C751,284.5,751.4,285.5,751.4,286.6z M751.4,290.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C751,288.5,751.4,289.5,751.4,290.6z M751.4,294.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C751,292.5,751.4,293.5,751.4,294.5z M751.4,298.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C751,296.5,751.4,297.4,751.4,298.5z M751.4,270.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C753.4,270.3,752.5,270.7,751.4,270.7z M751.4,274.7c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C753.4,274.3,752.5,274.7,751.4,274.7z M751.4,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C753.4,278.2,752.5,278.6,751.4,278.6z M751.4,282.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C753.4,282.2,752.5,282.6,751.4,282.6z M751.4,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C753.4,286.2,752.5,286.6,751.4,286.6z M759.4,270.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						S759.4,269.6,759.4,270.7z M759.4,274.7c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S759.4,273.6,759.4,274.7z
						M759.4,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S759.4,277.5,759.4,278.6z M759.4,282.6
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2S759.4,281.5,759.4,282.6z M759.4,270.7c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S760.5,270.7,759.4,270.7z M759.4,274.7c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8S760.5,274.7,759.4,274.7z"/>
				</g>

				<g id='g9' >
					<path class="st0" d="M771.2,270.6c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C773.3,270.2,772.3,270.6,771.2,270.6z M771.2,274.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C773.3,274.2,772.3,274.5,771.2,274.5z M779.2,270.6c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C778.8,268.5,779.2,269.5,779.2,270.6z M779.2,274.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C778.8,272.5,779.2,273.4,779.2,274.5z M779.2,270.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C781.2,270.2,780.3,270.6,779.2,270.6z M779.2,274.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C781.2,274.2,780.3,274.5,779.2,274.5z M779.2,278.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C781.2,278.1,780.3,278.5,779.2,278.5z M779.2,282.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C781.2,282.1,780.3,282.5,779.2,282.5z M779.2,286.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C781.2,286.1,780.3,286.5,779.2,286.5z M779.2,290.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C781.2,290.1,780.3,290.4,779.2,290.4z M779.2,294.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C781.2,294,780.3,294.4,779.2,294.4z M787.1,270.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C786.8,268.5,787.1,269.5,787.1,270.6z M787.1,274.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C786.8,272.5,787.1,273.4,787.1,274.5z M787.1,278.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C786.8,276.5,787.1,277.4,787.1,278.5z M787.1,282.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C786.8,280.5,787.1,281.4,787.1,282.5z M787.1,286.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C786.8,284.4,787.1,285.4,787.1,286.5z M787.1,290.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C786.8,288.4,787.1,289.3,787.1,290.4z M787.1,294.4c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C786.8,292.4,787.1,293.3,787.1,294.4z M787.1,270.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C789.2,270.2,788.2,270.6,787.1,270.6z M787.1,274.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C789.2,274.2,788.2,274.5,787.1,274.5z M787.1,278.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C789.2,278.1,788.2,278.5,787.1,278.5z M787.1,282.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C789.2,282.1,788.2,282.5,787.1,282.5z M787.1,286.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C789.2,286.1,788.2,286.5,787.1,286.5z M787.1,290.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C789.2,290.1,788.2,290.4,787.1,290.4z M787.1,294.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C789.2,294,788.2,294.4,787.1,294.4z M795.1,270.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C794.7,268.5,795.1,269.5,795.1,270.6z M795.1,274.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C794.7,272.5,795.1,273.4,795.1,274.5z M795.1,270.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						S796.2,270.6,795.1,270.6z M795.1,274.5c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C797.1,274.2,796.2,274.5,795.1,274.5z"/>
					<path class="st0" d="M803.1,270.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C802.8,268.5,803.1,269.5,803.1,270.6
						z M803.1,274.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C802.8,272.5,803.1,273.4,803.1,274.5z
						M803.1,278.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C802.8,276.5,803.1,277.4,803.1,278.5z
						M803.1,282.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C802.8,280.5,803.1,281.4,803.1,282.5z
						M803.1,286.5c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C802.8,284.4,803.1,285.4,803.1,286.5z M803.1,290.4
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C802.8,288.4,803.1,289.3,803.1,290.4z M803.1,294.4
						c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C802.8,292.4,803.1,293.3,803.1,294.4z M803.1,270.6
						c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C805.2,270.2,804.2,270.6,803.1,270.6z M803.1,274.5c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C805.2,274.2,804.2,274.5,803.1,274.5z M803.1,278.5c0-1.1,0.4-2,1.2-2.8
						s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C805.2,278.1,804.2,278.5,803.1,278.5z M803.1,282.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C805.2,282.1,804.2,282.5,803.1,282.5z M803.1,286.5c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C805.2,286.1,804.2,286.5,803.1,286.5z M803.1,290.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C805.2,290.1,804.2,290.4,803.1,290.4z M803.1,294.4c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C805.2,294,804.2,294.4,803.1,294.4z M811.1,274.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C810.7,272.5,811.1,273.4,811.1,274.5z"/>
					<path class="st0" d="M819.1,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C818.7,276.5,819.1,277.5,819.1,278.6
						z M819.1,282.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C818.7,280.5,819.1,281.4,819.1,282.5z
						M819.1,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S820.2,278.6,819.1,278.6z M819.1,282.5
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C821.1,282.2,820.2,282.5,819.1,282.5z"/>
					<path class="st0" d="M836.3,267.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8s-1.7,1.2-2.8,1.2
						C835.1,269.5,835.5,268.5,836.3,267.8z M836.3,271.7c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8c-0.8,0.8-1.7,1.2-2.8,1.2
						C835.1,273.4,835.5,272.5,836.3,271.7z M836.3,275.7c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8c-0.8,0.8-1.7,1.2-2.8,1.2
						C835.1,277.4,835.5,276.5,836.3,275.7z M836.3,279.7c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8c-0.8,0.8-1.7,1.2-2.8,1.2
						C835.1,281.4,835.5,280.5,836.3,279.7z M836.3,283.7c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8s-1.7,1.2-2.8,1.2
						C835.1,285.4,835.5,284.4,836.3,283.7z M836.3,287.6c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8s-1.7,1.2-2.8,1.2
						C835.1,289.3,835.5,288.4,836.3,287.6z M836.3,291.6c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8s-1.7,1.2-2.8,1.2
						C835.1,293.3,835.5,292.4,836.3,291.6z M832.3,269.4c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2s1.2,1.7,1.2,2.8
						C834,270.6,833.1,270.2,832.3,269.4z M832.3,273.4c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2c0.8,0.8,1.2,1.7,1.2,2.8
						C834,274.5,833.1,274.2,832.3,273.4z M832.3,277.4c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2s1.2,1.7,1.2,2.8
						C834,278.5,833.1,278.1,832.3,277.4z M832.3,281.3c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2s1.2,1.7,1.2,2.8
						C834,282.5,833.1,282.1,832.3,281.3z M832.3,285.3c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2s1.2,1.7,1.2,2.8
						C834,286.5,833.1,286.1,832.3,285.3z M832.3,289.3c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2c0.8,0.8,1.2,1.7,1.2,2.8
						C834,290.4,833.1,290.1,832.3,289.3z M832.3,293.3c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2c0.8,0.8,1.2,1.7,1.2,2.8
						C834,294.4,833.1,294,832.3,293.3z M828.3,271.7c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8c-0.8,0.8-1.7,1.2-2.8,1.2
						C827.1,273.4,827.5,272.5,828.3,271.7z"/>
					<path class="st0" d="M811.1,278.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C810.7,276.5,811.1,277.5,811.1,278.6
						z M811.1,282.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C810.7,280.5,811.1,281.4,811.1,282.5z
						M811.1,278.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S812.2,278.6,811.1,278.6z M811.1,282.5
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C813.1,282.2,812.2,282.5,811.1,282.5z"/>
					<path class="st0" d="M819.1,286.6c-1.1,0-2-0.4-2.8-1.2s-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C818.7,284.5,819.1,285.5,819.1,286.6
						z M819.1,290.5c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C818.7,288.5,819.1,289.4,819.1,290.5z
						M819.1,286.6c0-1.1,0.4-2,1.2-2.8s1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8S820.2,286.6,819.1,286.6z M819.1,290.5
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C821.1,290.2,820.2,290.5,819.1,290.5z"/>
					<path class="st0" d="M828.3,275.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8s-1.7,1.2-2.8,1.2
						C827.1,277.5,827.5,276.5,828.3,275.8z M828.3,279.7c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8c-0.8,0.8-1.7,1.2-2.8,1.2
						C827.1,281.4,827.5,280.5,828.3,279.7z M824.3,277.4c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2s1.2,1.7,1.2,2.8
						C826,278.6,825.1,278.2,824.3,277.4z M824.3,281.4c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2c0.8,0.8,1.2,1.7,1.2,2.8
						C826,282.5,825.1,282.2,824.3,281.4z"/>
				</g>

				<g id='g10'>
					<path class="st4" d="M194.8,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C196.8,361.8,195.9,362.2,194.8,362.2z M202.8,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C202.4,360.1,202.8,361.1,202.8,362.2z M202.8,366.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C202.4,364.1,202.8,365.1,202.8,366.2z M202.8,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C204.8,361.8,203.9,362.2,202.8,362.2z M202.8,370.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C204.8,369.8,203.9,370.1,202.8,370.1z M210.7,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C210.3,360.1,210.7,361.1,210.7,362.2z M210.7,370.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C210.3,368.1,210.7,369,210.7,370.1z M210.7,374.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C210.3,372.1,210.7,373,210.7,374.1z M210.7,358.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C212.8,357.8,211.8,358.2,210.7,358.2z M210.7,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C212.8,361.8,211.8,362.2,210.7,362.2z M210.7,366.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C212.8,365.8,211.8,366.2,210.7,366.2z M210.7,370.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C212.8,369.8,211.8,370.1,210.7,370.1z M210.7,374.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C212.8,373.7,211.8,374.1,210.7,374.1z M218.7,354.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C218.3,352.2,218.7,353.1,218.7,354.2z M218.7,358.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C218.3,356.2,218.7,357.1,218.7,358.2z M218.7,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C218.3,360.1,218.7,361.1,218.7,362.2z M218.7,366.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C218.3,364.1,218.7,365.1,218.7,366.2z M218.7,370.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C218.3,368.1,218.7,369,218.7,370.1z M218.7,374.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C218.3,372.1,218.7,373,218.7,374.1z M218.7,350.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C220.7,349.9,219.8,350.3,218.7,350.3z M218.7,354.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C220.7,353.8,219.8,354.2,218.7,354.2z M218.7,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C220.7,361.8,219.8,362.2,218.7,362.2z M218.7,366.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C220.7,365.8,219.8,366.2,218.7,366.2z M226.6,346.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C226.2,344.2,226.6,345.2,226.6,346.3z M226.6,350.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C226.2,348.2,226.6,349.2,226.6,350.3z M226.6,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C226.2,360.1,226.6,361.1,226.6,362.2z M226.6,366.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C226.2,364.1,226.6,365.1,226.6,366.2z M226.6,346.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C228.7,345.9,227.7,346.3,226.6,346.3z M226.6,350.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						M226.6,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C228.7,361.8,227.7,362.2,226.6,362.2z
						M226.6,366.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C228.7,365.8,227.7,366.2,226.6,366.2z
						M234.6,350.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C234.2,348.2,234.6,349.2,234.6,350.3z
						M234.6,354.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C234.2,352.2,234.6,353.1,234.6,354.2z
						M234.6,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C234.2,360.1,234.6,361.1,234.6,362.2z
						M234.6,366.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C234.2,364.1,234.6,365.1,234.6,366.2z
						M234.6,354.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,353.8,235.7,354.2,234.6,354.2z
						M234.6,358.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,357.8,235.7,358.2,234.6,358.2z
						M234.6,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,361.8,235.7,362.2,234.6,362.2z
						M234.6,366.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,365.8,235.7,366.2,234.6,366.2z
						M234.6,370.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C236.6,369.8,235.7,370.1,234.6,370.1z
						M242.5,358.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C242.2,356.2,242.5,357.1,242.5,358.2z
						M242.5,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C242.2,360.1,242.5,361.1,242.5,362.2z
						M242.5,366.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C242.2,364.1,242.5,365.1,242.5,366.2z
						M242.5,370.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C242.2,368.1,242.5,369,242.5,370.1z
						M242.5,374.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C242.2,372.1,242.5,373,242.5,374.1z
						M242.5,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C244.6,361.8,243.6,362.2,242.5,362.2z
						M242.5,370.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C244.6,369.8,243.6,370.1,242.5,370.1z
						M242.5,374.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C244.6,373.7,243.6,374.1,242.5,374.1z
						M250.5,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C250.1,360.1,250.5,361.1,250.5,362.2z
						M250.5,370.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C250.1,368.1,250.5,369,250.5,370.1z
						M250.5,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C252.5,361.8,251.6,362.2,250.5,362.2z
						M250.5,366.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C252.5,365.8,251.6,366.2,250.5,366.2z
						M258.4,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C258.1,360.1,258.4,361.1,258.4,362.2z"/>
					<path class="st4" d="M201.6,387.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						C199.9,386,200.8,386.4,201.6,387.2z M205.5,388.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						C206.7,387.1,206.3,388.1,205.5,388.9z M205.5,384.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						C206.7,383.2,206.3,384.1,205.5,384.9z M209.5,387.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						C207.8,386,208.8,386.4,209.5,387.2z M209.5,379.3c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						C207.8,378.1,208.8,378.5,209.5,379.3z M213.5,388.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						C214.7,387.1,214.3,388.1,213.5,388.9z M213.5,380.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						C214.7,379.2,214.3,380.1,213.5,380.9z M217.5,391.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						C215.8,390,216.7,390.4,217.5,391.2z M217.5,387.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						C215.8,386,216.7,386.4,217.5,387.2z M217.5,383.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						C215.8,382.1,216.7,382.5,217.5,383.2z M217.5,379.3c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						C215.8,378.1,216.7,378.5,217.5,379.3z M221.5,396.8c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						C222.6,395.1,222.2,396,221.5,396.8z M221.5,392.8c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						C222.6,391.1,222.2,392.1,221.5,392.8z M221.5,388.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						C222.6,387.1,222.2,388.1,221.5,388.9z M221.5,384.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						C222.6,383.2,222.2,384.1,221.5,384.9z M221.5,380.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						C222.6,379.2,222.2,380.1,221.5,380.9z M225.5,399.1c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						C223.7,398,224.7,398.4,225.5,399.1z M225.5,395.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						C223.7,394,224.7,394.4,225.5,395.2z M225.5,387.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						C223.7,386,224.7,386.4,225.5,387.2z M225.5,383.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						C223.7,382.1,224.7,382.5,225.5,383.2z M229.4,404.8c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						C230.6,403.1,230.2,404,229.4,404.8z M229.4,400.8c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						C230.6,399.1,230.2,400,229.4,400.8z M229.4,388.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						C230.6,387.1,230.2,388.1,229.4,388.9z M229.4,384.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						C230.6,383.2,230.2,384.1,229.4,384.9z M233.4,403.1c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						C231.7,402,232.6,402.3,233.4,403.1z M233.4,399.1c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						M233.4,387.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8C231.7,386,232.6,386.4,233.4,387.2z
						M233.4,383.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8C231.7,382.1,232.6,382.5,233.4,383.2z
						M237.4,400.8c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2C238.5,399.1,238.2,400,237.4,400.8z
						M237.4,396.8c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2C238.5,395.1,238.2,396,237.4,396.8z
						M237.4,388.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2C238.5,387.1,238.2,388.1,237.4,388.9z
						M237.4,384.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2C238.5,383.2,238.2,384.1,237.4,384.9z
						M241.4,395.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8C239.6,394,240.6,394.4,241.4,395.2z
						M241.4,391.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8C239.6,390,240.6,390.4,241.4,391.2z
						M241.4,387.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8C239.6,386,240.6,386.4,241.4,387.2z
						M241.4,383.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8C239.6,382.1,240.6,382.5,241.4,383.2z
						M241.4,379.3c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8C239.6,378.1,240.6,378.5,241.4,379.3z
						M245.3,392.8c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2C246.5,391.1,246.1,392.1,245.3,392.8z
						M245.3,388.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2C246.5,387.1,246.1,388.1,245.3,388.9z
						M245.3,384.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2C246.5,383.2,246.1,384.1,245.3,384.9z
						M245.3,380.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2C246.5,379.2,246.1,380.1,245.3,380.9z
						M249.3,387.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8C247.6,386,248.5,386.4,249.3,387.2z
						M249.3,379.3c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8C247.6,378.1,248.5,378.5,249.3,379.3z
						M253.3,388.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2C254.4,387.1,254.1,388.1,253.3,388.9z
						M253.3,380.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2C254.4,379.2,254.1,380.1,253.3,380.9z
						M257.3,387.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8C255.5,386,256.5,386.4,257.3,387.2z
						M257.3,383.2c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8C255.5,382.1,256.5,382.5,257.3,383.2z
						M261.2,388.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2C262.4,387.1,262,388.1,261.2,388.9z"/>
					<path class="st4" d="M213.4,376.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						C214.6,375.2,214.2,376.1,213.4,376.9z M217.4,375.3c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						C215.7,374.1,216.6,374.5,217.4,375.3z M241.2,375.3c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						C239.5,374.1,240.5,374.5,241.2,375.3z M245.2,376.9c-0.8,0.8-1.7,1.2-2.8,1.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						C246.4,375.2,246,376.1,245.2,376.9z M249.2,375.3c0.8,0.8,1.2,1.7,1.2,2.8c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8
						C247.5,374.1,248.4,374.5,249.2,375.3z"/>
				</g>

				<g id='g11'>
					<path class="st5" d="M4,386.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2C3.6,384,4,385,4,386.1z M4,378.1
						c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,377.7,5,378.1,4,378.1z M4,382.1c0-1.1,0.4-2,1.2-2.8
						c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8C6,381.7,5,382.1,4,382.1z M4,386.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2
						c0,1.1-0.4,2-1.2,2.8C6,385.7,5,386.1,4,386.1z M11.9,374.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C11.5,372.1,11.9,373,11.9,374.1z M11.9,378.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C11.5,376.1,11.9,377,11.9,378.1z M11.9,382.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C11.5,380,11.9,381,11.9,382.1z M11.9,386.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C11.5,384,11.9,385,11.9,386.1z M11.9,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C13.9,361.8,13,362.2,11.9,362.2z M11.9,370.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C13.9,369.8,13,370.1,11.9,370.1z M11.9,374.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C13.9,373.7,13,374.1,11.9,374.1z M11.9,378.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C13.9,377.7,13,378.1,11.9,378.1z M11.9,382.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C13.9,381.7,13,382.1,11.9,382.1z M11.9,386.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C13.9,385.7,13,386.1,11.9,386.1z M19.9,358.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C19.5,356.2,19.9,357.1,19.9,358.2z M19.9,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C19.5,360.2,19.9,361.1,19.9,362.2z M19.9,370.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C19.5,368.1,19.9,369,19.9,370.1z M19.9,374.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C19.5,372.1,19.9,373,19.9,374.1z M19.9,378.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C19.5,376.1,19.9,377,19.9,378.1z M19.9,382.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C19.5,380,19.9,381,19.9,382.1z M19.9,386.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C19.5,384,19.9,385,19.9,386.1z M19.9,394c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C19.5,392,19.9,392.9,19.9,394z M19.9,398c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C19.5,396,19.9,396.9,19.9,398z M19.9,402c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C19.5,399.9,19.9,400.9,19.9,402z M19.9,346.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,345.9,20.9,346.3,19.9,346.3z M19.9,354.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,353.9,20.9,354.2,19.9,354.2z M19.9,358.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,357.8,20.9,358.2,19.9,358.2z M19.9,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,361.8,20.9,362.2,19.9,362.2z M19.9,370.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,369.8,20.9,370.1,19.9,370.1z M19.9,374.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,373.7,20.9,374.1,19.9,374.1z M19.9,378.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,377.7,20.9,378.1,19.9,378.1z M19.9,382.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,381.7,20.9,382.1,19.9,382.1z M19.9,386.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,385.7,20.9,386.1,19.9,386.1z M19.9,394c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,393.6,20.9,394,19.9,394z M19.9,398c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,397.6,20.9,398,19.9,398z M19.9,402c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,401.6,20.9,402,19.9,402z M19.9,405.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C21.9,405.5,20.9,405.9,19.9,405.9z M27.8,342.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,340.3,27.8,341.2,27.8,342.3z M27.8,346.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,344.3,27.8,345.2,27.8,346.3z M27.8,350.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,348.2,27.8,349.2,27.8,350.3z M27.8,354.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,352.2,27.8,353.1,27.8,354.2z M27.8,358.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,356.2,27.8,357.1,27.8,358.2z M27.8,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,360.2,27.8,361.1,27.8,362.2z M27.8,366.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,364.1,27.8,365.1,27.8,366.2z M27.8,370.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,368.1,27.8,369,27.8,370.1z M27.8,374.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,372.1,27.8,373,27.8,374.1z M27.8,378.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,376.1,27.8,377,27.8,378.1z M27.8,382.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,380,27.8,381,27.8,382.1z M27.8,386.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,384,27.8,385,27.8,386.1z M27.8,390c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,388,27.8,388.9,27.8,390z M27.8,394c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,392,27.8,392.9,27.8,394z M27.8,398c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,396,27.8,396.9,27.8,398z M27.8,402c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,399.9,27.8,400.9,27.8,402z M27.8,405.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C27.4,403.9,27.8,404.8,27.8,405.9z M27.8,338.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,337.9,28.9,338.3,27.8,338.3z M27.8,342.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,341.9,28.9,342.3,27.8,342.3z M27.8,346.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,345.9,28.9,346.3,27.8,346.3z M27.8,350.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,349.9,28.9,350.3,27.8,350.3z M27.8,354.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,353.9,28.9,354.2,27.8,354.2z M27.8,358.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,357.8,28.9,358.2,27.8,358.2z M27.8,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,361.8,28.9,362.2,27.8,362.2z M27.8,366.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,365.8,28.9,366.2,27.8,366.2z M27.8,370.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,369.8,28.9,370.1,27.8,370.1z M27.8,374.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,373.7,28.9,374.1,27.8,374.1z M27.8,378.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,377.7,28.9,378.1,27.8,378.1z M27.8,382.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,381.7,28.9,382.1,27.8,382.1z M27.8,386.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,385.7,28.9,386.1,27.8,386.1z M27.8,390c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,389.6,28.9,390,27.8,390z M27.8,394c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,393.6,28.9,394,27.8,394z M27.8,398c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,397.6,28.9,398,27.8,398z M27.8,402c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,401.6,28.9,402,27.8,402z M27.8,405.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C29.9,405.5,28.9,405.9,27.8,405.9z M35.8,338.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,336.3,35.8,337.2,35.8,338.3z M35.8,342.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,340.3,35.8,341.2,35.8,342.3z M35.8,346.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,344.3,35.8,345.2,35.8,346.3z M35.8,350.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,348.2,35.8,349.2,35.8,350.3z M35.8,354.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,352.2,35.8,353.1,35.8,354.2z M35.8,358.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,356.2,35.8,357.1,35.8,358.2z M35.8,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,360.2,35.8,361.1,35.8,362.2z M35.8,366.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,364.1,35.8,365.1,35.8,366.2z M35.8,370.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,368.1,35.8,369,35.8,370.1z M35.8,374.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,372.1,35.8,373,35.8,374.1z M35.8,378.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,376.1,35.8,377,35.8,378.1z M35.8,382.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,380,35.8,381,35.8,382.1z M35.8,386.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,384,35.8,385,35.8,386.1z M35.8,390c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,388,35.8,388.9,35.8,390z M35.8,394c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,392,35.8,392.9,35.8,394z M35.8,398c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,396,35.8,396.9,35.8,398z M35.8,402c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,399.9,35.8,400.9,35.8,402z M35.8,405.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C35.4,403.9,35.8,404.8,35.8,405.9z M35.8,342.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,341.9,36.9,342.3,35.8,342.3z M35.8,346.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,345.9,36.9,346.3,35.8,346.3z M35.8,350.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,349.9,36.9,350.3,35.8,350.3z M35.8,354.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,353.9,36.9,354.2,35.8,354.2z M35.8,358.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,357.8,36.9,358.2,35.8,358.2z M35.8,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,361.8,36.9,362.2,35.8,362.2z M35.8,366.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,365.8,36.9,366.2,35.8,366.2z M35.8,370.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,369.8,36.9,370.1,35.8,370.1z M35.8,374.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,373.7,36.9,374.1,35.8,374.1z M35.8,378.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,377.7,36.9,378.1,35.8,378.1z M35.8,382.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,381.7,36.9,382.1,35.8,382.1z M35.8,386.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,385.7,36.9,386.1,35.8,386.1z M35.8,390c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,389.6,36.9,390,35.8,390z M35.8,394c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,393.6,36.9,394,35.8,394z M35.8,398c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,397.6,36.9,398,35.8,398z M35.8,402c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,401.6,36.9,402,35.8,402z M35.8,405.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C37.8,405.5,36.9,405.9,35.8,405.9z M43.7,346.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C43.3,344.3,43.7,345.2,43.7,346.3z M43.7,354.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C43.3,352.2,43.7,353.1,43.7,354.2z M43.7,358.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C43.3,356.2,43.7,357.1,43.7,358.2z M43.7,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C43.3,360.2,43.7,361.1,43.7,362.2z M43.7,370.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C43.3,368.1,43.7,369,43.7,370.1z M43.7,374.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C43.3,372.1,43.7,373,43.7,374.1z M43.7,378.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C43.3,376.1,43.7,377,43.7,378.1z M43.7,382.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C43.3,380,43.7,381,43.7,382.1z M43.7,386.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C43.3,384,43.7,385,43.7,386.1z M43.7,394c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C43.3,392,43.7,392.9,43.7,394z M43.7,398c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C43.3,396,43.7,396.9,43.7,398z M43.7,402c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C43.3,399.9,43.7,400.9,43.7,402z M43.7,405.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C43.3,403.9,43.7,404.8,43.7,405.9z M43.7,358.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C45.8,357.8,44.8,358.2,43.7,358.2z M43.7,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C45.8,361.8,44.8,362.2,43.7,362.2z M43.7,370.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C45.8,369.8,44.8,370.1,43.7,370.1z M43.7,374.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C45.8,373.7,44.8,374.1,43.7,374.1z M43.7,378.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C45.8,377.7,44.8,378.1,43.7,378.1z M43.7,382.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C45.8,381.7,44.8,382.1,43.7,382.1z M43.7,386.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C45.8,385.7,44.8,386.1,43.7,386.1z M43.7,394c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C45.8,393.6,44.8,394,43.7,394z M43.7,398c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C45.8,397.6,44.8,398,43.7,398z M43.7,402c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C45.8,401.6,44.8,402,43.7,402z M51.7,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C51.3,360.2,51.7,361.1,51.7,362.2z M51.7,370.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C51.3,368.1,51.7,369,51.7,370.1z M51.7,374.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C51.3,372.1,51.7,373,51.7,374.1z M51.7,378.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C51.3,376.1,51.7,377,51.7,378.1z M51.7,382.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C51.3,380,51.7,381,51.7,382.1z M51.7,386.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C51.3,384,51.7,385,51.7,386.1z M51.7,374.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C53.7,373.7,52.8,374.1,51.7,374.1z M51.7,378.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C53.7,377.7,52.8,378.1,51.7,378.1z M51.7,382.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C53.7,381.7,52.8,382.1,51.7,382.1z M51.7,386.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C53.7,385.7,52.8,386.1,51.7,386.1z M59.6,378.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C59.2,376.1,59.6,377,59.6,378.1z M59.6,382.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C59.2,380,59.6,381,59.6,382.1z M59.6,386.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C59.2,384,59.6,385,59.6,386.1z M59.6,386.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C61.7,385.7,60.7,386.1,59.6,386.1z"/>
				</g>

				<g id='g12'>
					<path class="st6" d="M107.4,354.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,352.2,107.4,353.1,107.4,354.2z M107.4,358.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,356.2,107.4,357.1,107.4,358.2z M107.4,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,360.2,107.4,361.1,107.4,362.2z M107.4,374.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,372.1,107.4,373,107.4,374.1z M107.4,378.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,376.1,107.4,377,107.4,378.1z M107.4,382.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,380,107.4,381,107.4,382.1z M107.4,386.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,384,107.4,385,107.4,386.1z M107.4,390c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,388,107.4,388.9,107.4,390z M107.4,394c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C107,392,107.4,392.9,107.4,394z M107.4,350.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,349.9,108.5,350.3,107.4,350.3z M107.4,354.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,353.9,108.5,354.2,107.4,354.2z M107.4,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,361.8,108.5,362.2,107.4,362.2z M107.4,366.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,365.8,108.5,366.2,107.4,366.2z M107.4,370.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,369.8,108.5,370.1,107.4,370.1z M107.4,378.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,377.7,108.5,378.1,107.4,378.1z M107.4,398c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C109.4,397.6,108.5,398,107.4,398z M115.3,346.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,344.3,115.3,345.2,115.3,346.3z M115.3,350.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,348.2,115.3,349.2,115.3,350.3z M115.3,354.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,352.2,115.3,353.1,115.3,354.2z M115.3,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,360.2,115.3,361.1,115.3,362.2z M115.3,378.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,376.1,115.3,377,115.3,378.1z M115.3,382.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,380,115.3,381,115.3,382.1z M115.3,402c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C114.9,399.9,115.3,400.9,115.3,402z M115.3,342.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C117.4,341.9,116.4,342.3,115.3,342.3z M115.3,346.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C117.4,345.9,116.4,346.3,115.3,346.3z M115.3,350.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C117.4,349.9,116.4,350.3,115.3,350.3z M115.3,354.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C117.4,353.9,116.4,354.2,115.3,354.2z M115.3,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C117.4,361.8,116.4,362.2,115.3,362.2z M115.3,366.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C117.4,365.8,116.4,366.2,115.3,366.2z M115.3,370.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C117.4,369.8,116.4,370.1,115.3,370.1z M115.3,382.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C117.4,381.7,116.4,382.1,115.3,382.1z M115.3,405.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C117.4,405.5,116.4,405.9,115.3,405.9z M123.3,342.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C122.9,340.3,123.3,341.2,123.3,342.3z M123.3,346.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C122.9,344.3,123.3,345.2,123.3,346.3z M123.3,350.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C122.9,348.2,123.3,349.2,123.3,350.3z M123.3,354.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C122.9,352.2,123.3,353.1,123.3,354.2z M123.3,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C122.9,360.2,123.3,361.1,123.3,362.2z M123.3,366.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C122.9,364.1,123.3,365.1,123.3,366.2z M123.3,370.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C122.9,368.1,123.3,369,123.3,370.1z M123.3,382.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C122.9,380,123.3,381,123.3,382.1z M123.3,405.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C122.9,403.9,123.3,404.8,123.3,405.9z M123.3,338.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,337.9,124.4,338.3,123.3,338.3z M123.3,342.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,341.9,124.4,342.3,123.3,342.3z M123.3,346.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,345.9,124.4,346.3,123.3,346.3z M123.3,350.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,349.9,124.4,350.3,123.3,350.3z M123.3,354.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,353.9,124.4,354.2,123.3,354.2z M123.3,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,361.8,124.4,362.2,123.3,362.2z M123.3,382.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,381.7,124.4,382.1,123.3,382.1z M123.3,394c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,393.6,124.4,394,123.3,394z M123.3,405.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C125.3,405.5,124.4,405.9,123.3,405.9z M131.2,338.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,336.3,131.2,337.2,131.2,338.3z M131.2,342.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,340.3,131.2,341.2,131.2,342.3z M131.2,346.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,344.3,131.2,345.2,131.2,346.3z M131.2,350.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,348.2,131.2,349.2,131.2,350.3z M131.2,354.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,352.2,131.2,353.1,131.2,354.2z M131.2,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,360.2,131.2,361.1,131.2,362.2z M131.2,374.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,372.1,131.2,373,131.2,374.1z M131.2,378.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,376.1,131.2,377,131.2,378.1z M131.2,382.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,380,131.2,381,131.2,382.1z M131.2,386.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,384,131.2,385,131.2,386.1z M131.2,398c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,396,131.2,396.9,131.2,398z M131.2,405.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C130.8,403.9,131.2,404.8,131.2,405.9z M131.2,338.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.3,337.9,132.3,338.3,131.2,338.3z M131.2,342.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.3,341.9,132.3,342.3,131.2,342.3z M131.2,346.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.3,345.9,132.3,346.3,131.2,346.3z M131.2,350.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.3,349.9,132.3,350.3,131.2,350.3z M131.2,354.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.3,353.9,132.3,354.2,131.2,354.2z M131.2,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.3,361.8,132.3,362.2,131.2,362.2z M131.2,370.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.3,369.8,132.3,370.1,131.2,370.1z M131.2,374.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.3,373.7,132.3,374.1,131.2,374.1z M131.2,378.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.3,377.7,132.3,378.1,131.2,378.1z M131.2,382.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.3,381.7,132.3,382.1,131.2,382.1z M131.2,386.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.3,385.7,132.3,386.1,131.2,386.1z M131.2,398c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.3,397.6,132.3,398,131.2,398z M131.2,405.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C133.3,405.5,132.3,405.9,131.2,405.9z M139.2,338.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,336.3,139.2,337.2,139.2,338.3z M139.2,342.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,340.3,139.2,341.2,139.2,342.3z M139.2,346.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,344.3,139.2,345.2,139.2,346.3z M139.2,350.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,348.2,139.2,349.2,139.2,350.3z M139.2,354.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,352.2,139.2,353.1,139.2,354.2z M139.2,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,360.2,139.2,361.1,139.2,362.2z M139.2,370.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,368.1,139.2,369,139.2,370.1z M139.2,374.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,372.1,139.2,373,139.2,374.1z M139.2,378.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,376.1,139.2,377,139.2,378.1z M139.2,382.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,380,139.2,381,139.2,382.1z M139.2,386.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,384,139.2,385,139.2,386.1z M139.2,398c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,396,139.2,396.9,139.2,398z M139.2,405.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C138.8,403.9,139.2,404.8,139.2,405.9z M139.2,338.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,337.9,140.3,338.3,139.2,338.3z M139.2,342.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,341.9,140.3,342.3,139.2,342.3z M139.2,346.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,345.9,140.3,346.3,139.2,346.3z M139.2,350.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,349.9,140.3,350.3,139.2,350.3z M139.2,354.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,353.9,140.3,354.2,139.2,354.2z M139.2,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,361.8,140.3,362.2,139.2,362.2z M139.2,374.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,373.7,140.3,374.1,139.2,374.1z M139.2,378.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,377.7,140.3,378.1,139.2,378.1z M139.2,382.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,381.7,140.3,382.1,139.2,382.1z M139.2,386.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,385.7,140.3,386.1,139.2,386.1z M139.2,398c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,397.6,140.3,398,139.2,398z M139.2,405.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C141.2,405.5,140.3,405.9,139.2,405.9z M147.1,338.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C146.8,336.3,147.1,337.2,147.1,338.3z M147.1,342.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C146.8,340.3,147.1,341.2,147.1,342.3z M147.1,346.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C146.8,344.3,147.1,345.2,147.1,346.3z M147.1,350.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C146.8,348.2,147.1,349.2,147.1,350.3z M147.1,354.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C146.8,352.2,147.1,353.1,147.1,354.2z M147.1,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C146.8,360.2,147.1,361.1,147.1,362.2z M147.1,382.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C146.8,380,147.1,381,147.1,382.1z M147.1,394c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C146.8,392,147.1,392.9,147.1,394z M147.1,405.9c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C146.8,403.9,147.1,404.8,147.1,405.9z M147.1,342.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C149.2,341.9,148.2,342.3,147.1,342.3z M147.1,346.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C149.2,345.9,148.2,346.3,147.1,346.3z M147.1,350.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C149.2,349.9,148.2,350.3,147.1,350.3z M147.1,354.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C149.2,353.9,148.2,354.2,147.1,354.2z M147.1,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C149.2,361.8,148.2,362.2,147.1,362.2z M147.1,366.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C149.2,365.8,148.2,366.2,147.1,366.2z M147.1,370.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C149.2,369.8,148.2,370.1,147.1,370.1z M147.1,382.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C149.2,381.7,148.2,382.1,147.1,382.1z M147.1,405.9c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C149.2,405.5,148.2,405.9,147.1,405.9z M155.1,342.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C154.7,340.3,155.1,341.2,155.1,342.3z M155.1,346.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C154.7,344.3,155.1,345.2,155.1,346.3z M155.1,350.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C154.7,348.2,155.1,349.2,155.1,350.3z M155.1,354.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C154.7,352.2,155.1,353.1,155.1,354.2z M155.1,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C154.7,360.2,155.1,361.1,155.1,362.2z M155.1,366.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C154.7,364.1,155.1,365.1,155.1,366.2z M155.1,370.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C154.7,368.1,155.1,369,155.1,370.1z M155.1,382.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C154.7,380,155.1,381,155.1,382.1z M155.1,402c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C154.7,399.9,155.1,400.9,155.1,402z M155.1,346.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C157.1,345.9,156.2,346.3,155.1,346.3z M155.1,350.3c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C157.1,349.9,156.2,350.3,155.1,350.3z M155.1,354.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C157.1,353.9,156.2,354.2,155.1,354.2z M155.1,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C157.1,361.8,156.2,362.2,155.1,362.2z M155.1,378.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C157.1,377.7,156.2,378.1,155.1,378.1z M155.1,382.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C157.1,381.7,156.2,382.1,155.1,382.1z M155.1,402c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C157.1,401.6,156.2,402,155.1,402z M163,350.3c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C162.7,348.2,163,349.2,163,350.3z M163,354.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C162.7,352.2,163,353.1,163,354.2z M163,362.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C162.7,360.2,163,361.1,163,362.2z M163,366.2c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C162.7,364.1,163,365.1,163,366.2z M163,370.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C162.7,368.1,163,369,163,370.1z M163,378.1c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C162.7,376.1,163,377,163,378.1z M163,398c-1.1,0-2-0.4-2.8-1.2c-0.8-0.8-1.2-1.7-1.2-2.8c1.1,0,2,0.4,2.8,1.2
						C162.7,396,163,396.9,163,398z M163,354.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C165.1,353.9,164.1,354.2,163,354.2z M163,358.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C165.1,357.8,164.1,358.2,163,358.2z M163,362.2c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C165.1,361.8,164.1,362.2,163,362.2z M163,374.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C165.1,373.7,164.1,374.1,163,374.1z M163,378.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C165.1,377.7,164.1,378.1,163,378.1z M163,382.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C165.1,381.7,164.1,382.1,163,382.1z M163,386.1c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C165.1,385.7,164.1,386.1,163,386.1z M163,390c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C165.1,389.6,164.1,390,163,390z M163,394c0-1.1,0.4-2,1.2-2.8c0.8-0.8,1.7-1.2,2.8-1.2c0,1.1-0.4,2-1.2,2.8
						C165.1,393.6,164.1,394,163,394z"/>
				</g>

			</svg>

	</div>

	
		<div id='instructions'>

		<div id='instructions__inner'>
			<h1>Instructions:</h1>
			<p>Click on the snow below to generate random dancing Adlers. Click on a dancing Adler to remove one.
			</p>
		</div>
	</div>

		<div class='container'>

			<div class='grass'>
				<img src='/assets/holiday-snow700.jpg' onclick=${add} />

				${state.animals.map(animalMap)}
			</div>
		</div>
		<div id='footer'>
		<h5><span id='love'>Happy Holidays! <span id='love2'>Love,</span></span></h5>
		<p>Charley, Asher, Molly & Aaron
		</p>
	</div>

	<div id='border'>
		<p>-</p>
	</div>
</div>
`;
  
  //NEW map function
  function animalMap(obj, i){
    return animal(remove, obj, i)
  };
  
  //add NEW ANIMAL to STATE
  function add (event){
    
    var x = event.offsetX - 30;
    var y = event.offsetY - 30;
    
    //EMIT = ALERT the STATE of an event/change; TRIGGER whatever is in emitter.on()
    emit('addAnimal', {x: x, y: y});
  };
  
  //REMOVE animal from state:
  function remove (e){
    var index = e.target.id;
    
    emit('removeAnimal', index);
  }
  
};

// Insert our animals ARRAY and MAP it: For each object in our state.animals array, return an <img>!! 
},{"./animal.js":26,"choo/html":3}],28:[function(require,module,exports){
(function (global){
'use strict';

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"util/":33}],29:[function(require,module,exports){

},{}],30:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],31:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],32:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],33:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":32,"_process":30,"inherits":31}]},{},[1]);
