const User = require('../../../models/user')
const Validator = require('../../../utils/validator')

function AddNew(req, res) {
    const email = req.body['email'];
    const fname = req.body['fname'];
    const lname = req.body['lname'];
    const password = req.body['password'];
    const telephone = req.body['telephone'];
    const address = req.body['address'];
    const age = req.body['age'];
    const state = req.body['state'];
    const country = req.body['country'];

    let error_mesages = []
    if (!Validator.with(email).isEmail().exec()) {
        error_mesages.push("Email not valid")
    }

    if (!Validator.with(fname, lname).isOnlyLetters().and.hasMinLen(1).and.hasMaxLen(20).exec()) {
        error_mesages.push("First name or Last name invalid");
    }

    if (!Validator.with(password).hasMinLen(8).and.hasMaxLen(50).exec()) {
        error_mesages.push("Password length not valid");
    }

    if (!Validator.with(telephone).isTelephone().exec()) {
        error_mesages.push("Telephone invalid");
    }

    if (!Validator.with(country, state, address).hasMinLen(8).and.hasMaxLen(50).exec()) {
        error_mesages.push("Country, state or address not valid");
    }

    if (!Validator.with(age).isDigits().exec() && age < 150 && age > 17) {
        error_mesages.push("Illegal age");
    }

    reponse = {}

}