TABLE:*article*
===
| TYPE | NAME | NULLABLE | DEAFULT | UNIQUE | COMMENT | PRIMARY |
| ---- | ---- | -------- | ------- | ------ | ------- | ------- |
| string | id |          |         |        | uuid4   | &radic; |
| string | user_id |     |         |        | uuid4   |         |
| string | title |       |         |        | 文章标题 |         |
| string | tags |        |         |        | 文章标签 |         |
| text | content |       |         |        | 文章内容 |         |
| string | user_id |     |         |        | 作者id   |         |
| int  | likes |         | 0       |        | 喜欢     |         |
| int  | unlikes |       | 0       |        | 不喜欢   |         |
| int  | views |         | 0       |        | 浏览数   |         |
| bool | reviewed |      | false   |        | 审核     |         |

- [x]  *use softDeletes*
---
- [x]  *use timestamps*
---