# express-auth-boilerplate

Solid authentication boilerplate using express, jwt with Email Verification (Soon™) and password reset support (Soon™). Based on mongoose and mongoDB

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/OmkarK45/express-auth-boilerplate

# Create environment Variables
# Create a config.env in ./server folder
PORT = 5000
DB_URI_LOCAL = mongodb://localhost:27017/local_db_name
JWT_SECRET=<Random secure string>
JWT_EXPIRE=7d

# Run the following command
$ yarn

# Run the server
$ yarn  dev

# For production
$ yarn prod

# Profit!
```

# Routes information

- all authentication routes are prefixed with
  /api/auth
- Routes are as follows

- POST -> ` /api/auth/login`

  - This expects a JSON body with `{email : demo_email@yahoo.com, password : 'password'}`

- POST -> `/api/auth/register`

  - This expects a JSON body with {
    email, username and password
    }

- POST -> `/api/auth/logout`
  - This expects nothing. It will reset the cookie on the client

# Folder Structure Information

- This app uses MVC (Model-View-Controller) architecture
- All the route definitions are present in `routes` Folder
- All the logic is present in `controller` folder
- All the models are present in `models` folder
- Configure the database connection in `config/db.js` folder

# Features

- ✅ Cookie Authentication
- ✅ Basic validation of email and password.
- ✅ You can swap out validation libs (this uses plain regex. You can use something like JOI or ZOD)
- ✅ Error Handling built in
- ✅ Catch all 404 route
- ✅ Clear and concise HTTP Staus codes along with `success` boolean and `code` for uniform usage

# About Me

- [GitHub](https://github.com/omkark45)
- [LinkedIn](https://linkedin.com/omkar_k45)
- [Instagram](https://instagram.com/omkar_k45)
- [Portfolio](https://omkarkulkarni.netlify.app)

# License

MIT. You are free to do whatever you wish with this code.

# Common Tips for frontend auth

- Persist the user in Context or LocalStorage
- You will not be able to read the `cookie` using `document.cookie` because it is `httpOnly` with expiry date of 7 days from logging in. However you can change this duration in `config.env`

# Thanks !
