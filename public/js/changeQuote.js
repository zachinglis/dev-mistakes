document.addEventListener('DOMContentLoaded', () => {
  const quoteEl         = document.querySelector('.quote')
  const authorEl        = document.querySelector('.quote--author')
  const refreshButtonEl = document.querySelector('.button--refreshQuote')

  setLoadingState = () => {
    quoteEl.innerHTML = 'Loading…'
    authorEl.innerHTML = ''
  }

  getQuote = () => {
    setLoadingState()

    let url    = '/api/quote'
    let lastId = quoteEl.getAttribute('data-lastId')

    // If there's a lastId, use the action that excludes the previous quote
    if (lastId)
      url = `/api/quote/not/${lastId}`

    axios.get(url)
      .then((response) => {
        const quote = response.data
        console.log(quote.author)

        quoteEl.setAttribute('data-lastId', quote.id)
        quoteEl.innerHTML = quote.message

        let authorHTML = `― ${quote.author.name}`

        if(quote.author.link)
          authorHTML = `― <a href='${quote.author.link}'>${quote.author.name}</a>`

        authorEl.innerHTML = authorHTML
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getQuote()
  refreshButtonEl.onclick = getQuote
})
