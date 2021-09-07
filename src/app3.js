import './app3.css'
import $ from 'jquery'
const eventBus = $(window)
const m = {
    active: localStorage.getItem('active') === 'yes' || false,
    update (n) {
        eventBus.trigger('m:update', n)
        localStorage.setItem('active', n)
    }
}
const v = {
    el: null,
    html (active) { return `<div class="${active ? 'active' : ''} slide"></div>` },
    init (container) {
        v.el = $(container)
    },
    render () {
        if (v.el.children.length != 0) {
            v.el.empty()
        }
        $(v.html(m.active)).appendTo(v.el)
    }
}
const c = {
    eventMap: {
        "click .slide": "toggleActive",
    },
    init (container) {
        v.init(container)
        v.render()
        c.autobindEvents()
        eventBus.on('m:update', () => {
            v.render()
        })
    },
    autobindEvents () {//利用hashmap结构绑定事件
        for (let key in c.eventMap) {
            v.el.on(key.substring(0, 5), key.substring(6), (e) => { c[c.eventMap[key]](e) })
        }
    },
    toggleActive (e) {
        m.active = !m.active
        m.update(m.active)
    }
}
export default c