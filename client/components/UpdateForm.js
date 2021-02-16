import React from 'react'
import {Button} from 'react-bootstrap'

export function UpdateForm(props) {
  const {
    handleChange,
    handleSubmit,
    currentValue,
    updatedValue,
    date,
    calculate,
    value,
    cancel
  } = props

  return (
    <div>
      <form className="form-container">
        <div>
          <label htmlFor="currentValue">Current Value</label>
          <input
            name="currentValue"
            type="number"
            value={currentValue}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="updatedValue">Updated Value</label>
          <input
            name="updatedValue"
            type="number"
            value={updatedValue}
            readOnly
          />
        </div>
      </form>
      <form onSubmit={e => handleSubmit(e)}>
        <div className="form-container">
          <div>
            <label htmlFor="date">Date</label>
            <input
              name="date"
              type="date"
              value={date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="value">Value</label>
            <input
              name="value"
              type="number"
              value={value}
              placeholder="Place in %"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-container">
          <div>
            <Button onClick={cancel} type="button" variant="outline-danger">
              Cancel
            </Button>
          </div>
          <div>
            <Button onClick={calculate} type="button" variant="outline-primary">
              Calculate
            </Button>
          </div>
          <div>
            <Button type="submit" variant="outline-success">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
