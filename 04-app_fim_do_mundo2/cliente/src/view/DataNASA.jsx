import React from 'react'
import PropTypes from 'prop-types'

class DataNASA extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: ''
    }
    this.altereData = this.altereData.bind(this)
  }

  altereData (ev) {
    const data = ev.target.value
    this.setState({ data })
    if (this.valideData(data)) {
      this.props.onDataValida(data)
    } else {
      this.props.onDataInvalida()
    }
  }

  valideData (data) {
    const campos = data.split('-')
    if (campos.length !== 3) {
      return false
    }
    if (campos[0].length !== 4 ||
          campos[1].length !== 2 ||
          campos[2].length !== 2) {
      return false
    }

    if (isNaN(parseInt(campos[0], 10)) ||
          parseInt(campos[0], 10) < 1970 ||
          isNaN(parseInt(campos[1], 10)) ||
          isNaN(parseInt(campos[2], 10))) {
      return false
    }

    return !isNaN(Date.parse(data))
  }

  render () {
    return (
      <input className='input'
        type='text'
        title='Exemplo: 2018-11-27'
        placeholder='AAAA-MM-DD'
        value={this.state.data}
        onChange={this.altereData}/>
    )
  }
}

DataNASA.propTypes = {
  onDataValida: PropTypes.func.isRequired,
  onDataInvalida: PropTypes.func.isRequired
}

export default DataNASA
