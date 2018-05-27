import { createFragmentContainer, graphql, RelayProp } from "react-relay"
// import Link from "next/link"
import { InstallationRules_installation } from "./__generated__/InstallationRules_installation.graphql"
import { recordWebhooksMutation } from "./mutations/makeInstallationRecordMutation"

interface Props {
  installation: InstallationRules_installation
}

const InstallationRules: any = (props: Props & { relay: RelayProp }) => {
  if (!props.installation) {
    return <div />
  }
  return (
    <div>
      <h3>Rules KO!</h3>
      <h4>Sure?</h4>
      <p>
        <pre>
          <code>{JSON.stringify(props.installation.rules, null, "  ")}</code>
        </pre>
      </p>
      <p>
        <pre>
          <code>{JSON.stringify(props.installation.repos, null, "  ")}</code>
        </pre>
      </p>
      <p>
        <pre>
          <code>{JSON.stringify(props.installation.tasks, null, "  ")}</code>
        </pre>
      </p>
      <p>Path: {props.installation.perilSettingsJSONURL}</p>
      <p>
        <a href="#" onClick={() => recordWebhooksMutation(props.relay.environment, props.installation.iID)}>
          Start recording
        </a>
      </p>
    </div>
  )
}

export default createFragmentContainer<Props>(
  InstallationRules,
  graphql`
    fragment InstallationRules_installation on Installation {
      iID
      repos
      rules
      login
      tasks
      perilSettingsJSONURL
    }
  `
)
