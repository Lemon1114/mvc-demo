import './app4.css'
import $ from 'jquery'
const eventBus = $(window)
const m = {
    active: localStorage.getItem('active') === 'yes' || false,
    update (n) {
        console.log(m.active)
        eventBus.trigger('m:update', n)
        localStorage.setItem('active', n ? 'yes' : 'no')
    }
}
const v = {
    el: null,
    html (active) {
        return `<div class="${active ? 'active' : ' '}" id="gradient"></div>`
    },
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
        "mouseenter #gradient": "addActive",
        "mouseout #gradient": "removeActive"
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
            v.el.on(key.split(' ')[0], key.split(' ')[1], c[c.eventMap[key]])
        }
        $('#gradient').on('mouseout', c.removeActive())
    },
    addActive () {
        m.active = true
        console.log('进来了')
        m.update(m.active)
    },
    removeActive () {
        console.log('出去了')
        m.active = false
        m.update(m.active)
    }
}
export default c