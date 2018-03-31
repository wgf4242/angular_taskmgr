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

```typescript
this.addSvgIcon('project', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/project.svg'));
```


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

__card __ 适合图文形式突出某一主题

```typescript
  <mat-card>
    <mat-card-header>
      <mat-card-title>每日佳句</mat-card-title>
      <mat-card-subtitle>{{quote.cn}}</mat-card-subtitle>
    </mat-card-header>
    <img mat-card-xl-image src="/assets/quote_fallback.jpg" alt="">
    <mat-card-content>
      {{quote.en}}
    </mat-card-content>
  </mat-card>

```

__Button__

md-button 是以指令形式提供的
标准按钮: md-button, md-raised-button, md-icon-button
浮动按钮: md-fab, md-fab-mini

不指明 type 默认为submit, 指定为type=button

    <button mat-raised-button type="button">登录</button>

mat-类型|效果
---|---
mat-raised-button | 浮起的效果
mat-fab-button  | 圆形效果
mat-mini-fab    | 更小的圆形效果

容器充满，用户、密码竖排，并将忘记密码放在 右侧
```css
# login.component.css
mat-card{
  height: 20em;
  flex: 0 0 20em;
}

form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.text-right {
  margin: 10px;
  text-align: end;
}

# style.css
.full-width {
  width: 100%;
}
```


    <img mat-card-xl-image src="/assets/quote_fallback.jpg" alt="">

## 2-7 在侧滑菜单中使用 MdList

__List__

* 用户：一般用于列表
* `<mat-list>`和`<mat-nav-list>`

List item 默认样式 `align:center,flex:row`

使 list item 顶部对齐 

    mat-icon {align-self: flex-start; }

压缩列表.间距变小 `<mat-nav-list dense>`

日视图变成当天的日期

添加31天的日图标，使当日图标自动改变

```typescript
# svg.utils.ts
const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
days.forEach(d => ir.addSvgIcon(`day${d}`, ds.bypassSecurityTrustResourceUrl(`${dayDir}/day${d}.svg`)));

# sidebar.component.ts
today = 'day';
ngOnInit() {
  this.today = `day${getDate(new Date())}`;
}

# sidebar.component.html
<mat-icon mat-list-icon [svgIcon]="today"></mat-icon>
```

添加类库
```bash
npm install --save date-fns
npm install --save-dev @types/date-fns
```

## 2-8 Angular Material 主题

主题： 调色板+明暗+叠加
$my-app-accent: mat-palette($mat-pink,A200, A100, A400);
默认深浅，亮的主题，暗的主题亮度，
```typescript

# header.component.html
<span class="fill-remaining-space"></span>
<mat-slide-toggle (change)="onChange($event.checked)">默认模式</mat-slide-toggle>

# shared.module.ts
MatSlideToggleModule

# app.component.css
mat-sidenav-container.myapp-dark-theme {
  background-color: black;
}

# app.component.html
<app-header (toggle)="sidenav1.toggle()" (toggleDarkTheme)="switchTheme($event)"></app-header>
<mat-sidenav-container [class.myapp-dark-theme]="darkTheme">
  <mat-sidenav #sidenav1 mode="over">
    <app-sidebar></app-sidebar>
  </mat-sidenav>

# app.component.html
      <app-header (toggle)="sidenav1.toggle()" (toggleDarkTheme)="switchTheme($event)"></app-header>

# app.component.ts
darkTheme = false;
switchTheme(dark) {
  this.darkTheme = dark;
}

```

```scss
# styles.scss
@import "theme.scss";

# theme.scss
@import "~@angular/material/theming";

@include mat-core()

$my-app-primary: mat-palette($mat-indigo);
$my-app-accent: mat-palette($mat-pink,A200, A100, A400);
$my-app-warn: mat-palette($mat-red);

$my-app-theme: mat-light-theme($my-app-primary, $my-app-accent,$my-app-warn);

@include angular-material-theme($my-app-theme)

$my-dark-primary: mat-palette($mat-blue-gray);
$my-dark-accent: mat-palette($mat-amber,A200, A100, A400);
$my-dark-warn: mat-palette($mat-orange);

$my-dark-theme: mat-dark-theme($my-dark-primary, $my-dark-accent,$my-dark-warn);

.myapp-dark-theme {
  @include angular-material-theme($my-dark-theme)
}
```
## 2-9 GridList 打造注册页面头像列表

