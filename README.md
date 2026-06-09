# Grasshopper

Grasshopper is an intentionally vulnerable Linux virtual machine designed for beginner-level ethical hacking practice. As the name suggests, Grasshopper is easy to catch, making it ideal for students, cybersecurity learners, and first-time CTF participants. The machine provides a safe environment to learn Linux fundamentals, enumeration, service exploitation, problem-solving, and basic penetration testing techniques.

## Download Link
Get the Grasshopper virtual appliance here:
👉 [Download Grasshopper VM (.7z archive)](https://drive.google.com/file/d/1ADAvjq7FqWUux3D0Rn2khVlWzg-ulFpe/view?usp=sharing)

---

## Features
- **Beginner Friendly**: Clear paths, standard challenges, and helpful breadcrumbs designed for learning.
- **Safe Learning Lab**: Hosted entirely on a local sandbox virtual machine to protect your host system.
- **Realistic Services**: Runs standard real-world server daemons (Apache, FTP, SSH, MySQL).
- **Practical Training**: Encourages command line usage and hands-on application of penetration testing concepts.
- **CTF Style**: Progression marked by capturing user and root flags.
- **Virtual Lab Appliance**: Simple, pre-configured `.ova` format compatible with major virtualization software.

---

## Learning Objectives
1. **Linux Fundamentals**: Filesystem navigation, user roles, file searching, permissions, and command execution.
2. **Enumeration Techniques**: Using Nmap to sweep ports, identify daemons, gather banners, and identify service versions.
3. **Problem Solving**: Identifying configuration clues, decoding stored data, and following breadcrumbs.
4. **Service Exploitation**: Finding weakness in misconfigured services and legacy communications.
5. **Basic Scripting**: Interacting with cron tasks, basic automation tools, and local terminal execution.
6. **File Compression & Extraction**: Dealing with multiple formats (.zip, .tar, .7z) to carve hidden materials.
7. **Remote Connectivity**: Working with SSH key chains, FTP protocols, and Telnet communication channels.
8. **Ethical Hacking Core**: Gaining end-to-end pen testing exposure: reconnaissance, exploit execution, and privilege escalation.

---

## Vulnerable Services
The machine runs several active services that have been misconfigured or left vulnerable on purpose:
- **SSH (Port 22)**: Weak credential structures and private key configuration weaknesses.
- **Telnet (Port 23)**: Plaintext communication service allowing interception of network credentials.
- **FTP (Port 21)**: Open anonymous logins and loose file permissions allowing file reads and shell uploads.
- **MySQL (Port 3306)**: Database open with default settings. Learn database dumping and credential hashes cracking.
- **HTTP (Port 80)**: Web services with traversal flags and hidden directories containing passwords.
- **Multiple Open Ports**: Custom obscure daemon listeners showing banners or backdoors.

---

## Requirements
- **Hypervisor**: VMware Workstation (Player/Pro) OR Oracle VM VirtualBox.
- **Host RAM**: At least 4GB of RAM (the VM uses 1GB RAM).
- **Hard Drive Space**: ~3GB of free disk space.
- **Decompressor**: 7-Zip (Windows/Linux) or WinRAR (Windows).

---

## Installation Instructions

### Step 1: Download Grasshopper
Download the VM archive from the [Google Drive Download Link](https://drive.google.com/file/d/1ADAvjq7FqWUux3D0Rn2khVlWzg-ulFpe/view?usp=sharing).

### Step 2: Extract the Archive
The downloaded file `grasshopper.7z` is compressed. Extract it using a compatible tool:
- **Windows**: Right-click `grasshopper.7z` -> 7-Zip -> Extract Here.
- **Linux/Mac**: Run `7z x grasshopper.7z` in your terminal.
This will extract `grasshopper.ova`.

### Step 3: Import into Hypervisor
1. Open VirtualBox or VMware Workstation.
2. Select **File** -> **Import Appliance**.
3. Choose the extracted `grasshopper.ova` file.
4. Click Import (keep the default settings; recommended RAM: 1GB, OS: Ubuntu 64-bit).
5. **Important**: Change the Network Settings of the imported VM to **Host-Only** or **Bridged Mode** to isolate it from the public internet while keeping it accessible from your attacker machine (e.g. Kali Linux).

### Step 4: Start Practicing
Power on the virtual machine and start your penetration test.

---

## Usage Information
1. Turn on the Grasshopper VM and your attacker machine (e.g., Kali Linux) on the same Host-Only network.
2. Find the IP address of the Grasshopper VM using host discovery tools:
   ```bash
   nmap -sn 192.168.56.0/24
   ```
   *(Adjust the IP range according to your hypervisor's Host-Only network settings)*.
3. Once the IP is discovered, perform a detailed port scan:
   ```bash
   nmap -sV -p- <target_ip>
   ```
4. Begin your offensive enumeration! Seek out the user flag and work your way up to root privileges.

---

## Disclaimer
> [!WARNING]
> Grasshopper is an intentionally vulnerable virtual machine created for educational purposes only. It should be used only in authorized environments and for legal cybersecurity training and practice. Do not host this machine directly on public-facing internet servers.

---

## Author
**Hasnain Shinwari**
- **GitHub**: [https://github.com/Hasnain-shinwari](https://github.com/Hasnain-shinwari)
- **LinkedIn**: [https://www.linkedin.com/in/hasnain-shinwari](https://www.linkedin.com/in/hasnain-shinwari)
