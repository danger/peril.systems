import React from "react"

// Thank you https://github.com/robrichard
// https://github.com/robrichard/relay-context-provider
interface ProviderProps {
  environment: any
  variables: any
}

class RelayProvider extends React.Component<ProviderProps> {
  getChildContext() {
    return {
      relay: {
        environment: this.props.environment,
        variables: this.props.variables,
      },
    }
  }
  render() {
    return this.props.children
  }
}

export default RelayProvider
