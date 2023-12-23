import {React, useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Signup from '../../assets/signup.png'
import { useAuth } from '../context/AuthContext'

const Home = () => {

  const [auth, setAuth] = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [profession, setProfession] = useState('')
  const [gender, setGender] = useState('')
  const [showError, setShowError] = useState(false)
  const [loader, setLoader] = useState(false)

  const getUser = async () => {
    setLoader(true)
    try {
      const res = await axios.get(`https://bytekloudserver.onrender.com/api/v1/auth/getuser/${auth.id}`)
      if(res.data.status){
        setName(res.data.user.name)
        setEmail(res.data.user.email)
        setPassword(res.data.user.password)
        setAge(res.data.user.age)
        setProfession(res.data.user.profession)
        setGender(res.data.user.gender)
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      const res = await axios.put(`https://bytekloudserver.onrender.com/api/v1/auth/update-user/${auth.id}`, { name, email, age, profession, gender })
      if(res.data.status){
        
        getUser()
        setAuth({
          ...auth,
          
          name: res.data.name,
          email: res.data.email,
          age: res.data.age,
          profession: res.data.profession,
          gender: res.data.gender,
          token: res.data.token,
        })
        localStorage.setItem('auth', JSON.stringify(res.data))

        setLoader(false)
      }
    } catch (error) {
      setShowError(true)
      setError(error.response.data.message)
      setLoader(false)
      
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
    {
          loader ? 
          (<>
            <div className='w-full h-screen flex justify-center items-center'>
              <div role="status">
                  <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="sr-only">Loading...</span>
              </div>
            </div>
          </>) :
          (<>
            <section className='w-[80%] mx-auto py-24 lg:flex'>
                
              <div className='w-full px-8 py-6'>
              
                <Link to='/home'>
                  <img className='w-auto h-24 mx-auto object-cover' src={Signup} alt='Logo' />    
                </Link>
                
                <div className='py-4 flex justify-center gap-2'>
                  <h1 className='text-2xl font-bold text-black inline '>User Details</h1>
                </div>
                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={(e) => {handleUpdate(e)}}>
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
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                          Age
                        </label>
                        <div className="mt-2">
                          <input
                            id="age"
                            name="age"
                            type="number"
                            autoComplete="age"
                            value={age}
                            onChange={(e) => { setAge(e.target.value) }}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                    </div>

                    
                    <div className='lg:flex justify-between'>
                        <div>
                          <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                            Gender
                          </label>
                          <div className="mt-2">
                            <select
                              id="gender"
                              name="gender"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                              <option value="">Select Role</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Others</option>
                            </select>
                          </div>
                        </div>
                    
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Profession
                            </label>
                            <div className="mt-2">
                                <input
                                    id="profession"
                                    name="profession"
                                    type="text"
                                    autoComplete="profession"
                                    value={profession}
                                    onChange={(e) => { setProfession(e.target.value) }}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
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
                          Update
                        </button>
                    </div>
                    </form>

                    
                  </div>
                </div>
                
            </section>
          </>)
        }
    </>
  )
}

export default Home
