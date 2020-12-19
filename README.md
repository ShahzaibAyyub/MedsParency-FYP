# MedsParency-FYP
Permissioned Blockchain on Hyperledger Fabric 2.2, Javascript, Go, Node.js, React.js to prevent counterfeiting of Medicines.

### Prerequisites

You need to have Ubuntu 20.04, Hyperledger 2.2, Go, Node, Npm already installed


### How to Run the project
After downloading the project, go to the project directory in own Command line Interface (CLI)

#### Network Creation
```
cd fabric-samples/medsparencyjs
./network-starter.sh
docker ps
docker network inspect net_test
```

#### To monitor the network using logspout
```
cd fabric-samples/medsparencyjs/organization/pharmacy
./configuration/cli/monitordocker.sh net_test
```
* Now your react app will start running on port 3000, that takes menu from your node app already running
End with an example of getting some data out of the system or using it for a little demo

### Feel free to use this Food App and make changes as you wish. Thanks and Happy Coding!
