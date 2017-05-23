A [PostCSS] plugin to add viewport relative font size with minimum and maximum values.

[PostCSS]: https://github.com/postcss/postcss
[Gulp]: https://github.com/gulpjs/gulp

## Installation

```js
npm install postcss-font-vsize
```

## Example

```css
body {
    // font-vsize: {viewport-size}, {min-size: default 1rem}, {max-size: optional}, {fallback: optional}
    font-vsize: 5vw, 14px, 32px, 16px;
}
```

will produce

```css
body {
    font-size: 16px; // fallback
    font-size: 5vw;
}
@media (max-width: 700px) {
    body { font-size: 14px }
}
@media (min-width: 1650px) {
    body { font-size: 32px }
}
```

## Usage

Using [Gulp].

```js
var gulp            = require('gulp'),
    postcss         = require('gulp-postcss'),
    fontVsize       = require('postcss-font-vsize');

gulp.task('css', function() {
    gulp.src('path/to/dev/css').
        .pipe(postcss({
            // use it after nesting plugins
            fontVsize
        }))
        .pipe(gulp.dest('path/to/build/css'));
});

// rest of the gulp file
```