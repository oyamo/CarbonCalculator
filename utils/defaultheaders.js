module.exports = (req, res, next) => {

    res.set("Access-Control-Allow-Origin", "*");
    res.set(
        "Access-Control-Allow-Headers",
        "*"
    );

    res.set("Pragma", "no-cache")
    res.set("Cache-control", "no-cache")
    res.set("x-powered-by", null)
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }

    next();
}