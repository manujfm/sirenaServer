const Mail = require('../models/Mail');
let MailsManager = () => {};


MailsManager.getMails = async function (req, res, next) {
    let mails = await Mail.find({}).exec();
    res.send(mails)

};

MailsManager.saveMails = async function (req, res, next) {
    const mails =  req.body.mails;
    let saveRes = await Mail.collection.insertMany(mails);
    if ( !saveRes ) res.send({ok: false, error:saveRes}).end();
    res.send({ok:true, error:""})
};





module.exports = MailsManager;