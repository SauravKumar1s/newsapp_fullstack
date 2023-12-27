// const { User } = require("../models/user");


// router.get('/user/topics/:userId', async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ topics: user.topics });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching user topics', error: error.message });
//   }
// });

// module.exports = router;
