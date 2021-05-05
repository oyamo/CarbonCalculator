

function generate_report(req, res, next) {
    res.json({status : { status_code : 0, status_message : "Report will be sent to email"}})
}

module.exports = generate_report