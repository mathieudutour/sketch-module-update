module.exports = function getReleaseNotes(repo) {
  var url = NSURL.URLWithString('https://raw.githubusercontent.com/' + repo + '/master/CHANGELOG.md')

  var request = NSMutableURLRequest.requestWithURL_cachePolicy_timeoutInterval(url, NSURLRequestReloadIgnoringCacheData, 30)
  request.setHTTPMethod('GET')

  var response = null
  var error = null
  var data = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, response, error)

  if (error == null && data != null) {
    var res = NSString.alloc().initWithData_encoding(data, NSUTF8StringEncoding)
    return res
  }
}
