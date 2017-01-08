# Magnetize

A plugin in which to have a element in the window (either a navigation block or text/image block) hangs on to be visible as you scroll until the scrolling reachs the end of it's section (it's container).

## Basic usage

```javascript
$('.selector').magnetize();
```

## Options

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| handler | string | this | The item that get's magnatized when it's container is visible on window scroll |
| container | string | handler's container | A container that the handler is bound to when scrolling. The handler will not exceed this container's boundary.

## Development

Run `yarn` to install dependencies. Then to compile while developing:

```
yarn run start
```

or to compile and minified:

```
yarn run build
```
