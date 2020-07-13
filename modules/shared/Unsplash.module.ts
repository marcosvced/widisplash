import Unsplash, { toJson } from 'unsplash-js'
import PhotoModule from '~/modules/atoms/Photo.module'
import { DEFAULT_SEARCH } from '~/constants/Photo.const'

export default class UnsplashModule {
  private _unsplash: Unsplash;

  constructor (accessKey: string) {
    this._unsplash = new Unsplash({ accessKey })
  }

  public search (args: any = DEFAULT_SEARCH): Promise<PhotoModule[]> {
    return new Promise((resolve) => {
      this._unsplash.search.photos(args, 1, 15, { orientation: 'landscape' })
        .then(toJson)
        .then((response: any) => {
          if (response) {
            resolve(this._getPhotoList(response.results))
          }
        })
    })
  }

  private _getPhotoList (raw: any[]): PhotoModule[] {
    return raw.map((item) => {
      return UnsplashModule._getPhoto(item)
    })
  }

  private static _getPhoto (raw: any): PhotoModule {
    return {
      id: raw.id,
      name: raw.user.name,
      abstract: raw.alt_description,
      url: raw.urls.regular
    }
  }
}
