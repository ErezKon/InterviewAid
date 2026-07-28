# 1593. Split a String Into the Max Number of Unique Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft
---

## Problem Description
Given a string `s`, split it into a collection of substrings such that each substring is unique (appears only once). Return the maximum possible number of substrings in such a split.

## Examples
**Example 1:**
```
s = "ababccc"
output = 5   // one optimal split: ["a", "b", "ab", "c", "cc"]
```
**Example 2:**
```
s = "aba"
output = 2   // split as ["a", "ba"]
```

## Approach
Use backtracking with a set of seen substrings. At each position `start`, try every possible end index to form a new substring. If the substring has not been seen, add it to the set and recurse from the new position. Track the maximum count found.

```text
FUNCTION MaxUniqueSplit(s):
    SET n ← LENGTH(s)
    SET maxCount ← 0
    FUNCTION Backtrack(start, seen):
        IF start == n:
            SET maxCount ← MAX(maxCount, SIZE(seen))
            RETURN
        FOR end ← start + 1 TO n:
            SET sub ← SUBSTRING(s, start, end)
            IF sub NOT IN seen:
                ADD sub TO seen
                Backtrack(end, seen)
                REMOVE sub FROM seen
    Backtrack(0, SET())
    RETURN maxCount
```

## Walkthrough
Consider `s = "aba"`:
| start | end | sub | seen after adding | recursive call |
|-------|-----|-----|-------------------|----------------|
| 0 | 1 | "a" | {"a"} | Backtrack(1) |
| 1 | 2 | "b" | {"a","b"} | Backtrack(2) |
| 2 | 3 | "a" (already seen) → skip |
| 2 | 3 | "ba" | {"a","ba"} | Backtrack(3) → update maxCount = 2 |

## Complexity Analysis
*Time:* O(2^n) in the worst case due to exploring all split combinations.
*Space:* O(n) recursion stack plus O(k) for the set of seen substrings, where k ≤ n.

## Follow-Up Questions
1. Can the solution be optimized using memoization to avoid recomputing states?
2. How would you adapt the algorithm for very long strings where exponential search is infeasible?
3. What changes are needed if substrings must also satisfy a length constraint?

## Key Takeaway
Backtracking with a seen‑set systematically explores all unique‑substring splits, yielding the maximum count despite exponential worst‑case complexity.
