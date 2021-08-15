const path = require("path");
 const HDWalletProvider = require("@truffle/hdwallet-provider");
 const infuraKey = "8c79b444b7634925965e1de525e42758";
 const mnemonic = "inhale position proud genius sound leaf mansion secret alert legal major spawn";

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
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/82ae06c599484855946e1fa67bc2bf5d`),
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

tarting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 29970676 (0x1c950f4)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x21d3d28f9449f43ef43c87e290c98c453644e4e835798cd1185b7b953e18ad8a
   > Blocks: 2            Seconds: 16
   > contract address:    0x414ca8Ae8684aacA1984719FC6707414eec9Bc11
   > block number:        9118802
   > block timestamp:     1629022652
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.99554151496364665
   > gas used:            203143 (0x31987)
   > gas price:           1.000000009 gwei
   > value sent:          0 ETH
   > total cost:          0.000203143001828287 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9118803)
   > confirmation number: 2 (block: 9118804)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000203143001828287 ETH


2_deploy_contracts.js
=====================

   Deploying 'FarmerRole'
   ----------------------
   > transaction hash:    0x701af64b84d8652a22d64d7c6516abec179507659b2af34e9463c77c10a32f67
   > Blocks: 1            Seconds: 12
   > contract address:    0xb07abb916108F642Ca7830B982BE781562fcE49a
   > block number:        9118807
   > block timestamp:     1629022727
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.995164272960251472
   > gas used:            331326 (0x50e3e)
   > gas price:           1.000000009 gwei
   > value sent:          0 ETH
   > total cost:          0.000331326002981934 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9118808)
   > confirmation number: 2 (block: 9118809)

   Deploying 'DistributorRole'
   ---------------------------
   > transaction hash:    0x88cb014e78304a4dc7264d5898ec29838cbb91a65fe159a23be8e69e1a6cae22
   > Blocks: 1            Seconds: 12
   > contract address:    0x680E3Ef972D5866182e7207D91A1aA00ad39D699
   > block number:        9118810
   > block timestamp:     1629022772
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.995020469958957245
   > gas used:            143803 (0x231bb)
   > gas price:           1.000000009 gwei
   > value sent:          0 ETH
   > total cost:          0.000143803001294227 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9118811)
   > confirmation number: 2 (block: 9118812)

   Deploying 'RetailerRole'
   ------------------------
   > transaction hash:    0xecbee5fd50f1c26728c4043221a6c52262e5f9ac18a7979da175b59567cc130e
   > Blocks: 1            Seconds: 12
   > contract address:    0x2c003569D3618acBc5f97f5475205610e6A9B89b
   > block number:        9118813
   > block timestamp:     1629022817
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.994876666957663018
   > gas used:            143803 (0x231bb)
   > gas price:           1.000000009 gwei
   > value sent:          0 ETH
   > total cost:          0.000143803001294227 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9118814)
   > confirmation number: 2 (block: 9118815)

   Deploying 'ConsumerRole'
   ------------------------
   > transaction hash:    0xf4edaf9aa80af605dfe50e35b6c995a8f3c97db10f9387ea00852dc22586b535
   > Blocks: 1            Seconds: 24
   > contract address:    0x5141A7c7B8054a79ea6dE199B6FDa3261d7462E7
   > block number:        9118817
   > block timestamp:     1629022877
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.994732863956368791
   > gas used:            143803 (0x231bb)
   > gas price:           1.000000009 gwei
   > value sent:          0 ETH
   > total cost:          0.000143803001294227 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9118818)
   > confirmation number: 2 (block: 9118819)

   Deploying 'SupplyChain'
   -----------------------
   > transaction hash:    0xc8c4b9661f26494cda7b2fb25a8bff275a097729199f3847a78ab563baa922af
   > Blocks: 1            Seconds: 12
   > contract address:    0x1D7dab28e5D53645c8C4B25A43d1188DFEFF77f7
   > block number:        9118820
   > block timestamp:     1629022922
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.991347066925896618
   > gas used:            3385797 (0x33a9c5)
   > gas price:           1.000000009 gwei
   > value sent:          0 ETH
   > total cost:          0.003385797030472173 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9118821)
   > confirmation number: 2 (block: 9118822)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.004148532037336788 ETH


Summary
=======
> Total deployments:   6
> Final cost:          0.004351675039165075 ETH
*/
/*********************************************
 
Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 29970676 (0x1c950f4)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0xfcf01d2f90fef0ab8a16090aa23f6d1960571d975f450fccfeb76c13c257b933
   > Blocks: 1            Seconds: 16
   > contract address:    0xeE9A86b095Ce621355e4393252D0C340726BD47D
   > block number:        9120035
   > block timestamp:     1629041161
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.9907597729197984
   > gas used:            203143 (0x31987)
   > gas price:           1.000000013 gwei
   > value sent:          0 ETH
   > total cost:          0.000203143002640859 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9120036)
   > confirmation number: 2 (block: 9120037)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000203143002640859 ETH


2_deploy_contracts.js
=====================

   Replacing 'FarmerRole'
   ----------------------
   > transaction hash:    0xaeeb17d676f15b9c4f1685d4591dd3b8f29ed7299e7925cc9f1cb8bec596c3e6
   > Blocks: 4            Seconds: 68
   > contract address:    0x0577353AaB6F4Ee01C730781B08b2352240D5de4
   > block number:        9120043
   > block timestamp:     1629041281
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.99038253091602598
   > gas used:            331326 (0x50e3e)
   > gas price:           1.00000001 gwei
   > value sent:          0 ETH
   > total cost:          0.00033132600331326 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9120044)
   > confirmation number: 2 (block: 9120045)

   Replacing 'DistributorRole'
   ---------------------------
   > transaction hash:    0x8847afa032197e54b606f68b63ae59f2a3f2ec2e5e731b0b68e47fcdd5c2e6bb
   > Blocks: 1            Seconds: 24
   > contract address:    0xaEcB07B9ac2825E56583D8c204c0A824d01c81F4
   > block number:        9120047
   > block timestamp:     1629041341
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.990238727914444147
   > gas used:            143803 (0x231bb)
   > gas price:           1.000000011 gwei
   > value sent:          0 ETH
   > total cost:          0.000143803001581833 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9120048)
   > confirmation number: 2 (block: 9120049)

   Replacing 'RetailerRole'
   ------------------------
   > transaction hash:    0xda4c219845b79b6a5281fe9475daacb72bf98856e4d6ca8926eddd37fdfde292
   > Blocks: 1            Seconds: 12
   > contract address:    0x64BBE13eac1fD03d96b48376350cb7A39D9BC851
   > block number:        9120050
   > block timestamp:     1629041386
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.990094924912862314
   > gas used:            143803 (0x231bb)
   > gas price:           1.000000011 gwei
   > value sent:          0 ETH
   > total cost:          0.000143803001581833 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9120051)
   > confirmation number: 2 (block: 9120052)

   Replacing 'ConsumerRole'
   ------------------------
   > transaction hash:    0x2a42e9fc15deded9fe987f171a0479ca46efb9515fd9c1a6ddf2c8e773844c44
   > Blocks: 1            Seconds: 12
   > contract address:    0x498c865e5Cb37673D98AFD52d27922AcFb888517
   > block number:        9120053
   > block timestamp:     1629041431
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.989951121911136678
   > gas used:            143803 (0x231bb)
   > gas price:           1.000000012 gwei
   > value sent:          0 ETH
   > total cost:          0.000143803001725636 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9120054)
   > confirmation number: 2 (block: 9120055)

   Replacing 'SupplyChain'
   -----------------------
   > transaction hash:    0x68fc6058e578b44be9d2459fbad26e67700a6624f49e3f38b53c08b5d52b7165
   > Blocks: 1            Seconds: 13
   > contract address:    0xBD1A3320fA7dB5A903E1c80D3Ab8D95eb82C6a8f
   > block number:        9120056
   > block timestamp:     1629041476
   > account:             0x3136D5a806d0a01A36222d0881fc7Caa486c7ab5
   > balance:             0.986619291874486548
   > gas used:            3331830 (0x32d6f6)
   > gas price:           1.000000011 gwei
   > value sent:          0 ETH
   > total cost:          0.00333183003665013 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 9120057)
   > confirmation number: 2 (block: 9120058)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.004094565044852692 ETH


 */