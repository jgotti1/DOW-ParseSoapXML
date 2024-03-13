// Soap Response XML Parse for E2 and Adbase (Margotti)

// Testing use XML Response
// -----------------------------------------------------------
const sampleResponse = `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<soap:Body>
<GetMaterialInfo xmlns="http://www.dowjones.net/DJ_Interfaces/">
<srList soapenc:arrayType="xsd:string[2]" xsi:type="soapenc:Array">
<string xsi:type="xsd:string"/>
<string xsi:type="xsd:string"/>
<string xsi:type="xsd:string">srList555555</string>
<string xsi:type="xsd:string">srList1234567</string>
</srList>
<contentList soapenc:arrayType="xsd:int[2]" xsi:type="soapenc:Array">
<string xsi:type="xsd:int">205906335</string>
<string xsi:type="xsd:int">205987060</string>
<string xsi:type="xsd:int">0000103627-01-4-0</string>
<string xsi:type="xsd:int">0000103997-01-1-0</string>
</contentList>
</GetMaterialInfo>
</soap:Body>
</soap:Envelope>`;
// --------------------------------------------------------------------

const xml2js = require("xml2js"); //required npm package
const parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: true });


const xmlParse = async (xmlData) => {
  return new Promise((resolve, reject) => {
    parser.parseString(xmlData, function (err, result) {
      if (err) {
        console.error("Error parsing XML:", err);
        reject(err);
      } else {
        const contentList = result["soap:Envelope"]["soap:Body"]["GetMaterialInfo"]["contentList"]["string"];
        const srList = result["soap:Envelope"]["soap:Body"]["GetMaterialInfo"]["srList"]["string"];

        const adbaseIDs = [];
        const e2IDs = [];
        const srIds = [];

        // Process contentList
        contentList.forEach((item) => {
          if (item.includes("-")) {
            adbaseIDs.push(item);
          } else {
            e2IDs.push(parseInt(item, 10)); // Assuming decimal numbers
          }
        });

        // Process srList
        srList.forEach((item) => {
          if (item.trim() !== "") {
            srIds.push(item);
          }
        });

        resolve({ AdbaseIDs: adbaseIDs, E2IDs: e2IDs, SRIds: srIds });
      }
    });
  });
};


// Run the function and console.log the result after the PArse is complete 
(async () => {
  try {
    const result = await xmlParse(sampleResponse);
    console.log(result); 
  } catch (error) {
    console.error(error); 
  }
})();