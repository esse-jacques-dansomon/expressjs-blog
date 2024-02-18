const User = require('./User');
const bcrypt = require("bcryptjs");


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

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        //1 - verifier si l'utilisateur existe
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        //2 - verifier si user est bloqué
        if (user.isBlocked || !user.active) {
            return res.status(400).json({error: 'User blocked'});
        }
        //3 - verifier si l'utilisateur est un admin
        if (user.role === 'Admin') {
            return res.status(400).json({error: 'User not found'});
        }
        console.log(req.userId)
        if(user.blockedUsers.includes(req.userId)) {
            return res.status(400).json({error: 'You have been blocked by User'});
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

const deleteUser = async (req, res, next) => {
      try {
          const id = req.params.id;
          const user = await User.findById(id);
          if (!user) {
              return res.status(404).json({error: 'User not found'});
          }
          await user.deleteOne();

          res.status(200).json({
              message: 'User deleted',
              data: user
          });
      }catch (e) {
            next(e);
      }
}

const getMyFollowers = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const followers = await User.find({_id: {$in: user.followers}},'-password -createdAt -updatedAt');
        if (!followers) {
            return res.status(404).json({error: 'No followers found'});
        }

        res.status(200).json({
            message: 'Followers found',
            data: followers
        });
    } catch (error) {
        next(error);
    }

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

const blockUser = async (req, res) => {
    // 1. Get the user to block
    const id = req.params.id;
    const userToBlock = await User.findById(id);
    if (!userToBlock) {
        return res.status(404).json({error: 'User not found'});
    }
    // 2. Get the user that wants to block
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }

    // 4. Verify that the user is not trying to block himself
    if (user._id.toString() === id) {
        return res.status(400).json({error: 'You cannot block yourself'});
    }

    userToBlock.isBlocked = ! userToBlock.isBlocked;
    userToBlock.active = !userToBlock.isBlocked;


    // 5. Block the user: set isBlocked
    await userToBlock.save();

    res.status(200).json({
        message: 'User blocked',
        data: userToBlock
    });
}

const blockUserAsUser = async (req, res) => {
    // 1. Get the user to block
    const id = req.params.id;
    const userToBlock = await User.findById(id);
    if (!userToBlock) {
        return res.status(404).json({error: 'User not found'});
    }
    // 2. Get the user that wants to block
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }
    // 3. Verify that the user is not trying to block himself
    if (user._id.toString() === id) {
        return res.status(400).json({error: 'You cannot block yourself'});
    }

    // 4. verify that the user is not trying to block an admin
    if (userToBlock.role === 'Admin') {
        return res.status(400).json({error: 'You cannot block an admin'});
    }

    // 5. verify is the user is not trying to block a blocked user
    if (userToBlock.isBlocked) {
        return res.status(400).json({error: 'User already blocked'});
    }

    // 6.add the user to the list of blocked users
    user.blockedUsers.push(userToBlock._id);
    // 7. remove the user from the list of following if he is following the user
    if (user.following.includes(userToBlock._id)) {
        user.following.pull(userToBlock._id);
    }
    // 8 remove the user from the list of followers if he is following the user
    if (user.followers.includes(userToBlock._id)) {
        user.followers.pull(userToBlock._id);
    }

    // 9. remove the user from the list of following of the user to block
    if (userToBlock.following.includes(user._id)) {
        userToBlock.following.pull(user._id);
    }

    // 10. remove the user from the list of followers of the user to block
    if (userToBlock.followers.includes(user._id)) {
        userToBlock.followers.pull(user._id);
    }

    //11 save the user and the user to block
    await user.save();
    await userToBlock.save();

    res.status(200).json({
        message: 'User blocked',
        data: userToBlock
    });

}

const createUser = async (req, res) => {
    try {
        const {fistName, name, email, password, role} = req.body;
        const user = await User
            .findOne({email});

        if (user) {
            return res.status(400).json({error: 'User already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            fistName,
            name,
            email,
            password: hashedPassword,
            role
        });
        res.status(201).json({message: 'User created successfully', user: newUser});

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error', message: error.message});

    }
}

const createTestUsers = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("password", salt);
        const users = [
            {
                fistName: 'guest',
                name: 'Doe',
                email: 'guest@gmail.com',
                password: hashedPassword,
                role: 'Guest',
            },
            {
                fistName: 'user',
                name: 'Doe',
                email: 'user@gmail.com',
                password: hashedPassword,
                role: 'User'
            },
            {
                fistName: 'admin',
                name: 'Doe',
                email: 'admin@gmail.com',
                password:hashedPassword,
                role: 'Admin',
            },
        ];
        //1-verifier si les 3 users existent déjà
        const allUsers = await User.find();

        //2- si les 3 users existent déjà, retourner un message
        if(
            users.filter(user => user.email === 'admin@gmail.com').length === 1 &&
            users.filter(user => user.email === 'user@gmail.com').length === 1 &&
            users.filter(user => user.email === 'guest@gmail.com').length === 1
        ) {
           return  res.status(201).json({
                message: 'Users created',
                data: users
            });
        }

        const createdUsers = await User.create(users);
       return  res.status(201).json({
            message: 'Users created',
            data: createdUsers
        });
    } catch (error) {
    }
}

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser,
    blockUser,
    blockUserAsUser,
    createUser,
    createTestUsers,
    getMyFollowers
}