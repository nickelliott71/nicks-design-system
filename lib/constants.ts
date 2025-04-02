export const getAmazonUrl = (amazon_ref: string) => {
  return `https://amzn.to/${amazon_ref}`
}

export const getEbayUrl = (ebay_search_term: string) => {
  const encodedSearchTerm = encodeURIComponent(ebay_search_term);
  const campaignId = "5339104951"; 
  return `https://www.ebay.com/sch/i.html?_nkw=${encodedSearchTerm}&campid=${campaignId}&mkcid=1&mkrid=711-53200-19255-0&siteid=0&customid=&toolid=10001&mkevt=1`
}


export const getYearFromDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.getFullYear();
};
