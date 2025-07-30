import { ApertureIcon } from 'lucide-react';
import { useState } from 'react'
import { Link } from 'react-router';
import useLogin from '../hooks/useLogin.js';

const LoginPage = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // this is how we did without costum hooks 
  // const queryClient = useQueryClient();
  // const { mutate: loginMutation, isPending ,error  } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey : ["authUser"]}),
  // });

  const {isPending,error, loginMutation} = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
      
  }
  

  return (
   <>
   <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
    <div className='border-primary/25 border flex flex-col lg:flex-row w-full max-w-5xl
     mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
      {/* Login form section */}
      <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
      {/* Logo */}
      <div className='mb-4 flex items-center justify-start gap-2'>
      <ApertureIcon className='size-9 text-primary' />
      <span className='text-3xl font-bold font-mono bg-clip-text text-transparent
       bg-gradient-to-r from-primary to-secondary tracking-wider'>
        StreamOn
        </span> 
      </div>

      {/* Error Massage */}
      {error && (
        <div className='alert alert-error mb-4'>
          <span>{error?.response?.data?.message}</span>
        </div>
      )}

      <div className='w-full'>
        <form onSubmit={handleLogin}>
          <div className='space-y-4'>
          <div>
            <h2 className='text-xl font-semibold'> Welcome Back</h2>
            <p className='text-sm opacity-70'>
              Sign in to your account to continue your language journey
            </p>
          </div>

          <div className='flex flex-col gap-3'>
          <div className='form-control w-full space-y-2'>
          <label className='label'>
          <span className='label-text'>Email</span>
          </label>

          <input type="email"
          placeholder='johnsnow@gmail.com'
          className='input input-bordered w-full'
          value={loginData.email}
          required
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value}) }
           />
          </div>
          <div className='form-control w-full space-y-2'>
          <label className='label'>
          <span className='label-text'>Password</span>
          </label>

          <input type="password"
          placeholder='*********'
          className='input input-bordered w-full'
          value={loginData.password}
          required
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value}) }
           />
          </div>

           <button className='btn btn-primary w-full' disabled={isPending}  type='submit'>
            { isPending ? (
              <>
              <span className='loading loading-spinner loading-xs'>
                Signing in...
              </span>
              </>
            ) : ( "Sign In" )}
            </button>

            <div className='text-center mt-4'>
              <p className='text-sm'>
                Don't have an account?{""}
                <Link to="/signup" className="text-primary hover:underline">
                Create one
                </Link>
              </p>
            </div>
          </div>

          </div>
        </form>
         
      </div>
      </div>

      {/* Image section */}
      <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
      <div className='max-w-md p-8'>
       {/* Illustration */}
       <div className='relative aspect-square max-w-sm mx-auto'>
        <img src="video-call-bro1.png" alt="Language connection illustration" className=' h-full w-full' />
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

export default LoginPage