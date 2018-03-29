# ��1�� �γ̽���
## 1-2 �����

npm i --save ����: �������

npm i --save-dev ����: �������� �� ��ʽ�����в��õİ�

json-server: ���ڿ��ٴ REST API ������

    ��װ�� npm install -g json-server
    ʹ�� json-server ./mock/data.json

���ֳ�����API���Թ���

    POSTMAN
    VSCode: REST Client
    ʹ��### ��������뿪

cli��װ����

    npm uninstall -g @angular/cli
    npm cache clean
    npm instlal -g @angular/cli

# ��2�� �� Angular Material �������ҳ��

## 2-1 ��Ŀ���̽ṹ

    ng new taskmgr -si --style=scss
    ng g m core
    ng g m shared


        @SkipSelf() , ����������

ͨ��Ҫ����д��`import {CoreModule} from './core/core.module';`

���Ǹĳ� ��core.module�ĳ�index.ts��ֻд 

    import {CoreModule} from './core';

�����ˣ�ʡ�˺ܶ�·��

## 2-2 UI���岼��

    ng g c core/header --spec=false

��������ǰֻ����coremoduleʹ�ã�

    app-header' is not a known element: ��

��core.module���
  
    exports: [HeaderComponent, FooterComponent, SidebarComponent]

����ʹ��flex�ķ�ʽ������css��

flex �Ƕ������ڵ��Ų���ֻ��ֱ����Ԫ�����á�

```css

.site {
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  /*flex ����3�� �Ƿ��ܷŴ�Ŵ󼸱� 0������С auto���޿��*/

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  /*���᷽������*/
  /*justify-content: flex-start;*/
  /*justify-content: flex-end;*/
  /*justify-content: space-around;*/
  justify-content: space-between;

  /*���᷽������*/
  align-content: flex-end;
  /*default*/
  /*align-content: stretch;*/

  /*һ������������*/
  align-items: center;
}

others {
    /*���᷽������*/
    justify-content: flex-start �����,
    justify-content: flex-end �Ҷ���,
    justify-content: center ����,
    justify-content: space-between ��ɢ����,
    justify-content: space-around ��Ŀλ�ڸ���֮ǰ��֮�䡢֮�����пհ׵�������,
    ���᷽������
    align-content: stretch ������Ļ,
    align-content: center ����,
    align-content: flex-start ��������,
    align-content: flex-end �ײ�����,
    align-content: baseline    Ԫ�ط����ڸ�Ԫ�صĻ����ϡ�,
}
```

## 2-3 Material����

https://material.angular.io/

https://material.io/

http://materialdesignblog.com/

ʲô�����ʺϲ��ùٷ�������⣿

* �Ŷ�û����������ͳһ��UI���ʱ.����ʹ��.

* �ŵ�:�����Ժã�����չ�Ժã��ɲ����Ժã��������֧�ֺ�.

* ȱ�㣺Ŀǰ����Բ���ḻ��ֻ�� Material ���

SideNav

    npm i --save @angular/material
    npm i --save @angular/material @angular/cdk

Q: Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide:
A: ��������css�ļ��� @import "~@angular/material/prebuilt-themes/deeppurple-amber.css";

    <mat-sidenav #sidenav mode="over" align="end">

һ��container�п�����2��sidenav , align= start , ���, end �ұ�

    <mat-toolbar color="primary"></mat-toolbar>
    <mat-toolbar color="accent"></mat-toolbar>

��ɫ����ɫ  accent ָ��ɫ

## SideNav 

1. ��;�������������ͬʱ������Ϊ����
2. �໬������ģʽ�� over, push , side
3. һ��� <md-sidenav-container> ����ʹ��

## Toolbar

1. ��;: һ������ͷ����������
2. ͨ�� <md-toolbar-row> ֧�ֶ���
3. Ĭ���ڲ������ǻ���flex��

        ��coremodule ����MatToolbarModule
        ��appmodule import MatSidenavModule

header ����֪�� sidebar���Ķ� ������output��������������~

