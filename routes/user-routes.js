const router = require('express').Router();

const {
    getAllUsers,
    getUserId,
    createUser,
    updateUser,
    deleteUser,
    postFriend,
    deleteFriend
} = require('../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

//the friend route should be above the user/:id route because of the order of specifity 
router
  .route('/:userId/friend/:friendId')
  .post(postFriend)
  .delete(deleteFriend)

// /api/user/:id
router
  .route('/:id')
  .get(getUserId)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
