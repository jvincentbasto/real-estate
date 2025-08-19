# Linux User Commands

## Commands

- **User commands**

```bash
  # check users
  cat /etc/passwd
  cut -d: -f1 /etc/passwd
  
  # check user
  id <username>

  # add user
  sudo useradd <username>
    # add user with home directory
    sudo useradd -m -s /bin/bash <username>
  
  # rename user
  sudo usermod -l <newusername> <oldusername>
    # rename user with home directory
    sudo usermod -d /home/<newusername> -m <newusername>

  # delete user
  sudo userdel <username>
    # delete user with home directory
    sudo userdel -r <username>

  # switch user
    # root
    sudo su -
    # user
    sudo su -<user>
```

- **Password commands**

```bash
  # set password
  sudo passwd <username>

  # check passwordless users 
    # default ec2 passwordless folder
    sudo ls -la /etc/sudoers.d
    # check default ec2 passwordless user
    sudo cat /etc/sudoers.d/90-cloud-init-users
    # check passwordless user
    sudo cat /etc/sudoers.d/<user>

  # set passwordless user
  echo "<user> ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/<user>
    # sample
    echo "alice ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/alice

  # delete passwordless user
  sudo rm /etc/sudoers.d/<user>
    # sample
    sudo rm /etc/sudoers.d/alice

  # test passwordless user
  sudo whoami
```
