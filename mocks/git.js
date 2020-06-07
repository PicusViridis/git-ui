exports.logs = `4cabd4f390e326a2ebd326fdd7fce6c56a73e084::4cabd4f::Sara Morillon::1591462554::Fix writes on node_modules folder
8b647f3f3420a1c250675317557315ff5fdfa448::8b647f3::Sara Morillon::1591460922::Add README.md
4d6868bb6029c431a91a1aa38d0bba896d61a927::4d6868b::Sara Morillon::1591459571::Initial commit`

exports.lsTree = `100644 blob 86ef2108793d6ca6d2358d3797446784a2a1e485    .babelrc
100755 blob 6fe100eadd23e134b440d8090daded4833142e32    .env.template
100644 blob 8c8d48d38e603d063e120331cb6a9c9a47d04677    .eslintrc.json
100644 blob 42de65fbf16ddd97ccff0c1e147271953749416c    .gitignore
100644 blob cfa4dd99fff1b7f6df83630a1b9e90a27abe316b    .prettierrc.json
100644 blob 9c2f8598b5d71dc5b1230e4d8ea7ca5f64071581    Dockerfile
100644 blob 9266bb979270469af2b4ceee95c20095647b935e    README.md
040000 tree 2bc078eaedf63ee670c5205a4383932b49500b7e    db
100644 blob 54c5f2d6387a6ca30ef51a2489880706ee92c608    docker-compose.yml
100755 blob a3a80eb020645a72d6d91d4d64bd9fb50363d07d    package.json
040000 tree 082ffd7a4cc91d26fc585453ceea79d9fa733d8a    src
100755 blob c31ea0fa93002f912d29198cbce52634cab7e814    yarn.lock`

exports.branch = `  add-user-management
* master`

exports.diffTreeBinary = `diff --git a/db/database.sqlite b/db/database.sqlite
new file mode 100755
index 0000000..6198a8b
Binary files /dev/null and b/db/database.sqlite differ`

exports.diffTreeText = `diff --git a/.babelrc b/.babelrc
new file mode 100644
index 0000000..86ef210
--- /dev/null
+++ b/.babelrc
@@ -0,0 +1,3 @@
+{
+    "presets": ["@babel/preset-env", "@babel/preset-react"]
+}`
