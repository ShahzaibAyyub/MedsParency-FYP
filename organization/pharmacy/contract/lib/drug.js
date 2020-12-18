//Taken help from: https://hyperledger-fabric.readthedocs.io/en/release-2.2/tutorial/commercial_paper.html


'use strict';

// Utility class for ledger state
const State = require('./../ledger-api/state.js');


/**
 *  class extends State class
 * Class will be used by application and smart contract to define a paper
 */
class Drug extends State {

    constructor(obj) {
        super(Drug.getClass(), [obj.ID, obj.Name]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
    */
    getID() {
        return this.ID;
    }

    setIssuer(_ID) {
        this.ID = _ID;
    }

    getName() {
        return this.Name;
    }

    setName(_name) {
        this.Name = _name;
    }

    static fromBuffer(buffer) {
        return Drug.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to commercial paper
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, Drug);
    }

    /**
     * Factory method to create a commercial paper object
     */
    static createInstance(id, name) {
        return new Drug({ id, name });
    }

    static getClass() {
        return 'org.papernet.commercialpaper';
    }
}

module.exports = Drug;
