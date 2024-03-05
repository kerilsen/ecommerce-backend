const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Get all products
router.get('/', async (req, res) => {
  try {
    const result = await Product.findAll({ include: [{ model: Category }, { model: Tag }] });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occured while fetching all products' });
  }
});

// Get one product
router.get('/:id', async (req, res) => {
  // Find a single product by its `id`
  try {
    const productId = req.params.id;
    const result = await Product.findOne({ where: { id: productId }, include: [{ model: Category }, { model: Tag }] });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching this product' })
  }
});

// Create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      "product_name": "Cooler",
      "price": 200.00,
      "stock": 10,
      "tagIds": [3, 4, 5, 6]
    }

    {
      "tag_name": "As Seen on TV"
    }

    {
      "category_name": "Jackets"
    }
  */
  try {
    const result = await Product.create(req.body);
    // If there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: result.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }
    // If no product tags, just respond
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  };
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    // Update product data
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id }
      });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const deleteProduct = await Product.destroy({
      where: { id: req.params.id }
    });
    if (deleteProduct) {
      res.status(200).json({ Message: 'Product has been deleted' });
    } else {
      res.status(404).json({ Message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
