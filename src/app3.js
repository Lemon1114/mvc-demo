import './app3.css'
import $ from 'jquery'
const $slide = $('.slide')
$slide.on('click', (e) => {
    $(e.currentTarget).toggleClass('active')
})