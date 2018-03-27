import React from 'react';

const AddRsv = props => {
  const { tablesList } = props;
  const tables = tablesList.map(table => {
    return (
      <option value="" key={table.id}>{table.name}</option>
    )
  })

  return (
    <div className="rsv-form">
      <label htmlFor="start">
        Start time:
        <input type="text" name="start" placeholder="16" />
      </label>
      <label htmlFor="end">
        End time:
        <input type="text" name="end" placeholder="17" />
      </label>
      <label htmlFor="table">
        Table:
        <select name="" id="">
          {tables}
        </select>
      </label>
      <button>Add Reservation</button>
    </div>
  )
}

export default AddRsv;
