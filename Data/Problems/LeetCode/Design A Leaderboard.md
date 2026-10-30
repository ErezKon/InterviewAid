# 1244. Design A Leaderboard

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-a-leaderboard](https://leetcode.com/problems/design-a-leaderboard)
**Companies:** Amazon, Bloomberg, Citadel, De Shaw, Google, Microsoft, Pinterest, Uber, Wayfair

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Design a Leaderboard class, which has 3 functions:

- `addScore(playerId, score)`: Update the leaderboard by adding `score` to the given player's score. If there is no player with such id in the leaderboard, add him to the leaderboard with the given `score`.
- `top(K)`: Return the score sum of the top `K` players.
- `reset(playerId)`: Reset the score of the player with the given id to 0 (in other words erase it from the leaderboard). It is guaranteed that the player was added to the leaderboard before calling this function.

Initially, the leaderboard is empty.

**Constraints:**
- `1 <= playerId, K <= 10000`
- It's guaranteed that `K` is less than or equal to the current number of players.
- `1 <= score <= 100`
- There will be at most `1000` function calls.

---

## Examples

**Example 1:**
```
Input: ["Leaderboard","addScore","addScore","addScore","addScore","addScore","top","reset","reset","addScore","top"]
[[],[1,73],[2,56],[3,39],[4,51],[5,4],[1],[1],[2],[2,51],[3]]
Output: [null,null,null,null,null,null,73,null,null,null,141]
Explanation: Leaderboard leaderboard = new Leaderboard ();
leaderboard.addScore(1,73);   // leaderboard = [[1,73]];
leaderboard.addScore(2,56);   // leaderboard = [[1,73],[2,56]];
leaderboard.addScore(3,39);   // leaderboard = [[1,73],[2,56],[3,39]];
leaderboard.addScore(4,51);   // leaderboard = [[1,73],[2,56],[3,39],[4,51]];
leaderboard.addScore(5,4);    // leaderboard = [[1,73],[2,56],[3,39],[4,51],[5,4]];
leaderboard.top(1);           // returns 73;
leaderboard.reset(1);         // leaderboard = [[2,56],[3,39],[4,51],[5,4]];
leaderboard.reset(2);         // leaderboard = [[3,39],[4,51],[5,4]];
leaderboard.addScore(2,51);   // leaderboard = [[2,51],[3,39],[4,51],[5,4]];
leaderboard.top(3);           // returns 141 = 51 + 51 + 39;
```

---

## Approach

```text
FUNCTION Leaderboard():
    SET scores ← empty map   // playerId → total score

FUNCTION addScore(playerId, score):
    IF playerId IN scores:
        SET scores[playerId] ← scores[playerId] + score
    ELSE:
        SET scores[playerId] ← score

FUNCTION top(K):
    SET sortedScores ← SORT(values of scores) descending
    RETURN SUM(first K elements of sortedScores)

FUNCTION reset(playerId):
    IF playerId IN scores:
        SET scores[playerId] ← 0
```

---

## Walkthrough

| Step | Operation | Scores Map | Explanation |
|------|-----------|------------|-------------|
| 1 | `addScore(1,73)` | {1:73} | Insert player 1 with 73 points |
| 2 | `addScore(2,56)` | {1:73, 2:56} | Insert player 2 |
| 3 | `top(1)` | – | Sorted scores = [73,56]; top‑1 sum = 73 |
| 4 | `reset(1)` | {1:0, 2:56} | Player 1 score reset to 0 |
| 5 | `addScore(1,40)` | {1:40, 2:56} | Player 1 gains 40 points |
| 6 | `top(2)` | – | Sorted scores = [56,40]; sum = 96 |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) for `addScore`/`reset`; O(n log n) for `top` due to sorting |
| **Space** | O(n) to store scores for n players |

---

## Follow-Up Questions

1. How would you improve `top(K)` to O(K log n) using a balanced BST or a max‑heap?
2. How can you support frequent `top(K)` queries with a sliding window of recent scores?
3. How would you persist the leaderboard across server restarts?

---

## Key Takeaway

> **Hash map stores player scores; sorting enables top‑K retrieval. For many top‑K calls, maintain a sorted structure for faster queries.**