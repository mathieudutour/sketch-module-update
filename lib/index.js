// Check for update
var getManifestVersion = require('./getManifestVersion')
var getNewestVersion = require('./getNewestVersion')
var getReleaseNotes = require('./getReleaseNotes')

function isNewUpdate(newestVersion, pluginVersion) {
  return newestVersion && pluginVersion && newestVersion != pluginVersion;
}

module.exports = function(repo, options) {
  options = options || {}
  var timeBetweenChecks = options.timeBetweenChecks || 24 * 60 * 60 * 1000
  var prefKey = options.prefKey || repo + '-update-last-check'
  var customizeAlert = options.customizeAlert || function () {}
  var title = options.title || 'A new ' + repo + ' plugin version is available!'
  var okButton = options.okButton || 'Download update'
  var laterButton = options.laterButton || 'Remind me later'
  return function(context) {
    var prefs = NSUserDefaults.standardUserDefaults();
    lastCheck = prefs.stringForKey(prefKey)
    var timestamp = (new Date()).getTime()
    if (lastCheck && lastCheck + timeBetweenChecks > timestamp) {
      return // skip until next day
    }

    var newestVersion = getNewestVersion(repo)
    var pluginVersion = getManifestVersion(context)

    if (isNewUpdate(newestVersion, pluginVersion)) {
      var releaseNotes = getReleaseNotes(repo)

      var accessory = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 250))

      var title = NSTextView.alloc().initWithFrame(NSMakeRect(0, 225, 300, 20))
      title.string = 'Version ' + newestVersion + ' is available (current version: ' + pluginVersion + ')'
      title.drawsBackground = false
      title.editable = false

      var scroll = NSScrollView.alloc().initWithFrame(NSMakeRect(0, 25, 300, 200))
      var contentSize = scroll.contentSize()

      scroll.setBorderType(NSNoBorder)
      scroll.setHasVerticalScroller(true)
      scroll.setHasHorizontalScroller(false)
      var release = NSTextView.alloc().initWithFrame(NSMakeRect(0, 0, contentSize.width, contentSize.height))
      release.setMinSize(NSMakeSize(0.0, contentSize.height))
      release.setVerticallyResizable(true)
      release.setHorizontallyResizable(false)
      release.setAutoresizingMask(NSViewWidthSizable)

      release.textContainer().setWidthTracksTextView(true)
      release.string = releaseNotes
      release.drawsBackground = true
      release.editable = false

      scroll.setDocumentView(release)

      accessory.addSubview(title)
      accessory.addSubview(scroll)

      var alert = NSAlert.alloc().init()
      alert.setMessageText(title)
      alert.addButtonWithTitle(okButton)
      alert.addButtonWithTitle(laterButton)
	  // customizeAlert(context, alert)
      alert.setAccessoryView(accessory)

      var responseCode = alert.runModal()

      if(responseCode == 1000){
        var url = NSURL.URLWithString('https://github.com/' + repo + '/releases/latest')
        NSWorkspace.sharedWorkspace().openURL(url)
      } else {
        NSUserDefaults.standardUserDefaults().setObject_forKey(timestamp, prefKey)
      }
    }
  }
}
