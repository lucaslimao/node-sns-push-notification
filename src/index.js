const AWS = require('aws-sdk')
const config= require('config')

AWS.config.update({
    accessKeyId: config.get('aws.accessKeyId'),
    secretAccessKey: config.get('aws.secretAccessKey')
})

const sns = new AWS.SNS({ apiVersion: '2010-03-31', region: 'us-east-1' })

const PLATFORM_ARN = {
    'ios': config.get('aws.platform.ios'),
    'android': config.get('aws.platform.android')
}

const getPlatformArn = (platform) => PLATFORM_ARN[platform]

const createPushEndpoint = async (token, platform) => {

    console.log('Entrou na criação do endpoint. ')

    try {

        const params = {
            PlatformApplicationArn: getPlatformArn(platform),
            Token: token,
            Attributes: { },
            CustomUserData: ''
        }
        
        const response = await sns.createPlatformEndpoint(params).promise()

        if (!response || !response.hasOwnProperty('EndpointArn')) {
            throw new Error('Não criou o endpoint. ')
        }

        console.log('Retorno sucesso')
        console.log(response)

        return response

    } catch (err) {
        console.log('Erro inesperado. ')
        throw err
    }

}

const publishToTarget = async (target, message, subject) => {

    console.log('Entrou no envio de mensagem direta. ')

    try {

        const params = {
            Message: message,
            Subject: subject,
            TargetArn: target
        }
        
        const response = await sns.publish(params).promise()

        console.log(response)

        return response

    } catch (err) {
        console.log('Erro inesperado')
        throw err
    }

}

const publishToTopic = async (target, message, subject) => {

    console.log('Entrou no envio de mensagem em massa. ')

    try {

        const params = {
            Message: message,
            Subject: subject,
            TopicArn: target
        }
        
        const response = await sns.publish(params).promise()

        console.log(response)

        return response

    } catch (err) {
        throw err
    }

}

const subscribe = async (topic, endpoint) => {

    console.log('Entrou no subscribe ')

    try {

        const params = {
            Protocol: 'application',
            TopicArn: topic,
            Endpoint: endpoint
        }
        
        const response = await sns.subscribe(params).promise()

        console.log(response)

        return response

    } catch (err) {
        console.log('Erro inesperado')
        throw err
    }

}

module.exports = () => {

    return {
        createPushEndpoint,
        publishToTarget,
        publishToTopic,
        subscribe
    }

}