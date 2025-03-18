export default function FileGenerator() {
  type AMMLinkData = {
    searchCategory: string;
    reference: string;
    label: string;
  };

  const AMMLinkTokens = {
    start: "[[amm_link_start]]",
    end: "[[amm_link_end]]",
  };

  function processAMMLinks(input: string): {
    transformedString: string;
    extractedLinks: AMMLinkData[];
  } {
    // Regex to match and extract AMM links
    const escapedStartToken = AMMLinkTokens.start.replace(/[\[\]]/g, "\\$&");
    const escapedEndToken = AMMLinkTokens.end.replace(/[\[\]]/g, "\\$&");

    const regex = new RegExp(
      `${escapedStartToken}\\s*(\\w+)\\s+([\\dA-Z-]+)\\s+([^\\[\\]]+)\\s*${escapedEndToken}`,
      "g"
    );

    const extractedLinks: AMMLinkData[] = [];
    const transformedString = input.replace(
      regex,
      (_match, searchCategory, reference, label) => {
        extractedLinks.push({ searchCategory, reference, label: label.trim() });

        return `<a href="https://google.com/${reference}/" target="_blank">${reference} ${label}</a>`;
      }
    );

    return { transformedString, extractedLinks };
  }

  const inputString = `
      hey there Z 21-52-46-246-001-A Inspection of Forward Car hey there [[amm_link_start]] AMM 21-52-46-256-001-A Inspection of Forward Cargo [[amm_link_end]]
      yolo hey there [[amm_link_start]] ABC 24-52-46-156-011-A Inspection [[amm_link_end]]
      third value hey there [[amm_link_start]] GHZ 21-52-46-246-001-A Cargo [[amm_link_end]]`;

  const result = processAMMLinks(inputString);

  return (
    <div>
      <h3>File Generator</h3>
      <div dangerouslySetInnerHTML={{ __html: result.transformedString }} />
    </div>
  );
}
