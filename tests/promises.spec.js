"use strict";

const promises = require('../dist/index');
const { assert } = require("chai");

const dataLength = 10;

let dataSet = [];
let testable;

class DataStats
{
	constructor(position, duration, fail) {
		this.position = position;
		this.duration = duration;
		this.fail = fail || false;
	}
}

function TestPromise(item) {
	return new Promise((resolve, reject) => {
		setTimeout(function(){
			if (item.fail) {
				return reject(item);
			}
			resolve(item);
		}, item.duration);
	});
}

describe("Promises", () => {

	describe("(1) Concurrency Execution with Sequencing True", () => {

		let resultSet;

		// Generate dataset with timings inversed to test sequencing
		before((done)=>{
			for (let i = 0; i < dataLength; i++) {
				dataSet.push(new DataStats(i, (dataLength - i)));
			}

			// Parse data and store
			promises(dataSet, TestPromise, 1)
				.then(result => {
					resultSet = result;
					done();
				})
				.catch(error => {
					throw new Error(error);
				});
		});

		it("Load and execute all promises", () => {
			assert.equal(resultSet.length, 10);
		});

		it("Preserve Order of Position 0", () => {
			assert.equal(resultSet[0].position, 0);
		});

		it("Preserve Order of Position 1", () => {
			assert.equal(resultSet[1].position, 1);
		});

		it("Preserve Order of Position 2", () => {
			assert.equal(resultSet[2].position, 2);
		});

		it("Preserve Order of Position 3", () => {
			assert.equal(resultSet[3].position, 3);
		});

		it("Preserve Order of Position 4", () => {
			assert.equal(resultSet[4].position, 4);
		});

		it("Preserve Order of Position 5", () => {
			assert.equal(resultSet[5].position, 5);
		});

		it("Preserve Order of Position 6", () => {
			assert.equal(resultSet[6].position, 6);
		});

		it("Preserve Order of Position 7", () => {
			assert.equal(resultSet[7].position, 7);
		});

		it("Preserve Order of Position 8", () => {
			assert.equal(resultSet[8].position, 8);
		});

		it("Preserve Order of Position 9", () => {
			assert.equal(resultSet[9].position, 9);
		});

	});

	describe("(2) Concurrency Execution", () => {

		let resultSet;

		before((done)=>{

			promises(dataSet, TestPromise, 2)
				.then(result => {
					resultSet = result;
					done();
				})
				.catch(error => {
					throw new Error(error);
				});
		});

		it("Load and execute all promises", () => {
			assert.equal(resultSet.length, 10);
		});

		it("Preserve Order of Position 0", () => {
			assert.equal(resultSet[0].position, 0);
		});

		it("Preserve Order of Position 1", () => {
			assert.equal(resultSet[1].position, 1);
		});

		it("Preserve Order of Position 2", () => {
			assert.equal(resultSet[2].position, 2);
		});

		it("Preserve Order of Position 3", () => {
			assert.equal(resultSet[3].position, 3);
		});

		it("Preserve Order of Position 4", () => {
			assert.equal(resultSet[4].position, 4);
		});

		it("Preserve Order of Position 5", () => {
			assert.equal(resultSet[5].position, 5);
		});

		it("Preserve Order of Position 6", () => {
			assert.equal(resultSet[6].position, 6);
		});

		it("Preserve Order of Position 7", () => {
			assert.equal(resultSet[7].position, 7);
		});

		it("Preserve Order of Position 8", () => {
			assert.equal(resultSet[8].position, 8);
		});

		it("Preserve Order of Position 9", () => {
			assert.equal(resultSet[9].position, 9);
		});

	});

	describe("(5) Concurrency Execution", () => {

		let resultSet;

		before((done)=>{
			promises(dataSet, TestPromise, 5)
				.then(result => {
					resultSet = result;
					done();
				})
				.catch(error => {
					throw new Error(error);
				});
		});

		it("Load and execute all promises", () => {
			assert.equal(resultSet.length, 10);
		});

		it("Preserve Order of Position 0", () => {
			assert.equal(resultSet[0].position, 0);
		});

		it("Preserve Order of Position 1", () => {
			assert.equal(resultSet[1].position, 1);
		});

		it("Preserve Order of Position 2", () => {
			assert.equal(resultSet[2].position, 2);
		});

		it("Preserve Order of Position 3", () => {
			assert.equal(resultSet[3].position, 3);
		});

		it("Preserve Order of Position 4", () => {
			assert.equal(resultSet[4].position, 4);
		});

		it("Preserve Order of Position 5", () => {
			assert.equal(resultSet[5].position, 5);
		});

		it("Preserve Order of Position 6", () => {
			assert.equal(resultSet[6].position, 6);
		});

		it("Preserve Order of Position 7", () => {
			assert.equal(resultSet[7].position, 7);
		});

		it("Preserve Order of Position 8", () => {
			assert.equal(resultSet[8].position, 8);
		});

		it("Preserve Order of Position 9", () => {
			assert.equal(resultSet[9].position, 9);
		});

	});

});
