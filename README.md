# Pick-A-Fit

A full stack JavaScript solo project to help fashion enthusiasts pick outfits from their wardrobe.

I built this application because I wanted a tool to help me create color coordinated outfits. I wanted to be able to easily access all my clothes as well as visualize my outfits without physically digging through my closet and having to fold everything again.

## Live Demo 
Try the application live at https://pick-a-fit.herokuapp.com/#

## Technologies
  * React.js 
  * Webpack
  * Node.js
  * PostgreSQL
  * Multer S3
  * Bootstrap 5
  * Reactstrap
  * JavaScript
  * HTML5
  * CSS3
  * Heroku

## Features
  * User can login
  * User can upload images of their clothing articles 
  * User can set a clothing article's primary and secondary colors
  * User can view their clothing articles in their inventory
  * User can filter their inventory by article type
  * User can delete clothing articles from their inventory
  * User can view their clothing articles matching a selected color
  * User can save an outfit
  * User can view their outfits

## Preview


https://user-images.githubusercontent.com/87718271/142543953-02ebbe4e-73db-497e-8f78-45e09fa58914.mov



https://user-images.githubusercontent.com/87718271/142544079-dd731d54-71d4-4f8d-9bbf-67946e1ed783.mov


## Stretch Features
  * User can add an accompanying picture of themselves wearing the outfit

## Development

### System Requirements
- Node.js 10 or higher
- NPM 6 or higher

### Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/aar-woo/final-project
    cd final-project
    ```
2.  Install all dependencies with NPM.
    ```shell
    npm install
    ```
3. Create an S3 bucket in the AWS console
    - [S3 home screen](https://console.aws.amazon.com/s3/home)
 
4. Copy the .env.example into .env with your own AWS credentials and database url
    ```shell
    cp .env.example .env
    ```
5. Create a new database with PostgreSQL
    ```shell
    createdb databaseName
    ```
6. Import the example database to PostgreSQL 
    ```shell
    npm run db:import
    ```
7. Database can be viewed with `pgweb` GUI tool at `http://localhost:8081`
    ```shell
    pgweb --db=databaseName
    ```
8. Build main.js script with NPM.
    ```shell
    npm run build
    ```  
9. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.
    ```shell
    npm run dev
    ```
