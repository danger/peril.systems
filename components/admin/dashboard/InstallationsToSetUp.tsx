import { createFragmentContainer, graphql } from "react-relay"
import { InstallationsToSetUp_user } from "./__generated__/InstallationsToSetUp_user.graphql"

interface Props {
  user: InstallationsToSetUp_user
}

function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

const InstallationsToSetUp: any = (props: Props) => {
  console.log(props)
  if (!props.user.installationsToSetUp) {
    return <p>Loading</p>
  } else if (!props.user.installationsToSetUp.edges) {
    return <p>Error no installations?</p>
  } else {
    const installations = props.user.installationsToSetUp.edges.map(e => e && e.node).filter(notEmpty)

    return (
      <div>
        <h3>Installations needing work</h3>
        <ul>{installations.map(i => <li>{i.login}</li>)}</ul>
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
            iID
            login
          }
        }
      }
    }
  `
)
