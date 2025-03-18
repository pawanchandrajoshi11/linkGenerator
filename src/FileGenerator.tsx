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
    const startToken = "amm_link_start";
    const endToken = "amm_link_end";

    // Regex to match and extract AMM links
    const regex = new RegExp(
      `\\[\\[${startToken}\\]\\]\\s*(\\w+)\\s*([\\dA-Z-]+)\\s*([^\\[\\]]+)\\s*\\[\\[${endToken}\\]\\]`,
      "g"
    );

    const extractedLinks: AMMLinkData[] = [];
    const transformedString = input.replace(
      regex,
      (_match, searchCategory, reference, label) => {
        extractedLinks.push({ searchCategory, reference, label: label.trim() });

        return `<a href="https://google.com/${reference}/${encodeURIComponent(
          label.trim()
        )}" target="_blank">${reference}</a>`;
      }
    );

    return { transformedString, extractedLinks };
  }

  const inputString = `
      hey there [[amm_link_start]] AMM 21-52-46-256-001-A Inspection of Forward Cargo [[amm_link_end]]
      yolo hey there [[amm_link_start]] ABC 24-52-46-156-011-A Inspection of Forward Cargo [[amm_link_end]]
      third value hey there [[amm_link_start]] GHZ 21-52-46-246-001-A Inspection of Forward Cargo [[amm_link_end]]
    `;

  const result = processAMMLinks(inputString);
  console.log("Processed Result:", result); // ✅ Debugging output

  return (
    <div>
      <h3>File Generator</h3>
      <div dangerouslySetInnerHTML={{ __html: result.transformedString }} />
    </div>
  );
}
