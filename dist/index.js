'use strict';

var _cssInJsUtils = require('css-in-js-utils');

var cache = {}; // import prefixAll from 'inline-style-prefixer/static'

var rules = [];
var prefix = '#app ';
var insert = function insert(rule) {
  return rules.push(rule);
};
var hyph = function hyph(s) {
  return s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase();
};
var mx = function mx(rule, media) {
  return media ? media + '{' + rule + '}' : rule;
};
var qts = function qts(prop, val) {
  return prop === "content" && val.substring(0, 4) !== "attr" ? '"' + val + '"' : val;
};
var rx = function rx(cn, prop, val) {
  return cn.replace("!", "") + '{' + hyph(prop) + ':' + qts(prop, val) + '}';
};
var noAnd = function noAnd(s) {
  return s.replace(/&/g, '');
};
var multi = function multi(cn, child) {
  var r = [];
  child.split(',').forEach(function (o) {
    r.push((cn === '' ? '' : prefix + '.' + cn) + o);
  });
  return r.join(',');
};
var anim = function anim(obj) {
  return Object.keys(obj).map(function (key) {
    if (typeof obj[key] === 'string') {
      return hyph(key) + ': ' + obj[key] + ';';
    } else {
      return key + ' {' + anim(obj[key]) + '}';
    }
  }).join(' ');
};
var parse = function parse(obj) {
  var child = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var media = arguments[2];
  var prep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;


  return Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === null) return '';

    if (Array.isArray(val)) {
      val = (0, _cssInJsUtils.resolveArrayValue)(key, val);
    } else if (typeof val === 'object') {
      if (/^@keyframes/.test(key)) {
        insert(key + '{' + anim(val) + '}');
        return;
      } else {
        var m2 = /^@/.test(key) ? key : null;
        var c2 = m2 ? child : child + key;
        return parse(val, c2, m2 || media);
      }
    }
    var _key = key + val + child + media;
    if (cache[_key]) return cache[_key];
    var className = child[0] === "!" ? "" : 'x' + rules.length.toString(36);

    insert(mx(rx(multi(className, noAnd(child)), key, val), media));
    cache[_key] = className;
    return className;
  }).join(' ');
};
module.exports = function () {
  for (var _len = arguments.length, styles = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    styles[_key2] = arguments[_key2];
  }

  return styles.map(function (style) {
    // const prefixedStyle = prefixAll(style)
    return parse(style);
  }).join(' ').trim();
};
module.exports.css = function () {
  return rules.sort().join('');
};

module.exports.reset = function () {
  cache = {};
  while (rules.length) {
    rules.pop();
  }
};

if (typeof document !== 'undefined') {
  var sheet = document.head.appendChild(document.createElement('style')).sheet;
  insert = function insert(rule) {
    rules.push(rule);
    try {
      sheet.insertRule(rule, sheet.cssRules.length);
    } catch (e) {}
  };
}