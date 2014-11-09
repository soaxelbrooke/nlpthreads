/**
 * Created by Stuart on 11/5/14.
 */

nlpthreads.init.push(function() {
    nlpthreads.search = (function() {
        var shopsensePid = 'uid2169-24000763-90';
        var searchBox = document.querySelector('#search-input');
        var searchButton = document.querySelector('#search-button');
        var numSearches = 0;
        var resultMap = {};
        var startTime;

        searchBox.addEventListener('change', keywordsUpdated, false);
        searchButton.addEventListener('click', submitSearch, false);

        function keywordsUpdated() {
            nlpthreads.search.keywords = searchBox.value}

        function searchProsperent(keywords, callback) {
            var url = 'http://api.shopstyle.com/api/v2/products?';
            url += 'pid=' + shopsensePid;
            url += '&fts=' + encodeURIComponent(keywords);

            nlpthreads.xhr({url: url, callback: callback, method: 'GET'});
        }

        function prosperentProduct(prod) {
            return nlpthreads.product.make(prod.name, prod.description,
                prod.price, prod.pageUrl, prod.image.sizes.Best.url);
        }

        function submitSearch() {
            var xhrs;
            numSearches = 1;
            nlpthreads.search.results = [];
            resultMap = {};
            startTime = (new Date()).getTime();
            xhrs = [searchProsperent(nlpthreads.search.keywords, saveResults)];
            nlpthreads.search.keywords.split(' ').map(function(kw) {
                xhrs.push(searchProsperent(kw, saveResults));
                numSearches += 1;
            });
        }

        function saveResults(results) {
            nlpthreads.search.results = nlpthreads.search.results
                .concat(JSON.parse(results.responseText)
                    .products.map(prosperentProduct));
            for (var product in JSON.parse(results.responseText).products) {
                if (!resultMap.hasOwnProperty(product.url)) {
                    nlpthreads.search.results.push(product);
                    resultMap[product.url] = product;
                }
            }
            console.log("Result received at " +
                ((new Date()).getTime() - startTime) + " ms.");
            nlpthreads.view.clearResults();
            nlpthreads.view.updateResults();
        }

        return {
            searchProsperent: searchProsperent,
            submit: submitSearch,
            results: [],
            keywords: ''
        }
    })();
});

