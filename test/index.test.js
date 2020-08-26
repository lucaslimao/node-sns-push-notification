'use strict'

const chai = require('chai')

const app = require('../src')

describe('Testing Create Endpoint', () => {

    let token = ''
    let target = ''
    let topicId = ''

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

        app().publishToTarget(target, 'Texto', 'titulo', 'app')
            .then(data => {
                chai.assert.exists(data, 'MessageId')
                done()
            })
            .catch(done)

    })

    it('Subscribe', done => {

        app().subscribe(topicId, target)
            .then(data => {
                // chai.assert.exists(data, 'MessageId')
                done()
            })
            .catch(done)

    })

    it('Publishing to topic', done => {

        app().publishToTopic(topicId, 'Novos itens para conferir. ', 'Itens', 'itens')
            .then(data => {
                chai.assert.exists(data, 'MessageId')
                done()
            })
            .catch(done)

    })

})