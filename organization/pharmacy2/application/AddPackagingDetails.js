//Reference: https://hyperledger-fabric.readthedocs.io/en/release-2.2/tutorial/commercial_paper.html

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

// Main program function
async function main() {

    const args = process.argv;

    // A wallet stores a collection of identities for use
    const wallet = await Wallets.newFileSystemWallet('../identity/user/balaji/wallet');

    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();

    // Main try/catch block
    try {

        // Specify userName for network access
        // const userName = 'isabella.issuer@magnetocorp.com';
        const userName = 'balaji';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/connection-org1.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled:true, asLocalhost: true }
        };

        // Connect to gateway using application specified parameters
        console.log('Connecting to Fabric Gateway.');

        await gateway.connect(connectionProfile, connectionOptions);

        // Access Drug network
        console.log('Using the Network Channel: mychannel.');

        const network = await gateway.getNetwork('mychannel');

        // Get addressability to drug contract
        console.log('Using Drug Contract Smart Contract');

        const contract = await network.getContract('papercontract');

        // add drug contract
        console.log('AddPackagingDetails Transaction');

        let result = await contract.submitTransaction('AddPackagingDetails', args[2], args[3], args[4], args[5], args[6]);
			
	console.log(`Transaction Successful: ${prettyJSONString(result.toString())}`);


    } catch (error) {

        console.log(`Error Processing Transaction. ${error}`);
        console.log(error.stack);

    } finally {

        // Disconnect from the gateway
        console.log('Disconnect from Fabric Gateway.');
        gateway.disconnect();

    }
}
main().then(() => {

    console.log('Issue program complete.');

}).catch((e) => {

    console.log('Issue program exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);

});
