# 路由配置

1. 安装react-router-dom

```
yarn add react-router-dom
```

2. index.js中引入Router

```
import {
  BrowserRouter as Router
} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

```

3. 在App.js里配置路由

```
import {
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/history" component={History} />
        <Route path="/about" component={About} />
      </Switch>
      <Footer />
    </div>
  );
}
```

* 注意 exact是精确匹配路由的意思

4. 在Header.js里配置Link

```
import React from 'react'
import Logo from './logo.svg'
import { Link } from 'react-router-dom'

function Header() {
  return (<div>
    <img src={Logo} />
    <nav>
      <Link to="/">首页</Link>
      <Link to="/history">历史</Link>
      <Link to="/about">关于我</Link>
    </nav>
  </div>)
}
```

5. 懒加载的方式

* 在App.js中引入Suspense和lazy

```
import React, { Suspense, lazy } from 'react';
```

* 路由的懒加载

```
const Home = lazy(() => import('./pages/Home'))
const History = lazy(() => import('./pages/History'))
const About = lazy(() => import('./pages/About'))
```

* 使用Suspense包裹路由,fallback对应未加载时的懒加载组件

```
     import Loading from './components/Loading'
     
     <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/history" component={History} />
          <Route path="/about" component={About} />
        </Switch>
      </Suspense>
```

6. 使用useHistory作路由跳转

```
import {useHistory} from 'react-router-dom'

function HomeButton(){
	let history = useHistory()
    
    function handleClick(){
    	history.push('/home')
    }
    
    return(
    	<button type="button" onClick={handleClick}>
    	Go Home
    	</button>
    )
}
```



# 使用styled-components

* 安装

```bash
yarn add styled-components
```

* 使用

````jsx
import React from 'react'
import LogoUrl from './logo.svg'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.header`
  display:flex;
  align-items:center;
  padding:10px 100px;
  background-color:#02101f;
  color:#fff;
`;
const Logo = styled.img`
  height:30px
`
const StyledLink = styled(NavLink)`
  color:#fff;
  margin-left:30px;

  &.active{
    border-bottom:1px solid #fff
  }
`


function Component() {
  return (<Header>
    <Logo src={LogoUrl} alt='logo' />
    <nav>
      <StyledLink to="/" exact activeClassName="active">首页</StyledLink>
      <StyledLink to="/history">历史</StyledLink>
      <StyledLink to="/about">关于我</StyledLink>
    </nav>
  </Header>)
}
````

* navLink 不同于Link还具有activeClassName属性

# 引入mbox管理状态

1. 安装

```
yarn add mobx 
yarn add mobx-react
```

2. 设置store

```jsx
import { observable, action,computed } from 'mobx'

class AuthStore {
  @observable isLogin = false;
  @observable isLoading = false;
  @observable values = {
    username: '',
    password: ''
  }

  @action setIsLogin(isLogin) {
    this.isLogin = isLogin
  }

  @action setUsername(username) {
    this.values.username = username
  }

  @action setPassword(password) {
    this.values.password = password
  }

  @action login() {
    console.log('登陆中')
    this.isLoading = true
    setTimeout(() => {
      console.log('登录成功')
      this.isLogin = true
      this.isLoading = false
    }, 1000)
  }

  @action register() {
    console.log('注册中')
    this.isLoading = true
    setTimeout(() => {
      console.log('注册成功')
      this.isLogin = true
      this.isLoading = false
    }, 1000)
  }

  @action logout() {
    console.log('已注销')
  }
}

export AuthStore
```

3. 创建Context对象

```jsx
import React from 'react';
import {HomeStore} from '../stores/home'
import {AboutStore} from '../stores/about'

export const storesContext = React.createContext({
	homeStore:new HomeStore()
	aboutStore:new AboutStore()
})
```

4. useContext

* 设置useStores函数，用于在函数组件内获取context对象

```
import React from 'react'
import {storeContext} from '../contexts'

export const useStores = ()=>React.useContext(storesContext)
```

5. 子组件使用context

* 观察组件，通过useStore获取context对象

```
import React,{Component} from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../hooks/use-stores'

const About = observer(()=>{
	const {homeStore,aboutStore} = useStores()
	return(
		<div>
			<h1>About</h1>
			<p>current counter:{aboutStore.counter}</p>
			<p>home counter:{homeStore.counter}</p>
		</div>
	)
})
```

6. 配置修饰器语法

* 释放 webpack配置

```
yarn run eject
```

