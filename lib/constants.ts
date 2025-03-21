export const getAmazonUrl = (amazon_ref: string) => {
  return `https://amzn.to/${amazon_ref}`
}

export const getEbayUrl = (ebay_search_term: string) => {
  const encodedSearchTerm = encodeURIComponent(ebay_search_term);
  const campaignId = "5339104951"; 
  /*return `https://rover.ebay.com/rover/1/${campaignId}/4?mpre=https://www.ebay.com/sch/i.html?_nkw=${encodedSearchTerm}`*/
  return `https://www.ebay.com/sch/i.html?_nkw=${encodedSearchTerm}&campid=${campaignId}`
}


export const getYearFromDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.getFullYear();
};
