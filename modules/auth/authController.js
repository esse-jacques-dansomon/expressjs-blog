const User = require("../users/User");
const bcrypt = require("bcryptjs");
const utils = require("../../utils/auth");

const register = async (req, res, next) => {
    const {fistName, name, email, password, confirm_password} = req.body;
    try {
        // 1- Check if user already exists
        const user = await User.findOne({email});
        if (user) {
            const error = new Error('User already exists');
            error.statusCode = 400;
            return next(error);
        }
        // 2- Check if password and confirm_password are the same
        if (password !== confirm_password) {
            return res.status(400).json({error: 'Passwords do not match'});
        }

        // 4- encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // 5- Create new user
        const newUser = new User({
            fistName,
            name,
            email,
            password: hashedPassword,
            active: true,
        });

        // Save user to database
        await newUser.save();
        res.status(201).json({message: 'User created successfully', user: newUser});
    } catch (error) {
       next(error);
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        // 1- Check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({error: 'User does not exist'});
        }
        // 2- Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({error: 'Invalid password'});
        }

        //-3 - check if user is blocked
        if (user.isBlocked) {
            return res.status(400).json({error: 'User is blocked'});
        }
        //-4- Check if user is active
        if (!user.active) {
            return res.status(400).json({error: 'User is not active'});
        }

        // 5- Create and assign a token
        const token = utils.generateToken(user._id);

        res.json({
            message: 'User logged in successfully',
            token: token,
            type: 'Bearer',
            refresh_token: '',
            user: {
                id: user._id,
                fistName: user.fistName,
                name: user.name,
                email: user.email,
                active: user.active,
                role: user.role,
                numberArticles: user.numberArticles,
                followers: user.followers,
                following: user.following,
                articles: user.articles
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error', message: error.message});
    }
}

const getConnectedUser = async (req, res, next) => {
    try {
        const id = req.userId;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        res.status(200).json({
            message: 'User found',
            data : {
                fistName: user.fistName,
                name: user.name,
                email: user.email,
                active: user.active,
                role: user.role,
                numberArticles: user.numberArticles,
                followers: user.followers,
                following: user.following

            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error', message: error.message});
    }
}
const logout = async (req, res) => {

}

const forgotPassword = async (req, res) => {
    res.send('respond with a resource');
}

const resetPassword = async (req, res) => {
    res.send('respond with a resource');
}

module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    getConnectedUser
}