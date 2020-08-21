'use strict'

const chai = require('chai')

const app = require('../src')

describe('Testing Create Endpoint', () => {

    let token = '5' // 'APA91bFoi3lMMre9G3XzR1LrF4ZT82_15MsMdEICogXSLB8-MrdkRuRQFwNI5u8Dh0cI90ABD3BOKnxkEla8cGdisbDHl5cVIkZah5QUhSAxzx4Roa7b4xy9tvx9iNSYw-eXBYYd8k1XKf8Q_Qq1X9-x-U-Y79vdPq'
    let target = null

    it('Creating', done => {

        app().createPushEndpoint(token, 'android')
            .then(data => {
                chai.assert.exists(data, 'EndpointArn')
                target = data.EndpointArn
                done()
            })
            .catch(done)

    })

    it('Publishing', done => {

        app().publishToTarget(target, 'Mensagem de teste', 'Teste')
            .then(data => {
                chai.assert.exists(data, 'MessageId')
                done()
            })
            .catch(done)

    })

    it('Subscribe', done => {

        app().subscribe('arn:aws:sns:us-east-1:347065952958:lives-mobile-topic', target)
            .then(data => {
                // chai.assert.exists(data, 'MessageId')
                done()
            })
            .catch(done)

    })

    it('Publishing to topic', done => {

        app().publishToTopic('arn:aws:sns:us-east-1:347065952958:lives-mobile-topic', 'Mensagem de teste para um topico', 'Teste topic')
            .then(data => {
                chai.assert.exists(data, 'MessageId')
                done()
            })
            .catch(done)

    })

})