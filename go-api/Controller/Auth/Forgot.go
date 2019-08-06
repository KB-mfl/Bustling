package Auth

import (
	"github.com/gin-gonic/gin"
)

/**
 * @api {PUT} auth/forgot 忘记密码-Forgot
 * @apiGroup Auth
 * @apiName Forgot
 * @apiPermission Login
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

func Forgot(c *gin.Context)  {

}
