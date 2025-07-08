import error from '../../assets/img/not ready.png'

function NotReady() {
  return (
    <div className="flex justify-center h-[100dvh] items-center gap-7 flex-col p-4">
        <img src={error} alt="Not Ready img" className='h-80 w-80'/>
        <p className='notready-text'>We apologize, but our site hasn't been optimized for your device yet; we're working to fix this soon!</p>
    </div>
  )
}

export default NotReady