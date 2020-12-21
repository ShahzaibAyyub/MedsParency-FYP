/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');

/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

class DrugContract extends Contract {

    // CreateAsset issues a new asset to the world state with given details.
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

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadDrug(ctx, id) {
        const drugJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!drugJSON || drugJSON.length === 0) {
            throw new Error(`The drug ${id} does not exist`);
        }
        return drugJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async AddManufacturingDetails(ctx, id, name, rawmaterialusedname, rawmaterialusedquantity) {
        
        const drugJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!drugJSON || drugJSON.length === 0) {
            throw new Error(`The drug ${id} does not exist`);
        }

        const drug = JSON.parse(drugJSON);

        // overwriting original asset with new asset
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


    async AddPackagingDetails(ctx, id, name, manufactureddate, expirydate, price) {
        
        const drugJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!drugJSON || drugJSON.length === 0) {
            throw new Error(`The drug ${id} does not exist`);
        }


        const drug = JSON.parse(drugJSON);


        // overwriting original asset with new asset
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
  
    // AssetExists returns true when asset with given ID exists in world state.
    async DrugExists(ctx, id) {
        const drugJSON = await ctx.stub.getState(id);
        return drugJSON && drugJSON.length > 0;
    }


}

module.exports = DrugContract;
