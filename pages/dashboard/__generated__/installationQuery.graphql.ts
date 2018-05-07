/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type installationQueryVariables = {
    readonly installationID: string;
};
export type installationQueryResponse = {
    readonly node: ({
        readonly id: string;
    }) | null;
};



/*
query installationQuery(
  $installationID: ID!
) {
  node(id: $installationID) {
    __typename
    id
    ...InstallationRules_installation
    ...InstallationWebhooks_installation
    __id: id
  }
}

fragment InstallationRules_installation on Installation {
  iID
  repos
  rules
  login
  perilSettingsJSONURL
  __id: id
}

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
  __id: id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "installationID",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "installationID",
    "type": "ID!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "installationQuery",
  "id": null,
  "text": "query installationQuery(\n  $installationID: ID!\n) {\n  node(id: $installationID) {\n    __typename\n    id\n    ...InstallationRules_installation\n    ...InstallationWebhooks_installation\n    __id: id\n  }\n}\n\nfragment InstallationRules_installation on Installation {\n  iID\n  repos\n  rules\n  login\n  perilSettingsJSONURL\n  __id: id\n}\n\nfragment InstallationWebhooks_installation on Installation {\n  iID\n  webhooks {\n    edges {\n      node {\n        event\n        eventID\n      }\n    }\n  }\n  __id: id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "installationQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": v1,
        "concreteType": null,
        "plural": false,
        "selections": [
          v2,
          {
            "kind": "FragmentSpread",
            "name": "InstallationRules_installation",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "InstallationWebhooks_installation",
            "args": null
          },
          v3
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "installationQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": v1,
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "__typename",
            "args": null,
            "storageKey": null
          },
          v2,
          v3,
          {
            "kind": "InlineFragment",
            "type": "Installation",
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "iID",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "repos",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "rules",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "login",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "perilSettingsJSONURL",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "webhooks",
                "storageKey": null,
                "args": null,
                "concreteType": "RecordedWebhookConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "RecordedWebhookEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "RecordedWebhook",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "event",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "eventID",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'fbfb70d758a987d7adbe4722ce326ce1';
export default node;
