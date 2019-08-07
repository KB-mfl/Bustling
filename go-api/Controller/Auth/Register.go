package Auth

import "github.com/gin-gonic/gin"

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

func Register(c *gin.Context)  {

}