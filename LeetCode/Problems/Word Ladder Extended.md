# BFS Shortest Path Pattern

Related: #127 Word Ladder, #433 Min Genetic Mutation, #752 Open the Lock, #773 Sliding Puzzle

---

## Template: BFS on Implicit Graph

```
FUNCTION bfs(start, target, getNeighbors):
    visited = {start}
    queue = [(start, 0)]

    WHILE queue:
        (state, dist) = queue.DEQUEUE()
        IF state == target: RETURN dist

        FOR neighbor IN getNeighbors(state):
            IF neighbor NOT IN visited:
                visited.ADD(neighbor)
                queue.ENQUEUE((neighbor, dist + 1))

    RETURN -1
```

### Bidirectional BFS

Search from both start and target simultaneously. Meet in the middle reduces time from O(b^d) to O(b^(d/2)).

```
FUNCTION bidirectionalBFS(start, target):
    frontSet = {start}
    backSet = {target}
    visited = {start, target}
    steps = 0

    WHILE frontSet AND backSet:
        // Always expand the smaller set
        IF len(frontSet) > len(backSet):
            SWAP(frontSet, backSet)

        nextSet = {}
        FOR state IN frontSet:
            FOR neighbor IN getNeighbors(state):
                IF neighbor IN backSet: RETURN steps + 1
                IF neighbor NOT IN visited:
                    visited.ADD(neighbor)
                    nextSet.ADD(neighbor)

        frontSet = nextSet
        steps += 1

    RETURN -1
```
