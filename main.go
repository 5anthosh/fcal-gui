package main

import (
	"embed"
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/webview/webview"
)

//go:embed app/static
var assets embed.FS

const webaddress = "127.0.0.1:43293"

func main() {
	ln := startWebServer()
	addr := fmt.Sprintf("http://%s/app/static", ln.Addr())
	log.Println(fmt.Sprintf("Starting Server at : %s", addr))
	defer ln.Close()
	debug := false

	w := webview.New(debug)
	defer w.Destroy()
	w.SetTitle("Fcal")
	w.SetSize(800, 1000, webview.HintNone)
	w.Navigate(addr)
	w.Run()
}

func startWebServer() net.Listener {
	ln, err := net.Listen("tcp", webaddress)
	if err != nil {
		log.Fatal(err)
	}
	go http.Serve(ln, http.FileServer(http.FS(assets)))
	return ln
}
