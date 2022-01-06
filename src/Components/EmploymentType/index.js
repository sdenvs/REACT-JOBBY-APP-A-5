const EmploymentType = props => {
  const {eachItem, employmentTypeFun} = props
  return (
    <li className="">
      <input
        onChange={employmentTypeFun}
        type="Checkbox"
        id={eachItem.employmentTypeId}
        value={eachItem.employmentTypeId}
      />
      <label htmlFor={eachItem.employmentTypeId} className="label">
        {eachItem.label}
      </label>
    </li>
  )
}

export default EmploymentType
