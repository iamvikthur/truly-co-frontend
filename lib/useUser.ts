import useSWR from 'swr';
import { fetcher } from './fetcher';
import { UserProfile } from './models';

const useUser = (options = {}) => {
  const config = Object.assign({ suspense: true }, options);
  const { data: user, mutate: mutateUser } = useSWR(`/api/my-profile`, fetcher, config);

  return { user, mutateUser } as { user: UserProfile | undefined; mutateUser: typeof mutateUser };
};

export default useUser;