* GridList

用途：用于相似的数据展示，尤其是图片，类似相册。

行为很像表格，有colspan,rolspan等属性。

    ng g c login/register --spec=false

* mat-grid-list 属性

 rowHeight="34px"或1,colspan,rowspan

* map() 对每个元素处理返回新的元素

* svg图标集合使用方法： name:svg-${id}

```typescript
# SharedModule
MatGridListModule,

# svg.utils.ts
ir.addSvgIconSetInNamespace('avatars', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));

# login-routing.module.ts
{path: 'register', component: RegisterComponent},
```

```html
# register.component.html
<mat-grid-list [cols]="6" rowHeight="2:1">
  <mat-grid-tile *ngFor="let item of items">
    <mat-icon class="avatar" [svgIcon]="item"></mat-icon>
  </mat-grid-tile>
</mat-grid-list>
```

## 2-10 对话框的使用

* 对话框很特殊，需要在模块中的 entrryComponents中声明
* 传递数据： const dialogRef = dialog.open(YourDialog, {data:'your data'})
* 接收数据： constructor(@Inject(MD_DIALOG_DATA) public data:any) {}

```typescript
ng g m project
ng g c project/project-list --spec=false
ng g c project/project-item --spec=false
ng g c project/new-project --spec=false
ng g c project/invite --spec=false

# project.module.ts
  declarations: [
    ProjectListComponent,
    ProjectItemComponent,
    NewProjectComponent,
    InviteComponent
  ],
  entryComponents: [
    NewProjectComponent,
    InviteComponent
  ],

# ProjectListComponent
export class ProjectListComponent implements OnInit {
  projects = [
    {'name': 'itemMame-1', 'desc': 'this is a ent project', 'coverImg': 'assets/img/covers/0.jpg'},
    {'name': 'Auto test', 'desc': 'this is a ent project', 'coverImg': 'assets/img/covers/1.jpg'} ];

  constructor(private dialog: MatDialog) {}
  ngOnInit() {}

  openNewProjectDialog() {
    const config = {width: '100px', height: '100px', position: {left: '0', top: '0'}};
    const data = {data: {dark: true}};
    const dialogRef = this.dialog.open(NewProjectComponent, data);
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
}

```

```html
# ProjectListComponent html
<app-project-item *ngFor="let project of projects"
  [item]="project"
  class="card">

</app-project-item>

<button class="fab-button" mat-fab type="button" (click)="openNewProjectDialog()">
  <mat-icon>add</mat-icon>
</button>

# project-item.component.html

<mat-card>
  <mat-card-header>
    <mat-card-title>
      {{item.name}}
    </mat-card-title>
  </mat-card-header>
  <img mat-card-image [src]="item.coverImg" alt="项目封面">
  <mat-card-content>
    {{item.desc}}
  </mat-card-content>
  <mat-card-actions>
    <button mat-button type="button">
      <mat-icon>note</mat-icon>
      <span>编辑</span>
    </button>
    <button mat-button type="button">
      <mat-icon>group_add</mat-icon>
      <span>邀请</span>
    </button>
    <button mat-button type="button">
      <mat-icon>delete</mat-icon>
      <span>删除</span>
    </button>
  </mat-card-actions>
</mat-card>
```

```typescript
# project-item.component.ts
export class ProjectItemComponent implements OnInit {
  @Input() item;
```

```html
# new-project.component.html

<form >
  <h2 mat-dialog-title>新建项目</h2>
  <div mat-dialog-content>
    <mat-input-container class="full-width">
      <input matInput type="text" placeholder="项目名称">
    </mat-input-container>
    <mat-input-container class="full-width">
      <input matInput type="text" placeholder="项目描述">
    </mat-input-container>
    <div mat-dialog-actions>
      <button type="button" mat-raised-button color="primary" (click)="onClick()">保存</button>
      <button type="button" mat-button mat-dialog-close>关闭</button>
    </div>
  </div>
</form>
```


