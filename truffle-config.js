const path = require("path");
 const HDWalletProvider = require("@truffle/hdwallet-provider");
 const infuraKey = "";
 const mnemonic = "";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  development: {
    host: "127.0.0.1",
    port: 7545,
    network_id: "*", // match any network
    websockets: true
  },
  networks: { 
    develop: { port: 9545 },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/"+ infuraKey),
      network_id: 4,
      gas: 4500000,
      //gasPrice: 10000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true // Skip dry run before migrations? (default: false for public nets )
    },  
  },
 
  compilers : {
    solc: {
      version: "0.8.6", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
};
/*


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0xc31a402b8ca4eafbd034e2dee78ab044252436e17aff2978b66034de76caacda
   > Blocks: 0            Seconds: 4
   > contract address:    0x392e83cac4Beee9fD0c73a2e4CFc0B3628063174
   > block number:        9120663
   > block timestamp:     1629050584
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.986387332872370101
   > gas used:            203143 (0x31987)
   > gas price:           1.000000009 gwei
   > value sent:          0 ETH
   > total cost:          0.000203143001828287 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9120664)
   > confirmation number: 2 (block: 9120665)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000203143001828287 ETH


2_deploy_contracts.js
=====================

   Replacing 'FarmerRole'
   ----------------------
   > transaction hash:    0x83e8d664dd11345e107f8b6b8bcacfb461a01a444d793cd23782f823acbf619a
   > Blocks: 1            Seconds: 12
   > contract address:    0xeE76885C65C3b3B83A2e7B4B9aBce191D797CA2f
   > block number:        9120667
   > block timestamp:     1629050644
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.986010090868974923
   > gas used:            331326 (0x50e3e)
   > gas price:           1.000000009 gwei
   > value sent:          0 ETH
   > total cost:          0.000331326002981934 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9120668)
   > confirmation number: 2 (block: 9120669)

   Replacing 'DistributorRole'
   ---------------------------
   > transaction hash:    0x392fa312d6805229e08a4c5ace085c93befda8b0d974982380ab404e52340746
   > Blocks: 0            Seconds: 12
   > contract address:    0x08D78603B6D377221B6417EAC52434468C1D67e1
   > block number:        9120670
   > block timestamp:     1629050689
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.985678776865993097
   > gas used:            331314 (0x50e32)
   > gas price:           1.000000009 gwei
   > value sent:          0 ETH
   > total cost:          0.000331314002981826 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9120671)
   > confirmation number: 2 (block: 9120672)

   Replacing 'RetailerRole'
   ------------------------
   > transaction hash:    0x841096e44382bb7458182c08ab6f86d1aaa458a129a8ab6bb0777833801faa7f
   > Blocks: 1            Seconds: 12
   > contract address:    0x90F3b514AA4c2679d0ab1a7d078eF628FA6CD36E
   > block number:        9120673
   > block timestamp:     1629050734
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.985347462863011271
   > gas used:            331314 (0x50e32)
   > gas price:           1.000000009 gwei
   > value sent:          0 ETH
   > total cost:          0.000331314002981826 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9120674)
   > confirmation number: 2 (block: 9120675)

   Replacing 'ConsumerRole'
   ------------------------
   > transaction hash:    0xc6e8018f1ad06081787f4e86fa8910b86619fa511f424c6de72cb9446dde9bcb
   > Blocks: 0            Seconds: 8
   > contract address:    0x388700027D8A73bD1a32110eE6b872BF2a2486D4
   > block number:        9120676
   > block timestamp:     1629050779
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.985016136860029337
   > gas used:            331326 (0x50e3e)
   > gas price:           1.000000009 gwei
   > value sent:          0 ETH
   > total cost:          0.000331326002981934 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9120677)
   > confirmation number: 2 (block: 9120678)

   Replacing 'SupplyChain'
   -----------------------
   > transaction hash:    0x1f3e641db1e8fe26de758504c0dccb3d8041aa862694eef43f82ebd8b5c5dc3c
   > Blocks: 0            Seconds: 8
   > contract address:    0x3B6deaB889281445Ed7CE24C06459c824d01a04F
   > block number:        9120679
   > block timestamp:     1629050824
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.981454918827978375
   > gas used:            3561218 (0x365702)
   > gas price:           1.000000009 gwei
   > value sent:          0 ETH
   > total cost:          0.003561218032050962 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9120680)
   > confirmation number: 2 (block: 9120681)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.004886498043978482 ETH


Summary
=======
> Total deployments:   6
> Final cost:          0.005089641045806769 ETH
 */