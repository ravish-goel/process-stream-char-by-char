exports.stringToReadableStream = (str) => {
    try {
        const blob = new Blob([str], { type: "text/plain" })
        const stream = new ReadableStream({
            start(controller) {
                const reader = blob.stream().getReader()
                function read() {
                    reader.read().then(({ done, value }) => {
                        if (done) {
                            controller.close()
                            return
                        }
                        controller.enqueue(value)
                        read()
                    })
                }
                read()
            },
        })
        return stream
    }
    catch (e) {
        console.error(e)
    }
}

exports.processStreamCharbyChar = (inputStream: ReadableStream, callback) => {
    try {
        //attach reader
        const reader = inputStream.getReader()
        function processText(partialText) {
            // Split the text into chars
            const chars = partialText.split("")
            // call callback for each char separately
            chars.forEach((char, index) => {
                setTimeout(() => {
                    callback(char)
                }, index * 10) // Adjust the delay between chars as needed
            })
        }

        function readStream() {
            reader.read().then(({ done, value }) => {
                // Process the received chunk of data
                if (value) {
                    const partialText = new TextDecoder("utf-8").decode(value)
                    processText(partialText)
                }
                // Continue reading until the stream ends
                if (!done) {
                    readStream()
                }
            })
        }
        readStream()
    }
    catch (e) {
        console.error(e)
    }
}
