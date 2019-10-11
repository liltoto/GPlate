{{#if flow}}
// @flow
import React, { type Node } from 'react'
{{else }}
import React from 'react'
{{/if}}
{{#if radium}}
import Radium from 'radium'
import styles from './styles'
{{/if}}

{{#if flow}}
type Props = {
  children: Node,
}
{{/if}}

const {{ name }} = ({ children }{{#if flow}}: Props{{/if}}) => (
  <React.Fragment>
    { children }
  </React.Fragment>
)

{{#if radium}}
export default Radium({{ name }})
{{else}}
export default {{ name }}
{{/if}}
