import { RotatingLines } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div>
      <RotatingLines
        visible={true}
        height="60"
        width="60"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}