import { useState, useEffect } from 'react'
import { BAUET_SCOPE_AUTHENTICATION,BAUET_SCOPE_STORAGE,BAUET_SCOPE_FIRESTORE} from '../firebase/config'



import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password,displayName, thumbnail,keyGen,id) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await BAUET_SCOPE_AUTHENTICATION.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }
      //upload user profile picture
      const BAUET_SCOPE_UPLOAD_PATH = `bauetprofileiamges /${res.user.uid}/${thumbnail.name}`
      const img = await BAUET_SCOPE_STORAGE.ref(BAUET_SCOPE_UPLOAD_PATH).put(thumbnail)
      const imgUrl = await img.ref.getDownloadURL()

      // add display name to user
      await res.user.updateProfile({ displayName,photoURL:imgUrl })


      //creating  user information in firestore
       await BAUET_SCOPE_FIRESTORE.collection('scope_users').doc(res.user.uid).set({
         online: true,
         displayName,
         keyGen,
         id,
         photoURL:imgUrl
       })
     
      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}