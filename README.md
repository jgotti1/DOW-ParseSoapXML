# XML Parsing Utility (Margotti)

This utility parses specific XML data, extracting AdBase IDs, E2 IDs, and SR List IDs into a structured JavaScript object or arrays.
 It's designed to work with Node.js and uses the `xml2js` package for XML parsing.

## Features

- **AdBase IDs**: Identified by a "-" character within the content ID.
- **E2 IDs**: Numeric identifiers without a "-" character.
- **SR List**: A collection of strings extracted from the SR List section of the XML.


The utility processes the XML and returns a single JavaScript object structured as follows:

```javascript
{
  AdBaseIDs: [/* array of strings */],
  E2IDs: [/* array of numbers */],
  SRList: [/* array of strings */]
}

