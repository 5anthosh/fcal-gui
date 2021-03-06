#!/bin/sh

APP="fcal-chrome.app"
mkdir -p dist/$APP/Contents/{MacOS,Resources}
go build -o dist/$APP/Contents/MacOS/fcal
cat > dist/$APP/Contents/Info.plist << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleExecutable</key>
	<string>fcal</string>
	<key>CFBundleIconFile</key>
	<string>icon.png</string>
	<key>CFBundleIdentifier</key>
	<string>com.santhosh.fcal</string>
</dict>
</plist>
EOF
cp app/build/icons/icon.png dist/$APP/Contents/Resources/icon.png
find dist/$APP
