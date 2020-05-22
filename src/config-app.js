
/********************************
Temporary placeholder before we connect to live sources

network will be UX or hard coded for specific URLs
validators will connect to a live list of validators
********************************/
module.exports = {
    accountId: 'account-id',

    network: 'development', 
    // network: 'betanet', 

    // these validators are on testnet (development)
    // add your own contract accountIds
    validators: [
        'nearkat',
        'dokiacapital.betanet',
    ]
}