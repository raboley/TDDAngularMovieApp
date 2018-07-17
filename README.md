# Unit testing angular.js with Jasmine, Karma and ngMock

## Creating a git repo

````bash
git config --global user.email "raboley@gmail.com"
git config --global user.name "Russell Boley"

echo "# TDDAngularMovieApp" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/raboley/TDDAngularMovieApp.git
git push -u origin master
````

## Setting up Jasmine

Jasmine is a behaviorial driven development tool that can be downloaded from the terminal. It has an html page UI that can be used to check status of tests. First steps are to create a folder then download and unzip it.

````bash
mkdir movie-app
cd movie-app
curl -L -O https://github.com/jasmine/jasmine/releases/download/v2.3.4/jasmine-standalone-2.3.4.zip
unzip jasmine-standalone-2.3.4.zip
````

Once downloaded it will contain 3 folders

* [lib](./src) to house standard librarires
* [spec](./spec) which contains sample tests
* [src](./src) full of sample business logic

[SpectRunner.html](./SpecRunner.html) is the web page UI that displays the unit tests in a browser. There are spaces to put links to test files and logic files in there clearly marked with comments.

## Setting up Karma

Karma allows us to execute our tests via the command line, and is installed with npm via node.js
Before installing it is important to have node.js installed. Once you have node.js use the terminal to install via npm and answer all the prompts. All the defaults should be fine, but a description of the package is nice to have.

````bash
node --version
npm --version
npm init
npm install karma --save-dev
````