# 960. Delete Columns to Make Sorted III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/delete-columns-to-make-sorted-iii](https://leetcode.com/problems/delete-columns-to-make-sorted-iii)
**Companies:** Amazon, Google

---

## Problem Description

You are given an array of `n` strings `strs`, all of the same length.

We may choose any deletion indices, and we delete all the characters in those indices for each string.

For example, if we have `strs = ["abcdef","uvwxyz"]` and deletion indices `{0, 2, 3}`, then the final array after deletions is `["bef", "vyz"]`.

Suppose we chose a set of deletion indices `answer` such that after deletions, the final array has **every string (row) in lexicographic** order. (i.e., `(strs[0][0] <= strs[0][1] <= ... <= strs[0][strs[0].length - 1])`, and `(strs[1][0] <= strs[1][1] <= ... <= strs[1][strs[1].length - 1])`, and so on). Return *the minimum possible value of* `answer.length`.

**Constraints:**

- `n == strs.length`
- `1 <= n <= 100`
- `1 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters.

---

## Examples

```
Example 1:
  Input: strs = ["babca","bbazb"]
  Output: 3
  Explanation: After deleting columns 0, 1, and 4, the final array is strs = ["bc", "az"].
  Both these rows are individually in lexicographic order (ie. strs[0][0] <= strs[0][1] and strs[1][0] <= strs[1][1]).
  Note that strs[0] > strs[1] - the array strs is not necessarily in lexicographic order.
```

```
Example 2:
  Input: strs = ["edcba"]
  Output: 4
  Explanation: If we delete less than 4 columns, the only row will not be lexicographically sorted.
```

```
Example 3:
  Input: strs = ["ghi","def","abc"]
  Output: 0
  Explanation: All rows are already lexicographically sorted.
```

---

## Approach

```
FUNCTION minDeletionSize(strs):
    // Find longest compatible subsequence of columns (LIS across rows)
    m ← LENGTH(strs[0])
    dp ← ARRAY OF 1 WITH SIZE m
    FOR j ← 1 TO m - 1:
        FOR i ← 0 TO j - 1:
            compatible ← TRUE
            FOR r ← 0 TO LENGTH(strs) - 1:
                IF strs[r][i] > strs[r][j]:
                    compatible ← FALSE
                    BREAK
            IF compatible:
                dp[j] ← MAX(dp[j], dp[i] + 1)
    RETURN m - MAX(dp)
```

---

## Walkthrough

Input: ["cba","daf","ghi"]

1. Columns = 3. Initialize dp = [1,1,1].
2. j=1 (second column): compare with i=0.
   - Row 0: 'c' ≤ 'b'? No → not compatible.
   - dp stays [1,1,1].
3. j=2 (third column): compare i=0 and i=1.
   - i=0: 'c' ≤ 'a'? No.
   - i=1: 'b' ≤ 'a'? No.
   - dp unchanged.
4. Max dp = 1 → longest compatible subsequence length = 1.
5. Deletions = m - 1 = 2. (Delete columns 0 and 1, keep column 2) resulting rows "a","f","i" are sorted.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m² × n) |
| **Space** | O(m) |

---

## Follow-Up Questions

- How would you extend this to allow reordering columns instead of only deletions?
- Can the solution be optimized to O(m·n) using a more clever greedy approach?

---

## Key Takeaway

> **Multi-row sorted columns = LIS on columns with compatibility check across all rows. Answer = total columns minus longest compatible subsequence.**