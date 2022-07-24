# Image Processing API

# What Is that:
this is image processing API created in Node.js and TypeScript can be used to resize your image also to add blur effect or rotate the image.

# Languages, frameworks and libraries:
1. JavaScript
2. Node.js
3. express
4. sharp
5. Typescript
6. jasmine
7. lint
8. prettier

# how it works
first you place your images inside full directory and visit /api/images and provide parameters for requiest to make effect on images eg 
`/api/images?filename=myimage&width=150&height=150`

# endpoints

#### /images endpoint
this is the main endpoint and accepts 5 query parameters

1. **/ root endpoint**
   - takes no parameters.
   - this redirect to API endpoint and do not do thing in the app.
2. **/api endpoint**
   - takes no parameters.
   - this display message about the api and the options can set.
3. **/images**
   this is the main endpoint
   - accepts 5 query parameters
   - Parameters: [filename: string, width: number, height: number, blur: number, rotate: number]
   - this endpoint uses 5 logical ordered middlewares as a chain which include validate request and processing image (must called in the same order described)
   -       .1: validate first required parameters and return error for all missing paramters at once
   -       .2: as now required paramters exist, second validate type of each paramter and return error for all invalid type and mention right type. also validate optional prameters
   -       .3: third middleware first it check if file is cached in thumb folder if so it set locals.cached to true (by doing this will skip next middleware also this middle ware not expected to return errors
   -       .4: fourth middleware it check first if cached set true and continue to callback else it will deal as a new processing request, what it does , it confirm the filename exist in full folder and incase file not exist return 404 error and terminate the processs and request.
   -       .5: last middleware: this is final middleware which uses sharp to process the image also it skip request if image cached by checking the `res.locals.cache` then it create the new image inside the thumb dir, also it uses the same order used in check chached image (both will result in same filename)
   -       
   - finally is the callback for the root and it consider error less function never request will come to it with error or missing data, and it check if file cached it display the cached file using the path set in third middleware, incase this is new request which detected in last middleware it will respond with the new created file  
   
   

For this project, refactor and test as much as possible while you are building. Since you are using TypeScript and an unfamiliar library, it is sometimes easier to write and build in plain JS to see what your functions return; remember your submission needs to be in TypeScript. As your skills improve, typing in TypeScript will feel more intuitive. Make sure to remove any debugging code from your final submission.

## Getting Started

Usually, you would get some starter code to build from, but with this project, it’s your job to prove you can do it from scratch, so all that is being provided for you is a folder of license-free stock images you are welcome to use. If you would like to use your own images for this project, you are welcome to do so, but whoever reviews your project will see your images, and when you display your project online, viewers will also see them.

You can use your own images or use the ones provided in this repo: [images](images)

## Instructions

Feel free to attempt to create this project based on the overview and rubric specifications. If you get stuck or prefer structured guidance -- here is a walkthrough to get you up and running!

1. **Initialize your project.**
   Add the dependencies required for this project, including Express, TypeScript, Jasmine, Eslint, and Prettier. Complete your package.json file.
   - Where should your dependencies be placed?
   - What scripts should you create to take advantage of the dependencies you've added?
   - Are there other dependencies you would like to add or know you will need to improve your workflow?
2. **Set up your project structure.**
   Create folders and files for what you anticipate you will need for the project.
   - How do you plan to keep your source code and build code separately?
   - Where will you keep your tests?
   - How do you plan to name your routes? Utilities?
3. **Configure your middleware and dependencies.**
   You have quite a few dependencies that all need to work together. Sometimes it's easiest to write some simple js functions to test that all of your dependencies work together before you begin adding any functionality.

   - Does your TypeScript compile?
   - Do your Eslint and Prettier scripts work?
   - Are you able to write and pass

## Version Control
