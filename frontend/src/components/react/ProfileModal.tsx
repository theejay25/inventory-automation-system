import type React from "react";

type prop = {
    classname? : string;
    children?: React.ReactNode
}

function ProfileModal({classname, children} : prop) {
  return (
    <>
        <div className={classname}>
            {children}
        </div>
    </>
  )
}

export default ProfileModal