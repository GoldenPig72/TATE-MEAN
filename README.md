# TATE-MEAN Cloud Development Project

**PLEASE DON'T EDIT HERE! THIS TEXT IS PORTED OVER FROM WHERE WE MAINTAIN IT ON OUR GITHUB REPOSITORY.** 

This project is part of our Agile Coach Team's attempts to deploy a MEAN (MongoDB, Express.js, Angular.js, Node.js) stack on a cloud platform (in this case Heroku) so that we can learn the ins and outs of actual cloud developing and deployment.

This document will contain the instructions for new members joining the team to get up and running with the local environments and with access to the necessary repositories and cloud platforms.

A great resource for setting up a MEAN stack application can be found [here](https://thecodebarbarian.wordpress.com/2013/07/22/introduction-to-the-mean-stack-part-one-setting-up-your-tools/).

## Getting Set Up

###Local Setup

1. Download and install nodejs on your laptop: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
2. Download and install a Git client on your laptop, for instance:  [https://git-for-windows.github.io/](https://git-for-windows.github.io/)
3. Create a local dev directory on your laptop.
4. From within this directory, clone the TATE-MEAN project from the GitHub repository: `git clone https://github.com/GoldenPig72/TATE-MEAN.git`
5. Install the express-js dependency from within the same project folder: `npm install express`
6. Run the sever: `node server.js`
7. Open your browser and browse to `localhost:8080`.  If all is well you should see: `Hello World!`

####MongoDB local install

The next step is to have a Mongo database running. It’s NOT required but its a necessary step to test it locally before deploying. To simplify let’s use a MongoDB as a Service using MongoLab [mongolab.com]

Tutorial [here](http://docs.mlab.com/#account-setup)

Local install [tutorial](https://www.mongodb.com/download-center#community)

You'll probably get an error message around a missing dll:

"api-ms-win-crt-runtime-l1-1-0.dll is missing"

If this occurs find the solution below:

#####MongoDB Missing dll Solution

Install Windows Updates:

1. Go to Start - Control Panel - Windows Update
2. Check for updates
3. Install all available updates.
4. After the updates are installed, restart your computer.
5. After the restart repeat the steps above again until no more updates are available.
6. Download the Visual C++ Redistributable:

__For Windows 64-bit__
[Link for the 64-bit Microsoft Visual C++ Redistributable file](http://download.microsoft.com/download/9/3/F/93FCF1E7-E6A4-478B-96E7-D4B285925B00/vc_redist.x64.exe) 

__For Windows 32-bit__
Visual C++ Redistributable for Visual Studio 2017 (32-bit)

7. Run the vcredist_x64.exe (64-bit) or vcredist_x86.exe (32-bit) and select Uninstall

8. Run the .exe again and select Install

#####MongoDB Data path

MongoDB expects a data directory that defaults to /data/db. If you want to specify a custom data path, you need to start up Mongo at the commandline with:

 `mongod --dbpath /data/<path> --port <port no>`

##GitHub

###Project in github

`Goldenpig72/TATE-MEAN`


###Git CLI Commands


###Github Administration


##Heroku


###Heroku cli commands

Command to create an mlab addon to the heroku instance that provisions a mangodb:

``$ heroku addons:create mongolab:sandbox --app pacific-beyond-24921```
