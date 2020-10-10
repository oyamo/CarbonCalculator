const assert = require('assert');
const validator = require('../utils/validator')
describe('Email Validation', ()=>{
    it("Should be true: Email with alphanumeric", ()=>{
        assert.strictEqual(true,validator.with("oyamobrian8@gmail.com").isEmail().exec())
    })
    it('Should be true: Email with -,. symbols', ()=>{
        assert.strictEqual(true, validator.with("oyamo-brian.xyz@yahoo-mail.com").isEmail().exec())
    })
    it('Should be false: email with unwanted symbols',()=>{
        assert.strictEqual(false,validator.with('ouamo>>@gmail.com').isEmail().exec())
    })

})

describe("Telephone Number test", ()=>{
    it("Should be more than 10 chars", ()=>{
        assert.strictEqual(false, validator.with("902848").isTelephone().exec())
    })
    it("Only include numbers , - , +, (, )", ()=>{
        assert.strictEqual(false,  validator.with("+09.930484048").isTelephone().exec())
    })
    it("Number with country code", ()=>{
        assert.strictEqual(true, validator.with('+25479028173').isTelephone().exec())
    })

})