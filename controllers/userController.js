const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      .select('-__v');
      
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriendToFriendList (req, res) {
    try {
      const user = await User.findOneAndUpdate({  _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID'});
      }

      await User.updateOne({ _id: { $push: user.friends }});
      res.json({ message: 'Friend added to users friend list'});
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteFriendFromFriendList (req, res) {
    try {
      const user = await User.findOneAndDelete({  _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID'});
      }

      await User.deleteOne({ _id: { $pop: user.friends }});
      res.json({ message: 'Friend deleted from users friend list'});
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