* 这里我遇到了一个错误 'react-scripts' 不是内部或外部命令，也不是可运行的程序 或批处理文件，查阅后得知这是create-react-app的丢包现象，重新`yarn add react-scripts`即可
* 然而更麻烦的是由于react-scripts版本问题导致yarn run eject后依赖不可用了，研究很久没找到解决方法，最后只能新建一个create-react-app（更正：重新安装提示的依赖后正常运行）

* 安装修饰器插件

```
yarn add @babel/plugin-proposal-decorators
```

* 然后修改package.json,找到babel字段，添加

```
'babel'：{
"plugin":[
"@babel/plugin-proposal-decorators"
],
"presets":[
	"react-app"
]
}
```

	7. 如何使得组件监听store变化

```
import {observer} from 'mobx-react'

const component = observer(()=>{
	return <div></div>
})
```



# 引入Antd

1. 安装

```
yarn add antd
```

2. 在需要使用的组件中引入

```
import { Button } from 'antd';
```

3. 在App.css中引入样式

```
/* 引入antd样式 */
@import '~antd/dist/antd.css';
```

4. 使用styled-components修改样式

```
const StyledButton = styled(Button)`
  margin-left:10px;
`
```

5. 表单组件

* layout布局
  * antd将页面分成若干格子，然后用数字来代表它所占的位置

```
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 18,
  },
};
```

* 表单验证

  * 验证密码

  ```
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
              {
                min: 4,
                message: '最少4个字符'
              },
              {
                max: 10,
                message: '最大10个字符'
              }
            ]}
          >
  ```

  

  * 验证用户名

  ```
    // 验证用户名
    const validateUsername = (rule, value) => {
      if (/\W/.test(value)) return Promise.reject('只能是数字，字母，下划线')
      if (value.length < 4 || value.length > 10) return Promise.reject('长度为4~10个字符')
      Promise.resolve()
    }
  ```

  在form表单中添加此条规则

  ```
     <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
              {
                validator: validateUsername
              }
            ]}
    >
  ```

  * 验证两次密码是否一致

  ```
    // 确认密码
    const validateConfirm = ({ getFieldValue }) => ({
      validator(rule, value) {
        if (getFieldValue('password') === value) return Promise.resolve()
        else return Promise.reject('两次密码不一致')
      }
    })
  ```

  添加规则

  ```
          <Form.Item
            label="确认密码"
            name="confirmPassword  "
            rules={[
              {
                required: true,
                message: '请再次输入密码',
              },
              validateConfirm
            ]}
          >
  ```


6. upload组件实现自己的上传规则

   * 要使用beforeUpload这个钩子函数

   ```
     const props = {
       beforeUpload: file => {
   	// 在这里做上传的操作
         return false;
       }
     }
   ```

   

# leanCloud

1. leanCloud的初始化

* 安装

```
yarn add leancloud-storage
```

* 初始化

```
import AV, { Query, User } from 'leancloud-storage'

AV.init({
  appId: "Kwf0Ry4aNPf3FyHbVq-gzGzoHsz",
  appKey: "LzTSCvTLub83VH8wDHmk6",
  serverURL: "https://kwfa.lc-cn-n1-shared.com"
});
```

2. 封装用户相关接口

* 注册，登录，注销，当前用户信息

```
const Auth = {
  register(username, password) {
    let user = new User()
    user.setUsername(username)
    user.setPassword(password)
    return new Promise((resolve, reject) => {
      user.signUp().then(loginUser => {
        resolve(loginUser)
      }, error => {
        reject(error)
      })
    })
  },
  login(username, password) {
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then(loginedUser => {
        // 登录成功
        resolve(loginedUser)
      }, error => {
        resolve(JSON.stringify(error));
      });
    })
  },
  logout() {
    User.logOut()
  },
  getCurrentUser() {
    return User.current()
  }
}
```

3. 封装上传文件接口

```
const UpLoader = {
  add(file, filename) {
    const item = new AV.Object('Image')
    const avFile = new AV.File(filename, file)
    item.set('FileName', filename)
    item.set('owner', AV.User.current())
    item.set('url', avFile)
    return new Promise((resolve, reject) => {
      item.save().then(serverFile => {
        resolve(serverFile)
      }, err => {
        reject(err)
      })
    })
  }
}
```

# UseRef

使用useRef来定位Dom对象

```
import React, { useRef } from 'react'

const Component = () => {
  const ref = useRef()

  return (
    <div>
      <h1>文件上传</h1>
      <input type="file" ref={ref} />
    </div>
  )
}

export default Component
```

# 其他问题

1. 遇到一个刷新页面，用户就会失去的问题

* 解决办法：在UserStore中

  ```
  @observable currentUser = Auth.getCurrentUser()
  ```

2. 点击注销后应当把store中的信息都清空