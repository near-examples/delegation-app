Delegation App
=================================

## Approach (understanding this example)
- on the initial app mount, all validator contracts have their state read to get the `staked` and `unstaked` near
- all state updates are done via hooks to functions in `redux/near` or `redux/validator`
- anything related to validator state changes in the app or contract are made in `redux/validator`
- there is no need to sign in / out of each contract, since each action will require approval (stake moves near tokens and withdraw, while not moving tokens requires only 1 more approval)
- another reason for no sign in / out is because the user is potentially interacting with several contracts

## Changelog 15-05-2020
- moved validator contract calls to `redux/validator.js` this is the go to for contract state, which validator is selected, etc...
- still NOT using a router (don't need one RN)
- broke validator state into 3 component views: Unstaked, Staked, Selected

## Changelog 13/14-05-2020
- moved all near calls to redux, redux-thunk
- added styled components
- still NOT using a router (don't need one RN)
- check components (Header/Validator/...) and their use of hooks for state changes
- check `redux/near` for information about state and actions


Originally based on the Counter example in Rust
=================================

[![Open in Gitpod!](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/near-examples/rust-counter)

<!-- MAGIC COMMENT: DO NOT DELETE! Everything above this line is hidden on NEAR Examples page -->

## Description

This contract implements simple counter backed by storage on blockchain.
Contract in `contract/src/lib.rs` provides methods to increment / decrement counter and get it's current value or reset.

Plus and minus buttons increase and decrease value correspondingly. When button L is toggled, a little light turns on, just for fun. RS button is for reset. LE and RE buttons to let the robot wink at you.

## To Run
Open in the Gitpod link above or clone the repository.

```
git clone https://github.com/near-examples/rust-counter
```


## Setup [Or skip to Login if in Gitpod](#login)
Install dependencies:

```
yarn
```

Make sure you have `near-shell` by running:

```
near --version
```

If you need to install `near-shell`:

```
npm install near-shell -g
```

## Login
If you do not have a NEAR account, please create one with [NEAR Wallet](https://wallet.nearprotocol.com).

In the project root, login with `near-shell` by following the instructions after this command:

```
near login
```

Modify the top of `src/config.js`, changing the `CONTRACT_NAME` to be the NEAR account that was just used to log in.

```javascript
…
const CONTRACT_NAME = 'YOUR_ACCOUNT_NAME_HERE'; /* TODO: fill this in! */
…
```

Start the example!

```
yarn start
```

## To Test

```
cd contract
cargo test -- --nocapture
```

## To Explore

- `contract/src/lib.rs` for the contract code
- `src/index.html` for the front-end HTML
- `src/main.js` for the JavaScript front-end code and how to integrate contracts
- `src/test.js` for the JS tests for the contract

## To Build the Documentation

```
cd contract
cargo doc --no-deps --open
```
