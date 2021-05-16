#!/bin/sh

APP=fcal
APPDIR=dist/${APP}_0.0.3

mkdir -p $APPDIR/usr/bin
mkdir -p $APPDIR/usr/share/applications
mkdir -p $APPDIR/usr/share/icons/hicolor/256x256/apps
mkdir -p $APPDIR/DEBIAN

go build -o $APPDIR/usr/bin/$APP

cp app/build/icons/icon.png $APPDIR/usr/share/icons/hicolor/256x256/apps/${APP}.png

cat > $APPDIR/usr/share/applications/${APP}.desktop << EOF
[Desktop Entry]
Version=0.0.2
Type=Application
Name=$APP
Exec=$APP
Icon=$APP
Terminal=false
StartupWMClass=fcal
EOF

cat > $APPDIR/DEBIAN/control << EOF
Package: ${APP}
Version: 0.0.3
Section: base
Priority: optional
Architecture: amd64
Depends: libwebkit2gtk-4.0-37
Maintainer: Santhosh Kumar R <santhoshkumarr1096@gmail.com>
Description: Calculator
EOF

dpkg-deb --build $APPDIR
