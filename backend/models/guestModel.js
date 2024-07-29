const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuestSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true
    }
});
  
// Static method for logging in a guest user
GuestSchema.statics.login = async function(email) {
    if (!email) {
        throw Error('Email must be provided');
    }

    let user = await this.findOne({ email });

    if (!user) {
        user = await this.create({ email });
    }

    return user;
};
  
module.exports = mongoose.model('Guest', GuestSchema);