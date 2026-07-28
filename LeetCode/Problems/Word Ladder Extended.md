# BFS Shortest Path Pattern

Related: #127 Word Ladder, #433 Min Genetic Mutation, #752 Open the Lock, #773 Sliding Puzzle

---

## Problem Description
Given a start state, a target state, and a function that generates neighboring states, find the minimum number of moves to transform the start into the target. The state space is implicit and potentially huge, so an explicit graph cannot be built.

## Examples
**Example 1:** Transform "hit" to "cog" using one‑letter changes where each intermediate word must be in a given dictionary.
```
Input: start = "hit", target = "cog", dict = ["hot","dot","dog","lot","log","cog"]
Output: 4  // hit → hot → dot → dog → cog
```
**Example 2:** Open the lock with 4 wheels, each wheel shows digits 0‑9.
```
Input: start = "0000", target = "0202", deadends = ["0201","0101","0102","1212","2002"]
Output: -1  // target is unreachable
```

## Approach
Use Breadth‑First Search (BFS) on the implicit graph. Each state is a node; edges are generated on‑the‑fly via `getNeighbors`. BFS guarantees the shortest path. For large depth, bidirectional BFS reduces the search space by expanding from both ends.

```text
FUNCTION bfs(start, target, getNeighbors):
    SET visited ← SET(start)
    SET queue ← [(start, 0)]
    WHILE queue NOT EMPTY:
        SET (state, dist) ← DEQUEUE(queue)
        IF state = target: RETURN dist
        FOR neighbor IN getNeighbors(state):
            IF neighbor NOT IN visited:
                ADD neighbor TO visited
                ENQUEUE(queue, (neighbor, dist + 1))
    RETURN -1
```

```text
FUNCTION bidirectionalBFS(start, target, getNeighbors):
    SET frontSet ← SET(start)
    SET backSet ← SET(target)
    SET visited ← SET(start, target)
    SET steps ← 0
    WHILE frontSet NOT EMPTY AND backSet NOT EMPTY:
        IF SIZE(frontSet) > SIZE(backSet):
            SWAP(frontSet, backSet)
        SET nextSet ← EMPTY SET
        FOR state IN frontSet:
            FOR neighbor IN getNeighbors(state):
                IF neighbor IN backSet: RETURN steps + 1
                IF neighbor NOT IN visited:
                    ADD neighbor TO visited
                    ADD neighbor TO nextSet
        SET frontSet ← nextSet
        SET steps ← steps + 1
    RETURN -1
```

## Walkthrough
Consider the Word Ladder example. Initial `frontSet = {"hit"}`, `backSet = {"cog"}`.
1. Expand `frontSet`: neighbors of "hit" → {"hot"}. `nextSet = {"hot"}`.
2. Steps = 1, swap sets if needed. Continue expanding until a common word appears in both sets (`"dog"`), then return total steps.

## Complexity Analysis
- Standard BFS: O(b^d) time, O(b^d) space, where b is branching factor and d is depth.
- Bidirectional BFS: O(b^{d/2}) time and space, significantly faster for large d.

## Follow‑Up Questions
1. How would you adapt the algorithm for weighted edges (e.g., each move has a cost)?
2. Can you implement a heuristic to turn BFS into A* for faster convergence?
3. How would you handle extremely large state spaces that exceed memory limits?

## Key Takeaway
BFS on an implicit graph finds the shortest transformation sequence, and bidirectional BFS cuts the search space roughly in half by meeting in the middle.