```typescript
# new-project.component.ts
  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private dialogRef: MatDialogRef<NewProjectComponent>,
              // private oc: OverlayContainer
  ) {
  }

  ngOnInit() {
    console.log(JSON.stringify(this.data));
    // this.oc.themeClass = this.data.dark ? 'myapp-dark-theme' : null;
  }

  onClick() {
    this.dialogRef.close('I received your message');
  }
}
```

```css
# project-list.component.css
.card {
  height: 360px;
  flex: 0 0 360px;
  margin: 10px;
}

:host {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.fab-button {
  position: fixed;
  right: 32px;
  bottom: 96px;
  z-index: 998;
}
```


## 2-11 Autocomplete 的使用

要和 input 联合使用。

```typescript
<mat-form-field>
  <input type="text" matInput [formControl]="myControl" [matAutocomplete]="auto">
</mat-form-field>

<mat-autocomplete #auto="matAutocomplete">
  <mat-option *ngFor="let option of options" [value]="option">
    {{ option }}
  </mat-option>
</mat-autocomplete>

```

实例代码

```typescript
# shared.module.ts
  imports: [MatAutocompleteModule, ],
  exports: [MatAutocompleteModule, ],

# project-list.component.html
<app-project-item *ngFor="let project of projects"
  [item]="project" class="card" (onInvite)="launchInviteDialog()">

# project-list.component.ts
  launchInviteDialog() {const dialogRef = this.dialog.open(InviteComponent); }

# project-item.component.ts
  @Output() onInvite = new EventEmitter();

  onInviteClick() {this.onInvite.emit(); }

# project-item.component.html
    <button mat-button type="button" (click)="onInviteClick()">

# invite.component.html
<form >
  <h2 mat-dialog-title>邀请组员</h2>
  <div mat-dialog-content>
    <mat-input-container class="full-width">
      <input matInput type="text" placeholder="组员姓名" [matAutocomplete]="autoMembers">
    </mat-input-container>
    <div mat-dialog-actions>
      <button type="button" mat-raised-button color="primary" (click)="onClick()">保存</button>
      <button type="button" mat-button mat-dialog-close>关闭</button>
    </div>
  </div>
</form>

<mat-autocomplete #autoMembers="matAutocomplete" [displayWith]="displayUser">
  <mat-option *ngFor="let item of items" [value]="item">
    {{item.name}}
  </mat-option>
</mat-autocomplete>

# invite.component.ts
export class InviteComponent implements OnInit {
  items = [
    {id: 1, name: 'name-1'},
    {id: 2, name: 'name-2'},
    {id: 3, name: 'name-3'}
  ];

  displayUser(user: { id: string, name: string }) {
    return user ? user.name : '';
  }
}
```

[displayWith]="displayUser"> 而不是  displayUser()

* 表示传入的是函数不是函数的返回结果

## 2-12 任务列表之菜单

```typescript
ng g m task
ng g c task/task-home --spec=false
ng g c task/task-list --spec=false
ng g c task/task-item --spec=false
ng g c task/task-header --spec=false
```


* 将 OverlayContainer 注入到 AppComponent比较方便

