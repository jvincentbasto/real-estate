# EC2 Sessions

## EC2 ssh username

```bash
  | **AMI Name contains…**                     | **SSH Username**                    |
  | ------------------------------------------ | ----------------------------------- |
  | `amzn` / `Amazon Linux` / `Amazon Linux 2` | `ec2-user`                          |
  | `ubuntu`                                   | `ubuntu`                            |
  | `debian`                                   | `admin`                             |
  | `centos`                                   | `centos`                            |
  | `fedora`                                   | `ec2-user`                          |
  | `suse` / `SLES`                            | `ec2-user`                          |
  | **Custom image you created**               | Same as the base image it came from |
```

## Connect ssh user

```bash
  # default login 
    # ec2_public_ip format -> <n>.<n>.<n>.<n>
  ssh -i "[filename].pem" <ssh_username>@<ec2_public_ip>

  # login per user
  ssh -i "~/[any_folder]/[filename].pem" [username]@<ec2_public_ip>

  # sample
  ssh -i "~/.ssh/portfolio_ec2_alice.pem" alice@<n>.<n>.<n>.<n>
```

## Tracking

```bash
  # options:
  last 
  who 
  w

  # user
  grep "<user>" /var/log/auth.log

  # sample
  grep "alice" /var/log/auth.log
```

## Logout

```bash
  # logout
  exit
```

- **How to close a “ghost” or active session**
- **It happens when connection is not closed properly**

```bash
  # option 1
  last
  sudo pkill -u <user>

  # option 2
    # Look for process -> sshd: <user>@pts/<n>
    # and note its PID
  ps aux | grep <user>
  sudo kill -9 <PID>

  # sample 1
  last 
  sudo pkill -u alice

  # sample 2
  ps aux | grep alice
  sudo pkill -9 alice 95440
```

## PM2 Commands

```bash
  # navigate to your app folder
  # start app
  pm2 start ecosystem.config.js
  pm2 start

  # stop app
  pm2 status 
  pm2 monit

  # stop app
  pm2 stop <app_name>
  pm2 stop all

  # delete app
  pm2 delete <app_name>
  pm2 delete all
```
