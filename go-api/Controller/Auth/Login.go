package Auth

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Controller"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
)

/**
 * @api {POST} auth/login 登陆-Login
 * @apiGroup Auth
 * @apiName Login
 * @apiPermission All
 * @apiParam {string} password 密码(sha1加密)
 * @apiParam {string} username 名字
 * @apiParam {boolean} [remember] 记住我(30天)
 * @apiParamExample {json} Request-Example:
 * {
 *      'username': 'administrator',
 *      'password': 'd033e22ae348aeb5660fc2140aec35850c4da997',
 *      'remember': false
 * }
 * @apiParamExample {json} Request-Example2:
 * {
 *      'username': 'administrator',
 *      'password': 'd033e22ae348aeb5660fc2140aec35850c4da997'
 * }
 * @apiSuccess {string} token Api-Token
 * @apiSuccessExample {json} Success-response:
 * {
 *     'token': 'b2336207-3136-47aa-9362-de45f3e49e65'
 * }
 */

type LoginValidate struct {
	Username   string  `json:"username" binding:"required"`
	Remember   bool    `json:"remember"`
	Password   string  `json:"password" binding:"required,len=40"`
}

func Login(c *gin.Context) {
	var data LoginValidate
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(422, gin.H{"message": "格式不正确哦"})
		return
	}
	var user Model.User
	db := Orm.GetDB()
	if db.Where("username = ?", data.Username).First(&user).RecordNotFound() {
		c.JSON(401, gin.H{"message": "用户名或密码错误"})
		return
	}
	if !Controller.Sha256Check(user.Password, data.Password) {
		c.JSON(401, gin.H{"message": "用户名或密码错误"})
		return
	}
	var apiToken = Model.ApiToken{UserId: user.ID}
	apiToken.AddTime(data.Remember)
	db.Create(&apiToken)
	c.JSON(200, gin.H{"token": apiToken.Token})
}
