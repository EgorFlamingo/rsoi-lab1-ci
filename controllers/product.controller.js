const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
}

exports.start_app = function(req, res){
	res.sendFile(startPage, function(err){
		if (err)
			return console.log('Start page error');
	})
}

// POST
exports.product_create = function (req, res) {
    var product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return res.sendStatus(404);
        }
        res.send('Product Created successfully')
    })
};

// GET
exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return res.sendStatus(404);
        res.send(product);
    })
};

// PUT
exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return res.sendStatus(404);
        res.send('Product udpated.');
    });
};

// DELETE
exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.sendStatus(404);
        res.send('Deleted successfully!');
    })
};