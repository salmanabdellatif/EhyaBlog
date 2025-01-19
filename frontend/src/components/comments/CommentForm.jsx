import React, { useState } from 'react'

const CommentForm = ({
  btnLabel,
  formSubmitHandler,
  formCancelHandler = null,
  initialText = '',
}) => {
  const [value, setValue] = useState(initialText)

  const submitHandler = e => {
    e.preventDefault()
    formSubmitHandler(value)
    setValue('')
  }
  return (
    <form onSubmit={submitHandler}>
      <div className='flex flex-col items-end border border-primary rounded-lg p-5'>
        <textarea
          rows='5'
          className='w-full focus:outline-none bg-transparent'
          placeholder='Leave your comment here...'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <div className='flex gap-y-2 flex-col-reverse gap-x-2 items-center pt-2 min-[420px]:flex-row'>
          {formCancelHandler && (
            <button
              className='px-6 py-2.5 text-red-500 border border-red-500 rounded-lg font-semibold w-24'
              onClick={formCancelHandler}>
              Cancel
            </button>
          )}
          <button
            type='submit'
            className='px-6 py-2.5 bg-primary text-white rounded-lg font-semibold w-24'>
            {btnLabel}
          </button>
        </div>
      </div>
    </form>
  )
}

export default CommentForm
