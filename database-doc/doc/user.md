TABLE: *user*
===
| TYPE | NAME | NULLABLE | DEAFULT | UNIQUE | COMMENT | PRIMARY |
| ---- | ---- | -------- | ------- | ------ | ------- | ------- |
| string | id |          |         | &radic; | short_uuid | &radic; |
| string | username |    |         | &radic; | nick name |      |
| string | password |    |         |        |         |         |
| boolean | gender |     | 1       |        | 1为女    |         |
| string | role_id |     | 1       |        | 用户类型 |         |
| string | avatar | &radic; |      |        | 头像     |        |
| string | email |       |         | &radic; |        |         |
| text | introduction | &radic; |  |        |         |         |

- [x]  *use softDeletes*
---
- [x]  *use timestamps*
---