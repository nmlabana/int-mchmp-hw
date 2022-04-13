const appDiv = document.getElementById('root');

// Regex hashPattern description: Starts with #, with 1 to 6 occurance of #, followed by 1 or more white space chars
const hashPattern = /(^#{1,6})\s+/; 

/*
/ Main function that: 
/ * accepts markdown as input
/ * generates the HTML
/ * updates DOM to display the HTML (step added just for the purpose of this exercise)
/ * returns the HTML 
*/
const generateHTML = (markdownInput) => {
  /*
  / Add newline before valid hash and white space combination
  / This is done to catch any sneaky hashes after line break 
  / that should be treated as separate lines, for example:
  /
  /   How are you?
  /   ## What's going on?
  /
  / Step 1: Find all occurance of matching lines
  / Step 2: Add new-line char before each of those occurances, so they match the
  /         pattern of two line breaks
  */
  const sneakyHashPattern = new RegExp(hashPattern, 'gm'); //Step 1: catch sneaky hashes 
  markdownInput = markdownInput.replace(sneakyHashPattern, '\n$&'); // Step 2: add extra line break

  // Regex newlinePattern description: (new line) + (0 or more whitespaces) + (new line)
  const newlinePattern = new RegExp(/(\n)\s*(\n)/);

  // Split the input markdown string using the newlinePattern regex match
  let inputArray = markdownInput.split(newlinePattern);  

  let outputArray = [];
  try {
    inputArray.forEach(line => {
      const formattedLine = formatLine(line);

      if (formattedLine) { 
        outputArray.push(formattedLine);
      }
    });
  } catch (e) {
    //display any error message to the screen
    appDiv.innerHTML = "<h3>" + "System Error: " + e + "</h3>";
    return;
  }

  const output = outputArray.join('\n\n'); //two line breaks added for readability
  appDiv.innerHTML = output;
  return output;
};

/*
/ Function to format each line extracted from input based on
/ newlinePattern regular expression defined in generateHTML.
/
/ The output is the HTML version of each markdown line.
*/
const formatLine = (inputLine) => {
  let formattedLine = inputLine.trim();

  if (formattedLine === "") {
    return;
  }

  // Step 1: Determine the line's open and close HTML tags
  let openTag = "<p>"; //default openTag
  let closeTag = "</p>"; //default closeTag

  const matchResults = formattedLine.match(hashPattern) || [""];
  const hashLength = matchResults[0].trim().length;
  
  if (hashLength > 0) { //It's a header line
    // change the open and close tags for the header line
    openTag = "<h" + hashLength + ">";
    closeTag = "</h" + hashLength + ">";
  }

  //Step 2: Remove hash signs
  formattedLine = formattedLine.replace(hashPattern, "");

  //Step 3: Replace link markdown to HTML
  // Regex linkPattern description: [ + text1 + ]+ ( + text2 + )
  const linkPattern = /(\[)([^\[\]]*)(\])(\()([^\(\)]*)(\))/g;
  formattedLine = formattedLine.replace(linkPattern, 
    ( matchString, // [...](...)
      openBracket, // [
      displayText, // text between []
      closeBracket, // ]
      openParanthesis, // (
      url,  // text between ()
      closeParanthesis // )
      ) => 
        "<a " + "href='" + url + "'>" + displayText + "</a>");
  
  return openTag + formattedLine + closeTag;
};



/*----------Unit Tests (basic testing, without testing framework)------*/

const input1 = `Hello there
  
  

How are you?
####      What's going on?
###Line with a missing space after ###.


   

###### Another Header
`;

const input2 = `# Header one

Hello there

How are you?
What's going on?

This is a paragraph [with an inline link](http://google.com). Neat, [eh](https://www.yahoo.com)?

## Another Header
`; 

console.log("input: ", input1);
console.log("output: ", generateHTML(input1));

console.log("input: ", input2);
console.log("output: ", generateHTML(input2));
