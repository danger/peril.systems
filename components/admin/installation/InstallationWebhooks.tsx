import { createFragmentContainer, graphql, RelayProp } from "react-relay"
// import Link from "next/link"
import { InstallationWebhooks_installation } from "./__generated__/InstallationWebhooks_installation.graphql"

import { notEmpty } from "../../../lib/notEmpty"
import { triggerWebhookMutation } from "./mutations/triggerWebhookMutation"

interface Props {
  installation: InstallationWebhooks_installation
}

const InstallationRules: any = (props: Props & { relay: RelayProp }) => {
  if (!props.installation.webhooks || !props.installation.webhooks.edges) {
    return null
  }

  const webhooks = props.installation.webhooks.edges.map(n => n && n.node).filter(notEmpty)

  if (!webhooks.length) {
    return <p>No recorded webhooks</p>
  }

  return (
    <div>
      <h2>Webhooks</h2>
      <ul>
        {webhooks.map(w => (
          <li>
            <a
              href="#"
              onClick={() => triggerWebhookMutation(props.relay.environment, props.installation.iID, w.eventID)}
            >
              {w.event}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default createFragmentContainer<Props>(
  InstallationRules,
  graphql`
    fragment InstallationWebhooks_installation on Installation {
      iID

      webhooks {
        edges {
          node {
            event
            eventID
          }
        }
      }
    }
  `
)
