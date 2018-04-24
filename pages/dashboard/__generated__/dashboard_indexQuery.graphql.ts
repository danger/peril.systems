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
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "dashboard_indexQuery",
  "id": null,
  "text": "query dashboard_indexQuery {\n  me {\n    name\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "dashboard_indexQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "dashboard_indexQuery",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
(node as any).hash = 'd73606ef4bf567f6727970c50dd8cea5';
export default node;
