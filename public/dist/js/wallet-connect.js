$(document).ready(async () => {
  const exchangeAddress = "0xda9c9157f7859fb83de0fabf7776554d35599ba7";
  const tokenAddress = "0xa2a5ee61e6a0c993fb5060fa7b8270cc2cdc7c08";
  const busdAddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
  const setInitialData = () => {
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const wallet = localStorage.getItem("wallet");
    $("#email-text").html(email);
    $("#user-text").html(name);
    $("#wallet-text").html(wallet);
  };
  const getAndSetNDRPrice = async () => {
    fetch("./exchangeAbi.json")
      .then((res) => res.json())
      .then(async (data) => {
        const Exchange = new web3.eth.Contract(data, exchangeAddress);
        let price = await Exchange.methods.fetchedPrice().call();
        price = web3.utils.fromWei(price);
        price = (Math.round(price * 100) / 100).toFixed(2);
        $("#ndr-price").html(`$${price}`);
        $("#ndr-price2").html(`$${price}`);
      });
  };
  const buyToken = async (amount) => {
    fetch("./exchangeAbi.json")
      .then((res) => res.json())
      .then(async (exchange) => {
        const Exchange = new web3.eth.Contract(exchange, exchangeAddress);
        const wallet = localStorage.getItem("wallet");
        await Exchange.methods
          .buyToken(amount, tokenAddress)
          .send({ from: wallet });
      });
  };
  const BUSDApprove = async () => {
    fetch("./bep20abi.json")
      .then((res) => res.json())
      .then(async (data) => {
        const BUSD = new web3.eth.Contract(data, busdAddress);
        const wallet = localStorage.getItem("wallet");
        let busdBalance = await BUSD.methods.balanceOf(wallet).call();
        BUSD.methods
          .approve(exchangeAddress, busdBalance)
          .send({ from: wallet });
      });
  };
  const walletConnect = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        return web3;
      } catch (error) {
        console.error(error);
      }
    } else if (window.web3) {
      const web3 = window.web3;
      console.log("Injected web3 detected.");
      return web3;
    } else {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:9545");
      const web3 = new Web3(provider);
      console.log("No web3 instance injected, using Local web3.");
      return web3;
    }
  };
  $("#connect-wallet-button").on("click", async () => {
    await walletConnect();
  });
  $("#update-ndr-button").on("click", async () => {
    await getAndSetNDRPrice();
  });
  $("#aprobar-swap-button").on("click", async () => {
    await BUSDApprove();
  });
  $("#buy-ndr-button").on("click", async () => {
    let amount = $("#buy-amount").val();
    console.log(amount);
    if (amount <= 0) return;
    amount = web3.utils.toWei(amount);
    await buyToken(amount);
  });

  const oldProvider = web3.currentProvider; // keep a reference to metamask provider
  web3 = new Web3(oldProvider);
  setInitialData();
  await getAndSetNDRPrice();
});
