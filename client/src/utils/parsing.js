export const stripHtml = (html) => {
  let divElement = document.createElement("div")
  divElement.innerHTML = html

  let yleParagraphs = divElement.getElementsByClassName(
    "yle__article__paragraph"
  )

  let paragraphs = ""

  for (let i = 0; i < yleParagraphs.length; i++) {
    paragraphs += yleParagraphs[i].innerHTML + " "
  }

  let divElement2 = document.createElement("div")
  divElement2.innerHTML = paragraphs

  let cleaned = divElement2.textContent || divElement2.innerText || ""

  return cleaned
}
