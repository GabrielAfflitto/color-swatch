import './stylesheets/styles.scss'
import COLORS from './data/colors'


const topColor = () => {
    fetch(`https://color-swatch-api.herokuapp.com/api/v1/top_color`)
    .then((response) => response.json())
    .then((rawColor) => appendColor(rawColor))
    .catch((error) => console.error({error}))
}

const appendColor = (rawColor) => {
  $('.top-color').append(`${rawColor.value} (${rawColor.color_count})`)
}

const getColors = () => {
  let text = $('textarea').val().replace(/[,.]/g, "").split(' ')
  let uniqueText = Array.from(new Set(text))
  let allColors = Object.keys(COLORS)
  console.log(COLORS)
  uniqueText.forEach((color) => {
    if(allColors.includes(color)){
      $('article.colorized-text').append(`<div class="swatch" style="background-color:${COLORS[color]};"></div>`)
    }
  })
}

topColor()
$('button').on('click', getColors);
