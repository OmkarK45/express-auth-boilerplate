/**
 * What does this do ?? Express app will only allow requests from
 * the origins mentioned in this array. in production, remove localhost and
 * replace it with domain where ur frontend is defined
 *
 * */
const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
  credentials: true,
}
module.exports = corsOptions
