# 488. Zuma Game

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/zuma-game](https://leetcode.com/problems/zuma-game)
**Companies:** Amazon, Aurora, Baidu, Google, Inmobi, Phonepe, Zoho

---

## Approach: BFS / DFS with Pruning — O(exponential) ✅

```
FUNCTION findMinStep(board, hand):
    // BFS: state = (board, hand)
    queue = [(board, hand, 0)]
    visited = {(board, sorted hand)}

    WHILE queue:
        (board, hand, steps) = queue.DEQUEUE()
        IF board == "": RETURN steps

        FOR i ← 0 TO len(board):
            FOR j, ball IN enumerate(hand):
                IF ball matches or helps complete a group at position i:
                    newBoard = insert and remove consecutive 3+
                    newHand = hand without ball j
                    IF (newBoard, sorted newHand) NOT IN visited:
                        visited.ADD(...)
                        queue.ENQUEUE((newBoard, newHand, steps + 1))

    RETURN -1
```

Key optimization: only insert where it can form a group of 3+.