```typescript
# app.component.ts
  constructor(private oc: OverlayContainer) { }

  switchTheme(dark) {
    this.darkTheme = dark;
    // this.oc.themeClass = this.data.dark ? 'myapp-dark-theme' : null;
  }

# app-routing.module.ts
    {path: 'tasklists', redirectTo: '/tasklists', pathMatch: 'full'},

# svg.utils.ts
  const iconDir = `${imgDir}/icons`;
  ir.addSvgIcon('move', ds.bypassSecurityTrustResourceUrl(`${iconDir}/move.svg`));
  ir.addSvgIcon('add', ds.bypassSecurityTrustResourceUrl(`${iconDir}/add.svg`));
  ir.addSvgIcon('delete', ds.bypassSecurityTrustResourceUrl(`${iconDir}/delete.svg`));

# task-header.component.css
.fill {
  flex: 1;
  text-align: center;
}

.header-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
}

# task-header.component.html
<div mat-subheader class="header-container">
  <div>
    <h3>{{header}}</h3>
  </div>
  <div class="fill">
    <button mat-button>
      <mat-icon>add_circle_outline</mat-icon>
      <span>新任务</span>
    </button>
  </div>
  <div>
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon>keyboard_arrow_down</mat-icon>
    </button>
  </div>
</div>

<mat-menu #menu="matMenu">
  <button mat-menu-item>
    <mat-icon>mode_edit</mat-icon>
    <span>修改列表名称</span>
  </button>
  <button mat-menu-item>
    <mat-icon [svgIcon]="'move'"></mat-icon>
    <span>移动本列表所有内容</span>
  </button>
  <button mat-menu-item>
    <mat-icon>delete_forever</mat-icon>
    <span>删除列表</span>
  </button>
</mat-menu>

# task-header.component.ts
  @Input() header = '';

# task-home.component.css
.fab-button {
  position: fixed;
  right: 32px;
  bottom: 96px;
  z-index: 998;
}

.task-lists {
  min-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: scroll;
}

.list-container {
  flex: 0 0 360px;
  overflow-y: scroll;
  overflow-x: hidden;
}

# task-home.component.html
<div class="task-lists">
  <app-task-list *ngFor="let list of lists" class="list-container">
    <app-task-header [header]="list.name"></app-task-header>
    <app-task-item *ngFor="let task of list.tasks"></app-task-item>
  </app-task-list>
</div>

<button class="fab-button" mat-fab type="button">
  <mat-icon>add</mat-icon>
</button>

# task-home.component.ts
  lists = [
    {
      id: 1, name: '待办',
      tasks: [{id: 1, desc: '任务1：买咖啡', owner: {id: 1, name: '张三', avatar: 'avatars:svg-11'}, dueDate: new Date()}]
    },
   {
      id: 2, name: '进行中',
      tasks: [{id: 1, desc: '任务2：完成PPT', owner: {id: 1, name: '李四', avatar: 'avatars:svg-12'}, dueDate: new Date()}]
    },
  ];

# task-list.component.html
<mat-list>
  <ng-content></ng-content>
</mat-list>
```

## 2-13 任务列表之任务组件

几种和HTML对应组件非常像的 Material 组件：

* 复选框 `<mat-checkbox>`

* 单选组件 `<mat-radio>`

* 下拉框 `<mat-select>`

上节的下拉按钮对应的有点问题。添加上 line-height: 1.

`[ngClass] = {'class': expression}` , 表达式为true时，使用该类

```typescript
# task-header.component.css
.material-icon {line-height: 1; }

# task-header.component.html
    <mat-icon [svgIcon]="'move'" class="material-icon"></mat-icon>


# task-home.component.html
    <app-task-item *ngFor="let task of list.tasks" [item]="task"></app-task-item>

# task-home.component.ts
  lists = [
    {
      id: 1, name: '待办',
      tasks: [
        {id: 1, desc: '任务1：买咖啡', completed: true, priority: 3, owner: {id: 1, name: '张三', avatar: 'avatars:svg-11'}, dueDate: new Date()},
        {id: 2, desc: '任务4：我是一个非常非常长的任务', priority: 3, owner: {id: 1, name: '张三', avatar: 'avatars:svg-11'}, dueDate: new Date()}
        ]
    },
   {
      id: 2, name: '进行中',
      tasks: [
        {id: 1, desc: '任务2：完成PPT', completed: false, priority: 2, owner: {id: 1, name: '李四', avatar: 'avatars:svg-12'}, dueDate: new Date(), reminder: new Date()},
        {id: 2, desc: '任务3：task-3', completed: false, priority: 1, owner: {id: 1, name: '王五', avatar: 'avatars:svg-13'}, dueDate: new Date()}
        ]
    },
  ];

# task-item.component.css

mat-icon.avatar {
  overflow: hidden;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin: 12px;
  order: 3;
}

.priority-normal {border-left: 3px solid #a6a6a6; }
.priority-important {border-left: 3px solid #ffaf38; }
.priority-emergency {border-left: 3px solid red; }
.completed {
  opacity: 0.64;
  color: #d9d9d9;
  text-decoration: line-through;
}

.completion-status {order: -1; }
.due-date {
  background-color: #ff4f3e;
  color: #fff;
}

.alarm {font-size: 18px; }
.bottom-bar {
  margin-top: 3px;
  margin-bottom: 2px;
  font-size: 10px;
  width: 100%;
  order: 1;
}

.content {
  order: 1;
  width: 100%;
  padding: 5px;
}

.container {
  width: 100%;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

:host {width: 100%; }

# task-item.component.html
<mat-list-item class="container"
               [ngClass]="{
               'priority-normal': item.priority === 3,
               'priority-important': item.priority === 2,
               'priority-emergency': item.priority === 1
               }">
  <mat-checkbox class="completion-status" [checked]="item.completed"></mat-checkbox>
  <div mat-line class="content" [ngClass]="{'completed': item.completed}"><span [matTooltip]="item.desc">{{item.desc}}</span></div>
  <div mat-line class="bottom-bar" *ngIf="item.dueDate">
    <span class="due-date">{{item.dueDate | date:'yy-MM-dd'}}</span>
    <mat-icon *ngIf="item.reminder">alarm</mat-icon>
  </div>
  <mat-icon [svgIcon]="avatar" mat-list-avatar class="avatar"></mat-icon>
</mat-list-item>

# task-item.component.ts
  @Input() item;
  @Input() avatar;
  constructor() { }

  ngOnInit() {this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned'; }
```

