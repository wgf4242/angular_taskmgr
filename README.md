# 第1章 课程介绍
## 1-2 环境搭建

npm i --save 包名: 软件依赖

npm i --save-dev 包名: 开发依赖 ， 正式环境中不用的包

json-server: 用于快速搭建 REST API 的利器

    安装： npm install -g json-server
    使用 json-server ./mock/data.json

几种常见的API测试工具

    POSTMAN
    VSCode: REST Client
    使用### 将请求隔离开

cli安装错误

    npm uninstall -g @angular/cli
    npm cache clean
    npm instlal -g @angular/cli

# 第2章 用 Angular Material 组件打造页面

## 2-1 项目工程结构

    ng new taskmgr -si --style=scss
    ng g m core
    ng g m shared


        @SkipSelf() , 跳过本身检测

通常要这样写，`import {CoreModule} from './core/core.module';`

但是改成 将core.module改成index.ts就只写 

    import {CoreModule} from './core';

就行了，省了很多路径

## 2-2 UI整体布局

    ng g c core/header --spec=false

报错，导出前只能在coremodule使用，

    app-header' is not a known element: ，

在core.module添加
  
    exports: [HeaderComponent, FooterComponent, SidebarComponent]

本课使用flex的方式来设置css。

flex 是对容器内的排布。只对直接子元素有用。

```css

.site {
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  /*flex 参数3个 是否能放大放大几倍 0不能缩小 auto极限宽度*/

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  /*横轴方向排列*/
  /*justify-content: flex-start;*/
  /*justify-content: flex-end;*/
  /*justify-content: space-around;*/
  justify-content: space-between;

  /*纵轴方向排列*/
  align-content: flex-end;
  /*default*/
  /*align-content: stretch;*/

  /*一行中怎样对齐*/
  align-items: center;
}

others {
    /*横轴方向排列*/
    justify-content: flex-start 左对齐,
    justify-content: flex-end 右对齐,
    justify-content: center 居中,
    justify-content: space-between 分散对齐,
    justify-content: space-around 项目位于各行之前、之间、之后都留有空白的容器内,
    纵轴方向排列
    align-content: stretch 充满屏幕,
    align-content: center 居中,
    align-content: flex-start 顶部对齐,
    align-content: flex-end 底部对齐,
    align-content: baseline    元素放置在父元素的基线上。,
}
```

## 2-3 Material介绍
## 2-4 MdIcon 组件
## 2-5 Input 组件
## 2-6 Card 和 Button 组件
## 2-7 在侧滑菜单中使用 MdList
## 2-8 Angular Material 主题
## 2-9 GridList 打造注册页面头像列表
## 2-10 对话框的使用
## 2-11 Autocomplete 的使用
## 2-12 任务列表之菜单
## 2-13 任务列表之任务组件
## 2-14 任务列表之新任务对话框
## 2-15 任务列表之移动内容对话框
## 2-16 完成主框架（上）
## 2-17 完成主框架（下）


# 第3章 Angular 动画
# 第4章 Angular 核心概念回顾和提高
# 第5章 Rxjs常见操作符
# 第6章 Angular 中的响应式编程
# 第7章 使用 Redux 管理应用状态
# 第8章 Angular 的测试
# 第9章 课程总结

    