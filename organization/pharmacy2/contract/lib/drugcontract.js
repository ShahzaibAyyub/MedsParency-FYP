//Reference: https://hyperledger-fabric.readthedocs.io/en/release-2.2/tutorial/commercial_paper.html

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');

class DrugContract extends Contract {

    // Adds raw material details into a new drug to the world state with given details.
    async AddRawMaterial(ctx, id, name, rawmaterialname, rawmaterialquantity, source) {
        const drug = {
            ID: id,
            Name: name,
            RawMaterialName: rawmaterialname,
            RawMaterialQuantity: rawmaterialquantity,
            Source: source,
            RawMaterialUsedName: " ",
            RawMaterialUsedQuantity: " ",
            ManufacturedDate: " ",
            ExpiryDate: " ",
            Price: " ",
        };
        ctx.stub.putState(id, Buffer.from(JSON.stringify(drug)));
        return JSON.stringify(drug);
    }

    // Reads the drug details stored in the world state with given id.
    async ReadDrug(ctx, id) {
        const drugJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!drugJSON || drugJSON.length === 0) {
            throw new Error(`The drug ${id} does not exist`);
        }
        return drugJSON.toString();
    }

    // Adds Manufacturing Details into an existing drug in the world state with provided parameters.
    async AddManufacturingDetails(ctx, id, name, rawmaterialusedname, rawmaterialusedquantity) {
        
        const drugJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!drugJSON || drugJSON.length === 0) {
            throw new Error(`The drug ${id} does not exist`);
        }

        const drug = JSON.parse(drugJSON);

        // overwriting original drug with new drug
        const updatedDrug = {
            ID: id,
            Name: name,
            RawMaterialName: drug.RawMaterialName,
            RawMaterialQuantity: drug.RawMaterialQuantity,
            Source: drug.Source,
            RawMaterialUsedName: rawmaterialusedname,
            RawMaterialUsedQuantity: rawmaterialusedquantity,
            ManufacturedDate: "",
            ExpiryDate: "",
            Price: "",
        };
        return ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedDrug)));
    }

    //Adds packaging details into an already existing drug 
    async AddPackagingDetails(ctx, id, name, manufactureddate, expirydate, price) {
        
        const drugJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!drugJSON || drugJSON.length === 0) {
            throw new Error(`The drug ${id} does not exist`);
        }


        const drug = JSON.parse(drugJSON);


        // overwriting original drug with new drug
        const updatedDrug = {
            ID: id,
            Name: name,
            RawMaterialName: drug.RawMaterialName,
            RawMaterialQuantity: drug.RawMaterialQuantity,
            Source: drug.Source,
            RawMaterialUsedName: drug.RawMaterialUsedName,
            RawMaterialUsedQuantity: drug.RawMaterialUsedQuantity,
            ManufacturedDate: manufactureddate,
            ExpiryDate: expirydate,
            Price: price,
        };
        return ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedDrug)));
    }
  
    // DrugExists returns true when drug with given ID exists in world state.
    async DrugExists(ctx, id) {
        const drugJSON = await ctx.stub.getState(id);
        return drugJSON && drugJSON.length > 0;
    }


}

module.exports = DrugContract;
