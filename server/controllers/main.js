const axios = require('axios');
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=41210752a269dfb2e2a8167a0910c3a1&';

const getTableData = (req, res, db) => {
    db.select('*').from('favourites.cities')
        .then(items => res.json(items))
        .catch(err => res.status(400).json({dbError: 'db error'}))
};

const postTableData = (req, res, db) => {
    const cityname = req.query.cityname.toUpperCase();

    db.select('*').from('favourites.cities').where({cityname})
        .then(items => {
           if (items.length !== 0) {
               res.status(400).json({"dbError": "value already in database"});
           }
           else
               axios.get(API_URL + 'q=' + cityname)
                   .then(() => {
                       db('favourites.cities').insert({cityname})
                           .returning('*')
                           .then(item => {
                               res.json(item)
                           })
                           .catch(err => res.status(400).json({dbError: err.toString()}));
                   }).catch(err => res.status(400).json({dbError: "invalid cityname"}));
        });
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
