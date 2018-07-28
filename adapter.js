"use strict";

const path = require("path");

const Adapter = require("@frctl/fractal").Adapter;
const svelte = require("svelte");

class SvelteAdapter extends Adapter {

  render(filename, str, context) {
    // Transpile the Svelte template.
    const compiled = svelte.compile(str, {
      filename,
      name: capitalize(name(filename)),
      generate: "ssr"
    });

    // Load the transpiled Svelte component
    const m = new module.constructor();
    m._compile(compiled.js.code, filename);

    // Render with the context
    const Component = m.exports;
    return Promise.resolve(Component.render(context).html);
  }

}

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

/**
 * Return a component name based on the file name.
 * 
 * See https://github.com/sveltejs/svelte/blob/master/src/ssr/register.js#L28
 * 
 * @param {String} filename the filename of a component
 * @returns {String} a component name based on the file name
 */
function name(filename) {
  return path.basename(filename)
			.slice(0, -path.extname(filename).length)
			.replace(/^\d/, '_$&')
      .replace(/[^a-zA-Z0-9_$]/g, '');
}

module.exports = function () {

  return {

    register(source, app) {
      return new SvelteAdapter(app, source);
    }

  };

}
