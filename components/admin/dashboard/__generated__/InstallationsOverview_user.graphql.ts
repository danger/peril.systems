/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type InstallationsOverview_user = {
    readonly installations: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly iID: number;
                readonly login: string;
            }) | null;
        }) | null> | null;
    }) | null;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "InstallationsOverview_user",
  "type": "User",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
                  "name": "login",
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
(node as any).hash = '2750ec464b84d543a03d217fb10d8ce1';
export default node;
