/* eslint-disable react/prop-types */

import MiniSpinner from "./MiniSpinner"

const Button = (props) => {

    const { children, className, loading, ...prop } = props
  
    return (
      <button 
        disabled={loading} 
        className={`grid place-items-center bg-primary text-white rounded-[10px] h-[60px] w-full ${className}`} {...prop}
      >
        { loading ? <MiniSpinner/> : children }  
      </button>
    )
  }
  
  export default Button