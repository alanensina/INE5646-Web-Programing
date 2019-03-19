import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import TabsPesquisa from './TabsPesquisa.jsx'

const Pesquisa = (props) => 
  (
    <Paper>
      <Card>
        <CardHeader title='Pesquisar Livro'/>
        <CardContent>
          <TabsPesquisa onCancele={props.onCancele}/>
        </CardContent>
      </Card>
    </Paper>
  )

Pesquisa.propTypes = {
  onCancele: PropTypes.func.isRequired
}

export default Pesquisa
