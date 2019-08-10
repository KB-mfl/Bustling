package Model

import (
	"Bustling/go-api/Boot/Config"
	"github.com/jinzhu/gorm"
	"math/rand"
	"net/smtp"
	"strconv"
	"time"
)

type Code struct {
	gorm.Model

	Code string			 `gorm:"not null"`
	Email string		 `gorm:"not null"`
	ExpiredAt time.Time  `gorm:"not null"`
}

func (*Code) TableName() string {
	return "code"
}

func (code *Code) BeforeCreate(scope *gorm.Scope) error {
	rand.Seed(time.Now().UnixNano())
	str := strconv.Itoa(rand.Intn(1000000))
	for len(str) < 6 {
		str = "0" + str
	}
	duration, _ := time.ParseDuration("3m")
	_ = scope.SetColumn("Code", str)
	_ = scope.SetColumn("ExpiredAt", time.Now().Add(duration))
	return nil
}

func (code *Code) SendMsg(email string, message string)  {
	username := Config.GetString("email.username")
	password := Config.GetString("email.password")
	host := Config.GetString("email.host")
	auth := smtp.PlainAuth("", username, password, host)
	msg := []byte("To: "+email+"\r\nFrom:"+username+"\r\nSubject: 奉天承运，皇帝诏曰：\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n"+message+"钦此！！！\r\n还不快快接旨！")
	port := Config.GetString("email.port")
	err := smtp.SendMail(host+":"+port, auth, username, []string{email}, msg)
	if err != nil {
		panic(err.Error())
	}
}