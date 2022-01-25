const axios = require('axios');
const cheerio = require('cheerio');



const parse = async () => {
    const getHTML = async (url) => {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    }; //  отправляем ссылку,  он возвращает готовый обьект  chherio

    const $ = await getHTML('https://www.aquapulse.biz/catalog/aksessuary-dlya-poliva?p');
    const pageNumber = $('.bx-pagination .bx-pagination-container ul li span').eq(-3).text();
    

    for (let i = 1; i <= pageNumber; i++) {
        const selector = await getHTML (
            `https://www.aquapulse.biz/catalog/aksessuary-dlya-poliva?page=${i}`
        );

        selector('.tabloid').each((i, element) => {
           const title = selector(element).find('span.b1c-name').text();
           console.log(title); 
           
        });
        
    }
}; 

parse();