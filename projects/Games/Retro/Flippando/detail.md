**Flippando** is a simple on-chain memory game, ported from Solidity to Gno, which starts with an empty matrix to flip tiles on to see what’s underneath. If the tiles match, they remain uncovered; if not, they are briefly shown, and the player must memorize their colors until the entire matrix is uncovered. The end result can be minted as an NFT, which can later be assembled into bigger, more complex NFTs, creating a digital “painting” with the uncovered tiles.

**Game mechanics**

A game starts with a 4x4 empty matrix. The goal is to uncover what's underneath the tiles of the matrix, by clicking on two squares of your choice. On each clicking sequence, a request is sent to the backend, and the tiles underneath are revealead. If they match, they remain visible. If they don't, they are just briefly shown and your task is to remember them.

The last four squares have a different behavior, shown by the game status: "Flippando is heating, entering unstable quantum state.". To enforce solvability, the last 2 pairs (4 squares) are always matching, but their colours are randomly chosen. So, even if you uncovered some of them before, the last 2 clicking sequences will always have random results.

Once a matrix is uncovered, you can mint it as an on-chain NFT. We will refer to this type of NFTs as "basic NFTs" from now on. When you mint a basic NFT, a fungible GRC20 token, `$FLIP`, is also minted and "locked" inside it. The `$FLIP` token can only be unlocked if someone else uses your basic NFT to create a composite NFT.
