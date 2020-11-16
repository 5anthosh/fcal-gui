package main

import (
	"os"

	"github.com/zserge/lorca"
)

func main() {
	_, err := os.Stat("assets")
	if !os.IsExist(err) {
		os.Mkdir("assets", os.ModePerm)
	}
	lorca.Embed("assets", "./assets/assets.go", "app/static")
}
