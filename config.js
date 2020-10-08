const config = {
    production: {
        SECRET: process.env.SECRET||'(#TheRunAwayTh137H4sB33nC4uGT%)',
        DATABASE: process.env.MONGODB_URI || 'mongodb://localhost:27017',
        JWT_LOCATION: 'COOKIES',
        TOKEN_LIFE: 3600000,
        REFRESH_TOKEN_SECRET:'HshjBHSh9H8HShshs0(()(hhHHbd(*#hhd',
        RESET_TOKEN: 'G703727gwgdhghwd83843098430984hhswjdskhkksgfsgf830849038hwdgwggw',
        REFRESH_TOKEN_LIFE: 3600000,
        RESET_LIFE: 3600000
    },
    default: {
        SECRET: "s3cr3tk34#",
        DATABASE: 'mongodb://localhost:27017',
        JWT_LOCATION: 'COOKIES',
        TOKEN_LIFE: 360000,
        REFRESH_TOKEN_SECRET:'HshjBHSh9H8HShshs0(()(hhHHbd(*#hhd',
        RESET_TOKEN: 'DDUIDU09280828*())&)&hhswdkgwgjgfgMYSQJAKILOVESOME DOIENE)()()SECRET',
        REFRESH_TOKEN_LIFE: 86400,
        RESET_LIFE: 3600000
    }
}

exports.get = function get(env){
    return config[env] || config.default
}