```typescript
header.ts
@Output() toggle = new EventEmitter<void>();
app.component.html
<app-header (toggle)="sidenav1.toggle()"></app-header>
```

## 2-4 MdIcon ���

appModule �е��� MatIconModule , header.html

    <mat-icon svgIcon="gifts"></mat-icon>

mat-icon �������ţ����������

    ʹ��ͼ�����壬�ڽ� material icon ֧��
    ֧�� svg : ͨ��ע�� mdiconRegistry �� DomSanitizer

```typescript
this.addSvgIcon('project', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/project.svg'));
```


�����Ҳ��� HttpProvider����appmodule�е��� HttpClientModule

* �����ظ����أ�����utils/svg.utils.ts 

```typescript
export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  ir.addSvgIcon('gifts', ds.bypassSecurityTrustResourceUrl('assets/gifts.svg'));
}
```

������headerʹ��ʱ����Ҫ���룬�鷳��������coremodule�е��롣


```typescript
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MatIconRegistry,
    ds: DomSanitizer) {
    if (parent) {
      throw new Error('ģ���Ѵ��ڣ������ٴμ���!');
    }
    loadSvgResources(ir, ds);
  }
}
```

## 2-5 Input ���

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
full--��� login����ʲô�����ž͵����� login

```

HTML 

```html
# app.component.html
    <main> <router-outlet></router-outlet> </main>

#login.compoennt.html
<mat-card>
  <mat-card-header>
    <mat-card-title>��¼</mat-card-title>
  </mat-card-header>

  <mat-card-content>
    <mat-input-container>
      <span matPrefix="">wang</span>
      <input matInput type="text" placeholder="����email">
      <span matSuffix>@gmail.com</span>
      <mat-hint></mat-hint>
      <mat-label></mat-label>
    </mat-input-container>
  </mat-card-content>

  <mat-card-actions>
    <p>��û���˻�?<a href="">ע��</a></p>
    <p>��������?<a href="">�һ�</a></p>
  </mat-card-actions>
</mat-card>

color accent
mat-input-container
    floatPlaceholder float Ĭ��
    floatPlaceholder always һֱ�ڶ���
    floatPlaceholder never һֱ�ڶ���
hintLabel="������" �������������ʾ
```

Input

    ָ��: mdInput �� <md-input-container> �ڲ�����ǰ׺��׺
    <md-error> : ֻ����֤��ͨ��ʱ�ų��֣����������ͱ��������
    <md-hint> : ��error��ʾʱ, hint ������

ģ������󣬾�������sharedModule

```typescript
# login.module
imports: [SharedModule, LoginRoutingModule]
# core.module
imports: [HttpClientModule, SharedModule, BrowserAnimationsModule, ]
# app.module
imports: [BrowserModule, SharedModule, CoreModule, LoginModule, AppRoutingModule, ]
```

## 2-6 Card �� Button ���

__card __ �ʺ�ͼ����ʽͻ��ĳһ����

```typescript
  <mat-card>
    <mat-card-header>
      <mat-card-title>ÿ�ռѾ�</mat-card-title>
      <mat-card-subtitle>{{quote.cn}}</mat-card-subtitle>
    </mat-card-header>
    <img mat-card-xl-image src="/assets/quote_fallback.jpg" alt="">
    <mat-card-content>
      {{quote.en}}
    </mat-card-content>
  </mat-card>

```

__Button__

md-button ����ָ����ʽ�ṩ��
��׼��ť: md-button, md-raised-button, md-icon-button
������ť: md-fab, md-fab-mini

��ָ�� type Ĭ��Ϊsubmit, ָ��Ϊtype=button

    <button mat-raised-button type="button">��¼</button>

mat-����|Ч��
---|---
mat-raised-button | �����Ч��
mat-fab-button  | Բ��Ч��
mat-mini-fab    | ��С��Բ��Ч��

�����������û����������ţ���������������� �Ҳ�
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

## 2-7 �ڲ໬�˵���ʹ�� MdList

__List__

* �û���һ�������б�
* `<mat-list>`��`<mat-nav-list>`

List item Ĭ����ʽ `align:center,flex:row`

ʹ list item �������� 

    mat-icon {align-self: flex-start; }

ѹ���б�.����С `<mat-nav-list dense>`

����ͼ��ɵ��������

���31�����ͼ�꣬ʹ����ͼ���Զ��ı�

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

������
```bash
npm install --save date-fns
npm install --save-dev @types/date-fns
```

## 2-8 Angular Material ����

���⣺ ��ɫ��+����+����
$my-app-accent: mat-palette($mat-pink,A200, A100, A400);
Ĭ����ǳ���������⣬�����������ȣ�
```typescript

