import login_img from '../assets/login-img.svg'
import Input from '../components/Input'
import Button from '../components/Button'
import toast from 'react-hot-toast';
import validator from 'validator';
import email_icon from '../assets/mail.svg'
import password_icon from '../assets/password.png'
import { useState } from 'react'
import axios from 'axios'
import { useAppStateContext } from '../context/AppStateContext';
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  const { dispatch } = useAppStateContext()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [formValid, setFormValid] = useState({})

  const formDataHandler = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setFormValid(prev => ({
      ...prev,
      [e.target.name]: undefined
    }))
  }

  const submit = async (e) => {
    e.preventDefault()

    try {

      setFormValid({
        email: formData.email.trim() !== '',
        password: formData.password.trim() !== ''
      })

      if (formData.email.trim() === '' || formData.password.trim() === '') {
        return toast.error('All fields are required!');
      }

      setFormValid(prev => ({
        ...prev,
        email: validator.isEmail(formData.email)
      }))

      if (!(validator.isEmail(formData.email))) {
        return toast.error('Invalid email!');
      }

      setLoading(true)

      let response = await axios.get(`http://frontend.test.mwanga.ng/api/v1/login?email=${formData.email}&password=${formData.password}`)

      console.log(response)

      dispatch({ type: "SET_USER", payload: response.data })

      toast.success("Login success");

      setLoading(false)

      navigate('/')

    } catch (err) {

      setLoading(false)

      setFormValid({
        email: false,
        password: false
      })

      if(err?.response?.data){
        toast.error(err?.response?.data);
      } else if (err.code === "ERR_NETWORK"){
        toast.error(err.message);
      }
      else{
        toast.error("Something went wrong!");
      }

      console.log(err)
    }

  }

  return (
    <main className='py-[5rem] px-4 md:px-6'>
      <div className='w-full max-w-[1100px] mx-auto grid grid-cols-2 gap-x-10'>
        <section>
          <div>
            <h1 className='font-semibold text-[50px] mb-5 tracking-tighter'>Sign in to</h1>
            <h2 className='font-semibold text-[32px] tracking-tight'>
              your account with
              <span className='text-primary'> Agent</span> Express
            </h2>
          </div>
          <div>
            <img src={login_img} alt="Sign into your account with Agent Express" />
          </div>
        </section>
        <section>
          <form onSubmit={submit} className='pt-[50px] flex flex-col gap-y-10 pt-20'>
            <fieldset className='flex items-center'>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={formDataHandler}
                leading={email_icon}
                placeholder="Email address"
                valid={formValid?.email}
              />
            </fieldset>
            <fieldset className='flex items-center gap-x-3'>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={formDataHandler}
                leading={password_icon}
                placeholder="Password"
                valid={formValid?.password}
              />
            </fieldset>
            <fieldset>
              <Button loading={loading}>Sign in</Button>
            </fieldset>
          </form>
        </section>
      </div>
    </main>
  )
}

export default Login
