# Image Processing API

# What Is that:
this is image processing API created in Node.js and TypeScript can be used to resize your image also to add blur effect or rotate the image.

# how it works
first you place your images inside full directory and visit /api/images and provide parameters for request to make effect on images eg
=======
`/api/images?filename=myimage&width=150&height=150`


# Languages, frameworks and libraries:
1. JavaScript
2. Node.js
3. express
4. sharp
5. Typescript
6. jasmine
7. lint
8. prettier


# working endpoints !!!
/api return status 200 always
/health return response with status 200 always and json object include health boolean to determine the health of all API endpoint after perform some tests 


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
   - this return response Hello From Image-processing-api root endpoint, and always have status 200!
2  **/health endpoint**
   - takes no parameters
   - this return always response with status 200 and this is working endpoint and return health status after make tests on all endpoint of API using node-fetch
   - can used in microservices app to report health of this component and all of it's endpoint with valid test
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
=======
   - finally is the callback for the root and it consider error less function never request will come to it with error or missing data, and it check if file cached it display the cached file using the path set in third middleware, incase this is new request which detected in last middleware it will respond with the new created file  
  # tests:
   Includes 15 tests written in **jasmine** that cover all API endpoints, middleware, and utilities, ensuring that the API works flawlessly and as expected

  ### important note for tests
  keep this image dragon2_80_80_3_12.png in thumb directory this to confirm the method getting the file from thumb is working


=======
  
  ### important note for tests
  keep this image dragon2_80_80_3_12.png in thumb directory this to confirm the method getting the file from thumb is working
  
  # screenshoots:
  ![image](https://user-images.githubusercontent.com/55125302/180635302-da7d1ab0-8e89-428d-8f3f-0a0bc859b868.png)

  ![image](https://user-images.githubusercontent.com/55125302/180635310-5fb8b146-6b82-4dc0-b609-83e546b51569.png)

  ![image](https://user-images.githubusercontent.com/55125302/180635331-77df2b5c-137e-4a2c-9e59-1722fda72738.png)

  ![image](https://user-images.githubusercontent.com/55125302/180635339-55fb455d-2ee6-4281-8d2a-403e2dedf202.png)

  ![image](https://user-images.githubusercontent.com/55125302/180635471-9d253021-5648-48ef-8b59-740fa0410b8a.png)

  # Health Endpoint:
  ![image](https://user-images.githubusercontent.com/55125302/180931354-1c60fe41-e8a4-4df3-84e9-6e9818ae34c1.png)
  
  ![image](https://user-images.githubusercontent.com/55125302/180931287-67741bc8-87b4-4187-86f8-52764b5f2712.png)


=======
  
  # Author:
  Mahmoud Hegazy
  
  # Project For
  udacity.com
