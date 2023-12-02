import useSWR from 'swr';
import { fetcher } from './fetcher';

interface Config {
  globalgiving_api_key: string;
}

const useConfig = (options = {}) => {
  const config = Object.assign({ suspense: true, revalidateOnFocus: false }, options);
  const { data } = useSWR('/config.json', fetcher, config);

  return data as Config;
};

export default useConfig;
