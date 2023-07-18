/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useAppStateContext } from '../context/AppStateContext';
import axios from 'axios'

const Home = () => {

  const { state } = useAppStateContext()

  // const imageUrl = "http://frontend.test.mwanga.ng" + state.user.displayImage

  let actualAmount = state.user.target.actualAmount
  let pendingAmount = state.user.target.pendingAmount
  let targetAmount = state.user.target.targetAmount

  let actualAmountValue = (actualAmount / targetAmount) * 100
  let pendingAmountValue = (pendingAmount / targetAmount) * 100
  let targetAmountValue = (targetAmount / targetAmount) * 100


  return (
    <main className='p-5 md:p-10 max-w-[1200px] mx-auto'>
      <section className='w-full h-[200px] pattern-bg rounded-t-[20px] p-3 flex'>
        <button className='text-white h-[45px] w-[45px] bg-white rounded-[50%] grid place-items-center ml-auto hover:bg-[#ddd]'>
          <span className="material-icons text-primary">logout</span>
        </button>
      </section>
      <section>
        <figure className='mt-[-40px] p-2 flex items-center gap-x-5'>
          <img src={`data:image/jpeg;base64,${state.user.displayImage}`} className='border-2 h-[150px] w-[150px] object-cover rounded-[50%]' alt={state.user.fullName} />
          <figcaption>
            <h1 className='font-bold text-[18px]'>{state.user.fullName}</h1>
          </figcaption>
        </figure>
      </section>
      <section className='pt-5'>
        <header className='pb-5'>
          <h1 className='font-bold'>User Data</h1>
        </header>
        <li className="skills-item">
          <div className="title-wrapper flex gap-x-2 pb-[1px]">
            <h5 className="h5">Actual Amount</h5>
            <data value={actualAmountValue} className='text-primary'> - {actualAmount}</data>
          </div>
          <div className="skill-progress-bg">
            <div className="skill-progress-fill" style={{ width: `${actualAmountValue}%` }}></div>
          </div>
        </li>
        <li className="skills-item">
          <div className="title-wrapper flex gap-x-2 pb-[1px]">
            <h5 className="h5">Pending Amount</h5>
            <data value={pendingAmountValue} className='text-primary'> - {pendingAmount}</data>
          </div>
          <div className="skill-progress-bg">
            <div className="skill-progress-fill" style={{ width: `${pendingAmountValue}%` }}></div>
          </div>
        </li>
        <li className="skills-item">
          <div className="title-wrapper flex gap-x-2 pb-[1px]">
            <h5 className="h5">Target Amount</h5>
            <data value={targetAmountValue} className='text-primary'> - {state.user.target.targetAmount}</data>
          </div>
          <div className="skill-progress-bg">
            <div className="skill-progress-fill" style={{ width: `${targetAmountValue}%"` }}></div>
          </div>
        </li>
      </section>
      <section className='pt-10'>
        <header className='pb-10'>
          <h1 className='font-bold'>Comments</h1>
        </header>
        <Comments userId={state.user.id} />
      </section>
    </main>
  )
}

export default Home

const Comments = ({ userId }) => {


  const [comments, setComments] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://frontend.test.mwanga.ng/api/v1/comments/${userId}`)
        console.log(response)
        setComments(response.data)
      } catch (err) {
        console.log(err)
      }
    })()

  }, [])

  const submitCommentHandler = async (formData) => {

    try {
      const response = await fetch(`http://localhost:5000/comment/${userId}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()
      console.log(result)
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div>
      <div className='pb-10'>
        <ol className="timeline-list">
          {
            comments && comments.length !== 0
              ?
              comments.map((cm, i) => {
                if (cm.title) {
                  return (
                    <li className="timeline-item bg-[#ccc] p-3 rounded-[10px]" key={i}>
                      <h4 className="h4 timeline-item-title font-semibold">{cm.title}</h4>
                      <p className="timeline-text">
                        {cm.comment}
                      </p>
                    </li>
                  )
                } else {
                  return null
                }
              })
              : null
          }
        </ol>
      </div>
      <CommentInput submit={submitCommentHandler} />
    </div>
  )
}

const CommentInput = ({ submit }) => {

  const [formData, setFormData] = useState({
    title: '',
    comment: ''
  })

  const formDataHandler = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const submitComment = (e) => {
    e.preventDefault()

    submit(formData)
    setFormData({
      title: '',
      comment: ''
    })
  }


  return (
    <form className='flex flex-col gap-y-4'>
      <fieldset>
        <input name="title" type="text" value={formData.title} onChange={formDataHandler} className='w-full mb-4 h-[45px] px-3 outline-primary border-[1px] border-primary rounded-[6px]' placeholder="Enter comment title..." />
        <input name="comment" type="text" value={formData.comment} onChange={formDataHandler} className='w-full h-[45px] px-3 outline-primary border-[1px] border-primary rounded-[6px]' placeholder="Type a comment..." />
      </fieldset>
      <fieldset>
        <button type="submit" onClick={submitComment} className='ml-auto bg-primary px-5 flex items-center gap-x-3 max-w-max h-[45px] text-white border-primary rounded-[6px]'>
          <span className="material-icons"> send </span> Send
        </button>
      </fieldset>
    </form>
  )
}