# header.component.html
<span class="fill-remaining-space"></span>
<mat-slide-toggle (change)="onChange($event.checked)">Ĭ��ģʽ</mat-slide-toggle>

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
## 2-9 GridList ����ע��ҳ��ͷ���б�

* GridList

��;���������Ƶ�����չʾ��������ͼƬ��������ᡣ

��Ϊ��������colspan,rolspan�����ԡ�

    ng g c login/register --spec=false

* mat-grid-list ����

 rowHeight="34px"��1,colspan,rowspan

* map() ��ÿ��Ԫ�ش������µ�Ԫ��

* svgͼ�꼯��ʹ�÷����� name:svg-${id}

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

## 2-10 �Ի����ʹ��

* �Ի�������⣬��Ҫ��ģ���е� entrryComponents������
* �������ݣ� const dialogRef = dialog.open(YourDialog, {data:'your data'})
* �������ݣ� constructor(@Inject(MD_DIALOG_DATA) public data:any) {}

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
  <img mat-card-image [src]="item.coverImg" alt="��Ŀ����">
  <mat-card-content>
    {{item.desc}}
  </mat-card-content>
  <mat-card-actions>
    <button mat-button type="button">
      <mat-icon>note</mat-icon>
      <span>�༭</span>
    </button>
    <button mat-button type="button">
      <mat-icon>group_add</mat-icon>
      <span>����</span>
    </button>
    <button mat-button type="button">
      <mat-icon>delete</mat-icon>
      <span>ɾ��</span>
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
  <h2 mat-dialog-title>�½���Ŀ</h2>
  <div mat-dialog-content>
    <mat-input-container class="full-width">
      <input matInput type="text" placeholder="��Ŀ����">
    </mat-input-container>
    <mat-input-container class="full-width">
      <input matInput type="text" placeholder="��Ŀ����">
    </mat-input-container>
    <div mat-dialog-actions>
      <button type="button" mat-raised-button color="primary" (click)="onClick()">����</button>
      <button type="button" mat-button mat-dialog-close>�ر�</button>
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


## 2-11 Autocomplete ��ʹ��

Ҫ�� input ����ʹ�á�

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

ʵ������

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
  <h2 mat-dialog-title>������Ա</h2>
  <div mat-dialog-content>
    <mat-input-container class="full-width">
      <input matInput type="text" placeholder="��Ա����" [matAutocomplete]="autoMembers">
    </mat-input-container>
    <div mat-dialog-actions>
      <button type="button" mat-raised-button color="primary" (click)="onClick()">����</button>
      <button type="button" mat-button mat-dialog-close>�ر�</button>
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

[displayWith]="displayUser"> ������  displayUser()

* ��ʾ������Ǻ������Ǻ����ķ��ؽ��

## 2-12 �����б�֮�˵�
## 2-13 �����б�֮�������
## 2-14 �����б�֮������Ի���
## 2-15 �����б�֮�ƶ����ݶԻ���
## 2-16 �������ܣ��ϣ�
## 2-17 �������ܣ��£�


# ��3�� Angular ����
# ��4�� Angular ���ĸ���ع˺����
# ��5�� Rxjs����������
# ��6�� Angular �е���Ӧʽ���
# ��7�� ʹ�� Redux ����Ӧ��״̬
# ��8�� Angular �Ĳ���
# ��9�� �γ��ܽ�

    