package Controller

import (
	"crypto/sha256"
	"encoding/hex"
)

func Sha256Check(target, origin string) bool {
	check := sha256.New()
	check.Write([]byte(origin))
	return hex.EncodeToString(check.Sum([]byte(""))) == target
}

func Sha256Get(origin string) string {
	target := sha256.New()
	target.Write([]byte(origin))
	return hex.EncodeToString(target.Sum([]byte("")))
}
