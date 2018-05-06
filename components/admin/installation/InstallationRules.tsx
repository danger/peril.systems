import { createFragmentContainer, graphql } from "react-relay"
// import Link from "next/link"
import { InstallationRules_installation } from "./__generated__/InstallationRules_installation.graphql"

interface Props {
  installation: InstallationRules_installation
}

const InstallationRules: any = (props: Props) => {
  debugger
  if (!props.installation) {
    return <div />
  }
  return (
    <div>
      <h3>Rules KO!</h3>
      <p>{JSON.stringify(props.installation.rules)}</p>
      <p>{JSON.stringify(props.installation.repos)}</p>
      <p>Path: {props.installation.perilSettingsJSONURL}</p>
    </div>
  )
}

export default createFragmentContainer<Props>(
  InstallationRules,
  graphql`
    fragment InstallationRules_installation on Installation {
      repos
      rules
      login
      perilSettingsJSONURL
    }
  `
)
