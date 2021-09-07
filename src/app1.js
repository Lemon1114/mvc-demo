import './reset.css'
import './app1.css'
import $ from 'jquery'
const eventBus = $(window)
/*
M:所有数据相关
V:所有视图相关
C:其他
*/
const m = {
    //初始化数据
    n: Number(localStorage.getItem('n')) || 0,
    update () {
        eventBus.trigger('m:update', m.n)
        localStorage.setItem('n', m.n)
    }
}
const v = {
    el: null,
    //初始化html
    html: `<span class="num">{{num}}</span>
    <div>
  <button class="add">+1</button>
  <button class="minus">-1</button>
  <button class="multi">*2</button>
  <button class="division">/2</button>
  <button class="reset">归零</button>
</div>`,
    init (container) {
        v.el = $(container)

    },
    render (n) {
        if (v.el.children.length != 0) {
            v.el.empty()
        }
        $(v.html.replace('{{num}}', n)).appendTo(v.el)

    }
}

const c = {
    eventMap: {
        "click .add": "add",
        "click .minus": "minus",
        "click .multi": "multi",
        "click .division": "division",
        "click .reset": "reset",
    },
    init (container) {
        v.init(container)
        v.render(m.n)
        //获取DOM元素
        // c.btn = {
        //     $num: $('.num'),
        //     $addBtn: $('.add'),
        //     $minusBtn: $('.minus'),
        //     $multiBtn: $('.multi'),
        //     $divisionBtn: $('.division'),
        //     $resetBtn: $('.reset')
        // }
        // c.autobindEvents()
        c.autobindEvents()
        eventBus.on('m:update', () => {
            v.render(m.n)
        })
    },
    autobindEvents () {//利用hashmap结构绑定事件
        for (let key in c.eventMap) {
            // console.log(c[c.eventMap[key]])
            v.el.on(key.substring(0, 5), key.substring(6), () => { c[c.eventMap[key]]() })
        }
    },
    add () {
        m.n += 1
        m.update(m.n)
    },
    minus () {
        m.n -= 1
        m.update(m.n)
    },
    multi () {
        m.n *= 2
        m.update(m.n)
    },
    division () {
        m.n /= 2
        m.update(m.n)
    },
    reset () {
        m.n = 0
        m.update(m.n)
    },
}

//c.init(container) init入口需要从外部传入container，这要将c暴露出去
export default c



