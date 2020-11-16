package main

import (
	"github.com/zserge/lorca"
)

func main() {
	lorca.Embed("assets", "./assets/assets.go", "app/static")
}
