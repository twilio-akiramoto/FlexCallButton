import React from "react";
//import customerService from '../services/customerService'
import CallButton from "./CallButton";
//import constants from '../constants'
// const { outboundCallerIdOverride } = constants

const addCallButton = (flex, manager) => {
  flex.TaskCanvasHeader.Content.add(
    <CallButton key="callbutton" flex={flex} />,
    {
      if: (props) =>
        props.task &&
        props.task.taskChannelUniqueName !== "voice" &&
        props.task.attributes &&
        props.task.attributes.from,
    }
  );

  // flex.Actions.replaceAction("StartOutboundCall", (payload, original) =>
  //   startOutboundCall(manager, payload, original)
  // );
};

async function startOutboundCall(manager, payload, original) {
  console.debug("startOutboundCall", payload);
  let { destination } = payload;

  //check worker for a preferred outbound number
  const { outboundNumber } = manager.workerClient.attributes;
  payload.callerId = outboundNumber;

  //   const customer = await customerService.fetchCustomerByPhone(destination)
  payload.taskAttributes = {
    type: "outbound",
    //   name: customer.name,
    //   crmid: customer.hubSpotId,
    //   flexWorker: customer.flexWorker,
    //   crmAddress: customer.addrLine,
    from: destination,
    //   email: customer.primaryEmail,
    //   demoType: customer.demoConfig?.activeDemo,
    //   id: customer.id,
    //   activeCrm: customer.demoConfig?.activeCrm,
    twilioNumber: "+14086681336",
    ...payload.taskAttributes,
  };

  delete payload.taskAttributes.channelSid;
  delete payload.taskAttributes.conversationSid;
  payload.taskAttributes.channelType = "voice";

  console.debug("updated outbound call to:", payload);
  original(payload);
}

export default addCallButton;
