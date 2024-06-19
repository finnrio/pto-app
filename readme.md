# Development

Yarn
expo cli

# Testing

concurrency set to 1 so firebase integration tests with emulators do not conflict

## Firebase emulators

Setup firebase emulators:

`firebase emulators:start`

or you can start just one of the emulators:

`firebase emulators:start --only auth --log-verbosity DEBUG`
