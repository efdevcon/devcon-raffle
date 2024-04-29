import styled from 'styled-components'
import { Colors } from '@/styles/colors'
import { useEffect, useMemo, useState } from 'react'
import { encryptVoucherCodes } from '@/utils/encryptVoucherCodes'

export default function Bids() {
  const [secretKey, setSecretKey] = useState<string>('')
  const [rawVoucherCodes, setVoucherCodes] = useState<string>('')

  const voucherCodes = useMemo(() => rawVoucherCodes.split('\n'), [rawVoucherCodes])

  const [encryptedVoucherCodes, setEncryptedVoucherCodes] = useState<string>('')
  useEffect(() => {
    encryptVoucherCodes(voucherCodes, new TextEncoder().encode(secretKey))
      .then((encrypted) => {
        console.log(secretKey, encrypted)
        setEncryptedVoucherCodes(encrypted)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [voucherCodes, secretKey])

  const saveEncryptedVoucherCodes = () => {
    const file = new Blob([encryptedVoucherCodes], {
      type: 'text/plain',
    })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(file)
    link.download = 'voucherCodes.production'
    link.click()
    URL.revokeObjectURL(link.href)
    link.remove()
  }

  return (
    <Body>
      <div>
        <Heading>Input</Heading>
        <Label>
          Secret key, in text, must be minimum 32 bytes
          <Input
            type="text"
            value={secretKey}
            onChange={(event) => {
              setSecretKey(event.target.value)
            }}
          />
        </Label>
        <Label>
          Voucher codes, separated by newlines
          <Textarea
            value={rawVoucherCodes}
            onChange={(event) => {
              setVoucherCodes(event.target.value)
            }}
          />
        </Label>
        <Heading>Output</Heading>
        <Label>
          Parsed voucher codes
          <Textarea readOnly value={`[${voucherCodes.join(',')}]`} />
        </Label>
        <Label>
          Encrypted voucher codes
          <Textarea readOnly value={encryptedVoucherCodes || ''} />
        </Label>
        <button onClick={saveEncryptedVoucherCodes}>Download</button>
      </div>
    </Body>
  )
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  background: ${Colors.White};
`

const Heading = styled.h4`
  margin-top: 24px;
`

const Label = styled.label`
  display: block;
  margin-top: 16px;
`

const Input = styled.input`
  display: block;
  width: 100%;
`

const Textarea = styled.textarea`
  display: block;
  width: 100%;
`
