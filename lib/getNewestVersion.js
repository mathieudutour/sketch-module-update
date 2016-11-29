module.exports = function getNewestVersionNumber(repo) {
  var url = NSURL.URLWithString('https://raw.githubusercontent.com/' + repo + '/master/package.json.json')

  var request = NSMutableURLRequest.requestWithURL_cachePolicy_timeoutInterval(url, NSURLRequestReloadIgnoringCacheData, 30)
  request.setHTTPMethod('GET')

  var response = null
  var error = null
  var data = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, response, error)

  if (error == null && data != null) {
    var errorJson
    var res = NSJSONSerialization.JSONObjectWithData_options_error(data, NSJSONReadingMutableLeaves, errorJson)

    if (errorJson == null && res != null && res.version != null) {
      return res.version.toString()
    }
    return false
  }
}
