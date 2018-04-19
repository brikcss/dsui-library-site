# Including Assets

How you include assets depends on the "distro" you choose to include. See [component / package structure](#!/package-structure) for more context on each distro, and to decide which one you should use.

### ES Modules

In `app.js` or `my-file.js`:

```js
import myModule from 'node_modules/<package-name>/src/esmodule/<my-bundle>.js';
```

### VanillaJS / Browser

In `index.html` or `my-page.html`:

```html
<script src="node_modules/<package-name>/dist/vanillajs/<my-bundle>.min.js"></script>
```

### CommonJS

In `app.js` or `my-file.js`:

```js
const myModule = require('<package-name>');
```

### UMD

The Universal Module (UMD) is just that... universal. It supports ES Modules, VanillaJS (global browser variable), and CommonJS, and can be included the same way as any of those.

### SASS

In `app.scss` or `my-styles.scss`:

```scss
@import 'node_modules/<package-name>/src/sass/<my-bundle>.scss';
```

### CSS

In `index.html` or `my-page.html`:

```html
<style rel="stylesheet" type="text/css" href="node_modules/<package-name>/dist/css/<my-bundle>.min.css"></style>
```
