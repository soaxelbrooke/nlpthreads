/**
 * Created by Stuart on 11/5/14.
 */

nlpthreads.init.push(function() {

    nlpthreads.view = (function() {
        var resultsContainer = document.querySelector('#results-container');

        function makeProductTile(product) {
            var ele = document.createElement('div');
            ele.className = "product-tile";
            var link = document.createElement('a');
            link.href = product.url;
            var img = document.createElement('img');
            img.src = product.imgUrl;
            var title = document.createElement('span');
            title.className = 'title';
            title.innerText = product.title;
            var price = document.createElement('div');
            price.className = 'price';
            price.innerText = '$' + product.price;

            link.appendChild(img);
            link.appendChild(title);
            ele.appendChild(link);
            ele.appendChild(price);

            return ele;
        }

        function updateResults() {
            nlpthreads.search.results
                .filter(nlpthreads.product.valid)
                .map(makeProductTile)
                .map(function(ele) {resultsContainer.appendChild(ele)});
        }

        function clearResults() {
            while (resultsContainer.firstChild) {
                resultsContainer.removeChild(resultsContainer.firstChild);
            }
        }

        return {
            updateResults: updateResults,
            clearResults: clearResults
        }
    })();

});
