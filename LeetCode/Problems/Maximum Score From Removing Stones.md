# 1753. Maximum Score From Removing Stones

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-score-from-removing-stones](https://leetcode.com/problems/maximum-score-from-removing-stones)
**Companies:** Google

---

## Problem Description
You are given three piles of stones with sizes `a`, `b`, and `c`. In each move you may choose any two non‑empty piles, remove one stone from each, and gain **1 point**. The process continues until there are fewer than two non‑empty piles. Return the maximum total points you can obtain.

## Examples
**Example 1:**
```
Input: a = 2, b = 4, c = 6
Output: 6
Explanation: One optimal sequence of moves is:
(2,4,6) → (1,3,6) → (0,2,6) → (0,1,5) → (0,0,4) → (0,0,3) → (0,0,2)
Total moves = 6.
```
**Example 2:**
```
Input: a = 1, b = 8, c = 8
Output: 8
Explanation: After 8 moves only the largest pile remains.
```

## Approach
The optimal strategy is to always remove stones from the two largest piles. The process stops when the sum of the two smallest piles is exhausted, i.e., when the largest pile exceeds the sum of the other two. The answer is the minimum of the total number of stones divided by 2 and the sum of the two smaller piles.

```text
FUNCTION maxScoreRemovingStones(a, b, c):
    SET piles ← [a, b, c]
    SORT piles ASCENDING          // piles[0] ≤ piles[1] ≤ piles[2]
    SET total ← piles[0] + piles[1] + piles[2]
    RETURN MIN(total DIV 2, piles[0] + piles[1])
```
`DIV` denotes integer division.

## Walkthrough
For `a=2, b=4, c=6`:
- Sorted piles = [2,4,6]
- total = 12, total DIV 2 = 6
- piles[0] + piles[1] = 6
- Minimum = 6, which matches the optimal score.

## Complexity Analysis
- **Time:** O(1) (sorting three numbers is constant time).
- **Space:** O(1) extra space.

## Follow-Up Questions
1. How would the solution change if each removal gave a different number of points depending on the piles chosen?
2. Can you extend the approach to more than three piles?
3. What if you could remove two stones from the same pile in a move?

## Key Takeaway
The maximum score equals the smaller of half the total stones and the sum of the two smallest piles; always pair the largest piles together.
