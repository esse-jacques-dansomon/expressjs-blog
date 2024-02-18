const User = require('./User');


const getUsers = async (req, res) => {
    res.send('respond with a resource');
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        return res.status(200).json({error: 'User not found', req : req.params});

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

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
}