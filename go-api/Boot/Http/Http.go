package Http

import (
	"Bustling/go-api/Boot/Config"
	"fmt"
	"github.com/gin-gonic/gin"
)

var http *Http
var Router *gin.Engine

type Http struct {
	server *gin.Engine
	port string
	addr string
}

func InitHttp() {
	http = new(Http)
	http.server = gin.Default()
	Router = http.server
	http.port = Config.GetStringWithDefault("http.port", "localhost")
	http.addr = Config.GetStringWithDefault("http.server", "8000")
}

func Run() {
	err := Router.Run(http.addr + ":" + http.port)
	if err != nil {
		panic(fmt.Errorf("Fatal error run http server: %s\n", err))
	}
}