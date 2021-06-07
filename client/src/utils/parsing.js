export const parseHtml = (html) => {
  if (html.match("^[A-Za-z]")) {
    return html
  }

  let divElement = document.createElement("div")
  divElement.innerHTML = html

  let yleParagraphs = divElement.getElementsByClassName(
    "yle__article__paragraph"
  )

  let paragraphs = ""

  for (let i = 0; i < yleParagraphs.length; i++) {
    let paragraph = yleParagraphs[i].innerText
    if (paragraph.slice(-1) === ".") {
      paragraphs += paragraph + " "
    }
  }

  return paragraphs
}
