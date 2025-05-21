import React from 'react'

export default function ReactMarkdown({ children }) {
  const blocks = String(children).split(/\n\n+/)
  const html = blocks.map((block) => {
    if (block.startsWith('# ')) {
      return `<h1>${block.slice(2)}</h1>`
    }
    if (block.startsWith('## ')) {
      return `<h2>${block.slice(3)}</h2>`
    }
    if (block.startsWith('### ')) {
      return `<h3>${block.slice(4)}</h3>`
    }
    return `<p>${block}</p>`
  }).join('')
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
