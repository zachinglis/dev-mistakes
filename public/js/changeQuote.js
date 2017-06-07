marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

document.addEventListener('DOMContentLoaded', () => {
  const quoteEl         = document.querySelector('.quote')
  const authorEl        = document.querySelector('.quote--author')
  const refreshButtonEl = document.querySelector('.button--refreshQuote')
  const lastButtonEl    = document.querySelector('.button--lastQuote')

  setLoadingState = () => {
    quoteEl.innerHTML = 'Loading…'
    authorEl.innerHTML = ''
    lastButtonEl.classList.add('disabled')
  }

  // TODO: Make a solution for if there is no Id
  getLastQuote = (event) => {
    let lastId = quoteEl.getAttribute('data-oneBeforeLastId')
    getQuote(event, lastId)
  }

  getQuote = (event, id) => {
    setLoadingState()

    let url    = '/api/quote'
    let lastId = quoteEl.getAttribute('data-lastId')

    // Keep this around for after we re-set it
    quoteEl.setAttribute('data-oneBeforeLastId', lastId)

    if(lastId)
      lastButtonEl.classList.remove('disabled')

    // If there's a lastId, use the action that excludes the previous quote
    if (id)
      url = `/api/quote/${id}`
    else if (lastId)
      url = `/api/quote/not/${lastId}`

    axios.get(url)
      .then((response) => {
        const quote = response.data

        quoteEl.setAttribute('data-lastId', quote.id)
        quoteEl.innerHTML = marked(quote.message)

        let authorHTML = `― ${quote.author.name}`

        if(quote.author.link)
          authorHTML = `― <a href='${quote.author.link}'>${quote.author.name}</a>`

        authorHTML = quote.id
        authorEl.innerHTML = authorHTML
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getQuote()
  refreshButtonEl.onclick = getQuote
  lastButtonEl.onclick    = getLastQuote
  refreshButtonEl.focus()
})
