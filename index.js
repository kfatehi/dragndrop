var dragEl = null

function swapNodes(a, b) {
  if (a === b) return false;
  var aparent= a.parentNode;
  var asibling= a.nextSibling===b? a : a.nextSibling;
  b.parentNode.insertBefore(a, b);
  aparent.insertBefore(b, asibling);
  return true;
}

function swap(a, b) { return swapNodes(a.get(0), b.get(0)) }

var _createEvent = function (event/**String*/, item/**HTMLElement*/){
  var evt = document.createEvent('Event');
  evt.initEvent(event, true, true);
  evt.item = item;
  return evt;
}

module.exports = function ($el, options) {
  var events = {
    // Common
    dragover: function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      return false;
    }
  };

  if (options.dropzone) {
    $el.get(0).dropzone = options.dropzone;

    // Item enters the column
    events.dragenter = function (e) {
      if (dragEl) {
        if (dragEl.parent().get(0) === $el.get(0)) return false;
        dragEl.parent().get(0).dropzone.removed(dragEl)
        $el.append(dragEl)
        $el.get(0).dropzone.appended(dragEl)
      }
    }
  } else {
    events.dragstart = function (e) {
      dragEl = $el;
      this.style.opacity = '0.4';
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData('text/plain', $el.text());
      var evt = _createEvent('start', $el.get(0))
      dragEl.parent().get(0).dropzone.start(evt);
    }

    events.dragend = function () {
      this.style.opacity = '1';
      var evt = _createEvent('end', dragEl.get(0))
      dragEl.parent().get(0).dropzone.end(evt)
    }

    // Item enters another item
    events.dragenter = function () {
      if (!dragEl) return false;
      // Logically this occurs after entering the column,
      // the setTimeout enforces this order in the event loop
      setTimeout(function () {
        var parent = dragEl.parent().get(0)
        var parentb = $el.parent().get(0)
        if (parent === parentb && swap(dragEl, $el)) {
          parent.dropzone.swapped(dragEl, $el);
        }
      }, 0);
    }

    $el.prop('draggable', true);
  }

  var names = Object.keys(events);
  for (var i = 0, l = names.length; i < l; i ++) {
    var name = names[i];
    $el.get(0).addEventListener(name, events[name], false);
  }
}
