
type props = {
    children? : React.ReactNode;
    classname?: string
}

function ToastModal({ children, classname} : props) {
  return (
    <>
        <div className={classname}>
            {children}
        </div>
    </>
  )
}

export default ToastModal