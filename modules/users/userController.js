const User = require('./User');


const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({error: 'No users found'});
        }
        res.status(200).json({
            message: 'Users found',
            data: users
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error', message: error.message});
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        res.status(200).json({
            message: 'User found',
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error', message: error.message});
    }

}

const updateUser = async (req, res) => {
    res.send('respond with a resource');
}

const deleteUser = async (req, res) => {
    res.send('respond with a resource');
}

const followUser = async (req, res, next) => {
    try {
        // 1. Get the user to follow
        const id = req.params.id;
        const userToFollow = await User.findById(id);
        if (!userToFollow) {
            return res.status(404).json({error: 'User not found'});
        }
        // 2. Get the user that wants to follow
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        // 3. Check if the user is already following the user
        if (user.following.includes(id)) {
            return res.status(400).json({error: 'User already followed'});
            // const error = new Error('User already followed');
            // error.statusCode = 400;
            // next(error);
        }
        // 4. Verify that the user is not trying to follow himself
        if (user._id.toString() === id) {
            return res.status(400).json({error: 'You cannot follow yourself'});
            // const error = new Error('You cannot follow yourself');
            // error.statusCode = 400;
            // next(error);
        }
        // 5. Follow the user
        user.following.push(userToFollow._id);
        userToFollow.followers.push(user._id);
        await user.save();
        await userToFollow.save();

        res.status(200).json({
            message: 'User followed',
            data: user
        });

    }catch (e) {
        next(e);
    }

}

const unfollowUser = async (req, res) => {
    // 1. Get the user to unfollow
    const id = req.params.id;
    const userToUnfollow = await User.findById(id);
    if (!userToUnfollow) {
        return res.status(404).json({error: 'User not found'});
    }
    // 2. Get the user that wants to unfollow
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }
    // 3. Check if the user is already following the user
    if (!user.following.includes(id)) {
        return res.status(400).json({error: 'User not followed'});
    }
    // 4. Verify that the user is not trying to unfollow himself
    if (user._id.toString() === id) {
        return res.status(400).json({error: 'You cannot unfollow yourself'});
    }

    // 5. Unfollow the user
    user.following.pull(userToUnfollow._id);
    userToUnfollow.followers.pull(user._id);
    await user.save();
    await userToUnfollow.save();

    res.status(200).json({
        message: 'User unfollowed',
        data: user
    });
}

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser
}