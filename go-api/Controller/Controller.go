package Controller

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
)

func Sha1Check(target, origin string) bool {
	b := []byte(origin)
	data := sha256.Sum256(b)
	check := fmt.Sprintf("%x", data)
	return check == target
}

func Sha256Get(origin string) string {
	target := sha256.New()
	target.Write([]byte(origin))
	return hex.EncodeToString(target.Sum([]byte("")))
}
