import React from 'react'
//import customerService from '../services/customerService'
import CallButton from './CallButton'
//import constants from '../constants'
// const { outboundCallerIdOverride } = constants

const addCallButton = (flex, manager) => {
  flex.TaskCanvasHeader.Content.add(
    <CallButton key="callbutton" flex={flex} />,
    {
      if: (props) =>
        props.task &&
        props.task.taskChannelUniqueName !== 'voice' &&
        props.task.attributes &&
        props.task.attributes.from,
    },
  )

//   let overrides = outboundCallerIdOverride
  //overwrite outboundcall action to take outbound number based on ani
  flex.Actions.replaceAction('StartOutboundCall', async (payload, original) => {
    let { destination } = payload

    //check worker for a preferred outbound number
    const { outboundNumber } = manager.workerClient.attributes
    payload.callerId = outboundNumber
    // if (outboundNumber) {
    //   payload.callerId = outboundNumber
    // } else {
    //   //if worker does not have a preferred outbound, use a simple prefix check
    //   for (let i = 0; i < overrides?.length; i++) {
    //     if (destination.indexOf(overrides[i].prefix) === 0) {
    //       payload.callerId = overrides[i].callerId
    //       break
    //     }
    //   }
    // }


    //   const customer = await customerService.fetchCustomerByPhone(destination)
    payload.taskAttributes = {
        type: 'outbound',
      //   name: customer.name,
      //   crmid: customer.hubSpotId,
      //   flexWorker: customer.flexWorker,
      //   crmAddress: customer.addrLine,
        from: destination,
      //   email: customer.primaryEmail,
      //   demoType: customer.demoConfig?.activeDemo,
      //   id: customer.id,
      //   activeCrm: customer.demoConfig?.activeCrm,
        twilioNumber: payload.callerId,
        ...payload.taskAttributes,
      }

    // delete payload.taskAttributes.channelSid
    // delete payload.taskAttributes.conversationSid
    payload.taskAttributes.channelType = 'voice'

    console.log('updated outbound call to:', payload)
    original(payload)
  })
}

export default addCallButton