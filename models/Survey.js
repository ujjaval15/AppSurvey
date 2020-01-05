const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User'},  // To relate the surevey belong to which user in DB
                                                        //Ref belong to user collection ,id belong to user 
                                                        //_ is as per standared that this is in relation filed with other collection , not rquired _
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);