const Filter = require('../models/Filter');
let FilterManager = {};

FilterManager.saveFilter = async function(req, res){
    let { filter, mailsid, userid, username } = req.body;
    let fil = new Filter();
    fil.filter = filter;
    fil.mailsid = mailsid;
    fil.userid = userid;
    fil.username = username;
    let resSave = await fil.save();
    if ( resSave ){
        res.send({ok:true, filterId: resSave.id});
        return
    }
    res.send({ok:false, error: resSave})
};

FilterManager.getFilters =  async function(req, res){
    let filters = await Filter.find({}).exec();
    res.send(filters)
};



module.exports = FilterManager;

