/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.onCreateNode = async ({
    node,
    loadNodeContent,
    actions: { createNode },
    createNodeId,
    createContentDigest,
  }) => {
    if (node.name !== 'prices') return; // 'prices' is the name we gave the remote node in gatsby-config.js, so we only want to transform that
  
    try {
      const nodeContent = await loadNodeContent(node);
      const prices = JSON.parse(nodeContent);
  
      Object.entries(prices).forEach(([key, value]) => {
        const childId = createNodeId(`${key}`);
        const priceNode = {
                ...value,
                priceId: key,
                sourceInstanceName: node.name,
                id: childId,
                children: [],
                parent: node.id,
                internal: {
                type: 'Price',
                contentDigest: createContentDigest(value),
                description: 'Price',
            },
        };
        createNode(priceNode);
      })
    } catch (error) {
      console.error(error);
    }
  };