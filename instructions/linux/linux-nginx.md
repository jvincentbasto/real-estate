# Setup Nginx

## Nginx Template (.conf)

```bash
  # field: listen
    # match your ec2 ports to this nginx config
    # ec2_port === listen

  # field: proxy_pass
    # match your .env port to this nginx config
    # env_port === proxy_pass
  
  server {
    listen 80;
    server_name _;  # or your domain if you have one

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
  }

```

## Install Nginx

```bash
  # nginx directory
  sudo ls /etc/nginx/conf.d

  # add nginx config
    sudo nano /etc/nginx/conf.d/<repo>
    # paste your config (ex: template config)
    # save and exit
      ctrl+o -> enter
      ctrl+x
      
```

## Test Nginx

```bash
  # test nginx
  sudo nginx -t
  sudo systemctl reload nginx

  # test ip (proxy_pass)
  curl http://127.0.0.1
```
