import { commitMutation, graphql } from "react-relay"
import { Environment } from "relay-runtime"

const mutation = graphql`
  mutation makeInstallationRecordMutation($iID: Int!) {
    makeInstallationRecord(iID: $iID) {
      login
    }
  }
`

export const recordWebhooksMutation = (environment: Environment, installationID: number) => {
  const variables = {
    iID: installationID,
  }
  console.log(variables)
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      console.log("Response received from server.")
    },
    onError: err => console.error(err),
  })
}
