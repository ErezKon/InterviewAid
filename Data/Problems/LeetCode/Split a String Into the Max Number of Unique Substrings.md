# 1593. Split a String Into the Max Number of Unique Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings](https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given a string `s`, return *the maximum number of unique substrings that the given string can be split into*.

You can split string `s` into any list of **non-empty substrings**, where the concatenation of the substrings forms the original string. However, you must split the substrings such that all of them are **unique**.

A **substring** is a contiguous sequence of characters within a string.

**Constraints:**
- `1 <= s.length <= 16`
- `s` contains only lower case English letters.

## Examples

**Example 1:**
```
Input: s = "ababccc"
Output: 5
Explanation: One way to split maximally is ['a', 'b', 'ab', 'c', 'cc']. Splitting like ['a', 'b', 'a', 'b', 'c', 'cc'] is not valid as you have 'a' and 'b' multiple times.
```

**Example 2:**
```
Input: s = "aba"
Output: 2
Explanation: One way to split maximally is ['a', 'ba'].
```

**Example 3:**
```
Input: s = "aa"
Output: 1
Explanation: It is impossible to split the string any further.
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
Backtracking with a seen-set systematically explores all unique-substring splits, yielding the maximum count despite exponential worst-case complexity.
