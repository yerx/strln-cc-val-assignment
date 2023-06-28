import './App.css';
import * as React from 'react';
import { 
  ChakraProvider, 
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  Button,
  Flex,
  Box
 } from '@chakra-ui/react';


function App() {
  const [creditCardNumber, setCreditCardNumber] = React.useState('')
  const [creditCardCompany, setCreditCardCompany] = React.useState(null)
  const [disableButton, setDisableButton] = React.useState(true)
  const [isError, setIsError] = React.useState(false)

  const handleChange = (value) => {
    setCreditCardNumber(value)
    validateCreditCardNumber(value)
    identifyCreditCardCompany(value)
  }

  const validateCreditCardNumber = (creditCardNumber) => {
    let ccNumberLength16 = creditCardNumber.length === 16
    let ccNumberLength13 = creditCardNumber.length === 13
    let ccNumberContainsOnlyNumbers = checkForNumbersOnly(creditCardNumber) 

    if (creditCardCompany === 'Discover' && ccNumberLength16 && ccNumberContainsOnlyNumbers) {
      setDisableButton(false)
    } else if (creditCardCompany === 'Mastercard' && ccNumberLength16 && ccNumberContainsOnlyNumbers) {
      setDisableButton(false)
    } else if (creditCardCompany === 'Visa' && (creditCardNumber.length >= 13) && ccNumberContainsOnlyNumbers) {
      if (ccNumberLength16 || ccNumberLength13) {
        setDisableButton(false)
      } else {
        setDisableButton(true)
      }
    } else if (creditCardCompany === null && (creditCardNumber.length >= 13)) {
      setIsError(true)
      setDisableButton(true)
    } else {
      setIsError(false)
      setDisableButton(true)
    }
  }

  const identifyCreditCardCompany = (creditCardNumber) => {
    // check the first digits of the credit card number to identify the credit card company
    switch (creditCardNumber[0]) {
      case '4': 
        setCreditCardCompany('Visa');
        break;
      case '5':
        if (['1', '2', '3', '4', '5'].includes(creditCardNumber[1])) {
          setCreditCardCompany('Mastercard');
        } else {
          setCreditCardCompany(null);
        }
        break;
      case '6':
        if (creditCardNumber[1] === '5' || creditCardNumber.slice(0,4) === '6011') {
          setCreditCardCompany('Discover');
        } else {
          setCreditCardCompany(null);
        }
        break;
      default:
        setCreditCardCompany(null);
        break;
    }
  }

  // checks that the credit card input contains only numbers
  const checkForNumbersOnly = (creditCardNumber) => {
    if (!/\D/.test(creditCardNumber)) {
      return true
    } else {
      setIsError(true);
      return false;
    }
  }

  const handleSubmit = () => {
    // instantiate a headers object
    let headers = new Headers();
    // add content type header to object
    headers.append("Content-Type", "application/json");
    // turn object to string and store in variable
    var raw = JSON.stringify({"ccNumber": creditCardNumber});
    // create JSON object with parameters for API call and store in variable
    var requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow'
    }
    // make API call with the request options
    fetch("https://t3c5urk8h1.execute-api.us-east-1.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => alert('There was an error: ', error));
  }

  return (
    <ChakraProvider>
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        alignContent="center"
        padding="10rem"
        wrap="nowrap"
        gap="1rem"
      >
        <FormControl 
          isRequired 
          isInvalid={isError}
          >
          <FormLabel>Enter a valid credit card number</FormLabel>
          <Input 
            placeholder="Credit card number" 
            value={creditCardNumber}
            onChange={(e) => handleChange(e.target.value)}
            maxLength={16}
          />
          <Box pb='15px' pt='10px'>
          {
            !isError ? (
              <FormHelperText>{creditCardCompany}</FormHelperText>
            ) : (
              <FormErrorMessage>
                Invalid credit card number
              </FormErrorMessage>
            )
          }
          </Box>
          <Button
            isDisabled={disableButton}
            type="submit"
            onClick={handleSubmit}
          >Submit</Button>
        </FormControl>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
