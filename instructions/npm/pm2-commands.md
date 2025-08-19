# Pm2 Commands

## Tips

```bash
  # ALWAYS run your app in production
    # build once and start app

  # When in development
    # process like (nodemon, rimraf, etc) makes the instance hang/crash
```

## Commands

```bash
  # navigate to your repo server folder

  # start
  pm2 start ecosystem.config.js
  pm2 start

  # status
  pm2 status

  # monitor
  pm2 monit

  # Save current processes
  pm2 save

  # stop
  pm2 stop <name>
  pm2 stop all
  
  # delete
  pm2 delete <name>
  pm2 delete all
  pm2 kill
```

## Ecosystem Config for Pm2 (ecosystem.config.js)

- **Option 1**

```js

module.exports = {
  apps: [
    {
      name: "your-appname",
      script: "npm",
      args: "run start",
      // cwd: "/opt/shared/repos/<your-foldername>/server",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

```

- **Option 2**

```js

module.exports = {
  apps: [
    {
      name: "your-appname",
      script: "src/index.ts",
      interpreter: "ts-node",
      env: {
        PORT: 80,
        NODE_ENV: "production"
      }
    }
  ]
}

```
