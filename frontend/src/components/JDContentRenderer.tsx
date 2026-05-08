type ContentBlock =
  | { type: 'title'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }

const knownSectionHeadings = [
  'about the role',
  'about you',
  'application process',
  'benefits',
  'compensation',
  'company overview',
  'culture',
  'growth opportunity',
  'key responsibilities',
  'nice to have',
  'nice-to-have skills',
  'preferred qualifications',
  'qualifications',
  'required skills',
  'requirements',
  'responsibilities',
  'role overview',
  'salary',
  'what we offer',
  "what you'll do",
  'what you will do',
  'who you are',
]

function cleanMarkdownMarkers(value: string) {
  return value
    .replace(/\*\*/g, '')
    .replace(/__/g, '')
    .replace(/^#{1,6}\s*/, '')
    .trim()
}

function normalizeContentValue(value: string) {
  return cleanMarkdownMarkers(value)
    .replace(/^[-*\u2022]\s+/, '')
    .replace(/:$/, '')
    .trim()
    .toLowerCase()
}

function hasMeaningfulText(value: string) {
  const normalizedValue = normalizeContentValue(value)

  return Boolean(
    normalizedValue &&
      ![
        'n/a',
        'na',
        'none',
        'not applicable',
        'not provided',
        'not specified',
        'not set',
        'not listed',
        'no information provided',
        'information not provided',
      ].includes(normalizedValue) &&
      !/^[a-z\s/&-]+:\s*(n\/a|na|none|not applicable|not provided|not specified|not set|not listed)$/i.test(
        normalizedValue,
      ) &&
      !/^(no|none)\s+(provided|specified|listed|mentioned)$/i.test(normalizedValue) &&
      !/\bnot\s+(provided|specified|set|listed|mentioned)\b/i.test(normalizedValue),
  )
}

function extractJobTitle(line: string) {
  const cleanLine = cleanMarkdownMarkers(line)
  const match = cleanLine.match(/^job\s+title\s*:?\s+(.+)$/i)
  return match?.[1]?.trim()
}

function isBulletLine(line: string) {
  return /^\s*[-*\u2022]\s+/.test(line)
}

function cleanBulletLine(line: string) {
  return cleanMarkdownMarkers(line.replace(/^\s*[-*\u2022]\s+/, ''))
}

function isHeadingLine(line: string) {
  const cleanLine = cleanMarkdownMarkers(line)
  const normalizedLine = cleanLine.replace(/:$/, '').toLowerCase()

  return (
    !/^job\s+title\b/i.test(cleanLine) &&
    ((cleanLine.endsWith(':') && cleanLine.length <= 80 && !cleanLine.includes('.')) ||
      knownSectionHeadings.includes(normalizedLine))
  )
}

function parseContent(content: string): ContentBlock[] {
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const blocks: ContentBlock[] = []
  let currentParagraph: string[] = []
  let currentList: string[] = []
  let hasTitle = false
  let expectTitleNext = false

  const flushParagraph = () => {
    if (currentParagraph.length === 0) {
      return
    }

    const text = cleanMarkdownMarkers(currentParagraph.join(' '))
    if (hasMeaningfulText(text)) {
      blocks.push({ type: 'paragraph', text })
    }
    currentParagraph = []
  }

  const flushList = () => {
    if (currentList.length === 0) {
      return
    }

    const meaningfulItems = currentList.filter(hasMeaningfulText)
    if (meaningfulItems.length > 0) {
      blocks.push({ type: 'list', items: meaningfulItems })
    }
    currentList = []
  }

  lines.forEach((line) => {
    const trimmedLine = line.trim()

    if (!trimmedLine) {
      flushParagraph()
      flushList()
      return
    }

    if (!hasTitle && expectTitleNext) {
      flushParagraph()
      flushList()
      const title = cleanMarkdownMarkers(trimmedLine)
      if (hasMeaningfulText(title)) {
        blocks.push({ type: 'title', text: title })
      }
      hasTitle = true
      expectTitleNext = false
      return
    }

    if (!hasTitle && /^job\s+title\s*:?$/i.test(cleanMarkdownMarkers(trimmedLine))) {
      flushParagraph()
      flushList()
      expectTitleNext = true
      return
    }

    const title = !hasTitle ? extractJobTitle(trimmedLine) : undefined
    if (title) {
      flushParagraph()
      flushList()
      const cleanTitle = cleanMarkdownMarkers(title)
      if (hasMeaningfulText(cleanTitle)) {
        blocks.push({ type: 'title', text: cleanTitle })
      }
      hasTitle = true
      return
    }

    if (isBulletLine(trimmedLine)) {
      flushParagraph()
      const listItem = cleanBulletLine(trimmedLine)
      if (hasMeaningfulText(listItem)) {
        currentList.push(listItem)
      }
      return
    }

    if (isHeadingLine(trimmedLine)) {
      flushParagraph()
      flushList()
      const heading = cleanMarkdownMarkers(trimmedLine).replace(/:$/, '')
      if (hasMeaningfulText(heading)) {
        blocks.push({ type: 'heading', text: heading })
      }
      return
    }

    currentParagraph.push(trimmedLine)
  })

  flushParagraph()
  flushList()

  return removeEmptySections(blocks)
}

function removeEmptySections(blocks: ContentBlock[]) {
  return blocks.filter((block, index) => {
    if (block.type === 'paragraph') {
      return hasMeaningfulText(block.text)
    }

    if (block.type === 'list') {
      return block.items.some(hasMeaningfulText)
    }

    if (block.type === 'title') {
      return hasMeaningfulText(block.text)
    }

    const nextBlock = blocks[index + 1]
    return Boolean(
      hasMeaningfulText(block.text) &&
        nextBlock &&
        nextBlock.type !== 'heading' &&
        (nextBlock.type === 'list'
          ? nextBlock.items.some(hasMeaningfulText)
          : hasMeaningfulText(nextBlock.text)),
    )
  })
}

function JDContentRenderer({ content }: { content: string }) {
  const blocks = parseContent(content)

  return (
    <article className="jd-content-renderer">
      {blocks.map((block, index) => {
        if (block.type === 'title') {
          return (
            <div className="jd-render-title-group jd-reveal-line" key={`${block.type}-${index}`}>
              <span>Job Title</span>
              <h1 className="jd-render-title">{block.text}</h1>
            </div>
          )
        }

        if (block.type === 'heading') {
          return (
            <h2 className="jd-render-heading jd-reveal-line" key={`${block.type}-${index}`}>
              {block.text}
            </h2>
          )
        }

        if (block.type === 'list') {
          return (
            <ul className="jd-render-list jd-reveal-line" key={`${block.type}-${index}`}>
              {block.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`}>{item}</li>
              ))}
            </ul>
          )
        }

        return (
          <p className="jd-render-paragraph jd-reveal-line" key={`${block.type}-${index}`}>
            {block.text}
          </p>
        )
      })}
    </article>
  )
}

export default JDContentRenderer
