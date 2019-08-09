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

func GetCode(c *gin.Context)  {
	email := c.DefaultPostForm("email", "1716175849@qq.com")
	if email == "" {
		c.JSON(422, gin.H{"message":"邮箱是必须的"})
		return
	}
	db := Orm.GetDB()
	var pre Model.Code
	if !db.Where("email=?", email).Last(&pre).RecordNotFound() {
		if !pre.ExpiredAt.Before(time.Now()) {
			c.JSON(403, gin.H{"message":"请不要频繁发送信息哦"})
			return
		}
	}

	var code = Model.Code{Email:email}
	db.Create(&code)
	code.SendMsg(email)
}
