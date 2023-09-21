# setup-archipelo

This action sets up the archipelo command line for use in GitHub Actions.

## Usage

See [action.yml](action.yml)

### Basic

```yaml
steps:
  - uses: actions/checkout@v3
  - uses: archipelo/setup-archipelo@v1
    with:
      version: 1.0.0 # if required, specified the verion of the CLI to install
  - run: archipelo version # now you can use archipelo in your job steps
```

## Development

1. Install the project
   `npm install`
1. Edit the code
1. Package the new code
   `npm run all`
1. Push your code to a feature branch for review
