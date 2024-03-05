const router = require('express').Router();
const { Tag, Product } = require('../../models');

router.get('/', async (req, res) => {
  // Find all tags and associated Product data
  try {
    const result = await Tag.findAll({ include: [{ model: Product }] });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching all tags' })
  }
});

router.get('/:id', async (req, res) => {
  // Find a single tag by its `id` with its associated Product data
  try {
    const tagId = req.params.id;
    const result = await Tag.findOne({ where: { id: tagId }, include: [{ model: Product }] });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching this tag' })
  }
});

router.post('/', async (req, res) => {
  console.log('POST tag has been fired', req.body)
  // Create a new tag
  try {
    const data = await Tag.create(req.body);
    console.log(`Successfully created new tag`, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating a new tag' })
  }
});

router.put('/:id', async (req, res) => {
  // Update a tag's name by its id value
  const tagId = req.params.id;
  try {
    await Tag.update(req.body, {
      where: {
        id: tagId,
      }
    });
    res.status(200).json(`Tag with id ${tagId} has been updated`);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the tag' });
  }
});

router.delete('/:id', async (req, res) => {
  // Delete a tag by its id value
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
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;