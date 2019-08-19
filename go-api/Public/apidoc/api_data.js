define({ "api": [
  {
    "type": "POST",
    "url": "article/",
    "title": "发表文章-Create",
    "group": "Article",
    "name": "Create",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "article_type",
            "description": "<p>文章类型</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "tags",
            "description": "<p>文章标签</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "html_content",
            "description": "<p>html格式</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "raw_content",
            "description": "<p>raw格式</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     'title': '震惊！！！',\n     'articleType': '综合',\n     'tags': '996/工作室',\n     'htmlContent': '<p>这是内容</p>',\n     'rawContent': '假装这是raw格式'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "Controller/Article/Create.go",
    "groupTitle": "Article"
  },
  {
    "type": "GET",
    "url": "article/detail/:article_id",
    "title": "获取文章-GetDetail",
    "group": "Article",
    "name": "GetDetail",
    "permission": [
      {
        "name": "All"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "user_id",
            "description": "<p>作者id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "tags",
            "description": "<p>文章标签</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "article_type",
            "description": "<p>文章类型</p>"
          },
          {
            "group": "Success 200",
            "type": "text",
            "optional": false,
            "field": "html_article",
            "description": "<p>文章内容</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "views",
            "description": "<p>观看数</p>"
          },
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "reviewed",
            "description": "<p>是否通过审核</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "created_at",
            "description": "<p>文章创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "updated_at",
            "description": "<p>文章更新时间</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "\t{\n     'user_id': '22a52817-bc97-4e75-b8cd-a1b5e91cda2f',\n     'id': '2345342817-bc97-4e75-b8cd-a1b5e91cda2f',\n     'title': '哇哈哈',\n     'tags': '牛奶/儿童饮料',\n\t\t'article_type': 'life',\n\t\t'html_content': '<p>这是最简单的一篇文章</p>'\n     'updated_at': '2019-08-15T19:53:21+08:00',\n     'created_at': '2019-09-24T17:43:11+08:00'\n\t},",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "Controller/Article/GetDetail.go",
    "groupTitle": "Article"
  },
  {
    "type": "GET",
    "url": "article/list/:articleType",
    "title": "获取文章列表-GetList",
    "group": "Article",
    "name": "GetList",
    "permission": [
      {
        "name": "All"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "articleType",
            "description": "<p>文章类型</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": true,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": true,
            "field": "offset",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "user_id",
            "description": "<p>作者id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "article_type",
            "description": "<p>文章类型</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "tags",
            "description": "<p>文章标签</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "views",
            "description": "<p>观看数</p>"
          },
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "reviewed",
            "description": "<p>是否通过审核</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "created_at",
            "description": "<p>文章创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "updated_at",
            "description": "<p>文章更新时间</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n\n\t\t{\n     \t'user_id': '22a52817-bc97-4e75-b8cd-a1b5e91cda2f',\n     \t'id': '2345342817-bc97-4e75-b8cd-a1b5e91cda2f',\n     \t'title': '哇哈哈',\n     \t'tags': '牛奶/儿童饮料',\n\t\t\t'views': 2,\n\t\t\t'reviewed': true,\n\t\t\t'article_type': 'life',\n     \t'updated_at': '2019-08-15T19:53:21+08:00',\n     \t'created_at': '2019-09-24T17:43:11+08:00'\n\t\t},\n\t\t{\n     \t'user_id': '22a52817-bc97-4e75-b8cd-a1b5e91cda2f',\n     \t'id': '2345342817-bc97-4e75-b8cd-a1b5e91cda2f',\n     \t'title': '哇哈哈',\n     \t'tags': '牛奶/儿童饮料',\n\t\t\t'views': 0\n\t\t\t'reviewed': false,\n\t\t\t'article_type': 'study',\n     \t'updated_at': '2019-08-15T19:53:21+08:00',\n     \t'created_at': '2019-09-24T17:43:11+08:00'\n\t\t}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "Controller/Article/GetList.go",
    "groupTitle": "Article"
  },
  {
    "type": "GET",
    "url": "article/revise/:article_id",
    "title": "获取修改文章-GetRevise",
    "group": "Article",
    "name": "GetRevise",
    "permission": [
      {
        "name": "User"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "tags",
            "description": "<p>文章标签</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "article_type",
            "description": "<p>文章类型</p>"
          },
          {
            "group": "Success 200",
            "type": "text",
            "optional": false,
            "field": "raw_article",
            "description": "<p>文章内容</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "\t{\n     'id': '2345342817-bc97-4e75-b8cd-a1b5e91cda2f',\n     'title': '哇哈哈',\n     'tags': '牛奶/儿童饮料',\n\t\t'article_type': 'life',\n\t\t'raw_content': '假装这是raw格式的数据'\n\t},",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "Controller/Article/GetRevise.go",
    "groupTitle": "Article"
  },
  {
    "type": "GET",
    "url": "article/self_list/:user_id",
    "title": "获取自己文章列表-GetSelfList",
    "group": "Article",
    "name": "GetSelfList",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "articleType",
            "description": "<p>文章类型</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": true,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": true,
            "field": "offset",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "user_id",
            "description": "<p>作者id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "article_type",
            "description": "<p>文章类型</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "tags",
            "description": "<p>文章标签</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "views",
            "description": "<p>观看数</p>"
          },
          {
            "group": "Success 200",
            "type": "bool",
            "optional": false,
            "field": "reviewed",
            "description": "<p>是否通过审核</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "created_at",
            "description": "<p>文章创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "updated_at",
            "description": "<p>文章更新时间</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n\n\t\t{\n     \t'user_id': '22a52817-bc97-4e75-b8cd-a1b5e91cda2f',\n     \t'id': '2345342817-bc97-4e75-b8cd-a1b5e91cda2f',\n     \t'title': '哇哈哈',\n     \t'tags': '牛奶/儿童饮料',\n\t\t\t'views': 2,\n\t\t\t'reviewed': true,\n\t\t\t'article_type': 'life',\n     \t'updated_at': '2019-08-15T19:53:21+08:00',\n     \t'created_at': '2019-09-24T17:43:11+08:00'\n\t\t},\n\t\t{\n     \t'user_id': '22a52817-bc97-4e75-b8cd-a1b5e91cda2f',\n     \t'id': '2345342817-bc97-4e75-b8cd-a1b5e91cda2f',\n     \t'title': '哇哈哈',\n     \t'tags': '牛奶/儿童饮料',\n\t\t\t'views': 0\n\t\t\t'reviewed': false,\n\t\t\t'article_type': 'study',\n     \t'updated_at': '2019-08-15T19:53:21+08:00',\n     \t'created_at': '2019-09-24T17:43:11+08:00'\n\t\t}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "Controller/Article/GetSelfList.go",
    "groupTitle": "Article"
  },
  {
    "type": "PUT",
    "url": "auth/forgot",
    "title": "忘记密码-Forgot",
    "group": "Auth",
    "name": "Forgot",
    "permission": [
      {
        "name": "All"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>新密码</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>验证码</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     'email': 'haha@example.com',\n\t\t'code': '123456',\n     'password': 'd033e22ae348aeb5660fc2140aec35850c4da997'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "Controller/Auth/Forgot.go",
    "groupTitle": "Auth"
  },
  {
    "type": "GET",
    "url": "auth/auth",
    "title": "获取用户信息-GetAuth",
    "group": "Auth",
    "name": "GetAuth",
    "permission": [
      {
        "name": "All"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "avatar",
            "description": "<p>头像</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Success 200",
            "type": "integer",
            "optional": false,
            "field": "gender",
            "description": "<p>性别</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "role",
            "description": "<p>角色</p>"
          },
          {
            "group": "Success 200",
            "type": "text",
            "optional": false,
            "field": "introduction",
            "description": "<p>简介</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n     'username': 'test',\n     'id': '22a52817-bc97-4e75-b8cd-a1b5e91cda2f',\n     'avatar': 'picture.png',\n     'email': 'haha@example.com'\n     'gender': 1\n     'role': {\n         'roleId': 1,\n         'alias': 'admin',\n         'name': '管理员',\n     }\n     'introduction': 'this is a good people'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "Controller/Auth/GetAuth.go",
    "groupTitle": "Auth"
  },
  {
    "type": "POST",
    "url": "auth/code",
    "title": "获取验证码-GetCode",
    "group": "Auth",
    "name": "GetCode",
    "permission": [
      {
        "name": "All"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>验证邮箱</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     'email': 'haha@example.com'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "failed",
            "description": "<p>获取失败</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "403:",
          "content": "{\n     'message': '请不要频繁发送信息哦'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "Controller/Auth/GetCode.go",
    "groupTitle": "Auth"
  },
  {
    "type": "POST",
    "url": "auth/login",
    "title": "登陆-Login",
    "group": "Auth",
    "name": "Login",
    "permission": [
      {
        "name": "All"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码(sha1加密)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>名字</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": true,
            "field": "remember",
            "description": "<p>记住我(30天)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     'username': 'administrator',\n     'password': 'd033e22ae348aeb5660fc2140aec35850c4da997',\n     'remember': false\n}",
          "type": "json"
        },
        {
          "title": "Request-Example2:",
          "content": "{\n     'username': 'administrator',\n     'password': 'd033e22ae348aeb5660fc2140aec35850c4da997'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>Api-Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "{\n    'token': 'b2336207-3136-47aa-9362-de45f3e49e65'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "Controller/Auth/Login.go",
    "groupTitle": "Auth"
  },
  {
    "type": "POST",
    "url": "auth/register",
    "title": "注册-Register",
    "group": "Auth",
    "name": "Register",
    "permission": [
      {
        "name": "All"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>注册名字</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码(sha1加密)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>注册邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>验证码(6位)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     'username': 'test',\n     'password': 'd033e22ae348aeb5660fc2140aec35850c4da997',\n     'email': 'haha@example.com',\n     'code': '123456'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>Api-Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     'token': 'b2336207-3136-47aa-9362-de45f3e49e65'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "Controller/Auth/Register.go",
    "groupTitle": "Auth"
  },
  {
    "type": "POST",
    "url": "/upload",
    "title": "上传文件-File",
    "group": "File",
    "name": "Upload",
    "permission": [
      {
        "name": "All"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "file",
            "description": "<p>小于3M</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "filename",
            "description": "<p>文件名</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"filename\": \"xxx.png\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "Controller/File/Upload.go",
    "groupTitle": "File"
  },
  {
    "type": "PUT",
    "url": "user/profile",
    "title": "修改简介-Change",
    "group": "User",
    "name": "Change",
    "permission": [
      {
        "name": "User/Admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "avatar",
            "description": "<p>头像</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "introduction",
            "description": "<p>个人介绍</p>"
          },
          {
            "group": "Parameter",
            "type": "integer",
            "optional": true,
            "field": "gender",
            "description": "<p>性别</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     'username': 'test',\n     'avatar': 'example.png',\n     'introduction': '我很帅',\n     'gender': 1\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "Controller/User/Change.go",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "user/profile/:user_id",
    "title": "获取用户信息-GetProfile",
    "group": "User",
    "name": "Profile",
    "permission": [
      {
        "name": "User/Admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "avatar",
            "description": "<p>头像</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Success 200",
            "type": "integer",
            "optional": false,
            "field": "gender",
            "description": "<p>性别</p>"
          },
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "role",
            "description": "<p>角色</p>"
          },
          {
            "group": "Success 200",
            "type": "text",
            "optional": false,
            "field": "introduction",
            "description": "<p>简介</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "created_at",
            "description": "<p>用户创建时间</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "{\n     'username': 'test',\n     'avatar': 'picture.png',\n     'email': 'haha@example.com',\n     'gender': 1,\n     'role': {\n         'roleId': 1,\n         'alias': 'admin',\n         'name': '管理员',\n     },\n     'introduction': 'this is a good people',\n     'created_at': 'created_at': '2019-09-24T17:43:11+08:00',\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "Controller/User/Profile.go",
    "groupTitle": "User"
  },
  {
    "type": "PUT",
    "url": "user/security",
    "title": "修改密码-ResetPassword",
    "group": "User",
    "name": "ResetPassword",
    "permission": [
      {
        "name": "User/Admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password_old",
            "description": "<p>旧密码</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password_new",
            "description": "<p>新密码</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     'password_old': 'ce8749330e860006d92f26528071b26bc93d234d',\n     'password_new': 'dc89fbb8f0bdb28a3755743032f8ab05f0e0b77d'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "Controller/User/ResetPassword.go",
    "groupTitle": "User"
  }
] });
