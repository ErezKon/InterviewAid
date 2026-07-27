# 473. Matchsticks to Square

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/matchsticks-to-square](https://leetcode.com/problems/matchsticks-to-square)
**Companies:** Amazon, Ebay, Google, Meta, Microsoft, Phonepe, Rackspace, Tiktok, Uber

---

## 1. Problem Description

Determine if matchsticks can be partitioned into 4 groups of equal sum (forming a square).

---

## 2. Approach: Backtracking — O(4ⁿ) with pruning ✅

```
FUNCTION makesquare(matchsticks):
    total = SUM(matchsticks)
    IF total % 4 != 0: RETURN false
    side = total / 4
    SORT matchsticks in reverse    // pruning: try large first

    sides = [0] * 4
    RETURN backtrack(matchsticks, sides, 0, side)

FUNCTION backtrack(sticks, sides, idx, target):
    IF idx == len(sticks):
        RETURN all sides == target
    FOR i ← 0 TO 3:
        IF sides[i] + sticks[idx] > target: CONTINUE
        IF i > 0 AND sides[i] == sides[i-1]: CONTINUE    // symmetry pruning
        sides[i] += sticks[idx]
        IF backtrack(sticks, sides, idx + 1, target): RETURN true
        sides[i] -= sticks[idx]
    RETURN false
```

| Time | Space |
|------|-------|
| O(4ⁿ) worst, pruned in practice | O(n) |

---

## 3. Key Takeaway

> Partition into 4 equal-sum groups via backtracking. Key prunings: sort descending (fail fast), skip sides with same current sum (symmetry), and skip if stick exceeds remaining capacity.
