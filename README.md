# Static fallback page

这个版本去掉了国外 CDN 依赖，改成纯 `HTML + CSS + JS`，避免用户在没有梯子的情况下卡在 `Loading...`。

原页面的问题主要来自这些外链资源：

- `cdn.tailwindcss.com`
- `unpkg.com/react`
- `unpkg.com/react-dom`
- `unpkg.com/lucide-react`
- `unpkg.com/@babel/standalone`

现在页面只依赖仓库内文件：

- `index.html`
- `styles.css`
- `app.js`
- `assets/wechat-qr.jpg`
