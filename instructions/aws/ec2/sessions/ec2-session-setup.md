# EC2 Setup Instructions

## Connect to EC2 Instance via EC2 Instance Connect

```bash
  # First Time: connect to aws ec2 directly

  # After Setup: connect via ssh 
  ssh -i "~/[your_folder]/[filename].pem" [user]@[EC2_PUBLIC_IP>]

  # switch to root user
  sudo su -
```

## Install Packages

- **Switch to superuser and install nvm:**
  - **Note: nvm is scoped only to the current user session**
  - **use yum or your system's package installer to globally access across users**

```bash
  # use curl
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

  # activate nvm
  \. "$HOME/.nvm/nvm.sh"

  # install node
  nvm install 22

  # Verify versions
  node -v 
  nvm current 
  npm -v 

  # Optional: install yarn
  corepack enable yarn
  yarn -v

  # Optional: install pnpm
  corepack enable pnpm
  pnpm -v

  # Optional: update packages
  npm install -g npm@latest
  npm install -g yarn
  npm install -g pnpm

  # OR Get latest at Node Website
  # Navigate to downloads or installations
  # Select for LTS -> Linux OS -> nvm -> <npm | yarn | pmpm>  
```

## Install Git

```bash
  # Update the system
  sudo yum update -y

  # install git
  sudo yum install git -y
  git --version
```

## Install Pm2 (Production Process Manager for Node.js)

```bash
  npm i -g pm2
```

- **Create a pm2 ecosystem configuration file (inside your server directory):**

```js
  // ecosystem.config.js

  module.exports = {
    apps: [
      {
        name: "your-project-name",
        script: "npm",
        args: "run start",
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
```

```bash
  # create file 
  touch ecosystem.config.js

  # nano
    nano ecosystem.config.js
    # copy, paste, save
    ctrl+0, enter
    ctrl-x
```

- **Set pm2 to restart automatically on system reboot:**

```bash
  sudo env PATH=$PATH:$(which node) $(which pm2) startup systemd -u $USER --hp $(eval echo ~$USER)
```

## Next Setup

- **Setup Shared Folder**
- **Setup Script for Create User**
- **Setup Script for Delete User**
