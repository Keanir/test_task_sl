// Порода собаки из ссылки
export const extractBreed = data => {
  let regex = /https:\/\/images\.dog\.ceo\/breeds\/(\w+)-*\w*/g
  let match = regex.exec(data)
  return match[1]
}

// Разновидность породы собаки из ссылки
export const extractSubBreed = data => {
  let regex = /https:\/\/images\.dog\.ceo\/breeds\/\w+-(\w+)\/.+/g
  let match = regex.exec(data)
  return match[1]
}

// Замена названия породы
export const checkBreed = breed => {
  if (breed === "germanshepherd") {
    return "German Shepherd"
  } else if (breed === "mexicanhairless") {
    return "Mexican Hairless"
  } else if (breed === "stbernard") {
    return "St. Bernard"
  }
  return breed
}

// Заглавные буквы
export const capitalize = breedName => {
  return breedName
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// Расстановка слов в нужном порядке, если есть у породы разновидность
// С проверкой имени и установкой заглавных букв
export const changeName = (breed, subBreed = 0) => {
  return subBreed
    ? capitalize(subBreed) + " " + capitalize(checkBreed(breed))
    : capitalize(checkBreed(breed))
}

export default {
  extractBreed,
  extractSubBreed,
  checkBreed,
  capitalize,
  changeName
}
