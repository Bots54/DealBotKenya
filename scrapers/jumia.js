const sc = require('scrape-it');
const changeCase = require('change-case')
module.exports = (phone, query) =>{
query = changeCase.paramCase(query);
phone = changeCase.paramCase(phone);
console.log("Jumia: ${phone} : ${query}");
return sc(`https://www.jumia.co.ke/smartphones/${phone}/?q=${query}&bcsq=1`, {
	products:{
		listItem: '.products',
		data: {
			item: 'span.name',
			price: 'span.price strong',
			image: {
        			selector: "img.lazy.image",
				      attr: "data-src"
    			},
			link: {
				selector: "a.link",
				attr: "href"
			}
		},
	}
})
};
