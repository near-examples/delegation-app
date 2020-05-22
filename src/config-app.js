
/********************************
Temporary placeholder before we connect to live sources

network will be UX or hard coded for specific URLs
validators will connect to a live list of validators
********************************/
module.exports = {
    accountId: 'mattlock.betanet',

    // network: 'development', 
    network: 'betanet', 

    // these validators are on betanet
    validators: [
        'c2.nearkat',
        'dokia',
        'sparkpool.test',
        'wetez',
        'c1.hashquark',
        'jazza',
        'c2.nuc001.betanet',
    ]

    // these validators are on testnet (development)
    // add your own contract accountIds
    // validators: [
    //     'staking-pool-2',
    //     'mattlock-val-2',
    //     'mattlock-val-3',
    // ]
}