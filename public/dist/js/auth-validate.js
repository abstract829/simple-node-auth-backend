const apiURL = "https://dapp-production.up.railway.app/api/users";

$(document).ready(async () => {
  const validateToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const { data } = await axios.get(`${apiURL}/renew`, {
        headers: { "x-token": token },
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("wallet", data.user.walletAddress);
    } else {
      window.location.replace("registro-login.html");
    }
  };
  await validateToken();
});
