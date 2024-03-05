const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
  const condition = { include: [ { model: Product } ] };
  const result = performModelOperation(Tag, 'findAll', condition);
  res.json(result);
  } catch(error) {
    res.status(500).json({ error: 'An error occurred while fetching all tags'})
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagId = req.params.id;
    Tag.findByPk(tagId);
    // Tag.findOne({ where: { id: tagId }, include: [{ model: Product }] })
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching this tag' })
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a tag by its `id` value
  const tagId = req.params.id;
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: tagId
      }
    });

    if (deleteTag) {
      res.status(200).json({ Message: 'Tag has been deleted' });
    } else {
      res.status(404).json({ Message: 'Tag not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;