import { isMainnet } from './config'

export const VerifiedOpenActionModules = {
  //   Swap: isMainnet
  //     ? '0x3394E78a3389b1f0216F30fA0613f4975D0573C3'
  //     : '0x8a3fFD86C4409Eb3c3b94DCC5219024CCf6C6179',
  Tip: isMainnet
    ? '0x22cb67432C101a9b6fE0F9ab542c8ADD5DD48153'
    : '0x6111e258a6d00d805DcF1249900895c7aA0cD186'
}
