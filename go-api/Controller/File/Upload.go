package File

import (
	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
	"io"
	"os"
	"strings"
)

/**
 * @api {POST} /upload 上传文件-File
 * @apiGroup File
 * @apiName Upload
 * @apiPermission All
 * @apiParam {file} file 小于3M
 * @apiSuccess {string} filename 文件名
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "filename": "xxx.png"
 * }
 */

func Upload(c *gin.Context)  {
	file, header, err := c.Request.FormFile("file")
	if err != nil {
		panic(err)
	}
	mimeType := strings.Split(header.Filename, ".")[1]
	filename := uuid.NewV4().String()
	out, err := os.Create("public/images/"+filename+"."+mimeType)
	if err != nil {
		panic(err)
	}
	defer func() {
		err := out.Close()
		if err != nil {
			panic(err)
		}
	}()
	_, err = io.Copy(out, file)
	if err != nil {
		panic(err)
	}
	c.JSON(200, gin.H{
		"filename": filename+"."+mimeType,
	})
}
