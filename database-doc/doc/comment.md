TABLE:*comment*
===
| TYPE | NAME | NULLABLE | DEAFULT | UNIQUE | COMMENT | PRIMARY |
| ---- | ---- | -------- | ------- | ------ | ------- | ------- |
| string | id |          |         |        | uuid4   | &radic; |
| string | user_id |     |         |        | 评论者id |         |
| string | reply_user_ id | &radic; | |     | 回复对象id |       |
| string | article_id |  |         |        | 文章id  |          |
| string | pre_id | &radic; |      |        | 父级评论id |       |
| text | Content |       |         |        | 评论内容 |         |

- []  *use softDeletes*
---
- [x]  *use timestamps*
---