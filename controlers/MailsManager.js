const Mail = require('../models/Mail');
let MailsManager = () => {};


MailsManager.getMails = async function (req, res, next) {
    let mails = await Mail.find({}).exec();
    res.send(mails)

};

MailsManager.saveMails = async function (req, res, next) {
    const mail =  req.body;
    let saveRes = await Mail.collection.insertMany(mail);
    if ( !saveRes ) res.send({ok: false, error:saveRes}).end();
    res.send({ok:true, error:""})
};





module.exports = MailsManager;