const SalaryRange = props => {
  const {eachItem} = props
  return (
    <li className="">
      <input
        name="salary"
        type="radio"
        value={eachItem.salaryRangeId}
        id={eachItem.salaryRangeId}
      />
      <label htmlFor={eachItem.salaryRangeId} className="label">
        {eachItem.label}
      </label>
    </li>
  )
}

export default SalaryRange
