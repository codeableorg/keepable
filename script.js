function maybeShowEmptyMessage() {
  let message = document.querySelector(".empty_msg"); 
  let note = document.querySelector(".note"); 

  if (note === null) {
    message.style.display = ""; 
  } else {
    message.style.display = "none";
  }
}

maybeShowEmptyMessage(); 

