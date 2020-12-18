//Taken help from: https://hyperledger-fabric.readthedocs.io/en/release-2.2/tutorial/commercial_paper.html


'use strict';

const { Contract } = require('fabric-contract-api');

class DrugContract extends Contract {

    async InitLedger(ctx) {
        const drugs = [
            {
                ID: '1',
                Name: 'Panadol',
            },
            {
                ID: '2',
                Color: 'Paracetamol',
            },
            {
                ID: '3',
                Color: 'Brufen',
            },
        ];

        for (const drug of drugs) {
            drug.docType = 'drug';
            await ctx.stub.putState(drug.ID, Buffer.from(JSON.stringify(drug)));
            console.info(`Drug ${drug.ID} initialized`);
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateDrug(ctx, id, name) {
        const drug = {
            ID: id,
            Name: name,
        };
        ctx.stub.putState(id, Buffer.from(JSON.stringify(drug)));
        return JSON.stringify(drug);
    }

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadAsset(ctx, id) {
        const drugJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!drugJSON || drugJSON.length === 0) {
            throw new Error(`The drug ${id} does not exist`);
        }
        return drugJSON.toString();
    }

    // AssetExists returns true when asset with given ID exists in world state.
    async DrugExists(ctx, id) {
        const drugJSON = await ctx.stub.getState(id);
        return drugJSON && drugJSON.length > 0;
    }

    
    // GetAllAssets returns all assets found in the world state.
    async GetAllDrugs(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }


}

module.exports = DrugContract;
