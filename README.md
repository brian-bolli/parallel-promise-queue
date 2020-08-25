# Parallel Promise Queue

Promise Queue utility to execute a single promise against an array of values with concurrency and ordering control. The idea originates from a highly recommended book (Node.js Design Patterns), which inspired me to create a module written in TypeScript.

## Installing

```
npm install parallel-promise-queue
```

or

```
yarn add parallel-promise-queue
```

## Running the tests

```
npm test
```

or

```
yarn test
```

## Using

### promises
The module is a function which takes four parameters.
| Param | Type | Required | Default | Description |
| -- | -- | -- | -- | -- |
| items | Array | yes | n/a | An array of values of any kind to be be passed to the Promise |
| promise | Promise | yes | n/a | A Promise or function which returns a promise |
| concurrency | Integer | no | 1 | Number of concurrent executions between 1 and 5 |
| sequential | Boolean | no | true | Whether or not ordering should be maintained in returned results array |

#### Example
```
const promises = require('parallel-promise-queue');
promises(promiseMethod, dataArray, 1, true)
	.then(result => resultHandler)
    .catch(error => errorHandler);
```


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Brian Bolli** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Node.js Design Patterns - 2nd Edition](https://www.packtpub.com/web-development/nodejs-design-patterns-second-edition)
