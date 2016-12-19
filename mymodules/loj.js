
let LoJ = function(arr) {
  var out = [];
  for (i=0; i < arr.length/2; i++)
    {
      out.push([])
    };
  for (j=0; j < out.length; j++)
    {
      if (j == 0) {
        out[0].push(arr[j],arr[j+1]);
      }
      else {
        out[(j)].push(arr[j*2],arr[j*2+1]);
      }
    };
  return out
}

module.exports = LoJ;
