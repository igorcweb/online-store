const express = require('express');
const router = express.Router();
const db = require('../../models/');

// @route GET api/products
// @access Public
router.get('/', (req, res) => {
  db.Product.find({})
    .then(products => res.json(products))
    .catch(err => res.json(err));
});

// @route GET api/products/xs
// @desc get unique clothing items
router.get('/xs', (req, res) => {
  db.Product.find({ size: 'XS' })
    .then(products => res.json(products))
    .catch(err => res.json({ err }));
});

// @route GET api/products/search/:query
// @access Public
router.get('/search/:query', (req, res) => {
  const query = req.params.query;
  db.Product.find({})
    .then(products => {
      const results = [];
      products.forEach(product => {
        if (
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query)
        ) {
          results.push(product);
        }
      });
      res.json(results);
    })
    .catch(err => res.json({ err }));
});

// @route GET api/products/:name/:size
//dexc get product by name and size
router.get('/:name/:size', (req, res) => {
  const name = req.params.name.replace(/\+/g, ' ');
  const size = req.params.size;
  console.log('name, size');
  db.Product.find({ name, size })
    .then(product => {
      res.json(product);
    })
    .catch(err => res.json({ err }));
});

// @route POST api/products/
// @access Private
// @desc add new product
router.post('/', (req, res) => {
  db.Product.collection
    .insertOne(req.body)
    .then(data => {
      console.log(data.insertedCount + ' record inserted!');
      res.json({ message: 'success' });
      process.exit(0);
    })
    .catch(err => {
      res.json({ err });
      process.exit(1);
    });
});

// @route GET api/products/:id
// @access Private
// @desc delete product
router.delete('/product/:id', (req, res) => {
  const id = req.params.id;
  db.Product.findByIdAndDelete(id)
    .then(() => res.json({ message: 'success' }))
    .catch(err => res.json({ err }));
});

// @route GET api/products/:category
// @access Public
router.get('/:category', (req, res) => {
  let category = req.params.category;
  category = category.charAt(0).toUpperCase() + category.slice(1);
  db.Product.find({ category })
    .then(products => {
      res.json(products).catch(err => res.json({ err }));
    })
    .catch(err => res.json({ err }));
});

// @route GET api/products/:id
// @access Public
router.get('/product/:id', (req, res) => {
  const id = req.params.id;
  db.Product.findById(id)
    .populate('ratings')
    .exec()
    .then(product => res.json(product))
    .catch(err => res.render({ err }));
});

// @route PUT api/products/:id
// @desc update product inStock value
router.put('/instock/:id', (req, res) => {
  const id = req.params.id;
  const inStock = req.body.inStock;
  db.Product.findByIdAndUpdate(id, {
    $set: { inStock }
  })
    .then(() => res.json({ msg: 'success' }))
    .catch(err => res.json(err));
});

router.put('/rating/:name', (req, res) => {
  const name = req.params.name.replace(/\+/g, ' ').replace(/percent/g, '%');
  const rating = req.body.rating;
  db.Product.find({ name })
    .then(response => {
      response.forEach(product => {
        const id = product.id;
        const total = product.rating.total;
        db.Product.findByIdAndUpdate(id, {
          $inc: { 'rating.number': 1 },
          $set: {
            'rating.total': parseInt(total) + parseInt(rating)
          }
        })
          .then(() => res.json({ msg: 'success' }))
          .catch(err => res.json({ err }));
      });
    })
    .catch(err => res.json({ err }));
});

module.exports = router;
