
# E-Commerce-NFT-Website
A dynamic e-commerce platform inspired by the NFT trend. Crafted using JavaScript, PostgreSQL, and React.js. Our platform offers user-friendly registration, curated product recommendations, efficient cart management, and secure payment processing.


# Overview

For this project, our team, as part of the CS180 Intro to Software Engineering course at the University of California, Riverside, decided to create a full-stack E-commerce web application that allows users to purchase NFTs. Our user interface will have a similar design as those of other companies. Users will be able to sign in to their unqiue account and make purchases. The web application will also allow users to be able to view their purchase history and view the items in their cart. Payment information will also be handled so that payments can be made successfully. 

## Languages

The primary languages we used in this project are JavaScript, PostgreSQL, HTML, and CSS. All of our files are sent to and retrieved from the Amazon Web Service in a JSON format. PostgreSQL is used in order to query specific information regarding a user, a product, and any other relevant entities. HTML and CSS are primarily used as tools to develop the website that is used as our user interface.

## Project Features

### Sign In

A new customer can choose to register for an account or simply continue as a Guest on our website. Customers who already have an account can sign in easily.

### Home Page

Once a customer loads our web application, a Home page will be loaded and displayed. The Home page contains various features such as a Sign In link, a Cart Icon, and a Shop link. This Home page allows customers to also be able to view recommended NFTs as well as new arrivals.

<img width="740" alt="Screenshot 2023-06-01 at 10 24 39 PM" src="https://github.com/CS180-spring/cs180-22-theboys/assets/72373261/682efab3-dae9-4c49-a329-dc37226ad55b">


It also contains an About Us page as well as a Contact information.


<img width="740" alt="Screenshot 2023-06-01 at 10 25 11 PM" src="https://github.com/CS180-spring/cs180-22-theboys/assets/72373261/2c24ecfd-936b-4bfc-ba3a-3adb4b3621e0">

### View NFTs

A customer is able to view all of the NFTs that are currently being offered in two areas of the web application. The first area involves a carousel that can be seen on the Home page. This carousel has a select amount of NFTs that are taken from our inventory based on previously purchased NFTs. 

<img width="1177" alt="Screenshot 2023-06-01 at 9 46 48 PM" src="https://github.com/CS180-spring/cs180-22-theboys/assets/72373261/939abc98-a0f0-4de0-8772-543122637270">


The second area involves a Shop section that can be found at the top of our Home page. On this page, a customer can view all of the NFTs that are available for purchase. The customer can also click on individual NFTs to view its unique details.


<img width="668" alt="Screenshot 2023-06-01 at 10 26 05 PM" src="https://github.com/CS180-spring/cs180-22-theboys/assets/72373261/9754e855-4fb3-445e-aa4e-7f7e5f199d87">


### View Cart

A customer can view their cart at any time. They simply need to click on the Cart that can be found in the top right corner of the website. Here, the customer can see all the NFTs that are currently in their cart.

<img width="1183" alt="Screenshot 2023-06-02 at 6 06 05 PM" src="https://github.com/CS180-spring/cs180-22-theboys/assets/72373261/8f6adb9d-0946-49cc-a256-a58f5a81c2d6">


### Make Purchases

Once a customer views their cart and is satisfied, they can make a purchase. Our website is able to process payment information efficently and securely. Once a transaction is made, a unique Order ID will be generated for the customer's convenience.



## Available Scripts

For this project, we utilized React.js for our front-end development. In order to start our web application,you can run:

### `npm start`

This command runs the app in development mode.\
You can open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make any changes.\
You may also see any lint errors in the console.

### `npm test`

This command launches the test runner in the interactive watch mode.\

### `npm run build`

This command builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
After this instruction, our web application is ready to be deployed.
