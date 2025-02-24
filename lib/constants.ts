export const AMAZON_AFFILIATE_TAG = "thlath-20"

export const getAmazonUrl = (asin: string) => {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_AFFILIATE_TAG}`
}

