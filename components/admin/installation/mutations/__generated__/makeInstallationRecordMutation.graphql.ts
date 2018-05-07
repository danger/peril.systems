/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type makeInstallationRecordMutationVariables = {
    readonly iID: number;
};
export type makeInstallationRecordMutationResponse = {
    readonly makeInstallationRecord: ({
        readonly login: string;
    }) | null;
};



/*
mutation makeInstallationRecordMutation(
  $iID: Int!
) {
  makeInstallationRecord(iID: $iID) {
    login
    __id: id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "iID",
    "type": "Int!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "makeInstallationRecord",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "iID",
        "variableName": "iID",
        "type": "Int!"
      }
    ],
    "concreteType": "Installation",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "login",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": "__id",
        "name": "id",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "makeInstallationRecordMutation",
  "id": null,
  "text": "mutation makeInstallationRecordMutation(\n  $iID: Int!\n) {\n  makeInstallationRecord(iID: $iID) {\n    login\n    __id: id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "makeInstallationRecordMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "makeInstallationRecordMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = '1e2c92d9314d46166086d8c05bf5bde5';
export default node;
