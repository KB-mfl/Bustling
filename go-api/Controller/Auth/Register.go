package Auth

import (
	"Bustling/go-api/Boot/Orm"
	"Bustling/go-api/Controller"
	"Bustling/go-api/Model"
	"github.com/gin-gonic/gin"
	"time"
)

/**
 * @api {POST} auth/register 注册-Register
 * @apiGroup Auth
 * @apiName Register
 * @apiPermission All
 * @apiParam {string} username 注册名字
 * @apiParam {string} password 密码(sha1加密)
 * @apiParam {string} email 注册邮箱
 * @apiParam {string} code 验证码(6位)
 * @apiParamExample {json} Request-Example:
 * {
 *      'username': 'test',
 *      'password': 'd033e22ae348aeb5660fc2140aec35850c4da997',
 *      'email': 'haha@example.com',
 *      'code': '123456'
 * }
 * @apiSuccess {string} token Api-Token
 * @apiSuccessExample {json} Success-Response:
 * {
 *      'token': 'b2336207-3136-47aa-9362-de45f3e49e65'
 * }
 */

type RegisterValidate struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required,len=40"`
	Email    string `json:"email" binding:"required"`
	Code     string `json:"code" binding:"required,len=6"`
}

func Register(c *gin.Context)  {
	var data RegisterValidate
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(422, gin.H{"message": err.Error()})
		return
	}
	db := Orm.GetDB()
	if !db.Where("username=?", data.Username).First(&Model.User{}).RecordNotFound() {
		c.JSON(403, gin.H{"message":"该用户名已被注册哦"})
		return
	}
	if !db.Where("email=?", data.Email).First(&Model.User{}).RecordNotFound() {
		c.JSON(403, gin.H{"message":"该邮箱已被注册哦"})
		return
	}

	var code Model.Code
	if db.Where("email=?", data.Email).Last(&code).RecordNotFound() || code.Code != data.Code {
		c.JSON(403, gin.H{"message":"验证码错误"})
		return
	}
	if code.ExpiredAt.Before(time.Now()) {
		c.JSON(403, gin.H{"message": "验证码过期了哦"})
		return
	}

	var user = Model.User{
		Username: data.Username,
		Password: Controller.Sha256Get(data.Password),
		Email: data.Email,
	}
	if err := db.Create(&user).Error; err != nil {
		panic(err)
	}

	var apiToken = Model.ApiToken{UserId: user.ID}
	apiToken.AddTime(false)
	db.Create(&apiToken)
	c.JSON(200, gin.H{"token": apiToken.Token})
}
