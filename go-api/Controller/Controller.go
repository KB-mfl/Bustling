package Controller

import (
	"crypto/sha1"
	"fmt"
)

func Sha1Check(target, origin string) bool {
	b := []byte(origin)
	data := sha1.Sum(b)
	check := fmt.Sprintf("%x", data)
	return check == target
}
