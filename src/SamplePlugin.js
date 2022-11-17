import { FlexPlugin } from "@twilio/flex-plugin";

import addCallButton from "./addCallButton";

const PLUGIN_NAME = "SamplePlugin";

export default class SamplePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    addCallButton(flex, manager);
  }
}
