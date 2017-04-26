let settings = {
  NODE_ENV: '"deploy"',
  API_HOST: '"YOUR_API_HOST"',
  PHOTO_HOST: '""',
  PICTURES_CDN: '"/"'
}
if (process.env.NODE_ENV === 'production') {
  settings = {
    NODE_ENV: '"production"',
    API_HOST: '"YOUR_API_HOST"',
    PHOTO_HOST: '""',
    PICTURES_CDN: '"/"'
  }
}

module.exports = settings
