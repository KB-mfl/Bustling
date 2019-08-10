package Auth

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
	"time"
)

/**
 * @api {POST} auth/code 获取验证码-GetCode
 * @apiGroup Auth
 * @apiName GetCode
 * @apiPermission All
 * @apiParam {string} email 验证邮箱
 * @apiParamExample {json} Request-Example:
 * {
 *      'email': 'haha@example.com'
 * }
 * @apiError {string} failed 获取失败
 * @apiErrorExample {json} 403:
 * {
 *      'message': '请不要频繁发送信息哦'
 * }
 */

type GetCodeValidate struct {
	Email string `json:"email" binding:"required,email"`
}

func GetCode(c *gin.Context)  {
	var data GetCodeValidate
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(422, gin.H{"message": err.Error()})
		return
	}
	db := Orm.GetDB()
	var pre Model.Code
	if !db.Where("email=?", data.Email).Last(&pre).RecordNotFound() {
		if !pre.ExpiredAt.Before(time.Now()) {
			c.JSON(403, gin.H{"message":"请不要频繁发送信息哦"})
			return
		}
	}

	var code = Model.Code{Email: data.Email}
	db.Create(&code)
	message := "你的验证码为 "+code.Code+" 有效期为3分钟。"
	code.SendMsg(data.Email, message)
}
