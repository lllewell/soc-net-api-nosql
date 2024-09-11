const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  getVideoResponses,
  createThought,
  updateThought,
  deleteThought,
  addVideoResponse,
  removeVideoResponse,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:videoId/responses')
  .get(getVideoResponses)  
  .post(addVideoResponse);

// /api/videos/:videoId/responses/:responseId
router.route('/:videoId/responses/:responseId').delete(removeVideoResponse);

module.exports = router;
