$(document).ready(async () => {
  let apiURL = "http://137.184.104.195/api/users";

  const isAdmin = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const { data } = await axios.get(`${apiURL}/renew`, {
        headers: { "x-token": token },
      });

      if (data.user.perfilId === "1") {
        return true;
      }
    } else {
      return false;
    }
  };

  $("#register-button").on("click", async () => {
    const admin = await isAdmin();

    if (admin) {
      const email = $("#register-email").val();

      const name = $("#register-name").val();

      const password = $("#register-password").val();

      const walletAddress = $("#register-wallet").val();

      const { data } = await axios.post(`${apiURL}/crear`, {
        name,

        email,

        password,

        walletAddress,

        perfilId: "2",
      });

      $("#register-msg").html(data.msg);
    } else {
      $("#register-msg").html("No eres administrador");
    }
  });
});
