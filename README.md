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
````

````bash
npm install karma --save-dev
sudo npm install -g karma-cli
# You need to install an add on for every browser that needs to be launched.
npm install karma-jasmine karma-chrome-launcher --save-dev
karma init
````

After typing all those commands it will open up a setup for Karma.  These are the options to choose

jasmine
no
chrome

src/**/*.js
spec/**/*.js

yes

after doing this it creates a karma.conf.js file that has all these settings and can be modified. Then to run the tests just use the command below referencing our config file

````bash
karma start karma.conf.js
````

To allow us to use the command:

````bash
npm test
````

 to test our packs add the karma information to the package.json file.  It should look like this when done:

````json
 "scripts": {
    "test": "./node_modules/karma/bin/karma start karma.conf.js"
  },
````

and then using:

````bash
npm test
````

you should be able to run the tests and get the same results. Make sure to exit the node session and get back to bash terminal.

### Phantom.js launcher

phantom.js launcher can run javascript tests without an actual browser. It is faster than using an actual browser and still accurate so it is good to use. To get install it and other browsers find the phantom.js npm install command on the [Node.js website](www.npmjs.com/package)

````bash
npm install karma-phantomjs-launcher --save-dev
````

Next update the [Karma config file](./movie-app/karma.conf.js) to use Phantom.js instead of chrome.  

````javascript
browsers: ['PhantomJS'],
````

you can also have an array there to use multiple browsers and get all the results outputted. To run both it would look like this:

````javascript
browsers: ['PhantomJS','Chrome'],
````

## Install ngMock and Angular

Newer versions of ngMock you can just npm install, but for this vesrion curl is the only option. Download these files into a new folder called angular.

````bash
cd lib
mkdir angular
cd angular
curl -O https://code.angularjs.org/1.4.4/angular.min.js
curl -O https://code.angularjs.org/1.4.4/angular-mocks.js

# npm install angular-mocks@1.4.4
````

### Post ngMock setup

The install instructions for ngMock can be found on the [angular website](https://docs.angularjs.org/api/ngMock). There are two options now, to use karma or not to use karma.  Use karma is the answer, but below is the info for either option.

For the no Karma option, include the angular-mock.js in the [SpecRunner.html](./movie-app/SpecRunner.html)

````html
<script src="angular.js">
<script src="angular-mocks.js">
````

To use karma update the [Karma config file](./movie-app/karma.conf.js) to include the new files.

````javascript
    // list of files / patterns to load in the browser
    files: [
      'lib/angular/angular.min.js',
      'lib/angular/angular-mocks.js',
      'src/**/*.js',
      'spec/**/*.js'
    ],
````
