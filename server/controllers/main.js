const axios = require('axios');
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=f51bcfb8b207b0ef58ce10da80b90477&';


const getTableData = (req, res, db) => {
    db.select('*').from('favourites.cities')
        .then(items => res.json(items))
        .catch(err => res.status(400).json({dbError: 'db error'}))
};

const postTableData = (req, res, db) => {
    const cityname = req.query.cityname;

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
