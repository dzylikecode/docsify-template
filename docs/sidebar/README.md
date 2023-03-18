# slidebar collapse

- head

  ```html
  <!-- slidebar collapse -->
  <link
    rel="stylesheet"
    href="//cdn.jsdelivr.net/npm/docsify-sidebar-collapse/dist/sidebar.min.css"
  />
  ```

- docsify

  ```html
  <script>
    window.$docsify = {
      loadSidebar: true, // 自定义侧边栏
      subMaxLevel: 3, // 子目录最大层级 not need
      sidebarDisplayLevel: 1, // 侧边栏显示层级 not need
    };
  </script>
  ```

- body

  ```html
  <!-- slidebar collapse -->
  <script src="//cdn.jsdelivr.net/npm/docsify-sidebar-collapse/dist/docsify-sidebar-collapse.min.js"></script>
  ```
