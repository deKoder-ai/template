Calculate the shortest path of a chess knight from a starting square to another square on the board

Khan Academy - Describing Graphs
https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/describing-graphs

Khan Academy - Representing Graphs
https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs'

Board: 8 x 8

Knight maximum number of moves to any square of the same color as starting square: 6
Max number of moves to square of opposite color: 5

Valid moves:
[x + 2, y + 1]
[x + 2, y - 1]
[x + 1, y + 2]
[x + 1, y - 2]
[x - 2, y + 1]
[x - 2, y - 1]
[x - 1, y + 2]
[x - 1, y - 2]

- Each square on the board is a node (or vertex)
- A knight's valid moves represent the edges (connections) between the vertices
- A move is only valid if the knight stays within the squares of the board
- Goal is to traverse the graph (chessboard) to find the shortest possible route between two nodes (the start and end positions)

Ideas:
- Create a link to each legal vertex from the knight's current position
- Check if the resulting vertex is the target, if so, shortest path found. If not repeat.
- Check if the square has been visited before, if so this is not the fastest path
- If height is > 6, not the shortest path


                        