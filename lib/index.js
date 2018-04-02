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
  let text = $('textarea').val().toLowerCase().replace(/[,.]/g, "").split(' ')
  let uniqueText = Array.from(new Set(text))
  let allColors = Object.keys(COLORS)
  postColors(text, allColors)
  uniqueText.forEach((color) => {
    if(allColors.includes(color)){
      $('article.colorized-text').append(`<div class="swatch" style="background-color:${COLORS[color]};"></div>`)
    }
  })
}

const postColors = (text, allColors) => {
  text.forEach((word) => {
    if(allColors.includes(word)){
      fetch(`https://color-swatch-api.herokuapp.com/api/v1/colors`, postConfig({color: {value: word}}))
      .catch((error) => console.error({error}))
    }
  })
}

const postConfig = (body) => {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }
}

const enterEvent = () => {
  $(event.target).on('keydown', function(e){
    if(e.keyCode == 13){
      getColors()
    }
  })
}

topColor()
$('textarea').on('click', enterEvent)
$('button').on('click', getColors);
