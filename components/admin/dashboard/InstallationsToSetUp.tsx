import { createFragmentContainer, graphql } from "react-relay"
import { InstallationsToSetUp_user } from "./__generated__/InstallationsToSetUp_user.graphql"
import Link from "next/link"
import { notEmpty } from "../../../lib/notEmpty"

interface Props {
  user: InstallationsToSetUp_user
}

const InstallationsToSetUp: any = (props: Props) => {
  if (!props.user.installationsToSetUp) {
    return <p>Loading</p>
  } else if (!props.user.installationsToSetUp.edges) {
    return <p>Error no installations?</p>
  } else {
    const installations = props.user.installationsToSetUp.edges.map(e => e && e.node).filter(notEmpty)

    return (
      <div>
        <h3>Installations needing work</h3>
        <ul>
          {installations.map(i => (
            <li>
              <Link href={"/dashboard/setup?iID=" + i.id}>
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
  InstallationsToSetUp,
  graphql`
    fragment InstallationsToSetUp_user on User {
      installationsToSetUp {
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
