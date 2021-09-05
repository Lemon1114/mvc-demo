import './app4.css'
import $ from 'jquery'
const $block = $('.gradient')
$block.on('mouseover', (e) => {
    $block.addClass('active')
}).on('mouseout', (e) => {
    $block.removeClass('active')
})