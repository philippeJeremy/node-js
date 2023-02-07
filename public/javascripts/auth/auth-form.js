window.addEventListener("DOMContentLoaded", () => {
  const forgot = document.querySelector("#forgot");
  if (forgot) {
    forgot.addEventListener("click", () => {
      Swal.fire({
        title: "renseignez votre email",
        input: "email",
        inputPlaceholder: "Email",
      }).then((result) => {
        const email = result.value;
        if (email) {
          axios
            .post("/users/forgot-password", { email: email })
            .then((response) => {
              Swal.fire({
                type: "success",
                title: "Vous avez reçu un email avec les instruction",
              });
            })
            .catch((error) => {
              Swal.fire({
                type: "error",
                title: "une erreur est survenue",
              });
            });
        }
      });
    });
  }
});
