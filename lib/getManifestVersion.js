module.exports = function getManifestVersion(context) {
  var scriptFullPath = context.scriptPath
  var directoryPlugin = scriptFullPath.stringByDeletingLastPathComponent()
  var manifestFile = directoryPlugin + "/manifest.json"

  var fileManager = NSFileManager.defaultManager()
  if (fileManager.fileExistsAtPath(manifestFile)) {
    var fetchData = NSData.dataWithContentsOfFile(manifestFile)
    if (fetchData) {
      var error;
      var res = NSJSONSerialization.JSONObjectWithData_options_error(fetchData, NSJSONReadingMutableLeaves, error)

      if(error == null && res != null && res.version != null){
        return res.version.toString()
      } else {
        log("error " + error)
        return false
      }
    }
    log("Could not get manifest file data")
    return false
  }
  log("No manifest found at " + manifestFile)
  return false
}
