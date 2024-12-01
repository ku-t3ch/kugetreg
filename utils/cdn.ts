export const baseCdn = process.env.cdn
export const getFullUrlCdn = (path: string) => {
    return `${baseCdn}${path}`
}