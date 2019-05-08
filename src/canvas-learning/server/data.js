module.exports = {
  getData: function() {
    let random = Math.random()
    let y = 300 +( random > 0.5  ? (-20 *random) : (20 *random))
    return y
  }
}