import './reset.css'
import './app1.css'
import $ from 'jquery'
const $num = $('.num')
const $addBtn = $('.add')
const $minusBtn = $('.minus')
const $multiBtn = $('.multi')
const $divisionBtn = $('.division')
const $resetBtn = $('.reset')
let n = Number(localStorage.getItem('n')) || 0
$num.text(n)
$addBtn.on('click', () => {
    n += 1
    $num.text(n)
})
$minusBtn.on('click', () => {
    n -= 1
    $num.text(n)
})
$multiBtn.on('click', () => {
    n *= 2
    $num.text(n)
})
$divisionBtn.on('click', () => {
    n /= 2
    $num.text(n)
})
$resetBtn.on('click', () => {
    n = 0
    $num.text(n)
})
window.onbeforeunload = () => {
    localStorage.setItem('n', n)
}