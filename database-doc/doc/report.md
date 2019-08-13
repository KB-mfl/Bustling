TABLE:*api_token*
===
| TYPE | NAME | NULLABLE | DEAFULT | UNIQUE | COMMENT | PRIMARY |
| ---- | ---- | -------- | ------- | ------ | ------- | ------- |
| int  | id   |          |         |        | increament | &radic; |
| string | user_id |     |         |        | uuid4   |         |
| string | article_id |  |         |        | uuid4   |         |
| string | comment_id |  |         |        | uuid4   |         |
| string | reported_user_id | |    |        | uuid4   |         |
| text   | reason |      |         |        | 举报理由 |         |

- [x]  *use softDeletes*
---
- [x]  *use timestamps*
---