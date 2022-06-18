let apiURL = "http://137.184.104.195/api/users";

$(document).ready(async () => {
  $("#login-button").on("click", async () => {
    const email = $("#login-email").val();

    const password = $("#login-password").val();

    const walletAddress = $("#login-wallet").val();

    const { data } = await axios.post(`${apiURL}/logear`, {
      email,

      password,

      walletAddress,
    });

    if (data.ok) {
      localStorage.setItem("token", data.token);

      localStorage.setItem("name", data.user.name);

      localStorage.setItem("email", data.user.email);

      localStorage.setItem("wallet", data.user.walletAddress);

      window.location.replace("wallet.html");
    } else {
      $("#login-error").html(data.msg);
    }
  });
});
