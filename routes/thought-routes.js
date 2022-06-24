const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../controllers/thought-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts);

router
  .route('/:thoughtId')
  .get(getThoughtById);

router
  .route('/:userId')
  .post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .put(updateThought)
  .delete(removeThought);

router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// /api/thoughts/<thoughtId>/<reactionId>
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;
