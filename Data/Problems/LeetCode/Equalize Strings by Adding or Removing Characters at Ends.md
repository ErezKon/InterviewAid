# 3135. Equalize Strings by Adding or Removing Characters at Ends

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/equalize-strings-by-adding-or-removing-characters-at-ends](https://leetcode.com/problems/equalize-strings-by-adding-or-removing-characters-at-ends)
**Companies:** Salesforce

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode. The Approach below (common prefix/suffix, returns -1) does not solve this problem — the answer is always reachable and equals `len(initial) + len(target) - 2 * (longest common substring)`.*

Given two strings `initial` and `target`, your task is to modify `initial` by performing a series of operations to make it equal to `target`.

In one operation, you can add or remove **one character** only at the *beginning* or the *end* of the string `initial`.

Return the **minimum** number of operations required to *transform* `initial` into `target`.

**Constraints:**
- `1 <= initial.length, target.length <= 1000`
- `initial` and `target` consist only of lowercase English letters.

## Examples

**Example 1:**
```
Input: initial = "abcde", target = "cdef"
Output: 3
Explanation: Remove 'a' and 'b' from the beginning of initial, then add 'f' to the end.
```

**Example 2:**
```
Input: initial = "axxy", target = "yabx"
Output: 6
Explanation:
  Operation
  Resulting String
  Add 'y' to the beginning
  "yaxxy"
  Remove from end
  "yaxx"
  Remove from end
  "yax"
  Remove from end
  "ya"
  Add 'b' to the end
  "yab"
  Add 'x' to the end
  "yabx"
```

**Example 3:**
```
Input: initial = "xyz", target = "xyz"
Output: 0
Explanation: No operations are needed as the strings are already equal.
```

## Approach
The only characters that can remain unchanged are a **common prefix** and a **common suffix**. Find the longest matching prefix and suffix between `s` and `t`. The middle unmatched parts must be removed (or added) via operations. If after removing the prefix and suffix the remaining substrings are not equal, transformation is impossible.

## Pseudocode
```text
FUNCTION minOperations(s, t):
    SET i ← 0
    WHILE i < MIN(LENGTH(s), LENGTH(t)) AND s[i] == t[i]:
        SET i ← i + 1
    SET prefixLen ← i
    SET j ← 0
    WHILE j < MIN(LENGTH(s)-prefixLen, LENGTH(t)-prefixLen) AND s[-1-j] == t[-1-j]:
        SET j ← j + 1
    SET suffixLen ← j
    SET sMid ← SUBSTRING(s, prefixLen, LENGTH(s)-suffixLen)
    SET tMid ← SUBSTRING(t, prefixLen, LENGTH(t)-suffixLen)
    IF sMid != tMid:
        RETURN -1
    RETURN (LENGTH(s) - prefixLen - suffixLen) + (LENGTH(t) - prefixLen - suffixLen)
```

## Walkthrough
| Step | s | t | prefixLen | suffixLen | sMid | tMid | Operations |
|------|---|---|-----------|-----------|------|------|------------|
| Example 1 | "abc" | "bc" | 0 | 2 ("bc") | "a" | "" | remove 'a' → 1 |
| Example 2 | "abc" | "def" | 0 | 0 | "abc" | "def" | mismatch → -1 |

## Complexity Analysis
- **Time:** O(n) where n = max(|s|, |t|) – scanning from both ends.
- **Space:** O(1) extra space.

## Follow-Up Questions
- How would you extend the solution to allow insertions/removals at **any** position?
- Can you output the actual sequence of operations, not just the count?
- What changes are needed if each operation has a different cost?

## Key Takeaway
Matching the longest common prefix and suffix isolates the immutable core; the remaining characters dictate the minimal number of end-only edits.
