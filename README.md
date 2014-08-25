dragndrop
=========

HTML5 Drag and Drop

Designed for use with browserify.

Uses jQuery, but that is by no means a necessity and should be removed ... unfortunately the projects I am using this for all have jQuery... PR welcome!

## Install

`npm install dragndrop --save`

## Usage

### Markup

```
<ul>
  <li> bla bla bla </li>
  <li> i can be swapped or moved </li>
</ul>

<ul>
  <li> hey hey hey </li>
</ul>

<ul>
</ul>
```

### Setup

```js
var dragndrop = require('dragndrop')

var dropzone = require('./dropzone')

$('ul').each(function(ul) {

  // Setup the UL's as dropzones:
  dragndrop($(ul).get(0), { dropzone: dropzone })

  // Setup the LI's as draggables:
  $(ul).find('li').each(function(li) {
    dragndrop($(li).get(0), {})
  })

})
```

### Dropzone

```js
module.exports = {
  start: function (e) {
    console.log('started dragging', {
      card: $(e.item).data('id'),
      index: $(e.item).index(),
    })
  }
  swapped: function ($1, $2) {
    console.log('col '+this._id+' swap', $1.text().trim(), $2.text().trim());
  },
  appended: function ($el) {
    console.log('col '+this._id+'add', $el.text());
  },
  removed: function ($el) {
    console.log('col '+this._id+'remove', $el.text());
  }
  end: function (e) {
    console.log('finished dragging', {
      card: $(e.item).data('id'),
      index: $(e.item).index(),
    })
  }
}
```

