/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import danger_circle from '../assets/Danger Circle.svg'
import good_circle from '../assets/Good-Check-Circle.svg'

const Input = (props) => {

    const { type, leading, placeholder, value, valid, ...prop } = props

    const [focus, setFocus] = useState(false)
    const [visibility, setVisibility] = useState(false)

    const visibilityHandler = (val) => setVisibility(val)

    const labelRef = useRef()
    const inputRef = useRef()

    useEffect(() => {
        const label = labelRef.current
        const input = inputRef.current

        label.addEventListener("click", () => {
            setFocus(true)
            input.focus()
        })

        input.addEventListener("focusout", () => {

            if (value) {
                setFocus(true)
            } else {
                setFocus(false)
            }

        })

        input.addEventListener("focus", () => {
            setFocus(true)
        })

    }, [value])

    const validate = valid === undefined ? '' : valid ? "border-sl-green" : "border-sl-red"
    const validateIcon = valid === undefined ? null :
        valid ? <img src={good_circle} alt="Eye Icon" className="h-[34px]" /> :
            <img src={danger_circle} alt="Eye Icon" className="h-[34px]" />

    if (type === "password") {
        return (
            <div className={`rounded-[10px] flex-1 border-[1px] border-[#CCCCCC] px-3 flex gap-x-3 h-[60px] sm:h-[65px] items-center ${validate}`}>
                <figure className='h-fit'>
                    <img src={leading} alt="Icon" />
                </figure>
                <div className="relative w-full">
                    <label
                        ref={labelRef}
                        className={`top-0 left-0 text-[#8F9FB7] absolute ${focus ? "sm-auth-placeholder active" : "sm-auth-placeholder"}`}>
                        {placeholder}
                    </label>
                    <input
                        type={visibility ? "text" : type}
                        ref={inputRef}
                        value={value}
                        className={`outline-none text-[#555] w-full ${focus ? "sm-auth-input active" : "sm-auth-placeholder"}`}
                        {...prop}
                    />
                </div>
                <figure>
                    {
                        visibility ?
                            <svg onClick={() => visibilityHandler(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#8F9FB7" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z"
                                />
                            </svg>
                            :
                            <svg onClick={() => visibilityHandler(true)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#8F9FB7" d="M12 7c2.76 0 5 2.24 5 5c0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28l.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22L21 20.73L3.27 3L2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65c0 1.66 1.34 3 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53c-2.76 0-5-2.24-5-5c0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15l.02-.16c0-1.66-1.34-3-3-3l-.17.01z" /></svg>
                    }

                </figure>
                <figure>
                    {
                        validateIcon
                    }
                </figure>
            </div>
        )
    }

    return (
        <div className={`rounded-[10px] w-full border-[1px] items-center border-[#CCCCCC] px-3 flex gap-x-3 h-[60px] sm:h-[65px] ${validate}`}>
            <figure className='h-fit'>
                <img src={leading} alt="Icon" />
            </figure>
            <div className="relative w-full">
                <label
                    ref={labelRef}
                    className={`top-0 left-0 text-[#8F9FB7] absolute ${focus ? "sm-auth-placeholder active" : "sm-auth-placeholder"}`}>
                    {placeholder}
                </label>
                <input
                    type={type}
                    ref={inputRef}
                    value={value}
                    className={`outline-none text-[#555] w-full ${focus ? "sm-auth-input active" : "sm-auth-placeholder"}`}
                    {...prop}
                />
            </div>
            <figure>
                {
                    validateIcon
                }
            </figure>
        </div>
    )
}

export default Input