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
        this._result = [];
        this._resultVerbose = [];
        this._nextLogical = null; // For our smart syntax; dealing with  ( and | or)
    }


    /**
     *
     * @returns {Validator}
     * Singleton access
     * @param payload
     */
    static with(...payload) {
        return new Validator(payload);
    }


    /**
     * Tests if the payload is an email address
     * @returns {Validator}
     */
    isEmail() {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        for (const payload of this._payload) {
            this._result.push(re.test(payload));}
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

        let res = false;
        for(const  payload of this._payload) {
            if (validateScheme) {
                res = re1.test(payload);
            } else {
                res = re2.test(payload);
            }
            this._result.push(res);
        }
        return this;
    }

    /**
     * Validates ipV4 addresses
     * @returns {Validator}
     */
    isIPV4() {
        const re = /$((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$/;
        for (const payload of this._payload) {
            this._result.push(re.test(this.payload));
        }
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
       for(const payload of this._payload) {
           this._result.push(re.test(payload));
       }
        return this;
    }

    /**
     * Matches telephone numbers
     * @returns {Validator}
     */
    isTelephone() {
        const re = /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/
        for(const payload of this._payload) {
            this._result.push(re.test(payload));
        }
        return this;
    }


    /**
     *
     * @param n
     * @returns {Validator}
     */
    hasLength(n) {
        for (const payload of this._payload) {
            this._result.push(payload.length === n);
        }
        return this;
    }

    /**
     *
     * @param n
     * @returns {Validator}
     */
    hasMinLen(n) {
        for (const payload of this._payload) {
            this._result.push(payload.length >= n);
        }
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
        for (const payload of this._payload) {
            this._result.push(re.test(payload));
        }
        return this;
    }

    /**
     *
     * @returns {Validator}
     */
    isOnlyLetters() {
        const re = /^[a-zA-Z]+$/;
        for (const payload of this._payload) {
            this._result.push(re.test(payload));
        }
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