import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import SupplyChainContract from "./contracts/SupplyChain.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
 
  actors = { owner:"0x42aba8BB5307Cefd7De7ad3050286838B4D9fAE3",
            farmer:"0xbD460DAF090f35FDB28b673cE3101FF17e2351B4",
            distributor:"0x7165df4Ee0285d0C509FF0474A38AA19aC9FD817",
            retailer:"0x68E2CD52ecE1b4d40d57481AE40F491deA7367f7",
            consumer:"0xa8B0b61134B24D9766053dd13Fd34016BA697CD6"}

  constructor(props) {
    super(props);
    this.state = {  web3: null, accounts: null, contract: null,
                    sku: "",
                    upc: null,
                    productID:null,
                    ownerID: "",
                    originFarmerID: "",
                    originFarmName: "",
                    originFarmInformation: "",
                    originFarmLatitude: "",
                    originFarmLongitude: "",
                    productNotes: "",
                    productPrice: "",
                    itemState: "",
                    distributorID: "",
                    retailerID: "",
                    consumerID: "",
                    buyProduct: "",
                    msg:""
                  };

    this.onInputchange = this.onInputchange.bind(this);
    this.harvest = this.harvest.bind(this);
    this.process = this.process.bind(this);
    this.pack = this.pack.bind(this);
    this.sell = this.sell.bind(this);
    this.buy = this.buy.bind(this);
    this.ship = this.ship.bind(this);
    this.receive = this.receive.bind(this);
    this.purchase = this.purchase.bind(this);
    this.register = this.register.bind(this);
    this.fetch1 = this.fetch1.bind(this);
    this.fetch2 = this.fetch2.bind(this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      //const deployedNetwork = SimpleStorageContract.networks[networkId];
      const deployedNetwork = SupplyChainContract.networks[networkId];
      const instance = new web3.eth.Contract( SupplyChainContract.abi, deployedNetwork && deployedNetwork.address, );
      // const instance = new web3.eth.Contract( SimpleStorageContract.abi, deployedNetwork && deployedNetwork.address, );
      // Set web3, accounts, and contract to the state, and then proceed with an example of interacting with the contract's methods.
      // **************   this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


  register = async () => {
    const { accounts, contract,originFarmerID,originFarmName, originFarmInformation, 
      originFarmLatitude,originFarmLongitude,productNotes,distributorID,retailerID,consumerID } = this.state;
    
      console.log(originFarmerID,originFarmName, originFarmInformation, 
      originFarmLatitude,originFarmLongitude,productNotes,distributorID,retailerID,consumerID)
    let bb = await contract.methods.register(
      originFarmerID,
      originFarmName, 
      originFarmInformation,
      originFarmLatitude,
      originFarmLongitude,
      productNotes, ).send({from: accounts[0]});
    console.log(bb);
  }

  fetch1 = async () => {
    const { accounts, contract, upc} = this.state;
    console.log(upc)
    if(!upc) {this.setState({msg: "UPC1 is  null"}); return;}
   let response =  await contract.methods.fetchItemBufferOne(upc).call();
   console.log(response);
   this.setState({ 
    sku:response.itemSKU,
    upc:response.itemUPC,
    productID: null,
    ownerID: response.ownerID,
    originFarmerID: response.originFarmerID,
    originFarmName: response.originFarmName,
    originFarmInformation: response.originFarmInformation,
    originFarmLatitude: response.originFarmLatitude,
    originFarmLongitude: response.originFarmLongitude,
    })
  }

  fetch2 = async () => {
    const { contract, upc} = this.state;
    if(!upc) {this.setState({msg: "UPC2 is  null"}); return;}
    let enumArray = [ "Harvested", "Processed", "Packed", "ForSale", "Sold", "Shipped", "Received", "Purchased" ];
   let response =  await contract.methods.fetchItemBufferTwo(upc).call();
   console.log(response)
   this.setState({ 
    productID:response.productID,
    productNotes: response.productNotes,
    productPrice: response.productPrice,
    itemState: enumArray[parseInt(response.itemState)],
    distributorID: response.distributorID,
    retailerID: response.retailerID,
    consumerID: response[8] 
    })
  }

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  harvest = async () => {
    const { accounts, contract, upc } = this.state;
    let response =  await contract.methods.harvestItem(upc).send({from: accounts[0]});
    console.log(response)

  }

  process = async () => {
    const { accounts, contract, upc } = this.state;
    let response =  await contract.methods.processItem(upc).send({from: accounts[0]});
    console.log(response)
    this.fetch2();
  }
  pack = async () => {
    const { accounts, contract, upc } = this.state;
    let response =  await contract.methods.packItem(upc).send({from: accounts[0]});
    console.log(response);
    this.fetch2();
  }
  sell = async () => {
    const { accounts, contract, upc, productPrice } = this.state;
    if(!upc || parseInt(productPrice) < 1) {this.setState({msg: "UPC2 is  null"}); return;}
    console.log(productPrice)
    let response =  await contract.methods.sellItem(upc, parseInt(productPrice)).send({from: accounts[0]});
    console.log(response);
    this.fetch2();
  }

  buy = async () => {
    const { accounts, contract, upc, productPrice, buyProduct } = this.state;
    if(!upc || parseInt(productPrice) < 1 || parseInt(buyProduct) < parseInt(productPrice)) {
      this.setState({msg: "UPC2 is  null or not enough Money"}); return;}
    console.log(productPrice)
    let response =  await contract.methods.buyItem(upc).send({from: accounts[0], value: buyProduct});
    console.log(response)
    this.fetch2();
  }

  ship = async () => {
    const { accounts, contract, upc, productPrice } = this.state;
    if(!upc || parseInt(productPrice) < 1) {this.setState({msg: "UPC2 is  null"}); return;}
    console.log(productPrice)
    let response =  await contract.methods.shipItem(upc).send({from: accounts[0]});
    console.log(response);
    this.fetch2();
  }
  receive = async () => {
    const { accounts, contract, upc, productPrice } = this.state;
    if(!upc || parseInt(productPrice) < 1) {this.setState({msg: "UPC2 is  null"}); return;}
    console.log(productPrice)
    let response =  await contract.methods.receiveItem(upc).send({from: accounts[0]});
    console.log(response);
    this.fetch2();
  }
  purchase = async () => {
    const { accounts, contract, upc, productPrice } = this.state;
    if(!upc || parseInt(productPrice) < 1) {this.setState({msg: "UPC2 is  null"}); return;}
    console.log(productPrice)
    let response =  await contract.methods.purchaseItem(upc).send({from: accounts[0]});
    console.log(response)
    this.fetch2();
  }


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div>
          <h1>Fair Trade Coffee</h1>
          <p>Prove the authenticity of coffee using the Ethereum blockchain.</p>
          <div className="columnDiv">
            <div style={{textAlign: "center", fontSize: "25px",color: "red", width: "30%"}}>{this.state.msg}</div>
            <div>
            {this.actors.owner} (0)   || 0xbD460DAF090f35FDB28b673cE3101FF17e2351B4 (1) || 0x7165df4Ee0285d0C509FF0474A38AA19aC9FD817 (2) || 
          0x68E2CD52ecE1b4d40d57481AE40F491deA7367f7 (3) || 0xa8B0b61134B24D9766053dd13Fd34016BA697CD6 (4)
            </div>
          </div>
        </div>
        <div className="container">
          <div id="ftc-harvest">
          <div className="form-group">
            {/*  <p>{this.actors.owner} 94.01 ETH 0</p>  <p>0xbD460DAF090f35FDB28b673cE3101FF17e2351B4 70.84 ETH 1</p>   <p>0x7165df4Ee0285d0C509FF0474A38AA19aC9FD817 99.69 ETH 2</p>
          <p>0x68E2CD52ecE1b4d40d57481AE40F491deA7367f7 100.00 ETH 3</p> <p>0xa8B0b61134B24D9766053dd13Fd34016BA697CD6 100.00 ETH 4</p> */}
            <h2>Farm Register</h2>
              <form>
                <label htmlFor="originFarmerID">Farmer ID:</label>
                <input  type="text" id="originFarmerID" name="originFarmerID" size="50" onChange={this.onInputchange}/>
                <label htmlFor="originFarmName">Farm Name: </label>
                <input value="Niki" type="text" style={{display: "inline"}} id="originFarmName" name="originFarmName" onChange={this.onInputchange}/><br />
                <label htmlFor="originFarmInformation">Farm Information: </label>
                <input value="Info" style={{display: "inline"}} type="text" id="originFarmInformation" name="originFarmInformation" onChange={this.onInputchange}/><br />
                <label htmlFor="originFarmLatitude">Farm Latitude: </label>
                <input value="100" style={{display: "inline"}} type="text" id="originFarmLatitude" name="originFarmLatitude" onChange={this.onInputchange}/><br />
                <label htmlFor="originFarmLongitude">Farm Longitude: </label>
                <input value="200" style={{display: "inline"}} type="text" id="originFarmLongitude" name="originFarmLongitude" onChange={this.onInputchange}/><br />
                <label htmlFor="productNotes">Product Notes: </label>
                <input value="Notes" style={{display: "inline"}} type="text" id="productNotes" name="productNotes" onChange={this.onInputchange}/><br />
                {/*<label htmlFor="productPrice">Product Price: </label>
                <input style={{display: "inline"}} type="number" id="productPrice" name="productPrice" onChange={this.onInputchange} /><br />
                <label htmlFor="itemState">Product State: </label>
                <input value="State" style={{display: "inline"}} type="text" id="itemState" name="itemState" onChange={this.onInputchange} disabled/><br />
                <label htmlFor="distributorID">DistributorID: </label>
                <input  type="text" id="distributorID" name="distributorID" onChange={this.onInputchange}/>
                <label htmlFor="retailerID">RetailerID:</label>
                <input  type="text" id="retailerID" name="retailerID" onChange={this.onInputchange}/>
                <label htmlFor="consumerID">Consumer ID:</label>
                <input  type="text" id="consumerID" name="consumerID" onChange={this.onInputchange}/>*/}
                <button className="btn-harvest" id="button" type="button" data-id="1" onClick={this.register}>Register & Harvest</button>
              </form>
        </div>
            <div className="form-group">
              <h2>Product Overview</h2>
              <form>
              <label htmlFor="upc">UPC:</label>
                <input className="input-field" type="number" id="upc" size="8" name="upc" onChange={this.onInputchange} required />
                <div className="button-div">
                  <button className="btn-fetchOne" id="btnfetch1" type="button" data-id="9" onClick={this.fetch1}>Fetch Data 1</button>
                  <button className="btn-fetchTwo" id="btnfetch2" type="button" data-id="10" onClick={this.fetch2}>Fetch Data 2</button>
                </div>
                
                <p> <span>SKU:</span> {this.state.sku} <span> Item State: </span> {this.state.itemState}</p>
                <p><span>Current Owner ID:</span> {this.state.ownerID} </p>
                <p><span>Distributor ID:</span> {this.state.distributorID}</p>
                <p><span>Retailer ID:</span> {this.state.retailerID}</p>
                <p><span>Consumer ID:</span> {this.state.consumerID}</p>
                </form>
            </div>
            <div className="form-group">
              <h2>Farm Details & Product Details</h2>
              <form>
                <p><span>Farmer ID:</span> {this.state.originFarmerID}</p>
                <p><span>Farm Name:</span> {this.state.originFarmName}</p>
                <p><span>Farm Information:</span> {this.state.originFarmInformation}</p>
                <p><span>Farm Latitude:</span> {this.state.originFarmLatitude}</p>
                <p><span>Farm Longitude:</span> {this.state.originFarmLongitude}</p>
                <p><span>Product Notes:</span> {this.state.productNotes}</p>
                 {/*<button className="btn-harvest" id="button" type="button" data-id="1" onClick={this.harvest}>Harvest</button> */}
                <button className="btn-process" id="button" type="button" data-id="2" onClick={this.process}>Process</button>
                <button className="btn-pack" id="button" type="button" data-id="3" onClick={this.pack}>Pack</button>
                <p>
                  {/*<span>Product Price:</span> {this.state.productPrice}*/}
                  <label htmlFor="productPrice">Product Price: </label>
                  <input style={{display: "inline", marginRight: "10px"}} type="number" id="productPrice" name="productPrice" onChange={this.onInputchange} />
                  <button className="btn-forsale" id="button" type="button" data-id="4" onClick={this.sell}>ForSale</button>
                </p>
              </form>
            </div>
            {/* ************************************************************************************/}
            <div className="form-group1">
              <div>
                <h2>Distributor</h2>
                <form>
                <p><span>Product price: </span>{this.state.productPrice}</p>
                  <label htmlFor="buyProduct">Buy Product: </label>
                  <input style={{display: "inline", marginRight: "10px"}} type="number" id="buyProduct" name="buyProduct" onChange={this.onInputchange} />
                  <button className="btn-buy" id="button" type="button" data-id="5" onClick={this.buy}>Buy</button>
                  <button className="btn-ship" id="button" type="button" data-id="6" onClick={this.ship}>Ship</button>
                  </form>
              </div>
              <div>
                <h2>Retailer</h2>
                <button className="btn-receive" id="button" type="button" data-id="7" onClick={this.receive}>Receive</button>
              </div>
              <div>
                <h2>Cosumer</h2>
                <button className="btn-purchase" id="button" type="button" data-id="8" onClick={this.purchase}>Purchase</button>
              </div>
                
               
            </div>
          </div>
        
        {/*  
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
        */}  
        </div>

      </div>
    );
  }
}

export default App;
