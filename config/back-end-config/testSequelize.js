const synaptic = require('synaptic')

var hopfield = new synaptic.Architect.Hopfield(12)

hopfield.learn([
[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
])

console.log(hopfield.feed([0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0]))
console.log(hopfield.feed([1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0]))
