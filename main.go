package main

import (
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/5anthosh/fcal-gui/assets"
	"github.com/webview/webview"
)

const webaddress = "127.0.0.1:43293"

func main() {
	ln := startWebServer()
	addr := fmt.Sprintf("http://%s", ln.Addr())
	log.Println(fmt.Sprintf("Starting Server at : %s", addr))
	defer ln.Close()
	debug := true
	w := webview.New(debug)
	defer w.Destroy()
	w.SetTitle("Fcal")
	w.SetSize(800, 800, webview.HintNone)
	w.Navigate(addr)
	w.Run()
}

func startWebServer() net.Listener {
	ln, err := net.Listen("tcp", webaddress)
	if err != nil {
		log.Fatal(err)
	}
	go http.Serve(ln, http.FileServer(assets.FS))
	return ln
}
