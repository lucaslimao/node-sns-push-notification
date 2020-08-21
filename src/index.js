const AWS = require('aws-sdk')
const config= require('config')

AWS.config.update({
    accessKeyId: config.get('aws.accessKeyId'),
    secretAccessKey: config.get('aws.secretAccessKey')
})

const sns = new AWS.SNS({ apiVersion: '2010-03-31', region: process.env.REGION })

const PLATFORM_ARN = {
    'ios': config.get('aws.platform.ios'),
    'android': config.get('aws.platform.android')
}

const getPlatformArn = (platform) => PLATFORM_ARN[platform]

const createPushEndpoint = (token, platform) => {

    try {

        const params = {
            PlatformApplicationArn: getPlatformArn(platform),
            Token: token,
            Attributes: { },
            CustomUserData: ''
        }
        
        const { data } = await sns.createPlatformEndpoint(params).promise()

        return data

    } catch (err) {
        throw err
    }

}

const publishToTarget = (target, message, subject) => {

    try {

        const params = {
            Message: message,
            Subject: subject,
            TargetArn: target
        }
        
        const { data } = await sns.publish(params).promise()

        return data

    } catch (err) {
        throw err
    }

}

const publishToTopic = (target, message, subject) => {

    try {

        const params = {
            Message: message,
            Subject: subject,
            TopicArn: target
        }
        
        const { data } = await sns.publish(params).promise()

        return data

    } catch (err) {
        throw err
    }

}

const subscribe = (topic, endpoint) => {

    try {

        const params = {
            Protocol: 'application',
            TopicArn: topic,
            Endpoint: endpoint
        }
        
        const { data } = await sns.subscribe(params).promise()

        return data

    } catch (err) {
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