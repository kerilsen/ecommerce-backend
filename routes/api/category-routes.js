const router = require('express').Router();
const { Category, Product } = require('../../models');
// const modelOperation = require('../../controllers/apiController.js');

// Find all categories and include its associated Products
router.get('/', async (req, res) => {
  try {
    const result = await Category.findAll({ include: [{ model: Product }] });
    // const result = await modelOperation('Category', 'findAll', '{ include: [{ model: Product }] }');
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

router.post('/', async (req, res) => {
  try {
    const result = await Category.create(req.body);
    console.log(result.toJSON());
    // res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating a new category' })
  }
});

// // Update a category by its 'id' value
// router.put('/:id', (req, res) => {
//   condition = { where: { id: req.params.id } };
//   const result = modelOperation(Category, 'update', condition, req.body);
//   res.json(result);
// });

// router.delete('/:id', async (req, res) => {
//   // delete a category by its `id` value
//   const categoryId = req.params.id;
//   try {
//     const deleteCategory = await Category.destroy({
//       where: {
//         id: categoryId
//       }
//     });

//     if (deleteCategory) {
//       res.status(200).json({ Message: 'Category has been deleted' });
//     } else {
//       res.status(404).json({ Message: 'Category not found' });
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;