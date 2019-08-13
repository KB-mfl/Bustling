TABLE:*api_token*
===
| TYPE | NAME | NULLABLE | DEAFULT | UNIQUE | COMMENT | PRIMARY |
| ---- | ---- | -------- | ------- | ------ | ------- | ------- |
| int  | id   |          |         |        | increament | &radic; |
| string | user_id |     |         |        | short_uuid |      |
| string | token |       |         | &radic; | uuid   |         |
| timestamp | expried_at | |       |        | expried time |    |

- [x]  *use softDeletes*
---
- [x]  *use timestamps*
---