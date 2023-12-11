
/* A work in progress handcrafted appropriation of Solid.js  
 *
 *  /~\
 * C oo
 *  ( ^)
 *  / ~\
 *
 *  |____
 *  A SOLID MONKE
 *  ____|
 *
 * Tools are personal, language is a tool, code is a language.
 * I like writing my code in very personal, often stupid and 
 * esoteric ways. This is something that I have been slowly developing
 * over the past few months. It is not a necesarily a framework or a library
 * but rather an expression of sorts.
 *
 * Feel free to look around, use whatever you might find is useful, 
 * 
 * This code is licesned under the GPL license.
 * You can read about it more here
 * https://www.gnu.org/licenses/quick-guide-gplv3.html
 *
 */

import h from "./h/h.js";
import {
  For,
  createSignal,
  createMemo,
  createEffect,
  on,
  Switch,
  Show,
  onMount,
} from "./solid.js";
import { render } from "./web/web.js";
import { createStore, produce, createMutable } from "./store/store.js";


// The core, the heart and the soul

// Reactivity
const sig = (val) => {
  const [getter, setter] = createSignal(val);
  return {
    is: getter,
    set: setter,
  };
};

// Dependent Reactivity
const mem = createMemo;
const eff = createEffect;
const eff_on = (dep, callback) => eff(on(dep, callback));

// Rendering Control Flow,
// Essentially the for loop —> but for rendering (keyed) 
const every = (dep, children) => For({ each: dep, children });

// The switch statement for rendering
const if_then = (...etc) => {
  let kids = etc.map((item) => {
    if (!Array.isArray(item)) item = if_then_object(item)

    let child = item[1];

    return function() {
      return {
        when: item[0],
        children: child,
      };
    };
  });

  return Switch({
    fallback: null,
    children: kids,
  });
};

const when = (condition, ...etc) => {
  let kids = etc.map((item) => {
    let cond = () =>
      typeof condition === "function"
        ? condition() === item[0]
        : condition === item[0];

    return [cond, item[1]];
  })

  return if_then(...kids);
};

// Helpers for h() essentially just like JSX
// But its just javascript and no black boxes
// This is just a personal take but I quite prefer this
// over JSX... why mix html and javascript syntactically like that?
const div = (...args) => h("div", ...args);
const span = (...args) => h("span", ...args);

const p = (...args) => h("p", ...args);
const a = (...args) => h("a", ...args);

const h1 = (...args) => h("h1", ...args);
const h2 = (...args) => h("h2", ...args);
const h3 = (...args) => h("h3", ...args);
const h4 = (...args) => h("h4", ...args);

// this just cuz jquery is king
const $ = (selector) => document.querySelector(selector);

// This is utilities for larger reactive structures 
const dukan = createStore;
const prod = produce;
const hogaya = onMount;
const simple_dukan = createMutable;

export {
  render,
  h, sig, mem,
  eff, eff_on, every, if_then,
  when, div, span, p, a, h1, h2, h3, h4, $,
  dukan, prod, hogaya, simple_dukan
}

const if_then_object = (obj) => {
  let cond = obj.if;
  let child = obj.then;

  return [cond, child]
}
