export const stripHtml = (html) => {
  var divElement = document.createElement("div")
  divElement.innerHTML = html
  return divElement.textContent || divElement.innerText || ""
}
