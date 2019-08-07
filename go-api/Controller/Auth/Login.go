package Auth

import "github.com/gin-gonic/gin"

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

func Login(c *gin.Context)  {

}
