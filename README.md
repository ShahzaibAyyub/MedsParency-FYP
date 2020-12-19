# MedsParency-FYP
Permissioned Blockchain on Hyperledger Fabric 2.2, Javascript, Go, Node.js, React.js to prevent counterfeiting of Medicines.

### Prerequisites

You need to have Ubuntu 20.04, Hyperledger 2.2, Go, Node, Npm already installed


### How to Run the project
After downloading the project, go to the project directory in own Command line Interface (CLI)

* #### Network Creation
```
cd fabric-samples/medsparencyjs
./network-starter.sh
docker ps
docker network inspect net_test
```

* #### To monitor the network using logspout
```
cd fabric-samples/medsparencyjs/organization/pharmacy
./configuration/cli/monitordocker.sh net_test
```

* #### Deploying the smart contract to the channel as Pharmacy
```
cd fabric-samples/medsparencyjs/organization/pharmacy
source pharmacy.sh
peer lifecycle chaincode package cp.tar.gz --lang node --path ./contract --label cp_0
peer lifecycle chaincode install cp.tar.gz
peer lifecycle chaincode queryinstalled
export PACKAGE_ID=cp_0:ffda93e26b183e231b7e9d5051e1ee7ca47fbf24f00a8376ec54120b1a2a335c

peer lifecycle chaincode approveformyorg --orderer localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name papercontract -v 0 --package-id $PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA
```

* #### Deploying the smart contract to the channel as Pharmacy2
```
cd fabric-samples/medsparencyjs/organization/pharmacy2
source pharmacy2.sh
peer lifecycle chaincode package cp.tar.gz --lang node --path ./contract --label cp_0
peer lifecycle chaincode install cp.tar.gz
peer lifecycle chaincode queryinstalled
export PACKAGE_ID=cp_0:ffda93e26b183e231b7e9d5051e1ee7ca47fbf24f00a8376ec54120b1a2a335c

peer lifecycle chaincode approveformyorg --orderer localhost:7050 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name papercontract -v 0 --package-id $PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA
```

* #### Commit the chaincode definition to the channel
```
peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --peerAddresses localhost:7051 --tlsRootCertFiles ${PEER0_ORG1_CA} --peerAddresses localhost:9051 --tlsRootCertFiles ${PEER0_ORG2_CA} --channelID mychannel --name papercontract -v 0 --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent

docker ps
```

* #### Application dependencies
```
cd fabric-samples/medsparencyjs/organization/pharmacy/application/
npm install
```

* #### Wallet
```
node enrollUser.js
ls ../identity/user/isabella/wallet/
```

* #### Use the application (CreateDrug)
```
node CreateDrug.js 1 Panadol
node ReadDrug.js 1
```

