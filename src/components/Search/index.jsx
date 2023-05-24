import React from 'react'
import styles from './Search.module.scss'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/filter/slice'

const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef()
  // makes delay before sending a request to server
  const updateSearchValue = React.useCallback(
    debounce(str => {
      dispatch(setSearchValue(str))
    }, 250),
    []
  )

  // clears&focuses on ininput on cross click
  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current.focus()
  }

  const onChangeInput = e => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
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
