var axios = require("axios");
var cheerio = require ("cheerio");

var scrape = function(){
    return axios.get("https://people.com/beauty/").then(function(res){
        var $ = cheerio.load(res.data);
        console.log("scraping");

        var articles = [];

        $(".category-page-item").each(function(i, element){

            var title =$(this)
            .find(".category-page-item-title")
            .text()
            .trim()

            var url = $(this)
            .find("a")
            .attr("href");

            var description = $(this)
            .find (".category-page-item-description")
            .text()
            .trim();

            var image = $(this)
            .find ("img")
            .attr("src");

            if (title && sum && url){
                var titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var descriptionNeat = description.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataAdd = {
                    headline: titleNeat,
                    summary: descriptionNeat,
                    url: "https://people.com/beauty/" + url,
                    image: "https://people.com/beauty/" + image,
                };
                articles.push(dataAdd);
            }

        });
        return articles;
    })
};

module.exports = scrape;