# 3135. Equalize Strings by Adding or Removing Characters at Ends

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/equalize-strings-by-adding-or-removing-characters-at-ends](https://leetcode.com/problems/equalize-strings-by-adding-or-removing-characters-at-ends)
**Companies:** Salesforce

---

## Problem Description
You are given two strings `s` and `t`. In one operation you may either:
- Add any character to the **beginning** or **end** of a string, or
- Remove a character from the **beginning** or **end** of a string.
Determine the minimum number of operations required to make `s` and `t` equal. If it is impossible, return `-1`.

## Examples
```text
Input: s = "abc", t = "bc"
Output: 1
Explanation: Remove 'a' from the beginning of s.

Input: s = "abc", t = "def"
Output: -1
Explanation: No sequence of end‑only additions/removals can transform one into the other.
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

## Follow‑Up Questions
- How would you extend the solution to allow insertions/removals at **any** position?
- Can you output the actual sequence of operations, not just the count?
- What changes are needed if each operation has a different cost?

## Key Takeaway
Matching the longest common prefix and suffix isolates the immutable core; the remaining characters dictate the minimal number of end‑only edits.
