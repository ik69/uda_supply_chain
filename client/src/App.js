import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div>
          <h1>Fair Trade Coffee</h1>
          <p>Prove the authenticity of coffee using the Ethereum blockchain.</p>
        </div>
        <div className="container">
          <div id="ftc-harvest">
            <div className="form-group">
              <h2>Product Overview</h2>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="sku">SKU:</label>
                <input className="input-field" type="number" id="sku" size="8" name="sku" required />
                <label htmlFor="upc">UPC:</label>
                <input className="input-field" type="number" id="upc" size="8" name="upc" required />
                <label htmlFor="oid">Current Owner ID:</label>
                <input className="input-field" type="text" id="ownerID" name="ownerID" size="50" required />
                <div className="button-div">
                  <button className="btn-fetchOne" id="button" type="button" data-id="9">Fetch Data 1</button>
                  <button className="btn-fetchTwo" id="button" type="button" data-id="10">Fetch Data 2</button>
                </div>
              </form>
            </div>
            <div className="form-group">
              <h2>Farm Details</h2>
              <form>
                <label htmlFor="originFarmerID">Farmer ID:</label>
                <input type="text" id="originFarmerID" name="originFarmerID" size="50" />
                <label htmlFor="originFarmerID">Farm Name:</label>
                <input type="text" id="originFarmName" name="originFarmName" />
                <label htmlFor="originFarmerID">Farm Information:</label>
                <input type="text" id="originFarmInformation" name="originFarmInformation" />
                <label htmlFor="originFarmerID">Farm Latitude:</label>
                <input type="text" id="originFarmLatitude" name="originFarmLatitude" />
                <label htmlFor="originFarmLongitude">Farm Longitude:</label>
                <input type="text" id="originFarmLongitude" name="originFarmLongitude" /><br />
                <button className="btn-harvest" id="button" type="button" data-id="1">Harvest</button>
                <button className="btn-process" id="button" type="button" data-id="2">Process</button>
                <button className="btn-pack" id="button" type="button" data-id="3">Pack</button>
                <button className="btn-forsale" id="button" type="button" data-id="4">ForSale</button>
              </form>
            </div>
            <div className="form-group">
              <h2>Product Details</h2>
              <form>
                <label htmlFor="productNotes">Product Notes:</label>
                <input type="text" id="productNotes" name="productNotes" size="60" />
                <label htmlFor="productPrice">Product Price:  ETH</label>
                <input type="number" id="productPrice" name="productPrice" />
                <label htmlFor="distributorID"> Distributor ID:</label>
                <input type="text" id="distributorID" name="distributorID" />
                <label htmlFor="retailerID"> Retailer ID:</label>
                <input type="text" id="retailerID" name="retailerID" size="50" />
                <label htmlFor="consumerID"> Distributor ID:</label>
                <input type="text" id="consumerID" name="consumerID" size="50" />
                <br />
                <button className="btn-buy" id="button" type="button" data-id="5">Buy</button>
                <button className="btn-ship" id="button" type="button" data-id="6">Ship</button>
                <button className="btn-receive" id="button" type="button" data-id="7">Receive</button>
                <button className="btn-purchase" id="button" type="button" data-id="8">Purchase</button>
              </form>
            </div>
          </div>
          <div>
            <h2>Transaction History<span id="ftc-history"></span></h2>
            <ul id="ftc-events">
              <li>"kkkkk</li>
              <li>"kkkkk</li>
              <li>"kkkkk</li>
            </ul>
            <br></br>
            <hr></hr>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
