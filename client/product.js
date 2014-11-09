/**
 * Created by Stuart on 11/5/14.
 */

nlpthreads.product = (function() {

    function makeProducts(title, description, price, url, imgUrl) {
        return {
            title: title,
            description: description,
            price: price,
            url: url,
            imgUrl: imgUrl
        }
    }

    function valid(prod) {
        if (typeof prod === 'object') {
            return Object.keys(prod).reduce(function(prev, current){
                return prev && Boolean(prod[current]);
            }, true);
        } else {
            return false;
        }
    }

    return {
        make: makeProducts,
        valid: valid
    }
})();
