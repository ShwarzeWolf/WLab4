const getTableData = (req, res, db) => {
    db.select('*').from('favourites.cities')
        .then(items => {
            if(items.length){
                res.json(items)
            } else {
                res.json({dataExists: 'false'})
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
};

const postTableData = (req, res, db) => {
    const cityid = req.query.cityid;
    const cityname = req.query.cityname;

    db('favourites.cities').insert({cityid, cityname})
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
};

const deleteTableData = (req, res, db) => {
    const cityid = req.query.cityid;

    console.log(cityid);
    db('favourites.cities').where({cityid}).del()
        .then(() => {
            res.json({delete: 'true'})
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
};

module.exports = {
    getTableData,
    postTableData,
    deleteTableData
};
