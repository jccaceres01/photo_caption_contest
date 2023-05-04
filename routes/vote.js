const express = require('express');
const router = express.Router();
const {
  getVotes,
  getVote,
  createVote,
  updateVote,
  deleteVote
} = require('../controllers/vote');

const { upload } = require('../utils/handleStorage');
const { validateToken } = require('../utils/handleToken');

const {
  requestVoteValidator,
  creatVoteValidator,
  updateVoteValidator
} = require('../validators/vote');

router.get('/', validateToken, getVotes);
router.get('/:id', validateToken, requestVoteValidator, getVote);
router.post('/', validateToken, upload.single('photo'), creatVoteValidator, createVote);
router.put('/:id', validateToken, requestVoteValidator, updateVoteValidator, updateVote);
router.delete('/:id', validateToken, requestVoteValidator, deleteVote);

module.exports = router;
