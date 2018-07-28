# Svelte Adapter

Use [Svelte](https://svelte.technology) components with [Fractal](http://fractal.build).

## Installation

    $ npm install --save fractal-svelte-adapter

## Set Up

In `fractal.js`:

    fractal.components.engine("fractal-svelte-adapter");
    fractal.components.set("ext", ".html");
