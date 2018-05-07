import { createFragmentContainer, graphql } from "react-relay"
import { InstallationsOverview_user } from "./__generated__/InstallationsOverview_user.graphql"
import Link from "next/link"
import { notEmpty } from "../../../lib/notEmpty"

interface Props {
  user: InstallationsOverview_user
}
const InstallationsOverview: any = (props: Props) => {
  if (!props.user.installations) {
    return <p>Loading</p>
  } else if (!props.user.installations.edges) {
    return <p>Error no installations?</p>
  } else {
    const installations = props.user.installations.edges.map(e => e && e.node).filter(notEmpty)

    return (
      <div>
        <h3>Installations</h3>
        <ul>
          {installations.map(i => (
            <li>
              <Link href={"/dashboard/installation?id=" + i.id}>
                <a>{i.login}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default createFragmentContainer<Props>(
  InstallationsOverview,
  graphql`
    fragment InstallationsOverview_user on User {
      installations {
        edges {
          node {
            id
            login
          }
        }
      }
    }
  `
)
