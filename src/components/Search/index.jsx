import React from 'react'
import styles from './Search.module.scss'
import debounce from 'lodash.debounce'

const Search = ({ setSearchValue }) => {
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef()

  // makes delay before sending a request to server
  const updateSearchValue = React.useCallback(
    debounce(str => {
      setSearchValue(str)
    }, 250),
    []
  )

  const onChangeInput = e => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  // clears&focuses on ininput on cross click
  const onClickClear = () => {
    setSearchValue('')
    setValue('')
    inputRef.current.focus()
  }

  return (
    <div className={styles.search}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.root}
        placeholder='Пошук піци...'
      />
      {value && <span onClick={onClickClear}>x</span>}
    </div>
  )
}

export default Search
