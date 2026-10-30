# 955. Delete Columns to Make Sorted II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-columns-to-make-sorted-ii](https://leetcode.com/problems/delete-columns-to-make-sorted-ii)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description

You are given an array of `n` strings `strs`, all of the same length.

We may choose any deletion indices, and we delete all the characters in those indices for each string.

For example, if we have `strs = ["abcdef","uvwxyz"]` and deletion indices `{0, 2, 3}`, then the final array after deletions is `["bef", "vyz"]`.

Suppose we chose a set of deletion indices `answer` such that after deletions, the final array has its elements in **lexicographic** order (i.e., `strs[0] <= strs[1] <= strs[2] <= ... <= strs[n - 1]`). Return *the minimum possible value of* `answer.length`.

**Constraints:**

- `n == strs.length`
- `1 <= n <= 100`
- `1 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters.

---

## Examples

```
Example 1:
  Input: strs = ["ca","bb","ac"]
  Output: 1
  Explanation:
  After deleting the first column, strs = ["a", "b", "c"].
  Now strs is in lexicographic order (ie. strs[0] <= strs[1] <= strs[2]).
  We require at least 1 deletion since initially strs was not in lexicographic order, so the answer is 1.
```

```
Example 2:
  Input: strs = ["xc","yb","za"]
  Output: 0
  Explanation:
  strs is already in lexicographic order, so we do not need to delete anything.
  Note that the rows of strs are not necessarily in lexicographic order:
  i.e., it is NOT necessarily true that (strs[0][0] <= strs[0][1] <= ...)
```

```
Example 3:
  Input: strs = ["zyx","wvu","tsr"]
  Output: 3
  Explanation: We have to delete every column.
```

---

## Approach

```
FUNCTION minDeletionSize(strs):
    // Greedy column selection ensuring prefixes stay sorted
    n ← LENGTH(strs)
    m ← LENGTH(strs[0])
    cur ← ARRAY OF "" WITH SIZE n
    deletions ← 0
    FOR c ← 0 TO m - 1:
        temp ← []
        FOR i ← 0 TO n - 1:
            APPEND cur[i] + strs[i][c] TO temp
        IF temp = SORTED(temp):
            cur ← temp
        ELSE:
            deletions ← deletions + 1
    RETURN deletions
```

---

## Walkthrough

Consider the input ["ca","bb","ac"]:

1. Initialize `cur = ["","",""]`.
2. Column 0 ('c','b','a') → temp = ["c","b","a"]. Sorted? No ("a" < "b" < "c"), so delete column 0 → deletions=1.
3. Column 1 ('a','b','c') → temp = ["a","b","c"]. Sorted? Yes, keep column → cur = ["a","b","c"].
4. End of columns. Result = 1 deletion.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × m²) |
| **Space** | O(n × m) |

---

## Follow-Up Questions

- How would you adapt the algorithm if you could reorder columns instead of deleting them?
- Can you achieve O(n·m) time using a more advanced greedy strategy?

---

## Key Takeaway

> **Greedy column selection: try adding each column; if the resulting strings remain sorted, keep it. Otherwise, delete that column. Track accumulated prefixes.**