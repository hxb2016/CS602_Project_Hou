function checkAmount(e, quantity) {
  if (e.target.value > quantity) {
    alert("Amount must be less than Product quantity");
    if (quantity != 0) {
      e.target.value = quantity;
    } else {
      e.target.value = "";
    }
  }

  if (Number(e.target.value) <= 0 && e.target.value!='') {
    alert("Amount must be more than zero");
    e.target.value = "";
  }
}
