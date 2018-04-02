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



topColor()
