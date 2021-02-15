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
    value
  } = props

  return (
    <div>
      <div>
        <form>
          <label htmlFor="currentValue">Current Value</label>
          <input
            name="currentValue"
            type="number"
            value={currentValue}
            readOnly
          />
          <label htmlFor="updatedValue">Updated Value</label>
          <input
            name="updatedValue"
            type="number"
            value={updatedValue}
            readOnly
          />
        </form>
      </div>

      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="date">Date</label>
        <input name="date" type="date" value={date} onChange={handleChange} />
        <label htmlFor="value">Value</label>
        <input
          name="value"
          type="number"
          value={value}
          placeholder="Place in %"
          onChange={handleChange}
        />
        <Button type="submit" variant="outline-success">
          Submit
        </Button>
      </form>

      <Button onClick={calculate} type="button" variant="outline-primary">
        Calculate
      </Button>
    </div>
  )
}
