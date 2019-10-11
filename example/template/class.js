{{#if flow}}
// @flow
import React, { PureComponent, type Node } from 'react'
{{else }}
import React, { PureComponent } from 'react'
{{/if}}
{{#if radium}}
import Radium from 'radium'
import styles from './styles'
{{/if}}

{{#if flow}}
type Props = {
  children: Node,
}

type State = {}
{{/if}}

class {{ name }} extends PureComponent{{#if flow}}<Props, State>{{/if}} {
  defaultProps = {

  }
  state = {

  }
  render() {
    const { children } = this.props
    return (
      <React.Fragment>
        { children }
      </React.Fragment>
    )
  }
}

{{#if radium}}
export default Radium({{ name }})
{{else}}
export default {{ name }}
{{/if}}
