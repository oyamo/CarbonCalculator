/**
 *
 * Minimal | Fast Validation Js Code. **
 * Can be ported into any js/es/ts **
 * Results obtained by running the exec method
 * @author Oyasis
 */
class Validator {
    constructor(payload) {
        this._payload = payload;
        this._len = payload.length;
        // Validation holders
        this._isEmail = false;
        this._isTelephone = false;
        this._isIPV4 = false;
        this._isIPV6 = false;
        this._isURL = false;
        this._isFTPURL = false;
        this._hasLength = false;
        this._hasMinLen = false;
        this._hasMaxLen = false;
        this._isDigits = false;
        this._isOnlyLetters = false
        // The results of the validation
        this._result = [];
        this._resultVerbose = [];
        this._nextLogical = null; // For our smart syntax; dealing with  ( and | or)
    }


    /**
     *
     * @param p
     * @returns {Validator}
     * Singleton access
     */
    static with(p) {
        const vd = new Validator(p);
        return vd;
    }


    /**
     * Tests if the payload is an email address
     * @returns {Validator}
     */
    isEmail() {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        this._isEmail = re.test(this._payload);
        this._result.push(this._isEmail);
        this._resultVerbose.push({isEmail: this._isEmail});
        return this;
    }


    /**
     * Tests if the payload is a url.
     * It only works with http|https schemes.
     * Can detect url-encoded strings with query-strings embedded
     * @returns {Validator}
     */
    isUrl(validateScheme = true) {
        const re1 = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
        const re2 = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
        if (validateScheme) {
            this._isURL = re1.test(this._payload);
        } else {
            this._isURL = re2.test(this._payload);
        }
        this._result.push(this._isURL);
        this._resultVerbose.push({isUrl: this._isURL});
        return this;
    }

    /**
     * Validates ipV4 addresses
     * @returns {Validator}
     */
    isIPV4() {
        const re = /$((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$/;
        this._isIPV4 = re.test(this._payload);
        this._result.push(this._isIPV4);
        this._resultVerbose.push({isIPV4: this._isIPV4});
        return this;
    }


    /**
     * Matches IPV6
     * @returns {Validator}
     */
    isIPV6() {
        const re = new RegExp(`(
                            ([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|
                            ([0-9a-fA-F]{1,4}:){1,7}:|
                            ([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|
                            ([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}| 
                            ([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}| 
                            ([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}| 
                            ([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|
                            [0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|
                            :((:[0-9a-fA-F]{1,4}){1,7}|:)|
                            fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|    
                            ::(ffff(:0{1,4}){0,1}:){0,1}
                            ((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}
                            (25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|       
                            ((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}
                            (25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])
                            )`.trim());
        this._isIPV6 = re.test(this._payload);
        this._result.push(this._isIPV6);
        this._resultVerbose.push({isIPV6: this._isIPV6});
        return this;
    }

    /**
     * Matches telephone numbers
     * @returns {Validator}
     */
    isTelephone() {
        const re = /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/
        this._isTelephone = re.test(this._payload);
        this._result.push(this._isTelephone);
        this._resultVerbose.push({isTelephone: this._isTelephone});
        return this;
    }


    /**
     *
     * @param n
     * @returns {Validator}
     */
    hasLength(n) {
        this._hasLength = this._len === n;
        this._result.push(this._hasLength);
        this._resultVerbose.push({hasLength: this._hasLength});
        return this;
    }

    /**
     *
     * @param n
     * @returns {Validator}
     */
    hasMinLen(n) {
        this._hasMinLen = this._len >= n;
        this._result.push(this._hasMinLen);
        this._resultVerbose.push({_hasMinLen: this._hasMinLen});
        return this;
    }

    /**
     *
     * @param n
     * @returns {Validator}
     */
    hasMaxLen(n) {
        this._hasMaxLen = this._len <= n;
        this._result.push(this._hasMaxLen);
        this._resultVerbose.push({hasMaxLen: this._hasMaxLen});
        return this;
    }


    /**
     * Validates whether the input is all digits
     * @returns {Validator}
     */
    isDigits() {
        const re = /^[0-9]+$/
        this._isDigits = re.test(this._payload);
        this._result.push(this._isDigits);
        this._resultVerbose.push({isDigits: this._isDigits});
        return this;
    }

    /**
     *
     * @returns {Validator}
     */
    isOnlyLetters() {
        const re = /^[a-zA-Z]+$/;
        this._isOnlyLetters = re.test(this._payload);
        this._result.push(this._isOnlyLetters);
        this._resultVerbose.push({isOnlyLetters: true});
        return this;
    }

    /**
     *
     * Smart syntax to eleviate you some pain in the ...
     * @returns {Validator}
     */
    get and() {
        this._nextLogical = 'and';
        return this;
    }

    /**
     * Logical or
     * @returns {Validator}
     */
    get or() {
        this._nextLogical = 'or';
        return this
    }

    /**
     *The result of the validation in boolean
     * @returns {boolean}
     */
    exec() {
        return this._result
            .reduce((a, b, i) => {
                return a && b;
            });
    }


}

module.exports = Validator