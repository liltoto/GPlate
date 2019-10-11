import React from 'react'
import { storiesOf } from '@storybook/react'
import Hello from './'

const stories = storiesOf('GPlated/Hello', module)
stories
	.add('Example of <Hello />', () => (
		<Hello />
	))