## 2-14 任务列表之新任务对话框
ng g c task/new-task --spec=false

matSuffix 当成后缀使用。

SharedModule中需要引入     MatRadioModule, MatNativeDateModule, MatDatepickerModule,

    MatDatepickerModule 需要引入MatNativeDateModule 进行一些序列化

```typescript

# new-task.component.html
<form >
  <h2 mat-dialog-title>新建任务</h2>
  <div mat-dialog-content>
    <mat-input-container class="full-width">
      <input matInput type="text" placeholder="任务内容">
    </mat-input-container>
    <mat-radio-group>
      <mat-radio-button *ngFor="let priority of priorities" [value]="priority.value">
        {{priority.label}}
      </mat-radio-button>
    </mat-radio-group>
    <mat-input-container class="full-width">
      <input matInput [matDatepicker]="dueDatepicker" type="text" placeholder="任务截止日期">
      <!--<button type="button" matSuffix [matDatepickerToggle]="dueDatepicker"></button>-->
      <mat-datepicker-toggle matSuffix [for]="dueDatepicker"></mat-datepicker-toggle>
    </mat-input-container>
    <mat-datepicker #dueDatepicker></mat-datepicker>

    <mat-input-container class="full-width">
      <input matInput [matDatepicker]="reminderDatepicker" type="text" placeholder="提醒日期">
      <mat-datepicker-toggle matSuffix [for]="reminderDatepicker"></mat-datepicker-toggle>
    </mat-input-container>
    <mat-datepicker #reminderDatepicker></mat-datepicker>

    <div mat-dialog-actions>
      <button type="button" mat-raised-button color="primary" (click)="onClick()">保存</button>
      <button type="button" mat-button mat-dialog-close>关闭</button>
    </div>
  </div>
</form>

# new-task.component.ts
export class NewTaskComponent implements OnInit {
  priorities = [
    {label: '紧急', value: '1', },
    {label: '重要', value: '2', },
    {label: '普通', value: '3', },
 ];
}

# task-header.component.html
    <button mat-button type="button" (click)="onNewTaskClick()">

# task-header.component.ts
  @Output() newTask = new EventEmitter<void>();
  onNewTaskClick() {this.newTask.emit(); }

# task-home.component.html
    <app-task-header [header]="list.name" (newTask)="launchNewTaskDialog()"></app-task-header>
# task-home.component.ts

```
## 2-15 任务列表之移动内容对话框

ng g c task/copy-task --spec=false

```typescript
# copy-task.component.html
<form>
  <h3 mat-dialog-title>移动本列表所有内容</h3>
  <div mat-dialog-content>
    <mat-select placeholder="请所有目标列表">
      <mat-option *ngFor="let list of lists">{{list.name}}</mat-option>
    </mat-select>
  </div>
  <mat-dialog-actions>
    <button type="button" mat-raised-button color="primary" (click)="onClick()">保存</button>
    <button type="button" mat-button [mat-dialog-close]>关闭</button>
  </mat-dialog-actions>
</form>

# copy-task.component.ts
export class CopyTaskComponent implements OnInit {
  lists: any[];
  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private dialogRef: MatDialogRef<CopyTaskComponent> ) {}
  ngOnInit() {this.lists = this.data.lists; }
}

# task-header.component.html
  <button mat-menu-item (click)="onMoveAllClick()">

# task-header.component.ts
  @Output() moveAll = new EventEmitter<void>();
  onMoveAllClick() {this.moveAll.emit(); }

# task-home.component.html
    <app-task-header [header]="list.name"
                     (newTask)="launchNewTaskDialog()"
                     (moveAll)="launchCopyTaskDialog()"></app-task-header>

# task-home.component.ts
  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {width: '250px', data: {lists: this.lists}});
  }


```

