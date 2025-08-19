# EC2 Custom Shared Folder

## Create shared folder

```bash
  # create shared folder
  sudo mkdir -p /opt/shared/repos

  # set variables  
    echo 'export SHARED_DIR="/opt/shared"' | sudo tee -a /etc/profile.d/shared.sh
    echo 'export REPOS_DIR="/opt/shared/repos"' | sudo tee /etc/profile.d/shared.sh
    # or use nano
      sudo nano /etc/profile.d/shared.sh
      # paste
        export SHARED_DIR="/opt/shared"
        export REPOS_DIR="/opt/shared/repos"
      # save
        ctrl+0, enter
        ctrl+x

  # load variables
    source /etc/profile.d/shared.sh
  # test 
    echo $SHARED_DIR
    echo $REPOS_DIR
  
  # create group
  sudo groupadd dev
  # Add default ec2 user (ec2-user) to dev group
  sudo usermod -aG dev ec2-user
```

```bash
  # Ownership & Basic Permissions
    # ensure the group always has baseline access.

  # Group owner -> dev group 
  sudo chown -R ec2-user:dev /opt/shared/repos
  # Group access -> read/write/execute 
  sudo chmod -R g+rwX /opt/shared/repos
  # Inherit ownership for all or new files/folders 
  sudo find /opt/shared/repos -type d -exec chmod g+s {} \;

  # set permissions to build files (dist, build)
    # only if needed
    sudo chown -R ec2-user:dev /opt/shared/repos/real-estate-prod/server/dist
    sudo chmod -R g+rwX /opt/shared/repos/real-estate-prod/server/dist
```

```bash
  # ACL (Access Control Lists)
    # ACL is like “extended permissions.”

  sudo yum install -y acl
    # acl on newer distros
    sudo dnf install -y acl

  # Default ACLs: all *new* files/dirs get dev:rwx
  sudo setfacl -R -d -m g:dev:rwx /opt/shared/repos
  # Apply immediately to existing files/dirs
  sudo setfacl -R -m g:dev:rwx /opt/shared/repos

  # check
  getfacl /opt/shared/repos
```

```bash
  # Shared PM2 Setup
    # By Default: pm2 instance per user
    # Goal: create a shared space for the group

  # create folder
  sudo mkdir -p /opt/pm2

  # Make sure the group has rwx access recursively
  sudo chown -R ec2-user:dev /opt/pm2
  sudo chmod -R 775 /opt/pm2
  # Important: setgid so new files inherit the group
  sudo chmod g+s /opt/pm2
  sudo find /opt/pm2 -type d -exec chmod g+s {} \;

  # export
    # option 1
    echo 'export PM2_HOME=/opt/pm2' | sudo tee /etc/profile.d/pm2.sh
    source /etc/profile.d/pm2.sh
    # option 2
    export PM2_HOME=/opt/pm2
    source ~/.bashrc

  # navigate to your repo
  cd /opt/shared/repos/<your-repo>/server
  pm2 start ecosystem.config.js
  pm2 start
```

```bash
  # Setup direnv 
    # Automatically access the shared pm2 instance 

  # install direnv
  curl -sfL https://direnv.net/install.sh | bash
  
  # copy the path value of "direnv"
  find ~ -type f -name "direnv"
    # then mv it to /usr/local/bin/
    sudo mv <find-path> /usr/local/bin/
    # set permissions
    sudo chmod +x /usr/local/bin/direnv

  # check
  direnv --version

  # set .envrc
  cd /opt/shared/repos/<your-project>/server
  echo 'export PM2_HOME=/opt/pm2' > .envrc
  direnv allow
```

```bash
  # Grant git access for the folder
  sudo git config --system --add safe.directory /opt/shared/repos/*
```

## Clone repo

```bash
  cd /opt/shared/repos
  sudo git clone <repo_url>
```

## Setup Nginx (for all users)

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

```bash
  # nginx directory
  sudo ls /etc/nginx/conf.d

  # add nginx config
    sudo nano /etc/nginx/conf.d/<your_repo>
    # paste your config (ex: template config)
    # save and exit
      ctrl+o -> enter
      ctrl+x
      
```
