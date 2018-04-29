/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type dashboard_indexQueryVariables = {
};
export type dashboard_indexQueryResponse = {
    readonly me: ({
        readonly name: string;
    }) | null;
};



/*
query dashboard_indexQuery {
  me {
    ...InstallationsToSetUp_user
    ...InstallationsOverview_user
    name
  }
}

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

fragment InstallationsOverview_user on User {
  installations {
    edges {
      node {
        iID
        login
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = [
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
    "name": "login",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "dashboard_indexQuery",
  "id": null,
  "text": "query dashboard_indexQuery {\n  me {\n    ...InstallationsToSetUp_user\n    ...InstallationsOverview_user\n    name\n  }\n}\n\nfragment InstallationsToSetUp_user on User {\n  installationsToSetUp {\n    edges {\n      node {\n        iID\n        login\n      }\n    }\n  }\n}\n\nfragment InstallationsOverview_user on User {\n  installations {\n    edges {\n      node {\n        iID\n        login\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "dashboard_indexQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "InstallationsToSetUp_user",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "InstallationsOverview_user",
            "args": null
          },
          v0
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "dashboard_indexQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "installationsToSetUp",
            "storageKey": null,
            "args": null,
            "concreteType": "PartialInstallationConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "PartialInstallationEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PartialInstallation",
                    "plural": false,
                    "selections": v1
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "installations",
            "storageKey": null,
            "args": null,
            "concreteType": "InstallationConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "InstallationEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Installation",
                    "plural": false,
                    "selections": v1
                  }
                ]
              }
            ]
          },
          v0
        ]
      }
    ]
  }
};
})();
(node as any).hash = '19edc51f686890d53a03b905c65ce4b5';
export default node;
