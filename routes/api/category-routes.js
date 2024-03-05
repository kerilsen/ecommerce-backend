const router = require('express').Router();
const { Category, Product } = require('../../models');

// Find all categories and include its associated Products
router.get('/', async (req, res) => {
  try {
    const result = await Category.findAll({ include: [{ model: Product }] });
    res.json(result);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'An error occurred while fetching all categories' })
  }
});

// Find one category by its 'id' value including its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const result = await Category.findOne({ where: { id: categoryId }, include: [{ model: Product }] });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching this category' })
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    console.log(`Successfully created new category`);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating a new category' })
  }
});

// Update a category by its 'id' value
router.put('/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    await Category.update(req.body, {
      where: {
        id: categoryId,
      }
    });
    res.status(200).json('Category has been updated');
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the category' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (deleteCategory) {
      res.status(200).json({ Message: 'Category has been deleted' });
    } else {
      res.status(404).json({ Message: 'Category not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;