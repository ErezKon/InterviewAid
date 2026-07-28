# 473. Matchsticks to Square

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/matchsticks-to-square](https://leetcode.com/problems/matchsticks-to-square)
**Companies:** Amazon, Ebay, Google, Meta, Microsoft, Phonepe, Rackspace, Tiktok, Uber

---

## 1. Problem Description

Determine if matchsticks can be partitioned into 4 groups of equal sum (forming a square).

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

| matchsticks | Output |
|-------------|--------|
| [1,1,2,2,2] | true |
| [3,3,3,3,4] | false |
| [5,5,5,5,4,4,4,4,4] | true |

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
