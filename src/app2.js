import './app2.css'
import $ from 'jquery'
const eventBus = $(window)
const m = {
    index: Number(localStorage.getItem('index')) || 0,
    update (n) {
        eventBus.trigger('m:update', n)
        localStorage.setItem('index', n)
    }
}
const v = {
    el: null,
    html (index) {
        return `<div>
    <ol class="tab-bar">
     <li class="${index === 0 ? 'active' : ''}">Tab1</li>
     <li class="${index === 1 ? 'active' : ''}">Tab2</li>
    </ol>
    <ol class="tab-content">
     <li class="${index === 0 ? 'active' : ''}">内容111111</li>
     <li class="${index === 1 ? 'active' : ''}">内容222222</li>
    </ol>
    </div>`},
    init (container) {
        v.el = $(container)
    },
    render () {
        if (v.el.children.length != 0) {
            v.el.empty()
        }
        $(v.html(m.index)).appendTo(v.el)
    }
}
const c = {
    eventMap: {
        "click li": "toggleActive",
    },
    init (container) {
        v.init(container)
        v.render(m.index)
        c.autobindEvents()
        eventBus.on('m:update', () => {
            v.render(m.index)
        })
    },
    autobindEvents () {//利用hashmap结构绑定事件
        for (let key in c.eventMap) {
            // console.log(key.substring(0, 5))
            // console.log(key.substring(6))
            // console.log(c[c.eventMap[key]])
            v.el.on(key.substring(0, 5), key.substring(6), (e) => { c[c.eventMap[key]](e) })
        }
    },
    toggleActive (e) {
        m.index = $(e.currentTarget).index()
        m.update(m.index)
    }
}

export default c