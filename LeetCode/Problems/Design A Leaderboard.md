# 1244. Design A Leaderboard

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-a-leaderboard](https://leetcode.com/problems/design-a-leaderboard)
**Companies:** Amazon, Bloomberg, Citadel, De Shaw, Google, Microsoft, Pinterest, Uber, Wayfair

---

## Problem Description

Design a leaderboard that supports adding scores for players, retrieving the sum of the top K scores, and resetting a player's score.

---

## Examples

**Example 1:**
```
Input: ["Leaderboard","addScore","addScore","top","reset","addScore","top"],
       [[],[1,73],[2,56],[1],[1],[1,40],[2]]
Output: [null,null,null,129,null,null,96]
Explanation:
Leaderboard lb = new Leaderboard();
lb.addScore(1, 73); // player 1 now has 73 points
lb.addScore(2, 56); // player 2 now has 56 points
lb.top(1); // returns 73 (top 1 score)
lb.reset(1); // player 1's score becomes 0
lb.addScore(1, 40); // player 1 now has 40 points
lb.top(2); // returns 96 (56 + 40)
```

**Example 2:**
```
Input: ["Leaderboard","addScore","top","addScore","top"],
       [[],[5,10],[1],[5,20],[1]]
Output: [null,null,10,null,30]
Explanation:
lb.addScore(5,10); // player 5 → 10
lb.top(1); // 10
lb.addScore(5,20); // player 5 → 30
lb.top(1); // 30
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