const User = require('../models/User');

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        console.log("user in contrller",user)

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
        console.log("user in contrller",user)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
