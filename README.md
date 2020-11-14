# vue-blog-pro

老项目[vue-blog](https://github.com/wuyuanaaa/vue-blog) 重构  
本次重构主要在[管理端](https://github.com/wuyuanaaa/vue-blog-pro-admin)及后端代码  
不过本项目的代码也有大量修改，所以另开一个项目


### 功能

- 导航 √
- 阅读量 √
- 归档时间轴 √
- 文章类型转换 √
- 标签分类 √
- 评论 √
- 评论表情 √
- 文章列表下拉加载 √
- 用户注册及登陆 √
- 用户信息编辑
- githubActions 自动部署阿里云 √

### 命令

- 启动调试
 ```
 npm run dev
 ```
- 打包
 ```
 npm run build
 ```
- 打包并生成 report.html 文件（用于性能分析）
 ```
 npm run build:report
 ```
- 优化 svg
 ```
 npm run svgo
 ```

### 更新记录

- 2020-10-29 新增 支持 githubActions 自动部署阿里云
- 2020-10-26 优化 增加换云按钮，PC端点击事件不再换云，其他细节优化
- 2020-10-23 新增 用户登陆（非 github 登陆）及注册
- 2020-10-20 新增 评论添加 emoji 表情选择

