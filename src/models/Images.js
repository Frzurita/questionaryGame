import { photosHost as _photosHost, picturesCDN as _picturesCDN } from 'api/config'

export const photosHost = _photosHost
export const picturesCDN = _picturesCDN
export const buildSmartUrl = (urlId, origin, params) => {
  if (origin === 'cloudinary') {
    return _photosHost + params + '/' + urlId
  } else if (origin === 'photoBucket') {
    return urlId
  } else {
    return _picturesCDN + urlId
  }
}
