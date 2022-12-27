const extractIdfromText = (text: string) => {
  return (
    typeof text === 'string' &&
    text
      ?.match(/(<@)(\d+)(>)/g)
      ?.map((text) => text?.replace(/(<@)|(>)/g, ''))
  )
}

export { extractIdfromText }
