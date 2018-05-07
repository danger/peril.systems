/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type InstallationRules_installation = {
    readonly iID: number;
    readonly repos: any;
    readonly rules: any;
    readonly login: string;
    readonly perilSettingsJSONURL: string;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "InstallationRules_installation",
  "type": "Installation",
  "metadata": null,
  "argumentDefinitions": [],
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
      "kind": "ScalarField",
      "alias": "__id",
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '807c02da0bcbd83aa30ee7e6d3f3e9ff';
export default node;
