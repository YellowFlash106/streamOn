import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {  useEffect, useState } from 'react';
import { getOutgoingFriendRqst, 
         getRecommendedUsers, 
         getUserFriends, 
         sendFriendRqst 
        } from '../lib/api';
import { Link } from 'react-router';
import { CheckCircleIcon, MapPinnedIcon, UserPlusIcon, UsersIcon } from 'lucide-react';
import FriendCard, { getLanguageFlag } from '../components/FriendCard';
import NoFriendsFound from '../components/NoFriendsFound';
import { capitialize } from '../lib/utils';

const HomePage = () => {

  const queryClient = useQueryClient();
  const [outgoingRqstIds, setOutgoingRqstIds] = useState( new Set());

  const {data: friends=[], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  })

  const {data: recommendedUsers=[], isLoading:loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  })

  const { data:outgoingFriendRqst } = useQuery({
    queryKey: ["outgoingFriendRqst"],
    queryFn: getOutgoingFriendRqst,
  })

  const {mutate: sendRqstMutation, isPending } =  useMutation({
    mutationFn: sendFriendRqst,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendRqst"] })
  });

  useEffect(() => {
    const outgoingIds = new Set()
    if(outgoingFriendRqst && outgoingFriendRqst.length > 0){
      outgoingFriendRqst.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      })
      setOutgoingRqstIds(outgoingIds)
    }
  }, [outgoingFriendRqst])
  
  return (
    <>
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto space-y-10'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Your Friends</h2>
        <Link to="/notifications" className="btn btn-outline btn-sm">
        <UsersIcon className="mr-2 size-4" />
        Friend Requests
        </Link>
      </div>
      {
        loadingFriends ?  (
          <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg'/>
          </div>
        ) : friends.length === 0 ?  (
          <NoFriendsFound/>
         ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            { friends.map((friend) =>(
            <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
         )}

         <section>
          <div className='mb-6 sm:mb-8'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <div>
              <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Meet new Learners</h2>
              <p className='opacity-70'>
                Discover perfect language exchange partners based on your profile 
              </p>
            </div>
            </div>
          </div>
         </section>

         { loadingUsers ? (
           <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg'/>
          </div>
         ) : recommendedUsers.length === 0 ? (
          <div className='card bg-base-200 p-6 text-center'>
            <h3 className='font-semibold text-lg mb-2'>No recommendations available</h3>
            <p className='text-base-content opacity-70'>
              Check back later for new language partners!
            </p>
          </div>
         ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
         { 
          recommendedUsers.map((user) => {    
            const hasRqstBeenSent = outgoingRqstIds.has(user._id);
            return (
              <>
              <div key={user._id}
              className='card bg-base-200 hover:shadow-lg transition-all duration-300' 
              >
              <div className='card-body p-5 space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='avatar size-16 rounded-full'>
                  <img src={user.profilePic} alt={user.fullName} />
                </div>

                <div >
                  <h3 className='font-semibold text-lg'>{user.fullName}</h3>
                  { user.location && (
                    <div className='flex items-center text-xs opacity-70'>
                      <MapPinnedIcon className='size-3 mr-1' />
                      {user.location}
                    </div>
                  )}
                </div>
                </div>

                {/* Language with flags */}
                <div className="flex flex-wrap gap-1.5">
                 <span className="badge badge-secondary ">
                    { getLanguageFlag(user.nativeLanguage)}
                    Native: {capitialize(user.nativeLanguage)}
                 </span>
                 <span className="badge badge-secondary text-xs">
                    { getLanguageFlag(user.learningLanguage)}
                    Learning: {capitialize(user.learningLanguage)}
                 </span>
                </div>

                { user.bio && <p className='text-sm opacity-70'>{user.bio}</p>}

                {/* Action buuton */}
                <button
                        className={`btn w-full mt-2 ${
                          hasRqstBeenSent ? "btn-disabled" : "btn-primary"
                        } `}
                        onClick={() => sendRqstMutation(user._id)}
                        disabled={hasRqstBeenSent || isPending}
                      >
                        {hasRqstBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>

              </div>
              </div>
              </>
            )
          })}
        </div>
      )}
 
      </div>
    </div>
    </>
  )
}

export default HomePage;
