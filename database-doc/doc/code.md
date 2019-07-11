TABLE: *code*
===
| TYPE | NAME | NULLABLE | DEAFULT | UNIQUE | COMMENT | PRIMARY |
| ---- | ---- | -------- | ------- | ------ | ------- | ------- |
| string | id |          |         |        | increament | &radic; |
| string | code |        |         |        | 验证码(随机6位数) | |
| string | email |       |         |        | 邮箱 |         |
| timestamp | expried_at | |       |        | 过期时间 |         |

- [x]  *use softDeletes*
---
- [x]  *use timestamps*
---