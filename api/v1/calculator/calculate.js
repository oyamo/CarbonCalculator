const axios = require("axios")
const Calculation  = require('../../../models/calculation')

module.exports = (req, res) => {
    const weight = req.body.weight || 3000

    const start_zip = req.body.start_zip_code || null
    const stop_zip = req.body.stop_zip_code || null


    const response = {status :{status_code : 0, status_message : "Success", error_mesages: []}}
    const cloverlyApiKey = process.env.CLOVERLY_API_PRIVATE_KEY

    if(start_zip == null) response.status.error_mesages.push("Starting zip code is not valid")
    if(stop_zip == null) response.status.error_mesages.push("Stopping zip code is invalid")

    const post_data = {
        weight: {
            value : weight,
            units : 'kg'
        },
        from : {
            zip : start_zip,
        },
        to: {
            zip : stop_zip
        }
    }

    const config = {
        headers: {
            "Content-Type" : 'application/json',
            "Authorization": `Bearer private_key:${cloverlyApiKey}`
        }
    }

    const url = 'https://api.cloverly.com/2019-03-beta/estimates/carbon'
    axios
        .post(url, post_data, config)
        .then(resp =>{
            const calc = new Calculation({
                weight,
                start_zip,
                stop_zip,
                date: new Date(),
                user_id : req.user._id
            })

            calc.save((err, doc) => {

            })
            res.json(resp.data)
        })
        .catch(err => {
            res.json(err)
    })
}


