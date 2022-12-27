import glob from 'glob'

const LoadFiles = async (
  path: string,
  extension: string
): Promise<string[]> => {
  return glob.sync(`${path}/**/*.${extension}`)
}

export { LoadFiles }
