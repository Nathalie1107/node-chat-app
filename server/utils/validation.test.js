const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var nonString={
            name: "nathalie"
        };
        expect(isRealString(nonString)).toBe(false);
    });
    
    it('should reject string with only spaces', () => {
        var nonString='   ';
        expect(isRealString(nonString)).toBe(false);
    })

    it('should allow string with non-space characters', () => {
        var nonString=' hellomotor  ';
        expect(isRealString(nonString)).toBe(true);
    })
})