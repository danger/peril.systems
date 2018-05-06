/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type InstallationsToSetUp_user = {
    readonly installationsToSetUp: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly id: string;
                readonly login: string;
            }) | null;
        }) | null> | null;
    }) | null;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "InstallationsToSetUp_user",
  "type": "User",
  "metadata": null,
  "argumentDefinitions": [],
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
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "id",
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
                  "alias": "__id",
                  "name": "id",
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
};
(node as any).hash = 'eead391bac049b31a863dd21e5e4cd22';
export default node;
