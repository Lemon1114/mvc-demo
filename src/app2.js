import './app2.css'
import $ from 'jquery'
const $tab = $('.tab-bar')
const $tabContent = $('.tab-content')
$tab.on('click', 'li', (e) => {
    var $index = $(e.currentTarget).index()
    $tab.children().eq($index).addClass('active').siblings().removeClass('active')
    $tabContent.children().eq($index).addClass('active').siblings().removeClass('active')
})