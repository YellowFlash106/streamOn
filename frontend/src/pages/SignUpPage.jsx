import React, { useState } from 'react'
import { ApertureIcon } from 'lucide-react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import useSignup from '../hooks/useSignup.js'


const SignUpPage = () => {
  
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  // this is without hooks
  // const queryClient = useQueryClient();
  // const { mutate : signupMutation, isPending, error } =useMutation({
  //   mutationFn: signup,
  //   onSuccess: () =>{ queryClient.invalidateQueries({queryKey : ["authUser"]}),
  //   navigate("/");}
  // });

  const {isPending, error,signupMutation } = useSignup(); 

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  }
  
  return (
    <>
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 ' data-theme="forest">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full
       max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        
        {/* SIGNUP FROM - LEFT SIDE*/}

        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
        {/*LOGO */}
        <div className='mb-4 flex items-center justify-start gap-2'>
          <ApertureIcon className='size-9 text-primary' />
          {/* <ShipWheelIcon className='size-9 text-primary' /> */}
          <span className='text-3xl font-bold font-mono bg-clip-text text-transparent 
          bg-gradient-to-r from-primary to-secondary tracking-wider '>
            StreamOn
          </span>
        </div>

        {/* Error message if any */}
        { error &&(
          <div className='alert alert-error mb-4'>
            <span>{error?.response?.data?.message}</span>
          </div>
        ) }

        <div className='w-full'>
          <form onSubmit={handleSignup}>
            <div className='space-y-4'>
            <div>
            <h2 className='text-xl font-semibold'>Create an Account</h2>
            <p className='text-sm opacity-70'>Join and start your language learning adventure!</p>
            </div>

            {/*Name */}
            <div className='space-y-3'>
              <div className='form-control w-full'>
              <label className='label'>
              <span className='label-text'>Full Name</span>
              </label>

              <input type="text"
              placeholder='John Snow'
              className='input input-bordered w-full'
              value={signupData.fullName}
              required
              onChange={(e) => setSignupData({...signupData, fullName : e.target.value})}
               />
              </div>

              {/*Email */}
              <div className='form-control w-full'>
              <label className='label'>
              <span className='label-text'>Email</span>
              </label>

              <input type="email"
              placeholder='johnsnow@gmail.com'
              className='input input-bordered w-full'
              value={signupData.email}
              required
              onChange={(e) => setSignupData({...signupData, email: e.target.value})}
               />
              </div>

              {/*Password */}
              <div className='form-control w-full'>
              <label className='label'>
              <span className='label-text'>Password</span>
              </label>

              <input type="password"
              placeholder='********'
              className='input input-bordered w-full'
              value={signupData.password}
              required
              onChange={(e) => setSignupData({...signupData, password: e.target.value})}
               />
               <p>Password must be atleast 6 characters long</p>
              </div>

              {/* terms and conditions */}
              <div className='form-control'>
              <label className='label cursor-pointer justify-start gap-2'>
              <input type='checkbox' className="checkbox checkbox-sm" required />
              <span className='text-xs leading-tight'>
                I agree to that{" "}
                <span className='text-primary hover:underline'>terms of service </span> 
                and{" "}
                <span className='text-primary hover:underline'>privacy policy</span>
              </span>
              </label>
              </div>

            </div>

            <button className='btn btn-primary w-full' type='submit'>
            { isPending ?
            (
              <>
              <span className='loading loading-spinner loading-xs'>
                Loading...
              </span>
              </>
            ) : ( "Create Account" )
            }
            </button>


            <div className='text-center mt-4'>
            <p className='text-sm'>
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
              Sign in
              </Link>
            </p>
            </div>

            </div>
          </form>
        </div>
        </div>

        {/* SIGNUP FROM - RIGHT SIDE*/}
        
        <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
        <div className='max-w-md p-8'>
          {/* Illustration */}
          <div className='relative aspect-square max-w-sm mx-auto'>
          <img src="/video-call-amico.png" alt="Language connection illustration"
           className='w-full h-full' />
          </div>

          <div className='text-center space-y-3 mt-6'>
            <h2 className='text-xl font-semibold'>Connect with Language partner worldwide</h2>
            <p className='opacity-70'>Practice conversation, make friends and imporve your language skills together</p>
          </div>

        </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default SignUpPage