## 2-16 完成主框架
完成下拉列表的几个按钮, 修改任务的 Dialog。

task-item.component.html 中点击 Checkbox 也会弹出修改任务的对话框。怎样处理？

```typescript
  onCheckBoxClick(ev: Event) {ev.stopPropagation(); }
```

同样 projects 添加/编辑是一样的一个组件。

删除列表按钮 -- 一个确认的对话框。比较通用建立在SharedModule中。

完成修改列表名称，添加新列表。

* __Cli 参数__

it=--inline-template

is=--inline-style

* 控制台： Could not find HammerJS

Material 组件 移动端会用 HammerJS。

```typescript
npm install --save hammerjs
# core.module.ts
import 'hammerjs';
```

* Coding:

```typescript
$ ng g c shared/confirm-dialog -it -is --spec=false
$ ng g c task/new-task-list --spec=false

# new-project.component.html
  <h3 mat-dialog-title>{{title}}</h3>

# new-project.component.ts
  title = '';
  ngOnInit() {this.title = this.data.title; }

# project-item.component.html
    <button mat-button type="button" (click)="onEditClick()">
    <button mat-button type="button" (click)="onDelClick()">

# project-item.component.ts
  @Output() onEdit = new EventEmitter();
  @Output() onDel = new EventEmitter();
  onEditClick() {this.onEdit.emit(); }
  onDelClick() {this.onDel.emit(); }

# project-list.component.html
  (onEdit)="launcherUpdateDialog()"
  (onDel)="launcheConfirmDialog()"

# project-list.component.ts
  launcherUpdateDialog() {const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '编辑项目:'}}); }

  launcheConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目:', content: '您确认删除该项目么'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

# confirm-dialog.component.ts
@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h3 mat-dialog-title>{{title}}</h3>
    <mat-dialog-content>
      {{content}}
    </mat-dialog-content>
    <mat-dialog-actions>
      <button type="button" mat-raised-button color="primary" (click)="onClick(true)">确定</button>
      <button type="button" mat-button [mat-dialog-close] (click)="onClick(false)">取消</button>
    </mat-dialog-actions>
  `,
  styles: []
})
export class ConfirmDialogComponent implements OnInit {
  title = ''; content = '';
  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialogRef: MatDialogRef<ConfirmDialogComponent>) { }
  ngOnInit() {this.title = this.data.title; this.content = this.data.content; }
  onClick(result: boolean) {this.dialogRef.close(result); }
}

# shared.module.ts
  entryComponents: [ConfirmDialogComponent],

# new-task-list.component.html
<form>
  <h3 mat-dialog-title>{{title}}</h3>
  <mat-dialog-content>
    <mat-input-container class="full-width">
      <input type="text" matInput placeholder="列表名称">
    </mat-input-container>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button type="button" mat-raised-button color="primary" (click)="onClick()">保存</button>
    <button type="button" mat-button [mat-dialog-close]>关闭</button>
  </mat-dialog-actions>
</form>

# new-task-list.component.ts
  title = '';

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private dialogRef: MatDialogRef<NewTaskListComponent>) {
  }

  ngOnInit() {this.title = this.data.title; }

  onClick() {this.dialogRef.close(this.title); }

# task-home.component.html
                     (moveAll)="launchCopyTaskDialog()"
                     (delList)="launchConfirmDialog()"
                     (editList)="launchEditListDialog()"
    ></app-task-header>
    <app-task-item *ngFor="let task of list.tasks" [item]="task" (taskClick)="launchUpdateTaskDialog(task)"></app-task-item>
  </app-task-list>
</div>

<button class="fab-button" mat-fab type="button" (click)="launchNewListDialog()">

