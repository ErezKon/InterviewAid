# 1087. Brace Expansion

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/brace-expansion](https://leetcode.com/problems/brace-expansion)
**Companies:** Anduril, Apple, Doordash, Google, Niantic, Stripe
---

## Problem Description
Given a string `s` containing lowercase letters and curly braces denoting groups of characters (e.g., `{a,b}`), expand the string into all possible strings by choosing one character from each group while preserving the order. The result should be returned in lexicographically sorted order.

## Examples
**Example 1**
```
Input: s = "{a,b}c{d,e}"
Output: ["acd","ace","bcd","bce"]
```
**Example 2**
```
Input: s = "abcd"
Output: ["abcd"]
Explanation: No braces, the string itself is the only expansion.
```

## Approach
Parse the input into a list of groups where each group is a list of possible characters. Then iteratively build the Cartesian product of these groups, accumulating partial results.

### Pseudocode
```text
FUNCTION expand(s):
    groups ← PARSE(s)               // list of character lists
    result ← [""]
    FOR group IN groups:
        newResult ← []
        FOR prefix IN result:
            FOR ch IN group:
                APPEND prefix + ch TO newResult
        result ← newResult
    SORT result
    RETURN result
```

## Walkthrough
| Step | Current group | Partial results |
|------|---------------|-----------------|
| 1 | ['a','b'] | ["a","b"] |
| 2 | ['c'] | ["ac","bc"] |
| 3 | ['d','e'] | ["acd","ace","bcd","bce"] |

## Complexity Analysis
- **Time:** O(k · n) where `k` is the total number of generated strings and `n` is the length of the input.
- **Space:** O(k · n) for storing all expansions.

## Follow-Up Questions
1. How would you modify the algorithm to handle nested braces?
2. Can you generate the expansions lazily without storing all of them at once?
3. How would you adapt the solution for very large input strings where sorting all results is expensive?

## Key Takeaway
Parsing the string into independent groups and iteratively forming the Cartesian product yields a simple, linear‑time expansion algorithm.
