# GPlate

It's a tool for generating files and folder structure depending on your setup. See [example](https://github.com/liltoto/GPlate/tree/master/example).
Templates are created with handlebar.

## Important

Create gplate.yaml

```yaml
version: 1
task:
  - flags: -s --stateless
    description: Will generate a stateless React component
    files:
      - input: template/stateless.js
        output: index.js
      - input: template/jest.js
        output: index.test.js
      - input: template/storybook.js
        output: index.stories.js
      - input: template/styles.js
        output: styles.js
        require: radium
    options:
      - radium
      - flow
    default:
      - flow: true
  - flags: -c --class
    description: Will generate a React PureComponent
    files:
      - input: template/class.js
        output: index.js
      - input: template/jest.js
        output: index.test.js
      - input: template/storybook.js
        output: index.stories.js
    options:
      - radium
      - flow
    default:
      - flow: true
      - radium: false
  - flags: -j --jest
    description: Will generate a standard jest file
    files:
      - input: template/jest.js
        output: index.test.js
```

\
Run command `gplate -h` output:

```
Usage: gplate [options]

Options:
  -v --version                  output the version number
  -p, --path <s>                The path of the folder(s) you want to create which contains the files
  -s --stateless [radium,flow]  Will generate a stateless React component (default: [{"flow":true}])
  -c --class [radium,flow]      Will generate a React PureComponent (default: [{"flow":true},{"radium":false}])
  -j --jest                     Will generate a standard jest file
  -h, --help                    output usage information
```

\
Example off command `gplate -p Components/Hello -s radium`
