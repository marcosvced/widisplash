import * as firebase from 'firebase/app'
import PhotoModule from '~/modules/atoms/Photo.module'

export default class FirebaseModule {
  public static async authStateChanged (router: any, store: any) {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => {
          store.commit('user/SET_TOKEN', token)
        })
        store.commit('user/SET_NAME', user.displayName)
        store.commit('user/SET_NAME', user.photoURL)
        router.push({ name: 'home' })
      }
    })
  }

  public static async anonymously () {
    await firebase.auth().signInAnonymously().catch((error) => {
      console.error('Error with code: ', error.code)
      console.error('Error message: ', error.message)
    })
  }

  public static logOut (router: any, store: any) {
    firebase.auth().signOut().then(() => {
      store.dispatch('user/CLEAR')
      router.push({ name: 'index' })
    }).catch((error: any) => {
      console.error('Logout error: ', error)
    })
  }

  public static upload (file: any) {
    const metadata = { contentType: file.type }
    return firebase.storage().ref().child(`img/${new Date().getTime()}-photo`).put(file, metadata)
  }

  public static addPhotoToList (raw:any, url:string, store:any) {
    store.commit('photos/SET_PHOTOS', [FirebaseModule._getPhoto(raw, url)])
  }

  public static firebasePhotos (store: any) {
    return new Promise((resolve) => {
      firebase.storage().ref().child('img').listAll().then((response) => {
        response.items.forEach((item) => {
          item.getDownloadURL().then((url) => {
            FirebaseModule.addPhotoToList(item, url, store)
            resolve(true)
          })
        })
      })
    })
  }

  private static _getPhoto (raw: any, url: string): PhotoModule {
    return {
      id: raw.name,
      name: 'Firebase storage photo',
      abstract: 'This photo was uploaded to firebase and hasn\'t description',
      url
    }
  }
}
