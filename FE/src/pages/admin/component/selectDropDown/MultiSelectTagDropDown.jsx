import AsyncSelect from 'react-select/async'
function MultiSelectTagDropDown({ defaultValue, loadOptions, onChange }) {
  return (
    <AsyncSelect
      isMulti
      defaultValue={defaultValue}
      loadOptions={loadOptions}
      defaultOptions
      onChange={onChange}
      placeholder="Select categories"
      className="relative z-20"
    />
  )
}

export default MultiSelectTagDropDown
