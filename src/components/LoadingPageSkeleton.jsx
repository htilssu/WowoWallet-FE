import {ClipLoader} from 'react-spinners';

const LoadingPageSkeleton = () => {

  return (
      <div
          className={'absolute right-0 top-0 h-screen w-screen flex justify-center items-center'}
      >
        <ClipLoader
            color={'blue'}
            loading={true}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
      </div>
  );
};

export default LoadingPageSkeleton;