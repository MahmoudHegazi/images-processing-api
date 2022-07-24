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


# scripts
1. npm install [to install the all packages]!
2. npm run start [to start direct the compiled version]
3. npm run test [that will start jasmine tests]
4. npm run build [to compile typescript]
5. npm run devstart [that uses nodemon for listen for updates on the ts file and restart the app]
6. npm run devtest [that compile the code first then run the test]
7. npm run lint [for use lint]
8. npm run prettier [for use prettier]


# endpoints

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
   - This endpoint uses 5 logically ordered middleware as a chain, which includes request validation and image processing (must be called in the same order described)
   - 1: First check the required parameters and return the error for all the missing parameters at once
   - 2: second validate type of each parameter and return error for all invalid type and mention right type. also validate optional parameters
   - 3: The third middleware first checks if the file is cached in the thumb folder if so it sets locals.cached to true
   - 4: The fourth middleware it first checks if the locals.cached is set to true and proceeds to the callback otherwise it will handle a new processing request, it confirms that the file name is in a full folder and if the file does not exist, it returns a 404 error and terminates the operations and request.
   - 
   - 5: Last middleware: This is the last middleware that uses sharps to process the image, skips the request if the image is cached, and uses the same file naming order used in the cached file validation step (both will result in the same file name)
   - finally is the callback for the root and it consider error less function never request will come to it with error or missing data, and it check if file cached it display the cached file using the path set in third middleware, incase this is new request which detected in last middleware it will respond with the new created file  
   
  # Author:
  Mahmoud Hegazy
  
  # Project For
  udacity.com
