# 1718. Construct the Lexicographically Largest Valid Sequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-the-lexicographically-largest-valid-sequence](https://leetcode.com/problems/construct-the-lexicographically-largest-valid-sequence)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given an integer `n`, find a sequence with elements in the range `[1, n]` that satisfies all of the following:

- The integer `1` occurs once in the sequence.
- Each integer between `2` and `n` occurs twice in the sequence.
- For every integer `i` between `2` and `n`, the **distance** between the two occurrences of `i` is exactly `i`.

The **distance** between two numbers on the sequence, `a[i]` and `a[j]`, is the absolute difference of their indices, `|j - i|`.

Return *the **lexicographically largest** sequence. It is guaranteed that under the given constraints, there is always a solution.*

A sequence `a` is lexicographically larger than a sequence `b` (of the same length) if in the first position where `a` and `b` differ, sequence `a` has a number greater than the corresponding number in `b`. For example, `[0,1,9,0]` is lexicographically larger than `[0,1,5,6]` because the first position they differ is at the third number, and `9` is greater than `5`.

**Constraints:**
- `1 <= n <= 20`

## Examples
```
Example 1:
  Input: n = 3
  Output: [3,1,2,3,2]
  Explanation: [2,3,2,1,3] is also a valid sequence, but [3,1,2,3,2] is the lexicographically largest valid sequence.
```
```
Example 2:
  Input: n = 5
  Output: [5,3,1,4,3,5,2,4,2]
```

## Approach
Use **backtracking** filling the array from left to right. At each empty position try numbers from `n` down to `1` (largest first) to achieve lexicographic maximality. For `i > 1` we must place the second occurrence at `pos + i`. If that position is free, place both and recurse. For `1` we just place it in the current empty slot.

```text
FUNCTION constructDistancedSequence(n):
    SET size ← 2 * n - 1
    SET ans ← ARRAY of size filled with 0
    SET used ← SET empty
    FUNCTION backtrack(idx):
        IF idx = size:
            RETURN true
        IF ans[idx] ≠ 0:
            RETURN backtrack(idx + 1)
        FOR num FROM n DOWNTO 1:
            IF num IN used:
                CONTINUE
            IF num = 1:
                SET ans[idx] ← 1
                ADD 1 TO used
                IF backtrack(idx + 1): RETURN true
                SET ans[idx] ← 0
                REMOVE 1 FROM used
            ELSE IF idx + num < size AND ans[idx + num] = 0:
                SET ans[idx] ← num
                SET ans[idx + num] ← num
                ADD num TO used
                IF backtrack(idx + 1): RETURN true
                SET ans[idx] ← 0
                SET ans[idx + num] ← 0
                REMOVE num FROM used
        RETURN false
    CALL backtrack(0)
    RETURN ans
```

## Walkthrough
| idx | action | ans (partial) |
|-----|--------|---------------|
| 0 | try 4 → place at 0 and 4 | [4,0,0,0,4,0,0] |
| 1 | try 3 → place at 1 and 4 (occupied) → skip |
| 1 | try 2 → place at 1 and 3 | [4,2,0,2,4,0,0] |
| 2 | try 3 → place at 2 and 5 | [4,2,3,2,4,3,0] |
| 6 | place 1 | [4,2,3,2,4,3,1] |

## Complexity Analysis
- **Time:** In the worst case exponential due to backtracking, but the search space is small (`n ≤ 20`).
- **Space:** `O(n)` for the answer array and recursion stack.

## Follow‑Up Questions
1. How would you modify the algorithm to return **any** valid sequence instead of the lexicographically largest?
2. Can you design an iterative greedy approach that works for all `n`?
3. What changes are needed if the distance requirement becomes `i+1` instead of `i`?

## Key Takeaway
Backtracking with numbers tried in descending order guarantees the first complete solution found is the lexicographically largest.
