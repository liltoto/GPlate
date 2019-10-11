// @flow
import React, { type Node } from 'react'
import Radium from 'radium'
import styles from './styles'

type Props = {
  children: Node,
}

const Hello = ({ children }: Props) => (
  <React.Fragment>
    { children }
  </React.Fragment>
)

export default Radium(Hello)
