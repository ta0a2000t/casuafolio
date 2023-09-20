# Guide To Run The Website Locally (For Beginners)

**For Programmers**: If you're not new to coding, read the [`Guide To Run The Website Locally (Advanced)`](./advanced_setup_guide.md) instead.

--- 

- [Step 1: Setting up Your Development Environment](#step-1-setting-up-your-development-environment)
  - [Download a Code Editor](#download-a-code-editor)
  - [Install Node.js and npm](#install-nodejs-and-npm)
  - [Verification](#verification-watch-video-instead)
- [Step 2: Download The Project](#step-2-download-the-project-watch-video-instead)
- [Step 3: Open the Project in VS Code](#step-3-open-the-project-in-vs-code-watch-video-instead)
- [Step 4: Run Your Project](#step-4-run-your-project-watch-video-instead)
  - [General Instructions](#general-instructions)
  - [Platform-Specific Instructions](#platform-specific-instructions)
  - [Final Steps for Mac & Windows](#final-steps-for-mac--windows)
- [Personalization](#personalization)

--- 

## Step 1: Setting up Your Development Environment

### Download a Code Editor

A code editor is a tool that makes writing code easier, offering features like text highlighting and auto-completion. 

1. **Windows/Mac/Linux**: Download [Visual Studio Code](https://code.visualstudio.com/) (VS Code)
2. **Installation**: Follow the installation guide for your OS (Operating System).

### Install Node.js and npm

1. **Download**: Head to [Node.js official website](https://nodejs.org/en/) and download the installer for your Operating System.
2. **Installation**: Double-click the downloaded file and follow the installation steps.

> **What is Node.js?** Node.js is an environment that can run JavaScript code.<br>
> **What is npm?** npm is the Node.js package manager used to install JavaScript libraries.

### Verification [Watch Video Instead](https://youtu.be/x7D-ENWIgGA?si=gR2DN8wm-po5pwca):
<details>
  <summary>Cick To See Text Instructions</summary>

 Open a new command prompt or terminal window and run `node -v` and `npm -v` to ensure that both Node.js and npm are installed.

</details>

## Step 2: Download The Project [Watch Video Instead](https://www.youtube.com/watch?v=qKkBuoXgzww&ab_channel=TahaAlNufaili)

<details>
  <summary>Cick To See Text Instructions</summary>

- Go to [the project GitHub page](https://github.com/ta0a2000t/casuafolio).
- Look for a button that says 'Code' and click it.
- Then click "Download ZIP".
- Once the ZIP file has downloaded, go ahead and unzip it.

</details>

## Step 3: Open the Project in VS Code [Watch Video Instead](https://youtu.be/4mmj50L1WZg)
<details>
  <summary>Cick To See Text Instructions</summary>

1. **Launch VS Code**: If not already running, open Visual Studio Code (VS Code).

2. **Initiate Project Opening**: Click on `File -> Open Folder` in the menu bar at the top.

3. **Navigate to Project Folder**: A file explorer will open. Navigate to the location where you unzipped the `casuafolio-main` folder.

4. **Select Project Folder**: Click on the `casuafolio-main` folder to select it, and then click on the "Open" button.
</details>

<br>

By following these steps, you should have successfully opened the `casuafolio-main` project folder in VS Code. 
>The top left of VSCode window should have `CASUAFOLIO-MAIN` in all caps.



## Step 4: Run Your Project [Watch Video Instead](https://www.youtube.com/watch?v=YaSbdXYKQQU&ab_channel=TahaAlNufaili)

<details>
  <summary>Cick To See Text Instructions</summary>

#### General Instructions

1. **Open Terminal in VSCode**: 
  - In VSCode, navigate to `Terminal > New Terminal` or `View > Terminal` from the menu to open a new terminal window.

#### Platform-Specific Instructions
---
**For Mac Users**

  2. **Install Dependencies**: In the terminal, type `npm install` and press `Enter`.

  3. **Run the Server**: In the terminal, type `npm start` and press `Enter`.

Certainly! Here's the revised section, now recommending the video for finding the complete path to the project folder:

---
**For Windows Users**

  2. **Find Project Path**: 
     - To find the complete path of your `casuafolio-main` folder, you can follow this video tutorial: [How to get the complete path to a file or folder on Windows 10](https://www.youtube.com/watch?v=MVoQhYWJuvw).
     - Make sure the path ends with `casuafolio-main`.

  3. **Navigate to Project in Command Prompt**: 
     - Open the 'Command Prompt' from your computer's search window.
     - Type `cd`, add a space, and then paste the copied output. It should look like `cd C:\some\path\to\casuafolio-main`. Press `Enter`.

  4. **Install Dependencies**: 
     - In the Command Prompt, type `npm install` and press `Enter`.
  
  5. **Run the Server**: 
     - In the Command Prompt, type `npm start` and press `Enter`.
---

</details>

#### Final Steps for Mac & Windows

  - **Open in Browser**: If a browser window doesn't automatically, open [`http://localhost:3000`](http://localhost:3000) in your web browser, like Google Chrome.


## Personalization

1. **Now that the website is up locally, you can [`Personalize The Website 🎨`](./personalize.md).**
