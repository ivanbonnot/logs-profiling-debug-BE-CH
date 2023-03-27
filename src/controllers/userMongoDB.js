const userModel = require("../models/userModel")

class ControllerMongoDb {

    saveUser = async (userToAdd) => {
        const user = new userModel(userToAdd);
        await user.save();
        console.log("guardado", user)
    };

    getAll = async () => await userModel.find({});

    getUser = async (email) => await userModel.findOne({ email: email });

    updateUser = async (id, userToUpdate) => {
        return await userModel.updateOne(
            { _id: id },
            { $set: { ...userToUpdate } }
        );
    };

    deleteUser = async (id) => await userModel.deleteOne({ _id: id });
}


const userController = new ControllerMongoDb()
module.exports = userController;