# 473. Matchsticks to Square

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/matchsticks-to-square](https://leetcode.com/problems/matchsticks-to-square)
**Companies:** Amazon, Ebay, Google, Meta, Microsoft, Phonepe, Rackspace, Tiktok, Uber

---

## 1. Problem Description

You are given an integer array `matchsticks` where `matchsticks[i]` is the length of the `i^th` matchstick. You want to use **all the matchsticks** to make one square. You **should not break** any stick, but you can link them up, and each matchstick must be used **exactly one time**.

Return `true` if you can make this square and `false` otherwise.

**Constraints:**

- `1 <= matchsticks.length <= 15`
- `1 <= matchsticks[i] <= 10^8`

---

## 2. Approach: Backtracking — O(4ⁿ) with pruning ✅

```text
FUNCTION makesquare(matchsticks):
    total ← SUM(matchsticks)
    IF total % 4 != 0: RETURN false
    side ← total / 4
    SORT matchsticks IN DESCENDING   // try large sticks first
    sides ← [0, 0, 0, 0]
    RETURN backtrack(matchsticks, sides, 0, side)

FUNCTION backtrack(sticks, sides, idx, target):
    IF idx == LENGTH(sticks):
        RETURN sides[0] == target AND sides[1] == target AND sides[2] == target AND sides[3] == target
    FOR i ← 0 TO 3:
        IF sides[i] + sticks[idx] > target: CONTINUE
        IF i > 0 AND sides[i] == sides[i-1]: CONTINUE   // skip duplicate side states
        sides[i] ← sides[i] + sticks[idx]
        IF backtrack(sticks, sides, idx + 1, target): RETURN true
        sides[i] ← sides[i] - sticks[idx]
    RETURN false
```

| Time | Space |
|------|-------|
| O(4ⁿ) worst, pruned in practice | O(n) |

---

## 3. Examples

```
Example 1:
  Input: matchsticks = [1,1,2,2,2]
  Output: true
  Explanation: You can form a square with length 2, one side of the square came two sticks with length 1.
```

```
Example 2:
  Input: matchsticks = [3,3,3,3,4]
  Output: false
  Explanation: You cannot find a way to form a square with all the matchsticks.
```

---

## 4. Walkthrough

Consider the first example `[1,1,2,2,2]`.
1. Total sum = 8, side length = 2.
2. Sorted sticks: `[2,2,2,1,1]`.
3. Place first `2` on side 0 → sides = `[2,0,0,0]`.
4. Next `2` cannot go to side 0 (full), placed on side 1 → sides = `[2,2,0,0]`.
5. Next `2` goes to side 2 → sides = `[2,2,2,0]`.
6. Remaining `1`s fit into side 3 → sides = `[2,2,2,2]` → all sides equal → return true.

---

## 5. Complexity Analysis

*Time*: In the worst case we try 4 choices for each stick → O(4ⁿ), but sorting and pruning dramatically reduce the search space.
*Space*: O(n) for the recursion stack and the `sides` array.

---

## 6. Follow-Up Questions

1. How would you adapt the solution for forming a polygon with *k* equal sides?
2. Can you solve the problem using DP with bitmasking?
3. What if the matchsticks lengths are extremely large – how does that affect the algorithm?

---

## Key Takeaway

> Partition into 4 equal‑sum groups via backtracking. Key prunings: sort descending (fail fast), skip sides with identical current sums (symmetry), and abort when a stick exceeds the remaining capacity.
