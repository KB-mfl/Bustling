package Auth

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Controller"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
	"time"
)

/**
 * @api {PUT} auth/forgot 忘记密码-Forgot
 * @apiGroup Auth
 * @apiName Forgot
 * @apiPermission All
 * @apiParam {string} email 邮箱
 * @apiParam {string} password 新密码
 * @apiParam {string} code 验证码
 * @apiParamExample {json} Request-Example:
 * {
 *      'email': 'haha@example.com',
 * 		'code': '123456',
 *      'password': 'd033e22ae348aeb5660fc2140aec35850c4da997'
 * }
 */

type ForgotValidate struct {
	Email string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required,len=40"`
	Code     string `json:"code" binding:"required,len=6"`
}

func Forgot(c *gin.Context)  {
	var data ForgotValidate
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(422, gin.H{"message":"信息格式有误哦"})
		return
	}
	db := Orm.GetDB()
	var code Model.Code
	if db.Where("email=?", data.Email).Last(&code).RecordNotFound() || code.Code != data.Code {
		c.JSON(401, gin.H{"message":"验证码有误哦"})
		return
	}
	if code.ExpiredAt.Before(time.Now()) {
		c.JSON(401, gin.H{"message":"验证码过期了哦"})
		return
	}
	var user Model.User
	if db.Where("email=?", data.Email).First(&user).RecordNotFound() {
		c.JSON(401, gin.H{"message":"邮箱输入有误哦"})
		return
	}
	if err := db.Model(&user).UpdateColumn("password", Controller.Sha256Get(data.Password)).Error; err != nil {
		panic(err)
	} else {
		message := "你修改密码的奏折朕已批准。"
		code.SendMsg(data.Email, message)
	}
}
