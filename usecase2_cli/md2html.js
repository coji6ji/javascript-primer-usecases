const marked = require('marked')

module.exports = (markdown, clientOptions) => {
  return marked(markdown, {
    gfm: clientOptions.gfm,
  })
}