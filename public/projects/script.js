const colors = ['red', 'green', 'blue']; // Array of color options
let colorIndex = 0; // Separate variable to track current color index

document.getElementById("btn").onclick = function() {
  // Change background color using the colorIndex
  document.body.style.backgroundColor = colors[colorIndex];

  // Update the colorIndex for next click (to loop through colors)
  colorIndex = (colorIndex + 1) % colors.length;
};
