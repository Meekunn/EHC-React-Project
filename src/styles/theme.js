import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
      global: () => ({
          body: {
              bg: "",
          },
      }),
  },
})
export default theme

// fonts: {
//   body: `'Open Sans', sans-serif`,
//   heading: `'Open Sans', sans-serif`,
// },