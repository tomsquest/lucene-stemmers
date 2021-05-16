# Lucene Stemmers in JavaScript

<div align="center">

<img src="doc/logo.png" title="Lucene Stemmers" alt="Lucene Stemmers Logo" width="600">

</div>

<div align="left">

[![Version](https://img.shields.io/npm/v/qqd.svg?style=for-the-badge)](https://www.npmjs.com/package/lucene-stemmers)

</div>

> **`Lucene Stemmers`** is a port of Lucene's stemmers in JavaScript.

## Changelog

> See [CHANGELOG.md](CHANGELOG.md)

## Install

```sh
npm install lucene-stemmers
```

## Usage

In plain **JavaScript**: 

```js
const { stemFrenchMinimal } = require("lucene-stemmers")

const stemmed = stemFrenchMinimal("chevaux");
// stemmed === "cheval"
```

In **Typescript**: 

```ts
import { stemFrenchMinimal } from "lucene-stemmers";

const stemmed = stemFrenchMinimal("chevaux");
// stemmed === "cheval"
```

## Stemmers implemented

These stemmers are available:

- [x] French
    - [x] Minimal
        - Function: `stemFrenchMinimal`
        - [Lucene source code](https://gitbox.apache.org/repos/asf?p=lucene.git;a=blob;f=lucene/analysis/common/src/java/org/apache/lucene/analysis/fr/FrenchMinimalStemmer.java)
    - [x] Light
        - Function: `stemFrenchLight`
        - [Lucene source code](https://gitbox.apache.org/repos/asf?p=lucene.git;a=blob;f=lucene/analysis/common/src/java/org/apache/lucene/analysis/fr/FrenchLightStemmer.java)
    
## TODO

- [ ] Add more stemmers
- [ ] Publish browser version
- [ ] Pre-commit hooks
- [ ] CI
