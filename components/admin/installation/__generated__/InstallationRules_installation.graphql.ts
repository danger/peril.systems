/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type InstallationRules_installation = {
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
(node as any).hash = '930b2f82ed7dcc14263a3769d5cb953d';
export default node;
