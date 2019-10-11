import React from 'react'
import { storiesOf } from '@storybook/react'
import {{name}} from './'

const stories = storiesOf('GPlated/{{name}}', module)
stories
	.add('Example of <{{name}} />', () => (
		<{{name}} />
	))
