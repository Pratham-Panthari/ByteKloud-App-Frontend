import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Signup from '../../assets/signup.png'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)
  const [loader, setLoader] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      const res = await axios.post('https://bytekloudserver.onrender.com/api/v1/auth/login', { email, password })
      if(res.data.status){
        
        setAuth({
          ...auth,
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          age: res.data.age,
          profession: res.data.profession,
          gender: res.data.gender,
          token: res.data.token,
        })
        localStorage.setItem('auth', JSON.stringify(res.data))
        setLoader(false)
        navigate('/home')
        
      }
    } catch (error) {
      
      setShowError(true)
      setError(error.response.data.message)
      setLoader(false)
      
  }
  }
  return (
    <>
    {
        loader ? 
        (
          <>
            <div className='w-full h-screen flex justify-center items-center'>
              <div role="status">
                  <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="sr-only">Loading...</span>
              </div>
            </div>
          </>
        ) :
        (
          <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Link to='/'>
                  <img className='w-auto h-24 mx-auto object-cover' src={Signup} alt='Logo' />    
                </Link>
              
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST" onSubmit={(e) => {handleLogin(e)}}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value) }}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      autoComplete="current-password"
                      onChange={(e) => { setPassword(e.target.value) }}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {
                  showError && (<div className='mt-2 py-2 w-full'>
                    <h1 className='text-md font-bold text-red-600 text-center'>{error}</h1>
                  </div>)
                }

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Register
                </Link>
              </p>
            </div>
          </div> 
          </>
        )

      }
    </>
  )
}

export default Login
