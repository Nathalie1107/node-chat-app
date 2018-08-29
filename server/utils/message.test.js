var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');


describe('generatMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);
        
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    })

})

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';
        var latitude = 60;
        var longtitude = 100;
        var url = 'https://www.google.com/maps?q=60,100';

        var message = generateLocationMessage(from, latitude, longtitude);
        //console.log(message);

        expect(message).toMatchObject({from, url});
    })
})