import "mocha";
import chai from "chai";
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

const assert = chai.assert;

import promises, { Concurrency } from "../dist/index";

class DataStats
{
	public position: number;
	public duration: number;
	public fail: boolean;

	constructor(position: number, duration: number, fail: boolean = false) {
		this.position = position;
		this.duration = duration;
		this.fail = fail;
	}
}

function TestPromise(item: DataStats): Promise<DataStats> {
	return new Promise(resolve => {
		const delay = () => {			
			resolve(item);
		};
		setTimeout(delay, item.duration)
	});
}

describe("Promises - TypeScript", () => {

	describe("1) Concurrency three Execution with preserve sequencing", () => {

		let dataLength = 10;
		let resultSet: DataStats[] = [];
		let dataSet: DataStats[] = [];		

		// Generate dataset with timings inversed to test sequencing
		before(function (done) {
			this.timeout(10000);
			for (let i = 0; i < dataLength; i++) {
				dataSet.push(new DataStats(i, (dataLength - i) * 100));
			}

			// Parse data and store
			promises<DataStats, DataStats>(dataSet, TestPromise, Concurrency.THREE)
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
		
		let dataLength = 5;
		let resultSet: DataStats[] = [];
		let dataSet: DataStats[] = [];

		// Generate dataset with timings inversed to test sequencing
		before(function (done) {
			this.timeout(100000);
			for (let i = 0; i < dataLength; i++) {
				let delay = (dataLength - i) * 1000;
				dataSet.push(new DataStats(i, delay));
			}

			// Parse data and store
			promises<DataStats, DataStats>(dataSet, TestPromise, Concurrency.FIVE, false)
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

		let dataLength = 1;
		let resultSet: DataStats[] = [];
		let dataSet: DataStats[] = [];

		// Generate dataset with timings inversed to test sequencing
		before(function (done) {
			for (let i = 0; i < dataLength; i++) {
				dataSet.push(new DataStats(i, 0));
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

	describe("4) Concurrency enum properly export and has valid values", () => {

		it("Concurrency.ONE represent the digit 1", () => {
			assert.equal(Concurrency.ONE, 1);
		});

		it("Concurrency.TWO represent the digit 2", () => {
			assert.equal(Concurrency.TWO, 2);
		});

		it("Concurrency.THREE represent the digit 3", () => {
			assert.equal(Concurrency.THREE, 3);
		});

		it("Concurrency.FOUR represent the digit 4", () => {
			assert.equal(Concurrency.FOUR, 4);
		});

		it("Concurrency.FIVE represent the digit 5", () => {
			assert.equal(Concurrency.FIVE, 5);
		});
	});

});
