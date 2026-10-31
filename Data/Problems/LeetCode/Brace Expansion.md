# 1087. Brace Expansion

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/brace-expansion](https://leetcode.com/problems/brace-expansion)
**Companies:** Anduril, Apple, Doordash, Google, Niantic, Stripe
---

## Problem Description
You are given a string `s` representing a list of words. Each letter in the word has one or more options.

- If there is one option, the letter is represented as is.
- If there is more than one option, then curly braces delimit the options. For example, `"{a,b,c}"` represents options `["a", "b", "c"]`.

For example, if `s = "a{b,c}"`, the first character is always `'a'`, but the second character can be `'b'` or `'c'`. The original list is `["ab", "ac"]`.

Return all words that can be formed in this manner, **sorted** in lexicographical order.

**Constraints:**
- `1 ≤ s.length ≤ 50`
- `s` consists of curly brackets `'{}'`, commas `','`, and lowercase English letters.
- `s` is guaranteed to be a valid input.
- There are no nested curly brackets.
- All characters inside a pair of consecutive opening and ending curly brackets are different.

## Examples
```
Example 1:
  Input: s = "{a,b}c{d,e}f"
  Output: ["acdf","acef","bcdf","bcef"]

Example 2:
  Input: s = "abcd"
  Output: ["abcd"]
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
- **Time:** O(k · n) where `k` is the total number of generated strings and `n` is the length of the input.
- **Space:** O(k · n) for storing all expansions.

## Follow-Up Questions
1. How would you modify the algorithm to handle nested braces?
2. Can you generate the expansions lazily without storing all of them at once?
3. How would you adapt the solution for very large input strings where sorting all results is expensive?

## Key Takeaway
Parsing the string into independent groups and iteratively forming the Cartesian product yields a simple, linear-time expansion algorithm.
