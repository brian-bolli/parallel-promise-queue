const promises = require('../dist/index');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const assert = chai.assert;

class DataStats
{
	constructor(position, duration, fail) {
		this.position = position;
		this.duration = duration;
		this.fail = fail || false;
	}
}

function TestPromise(item) {
	return new Promise(resolve => {
		const delay = () => {			
			resolve(item);
		};
		setTimeout(delay, item.duration)
	});
}

describe("Promises - JavaScript", () => {

	describe("1) Concurrency three Execution with preserve sequencing", () => {

		const dataLength = 10;
		let resultSet = [];
		let dataSet = [];

		// Generate dataset with timings inversed to test sequencing
		before(function (done) {
			this.timeout(10000);
			for (let i = 0; i < dataLength; i++) {
				dataSet.push(new DataStats(i, (dataLength - i) * 100));
			}

			// Parse data and store
			promises(dataSet, TestPromise, 3)
				.then(result => {
					resultSet = result;
					done();
				})
				.catch(error => {
					throw new Error(error);
				});
		});

		it("Load and execute all promises", () => {
			assert.equal(resultSet.length, dataLength);
		});

		it("Preserve order regardless when promise resolves", () => {
			assert.equal(resultSet[0].position, 0);
			assert.equal(resultSet[1].position, 1);
			assert.equal(resultSet[2].position, 2);
			assert.equal(resultSet[3].position, 3);
			assert.equal(resultSet[4].position, 4);
			assert.equal(resultSet[5].position, 5);
			assert.equal(resultSet[6].position, 6);
			assert.equal(resultSet[7].position, 7);
			assert.equal(resultSet[8].position, 8);
			assert.equal(resultSet[9].position, 9);
		});

	});

	describe("2) Concurrency five execution without preserve sequencing", () => {

		const dataLength = 5;
		let resultSet = [];
		let dataSet = [];

		// Generate dataset with timings inversed to test sequencing
		before(function (done) {
			this.timeout(100000);
			for (let i = 0; i < dataLength; i++) {
				dataSet.push(new DataStats(i, (dataLength - i) * 1000));
			}

			// Parse data and store
			promises(dataSet, TestPromise, 5, false)
				.then(result => {
					resultSet = result;
					done();
				})
				.catch(error => {
					throw new Error(error);
				});
		});

		it("Load and execute all promises", () => {
			assert.equal(resultSet.length, dataLength);
		});

		it("Order determined by promise resolves", () => {
			assert.equal(resultSet[0].position, 4);
			assert.equal(resultSet[1].position, 3);
			assert.equal(resultSet[2].position, 2);
			assert.equal(resultSet[3].position, 1);
			assert.equal(resultSet[4].position, 0);
		});

	});

	describe("3) Concurrency value which are out of bounds", () => {

		const dataLength = 5;
		let resultSet = [];
		let dataSet = [];

		// Generate dataset with timings inversed to test sequencing
		before(function (done) {
			this.timeout(100000);
			for (let i = 0; i < dataLength; i++) {
				dataSet.push(new DataStats(i, (dataLength - i) * 1000));
			}
			done();
		});


		it("A value below one for concurrency forces promise rejection", () => {
			assert.isRejected(promises(dataSet, TestPromise, 0), 'A integer value between 0 and 5 must be used for the concurrency parameter');
		});

		it("A value above five for concurrency forces promise rejection", () => {
			assert.isRejected(promises(dataSet, TestPromise, 6), 'A integer value between 0 and 5 must be used for the concurrency parameter');
		});

	});

});
