# 1753. Maximum Score From Removing Stones

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-score-from-removing-stones](https://leetcode.com/problems/maximum-score-from-removing-stones)
**Companies:** Google

---

## Problem Description

You are playing a solitaire game with **three piles** of stones of sizes `a`, `b`, and `c` respectively. Each turn you choose two **different non-empty **piles, take one stone from each, and add `1` point to your score. The game stops when there are **fewer than two non-empty** piles (meaning there are no more available moves).

Given three integers `a`, `b`, and `c`, return *the* ***maximum* *****score** you can get.*

**Constraints:**
- `1 <= a, b, c <= 10^5`

## Examples

**Example 1:**
```
Input: a = 2, b = 4, c = 6
Output: 6
Explanation: The starting state is (2, 4, 6). One optimal set of moves is:
- Take from 1st and 3rd piles, state is now (1, 4, 5)
- Take from 1st and 3rd piles, state is now (0, 4, 4)
- Take from 2nd and 3rd piles, state is now (0, 3, 3)
- Take from 2nd and 3rd piles, state is now (0, 2, 2)
- Take from 2nd and 3rd piles, state is now (0, 1, 1)
- Take from 2nd and 3rd piles, state is now (0, 0, 0)
There are fewer than two non-empty piles, so the game ends. Total: 6 points.
```

**Example 2:**
```
Input: a = 4, b = 4, c = 6
Output: 7
Explanation: The starting state is (4, 4, 6). One optimal set of moves is:
- Take from 1st and 2nd piles, state is now (3, 3, 6)
- Take from 1st and 3rd piles, state is now (2, 3, 5)
- Take from 1st and 3rd piles, state is now (1, 3, 4)
- Take from 1st and 3rd piles, state is now (0, 3, 3)
- Take from 2nd and 3rd piles, state is now (0, 2, 2)
- Take from 2nd and 3rd piles, state is now (0, 1, 1)
- Take from 2nd and 3rd piles, state is now (0, 0, 0)
There are fewer than two non-empty piles, so the game ends. Total: 7 points.
```

**Example 3:**
```
Input: a = 1, b = 8, c = 8
Output: 8
Explanation: One optimal set of moves is to take from the 2nd and 3rd piles for 8 turns until they are empty.
After that, there are fewer than two non-empty piles, so the game ends.
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
