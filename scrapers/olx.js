const sc = require('scrape-it');
const changeCase = require('change-case')
module.exports = (query) =>{
let q = changeCase.paramCase(query);
return sc(`https://www.olx.co.ke/nairobicbd/q-${q}/`, {
	products:{
		listItem: 'td.offer',
		data: {
			item: 'a.link strong',
			price: 'p.price strong',
			image: {
        			selector: "a.thumb img",
				attr: "src"
    			},
			link: {
				selector: "a.thumb",
				attr: "href"
			}
		},
	}
})
};
