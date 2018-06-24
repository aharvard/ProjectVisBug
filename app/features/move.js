import { $$, $ } from 'blingblingjs'
import hotkeys from 'hotkeys-js'

const key_events = 'up,down,left,right'
// todo: indicator for when node can descend
// todo: indicator where left and right will go
// todo: indicator when left or right hit dead ends
export function Moveable(selector) {
  hotkeys(key_events, (e, handler) => {
    e.preventDefault()
    moveElement($(selector), handler.key)
  })

  return () => hotkeys.unbind(key_events)
}

export function moveElement(el, direction) {
  if (!el) return

  switch(direction) {
    case 'left':
      if (el.previousElementSibling)
        el.parentNode.insertBefore(el, el.previousElementSibling)
      break

    case 'right':
      if (el.nextElementSibling && el.nextElementSibling.nextSibling)
        el.parentNode.insertBefore(el, el.nextElementSibling.nextSibling)
      else if (el.nextElementSibling)
        el.parentNode.appendChild(el)
      break

    case 'up':
      if (el.parentNode && el.parentNode.parentNode && el.parentNode.nodeName != 'BODY')
        el.parentNode.parentNode.prepend(el)
      break

    case 'down':
      if (!el.nextElementSibling && el.parentNode && el.parentNode.parentNode && el.parentNode.nodeName != 'BODY')
        el.parentNode.parentNode.appendChild(el)
      else if (el.nextElementSibling && el.nextElementSibling.children.length)
        el.nextElementSibling.prepend(el)
      break
  }
}