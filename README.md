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

https://material.angular.io/

https://material.io/

http://materialdesignblog.com/

什么场景适合采用官方的组件库？

* 团队没有能力制作统一的UI风格时.考虑使用.

* 优点:兼容性好，可扩展性好，可测试性好，对主题的支持好.

* 缺点：目前组件仍不算丰富，只有 Material 风格

SideNav

    npm i --save @angular/material
    npm i --save @angular/material @angular/cdk

Q: Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide:
A: 引入主题css文件中 @import "~@angular/material/prebuilt-themes/deeppurple-amber.css";

    <mat-sidenav #sidenav mode="over" align="end">

一个container中可以有2个sidenav , align= start , 左边, end 右边

    <mat-toolbar color="primary"></mat-toolbar>
    <mat-toolbar color="accent"></mat-toolbar>

主色，配色  accent 指配色

## SideNav 

1. 用途：侧边栏导航，同时可以作为容器
2. 侧滑的三种模式： over, push , side
3. 一般的 <md-sidenav-container> 联合使用

## Toolbar

1. 用途: 一般用于头部、标题栏
2. 通过 <md-toolbar-row> 支持多行
3. 默认内部布局是基于flex的

        在coremodule 引入MatToolbarModule
        在appmodule import MatSidenavModule

header 并不知道 sidebar在哪儿 所以用output与根组件交互数据~

```typescript
header.ts
@Output() toggle = new EventEmitter<void>();
app.component.html
<app-header (toggle)="sidenav1.toggle()"></app-header>
```

## 2-4 MdIcon 组件

appModule 中导入 MatIconModule , header.html

    <mat-icon svgIcon="gifts"></mat-icon>

mat-icon 无损缩放，基于字体的

    使用图标字体，内建 material icon 支持
    支持 svg : 通过注入 mdiconRegistry 和 DomSanitizer

报错找不到 HttpProvider，在appmodule中导入 HttpClientModule

* 避免重复加载，创建utils/svg.utils.ts 

```typescript
export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  ir.addSvgIcon('gifts', ds.bypassSecurityTrustResourceUrl('assets/gifts.svg'));
}
```

避免在header使用时还是要导入，麻烦。我们在coremodule中导入。


```typescript
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MatIconRegistry,
    ds: DomSanitizer) {
    if (parent) {
      throw new Error('模块已存在，不能再次加载!');
    }
    loadSvgResources(ir, ds);
  }
}
```

## 2-5 Input 组件

__Install Component__

```typescript
ng g m login
ng g c login/login
```

Routing

```typescript
login-routing.module.ts
const routes: Routes = [{path: 'login', component: LoginComponent}, ];

app-rouing.module.ts
{path: '', redirectTo: '/login', pathMatch: 'full'},
full--如果 login后面什么都不放就导航到 login

```

HTML 

```html
# app.component.html
    <main> <router-outlet></router-outlet> </main>

#login.compoennt.html
<mat-card>
  <mat-card-header>
    <mat-card-title>登录</mat-card-title>
  </mat-card-header>

  <mat-card-content>
    <mat-input-container>
      <span matPrefix="">wang</span>
      <input matInput type="text" placeholder="您的email">
      <span matSuffix>@gmail.com</span>
      <mat-hint></mat-hint>
      <mat-label></mat-label>
    </mat-input-container>
  </mat-card-content>

  <mat-card-actions>
    <p>还没有账户?<a href="">注册</a></p>
    <p>忘记密码?<a href="">找回</a></p>
  </mat-card-actions>
</mat-card>

color accent
mat-input-container
    floatPlaceholder float 默认
    floatPlaceholder always 一直在动画
    floatPlaceholder never 一直在动画
hintLabel="必填项" 输入框下面有提示
```

Input

    指令: mdInput 在 <md-input-container> 内部，有前缀后缀
    <md-error> : 只能验证不通过时才出现，对两种类型表单都是如此
    <md-hint> : 当error显示时, hint 会隐藏

模块增多后，尽量放在sharedModule

```typescript
# login.module
imports: [SharedModule, LoginRoutingModule]
# core.module
imports: [HttpClientModule, SharedModule, BrowserAnimationsModule, ]
# app.module
imports: [BrowserModule, SharedModule, CoreModule, LoginModule, AppRoutingModule, ]
```

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

    