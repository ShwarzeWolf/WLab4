const getTableData = (req, res, db) => {
    db.select('*').from('favourites.cities')
        .then(items => res.json(items))
        .catch(err => res.status(400).json({dbError: 'db error'}))
};

const postTableData = (req, res, db) => {
    const cityname = req.query.cityname;
    let shouldInsert = true;

    db.select('*').from('favourites.cities').where({cityname})
        .then(items => {
           if (items.length !== 0) {
               res.json({'db error': 'value already exists'});
               shouldInsert = false;
           }
        });

    if (shouldInsert)
        db('favourites.cities').insert({cityname})
            .returning('*')
            .then(item => {
                res.json(item)
            })
            .catch(err => res.status(400).json({dbError: 'db error'}))
};

const deleteTableData = (req, res, db) => {
    const id = req.query.cityid;

    db('favourites.cities').where({id}).del()
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
