# Process Stream Char by Char

Improve the user experience "the ChatGPT way" by incrementally displaying data as it is streamed in.

This utility exposes two methods:

1. `stringToReadableStream`: Transform a string to `ReadableStream` type.

   **Usage**: Convert a string to `ReadableStream` instance.

   ```javascript
   import { stringToReadableStream } from 'process-stream-char-by-char'
   // ...
   const inputStream = stringToReadableStream(inputString)

2. `processStreamCharbyChar`: If given an input stream of type `ReadableStream` and a callback function, the method decodes the string and calls the callback function for each decoded character. The decoded character will be passed as an argument to the callback

   **Usage**: Progressively add data to your react state as it is streamed in.

   ```javascript
   import { processStreamCharbyChar } from 'process-stream-char-by-char'
    //...
    processStreamCharbyChar(inputStream, (char) => setState((prev) => prev + char))