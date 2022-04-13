export const testCasesList = [];
let testData = {};
let testCounter = 0;

//-------------Test 1-------------
testData.input = 
`# Sample Document

Hello!

This is sample markdown for the [Mailchimp](https://www.mailchimp.com) homework assignment.`;
    
testData.expectedOutput = 
`<h1>Sample Document</h1>

<p>Hello!</p>

<p>This is sample markdown for the <a href="https://www.mailchimp.com">Mailchimp</a> homework assignment.</p>`;
testCounter += 1;
testData.testNum = testCounter;

testCasesList.push({...testData});


//-------------Test 2-------------
testData.input = 
`# Header one

Hello there

How are you?
What's going on?

## Another Header

This is a paragraph [with an inline link](http://google.com). Neat, eh?

## This is a header [with a link](http://yahoo.com)`;
    
testData.expectedOutput = 
`<h1>Header one</h1>

<p>Hello there</p>

<p>How are you?
What's going on?</p>

<h2>Another Header</h2>

<p>This is a paragraph <a href="http://google.com">with an inline link</a>. Neat, eh?</p>

<h2>This is a header <a href="http://yahoo.com">with a link</a></h2>`;

testCounter += 1;
testData.testNum = testCounter;

testCasesList.push({...testData});


//-------------Test 3-------------
testData.input =
`Hello there
  
  

How are you?
####      What's going on?
###Line with a missing space after ###.


  

###### Another Header
`;

testData.expectedOutput = 
`<p>Hello there</p>

<p>How are you?</p>

<h4>What's going on?
###Line with a missing space after ###.</h4>

<h6>Another Header</h6>`;

testCounter += 1;
testData.testNum = testCounter;

testCasesList.push({...testData});


//-------------Test 4-------------

testData.input = 
`# Header one

Hello there

How are you?
What's going on?

This is a paragraph [with an inline link](http://google.com). Neat, [eh](https://www.yahoo.com)?

####### Attempted Header with too many #s
`;
  
testData.expectedOutput = 
`<h1>Header one</h1>

<p>Hello there</p>

<p>How are you?
What's going on?</p>

<p>This is a paragraph <a href="http://google.com">with an inline link</a>. Neat, <a href="https://www.yahoo.com">eh</a>?</p>

<p>####### Attempted Header with too many #s</p>`;

testCounter += 1;
testData.testNum = testCounter;

testCasesList.push({...testData});

//-------------Test 5-------------

testData.input = 
`$$$$ &&&&
<br><a>`;
  
testData.expectedOutput = 
`<p>$$$$ &&&&
<br><a></p>`;

testCounter += 1;
testData.testNum = testCounter;

testCasesList.push({...testData});
