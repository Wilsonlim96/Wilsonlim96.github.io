const x = 1;
function Add(x) {
  if (x < 5) {
    x++;
    console.log(x);
    Add(x);
  }
}

Add(x);
