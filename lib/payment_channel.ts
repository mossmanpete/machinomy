import Payment from './Payment'

export interface PaymentChannelJSON {
  sender: string
  receiver: string
  channelId: string
  value: number
  spent: number
  state: number
  contractAddress: string | undefined
}

/**
 * The Payment Channel
 */
export class PaymentChannel {
  sender: string
  receiver: string
  channelId: string
  value: number
  spent: number
  state: number
  contractAddress: string | undefined

  /**
   * @param sender      Ethereum address of the client.
   * @param receiver    Ethereum address of the server.
   * @param channelId   Identifier of the channel.
   * @param value       Total value of the channel.
   * @param spent       Value sent by {sender} to {receiver}.
   * @param state       0 - 'open', 1 - 'settling', 2 - 'settled'
   */
  constructor(sender: string, receiver: string, channelId: string, value: number, spent: number, state: number = 0, contractAddress: string | undefined) { // FIXME remove contract parameter
    this.sender = sender
    this.receiver = receiver
    this.channelId = channelId
    this.value = value
    this.spent = spent
    this.state = state || 0
    this.contractAddress = contractAddress
  }

  static fromPayment(payment: Payment): PaymentChannel {
    return new PaymentChannel(payment.sender, payment.receiver, payment.channelId, payment.channelValue, payment.value, undefined, payment.contractAddress)
  }

  static fromDocument(document: PaymentChannelJSON): PaymentChannel {
    return new PaymentChannel(
      document.sender,
      document.receiver,
      document.channelId,
      document.value,
      document.spent,
      document.state,
      document.contractAddress
    )
  }

  toJSON(): PaymentChannelJSON {
    return {
      state: this.state,
      spent: this.spent,
      value: this.value,
      channelId: this.channelId,
      receiver: this.receiver,
      sender: this.sender,
      contractAddress: this.contractAddress
    }
  }
}