# task-home.component.ts
  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, {width: '250px', data: {title: '修改任务:', task: task}});
  }

  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除任务列表:', content: '您确认删除该列表么'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchEditListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '更改列表名称:'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchNewListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '新建列表:'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

新增，修改删除 添加对应的控制。

```

# 第3章 Angular 动画
## 3-1 初识 Angular Animation

为了减少Core体积, animation 不再放到核心库，但也很重要。

https://www.w3.org/TR/web-animations-1/

State 和 Transition

* 动画其实就是从一个状态过渡到另一个状态

* 状态本身包含形状、颜色、大小等等

* State 就是定义状态而 Transitoin 是定义如何过渡 


Animate 函数

* Animate 规定了具体怎样过渡，比如时间、过渡的速度等

* animate 有多个重载形式


0.2秒的动画，延时一秒执行。
        transition('green => red', animate('.2s 1s')), 
        transition('green => red', animate('<持续时间> <延时时间>')), 

加载BrowserAnimationsModule尽量放在最后。

    trigger('square', 名称在响应的html中 [@触发器名字]
=组件当中的成员变量或才函数

```typescript
npm i --save @angular/animations

# html
      <div class="square" [@square]="squareState" (click)="onClick()"></div>
# ts
@Component 中 添加
  animations: [
    trigger('square', [
        state('green', style({backgroundColor: 'green', height: '100px', transform: 'translateX(0)' })),
        state('red', style({backgroundColor: 'red', height: '50px', transform: 'translateX(100%)' })),
        transition('green => red', animate('.2s 1s')),
        transition('red => green', animate(1000)),
      ]
    )
  ]
class 中添加
  onClick() {this.squareState = this.squareState === 'red' ? 'green' : 'red'; }

# app.module.ts 
最后引入BrowserAnimationsModule
```

## 3-2 缓动函数和关键帧 

__缓动函数__

* 缓动函数指定动画效果在执行时的速度，使其看起来更加真实。

* 当皮球下落时，先是越掉越快，撞到地上后回弹最终才又碰触到地板。

ease-in 开始慢，后边快， ease-out 相反

ease实际是使用了 cubic-bezier(0.86, 0, 0.07, 1); 调整它的4个参数可得到相应效果，用网站进行查看。

easings.net cubic-bezier.com

__关键帧__

* W3C的 Web Animation 标准暂时无法支持所有的 cubic-bezier 函数

* 帧 - 就是动画中的最小单位影像画面

* 关键帧 - 物体运动或变化中的关键动作所处的那一帧


```typescript

  animations: [
    trigger('square', [
        state('green', style({backgroundColor: 'green', height: '100px', transform: 'translateY(-100%)' })),
        state('red', style({backgroundColor: 'red', height: '100px', transform: 'translateY(100%)' })),
        transition('green => red', animate('.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)')),
        transition('red => green', animate(5000, keyframes([
          style({transform: 'translateY(100%)'}),
          style({transform: 'translateY(98%)'}),
          style({transform: 'translateY(95%)'}),
          style({transform: 'translateY(90%)'}),
          style({transform: 'translateY(80%)'}),
          style({transform: 'translateY(60%)'}),
          style({transform: 'translateY(30%)'}),
          style({transform: 'translateY(0%)'}),
          style({transform: 'translateY(-10%)'}),
          style({transform: 'translateY(-5%)'}),
          style({transform: 'translateY(-2%)'}),
          style({transform: 'translateY(0)'}),
          style({transform: 'translateY(10%)'}),
          style({transform: 'translateY(15%)'}),
          style({transform: 'translateY(-15%)'}),
          style({transform: 'translateY(-40%)'}),
          style({transform: 'translateY(-80%)'}),
          style({transform: 'translateY(-90%)'}),
          style({transform: 'translateY(-95%)'}),
        ]))),
      ]
    )
  ]

```


## 3-3 项目卡片和任务动画
## 3-4 路由动画及高阶动画函数

# 第4章 Angular 核心概念回顾和提高
# 第5章 Rxjs常见操作符
# 第6章 Angular 中的响应式编程
# 第7章 使用 Redux 管理应用状态
# 第8章 Angular 的测试
# 第9章 课程总结

    