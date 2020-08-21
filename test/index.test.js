'use strict'

const chai = require('chai')

const app = require('../src')

describe('Testing Create Endpoint', () => {

    let token = 'APA91bFoi3lMMre9G3XzR1LrF4ZT82_15MsMdEICogXSLB8-MrdkRuRQFwNI5u8Dh0cI90ABD3BOKnxkEla8cGdisbDHl5cVIkZah5QUhSAxzx4Roa7b4xy9tvx9iNSYw-eXBYYd8k1XKf8Q_Qq1X9-x-U-Y79vdPq'

    it('Creating', done => {

        app().createPushEndpoint(token, 'android')
            .then(data => {
                chai.assert.exists(data, 'EndpointArn')
                done()
            })
            .catch(done)

    })

})