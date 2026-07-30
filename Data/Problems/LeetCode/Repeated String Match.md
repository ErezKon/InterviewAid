# 686. Repeated String Match

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/repeated-string-match](https://leetcode.com/problems/repeated-string-match)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Problem Description
Given two strings `a` and `b`, return the minimum number of times `a` must be repeated such that `b` becomes a substring of the repeated string. If it is impossible, return `-1`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `a = "abcd"`, `b = "cdabcdab"` | `3` | Repeating `a` three times yields `"abcdabcdabcd"`, which contains `b`. |
| `a = "abc"`, `b = "cabcabca"` | `4` | Four repetitions produce `"abcabcabcabc"` containing `b`. |
| `a = "abc"`, `b = "def"` | `-1` | No repetition of `a` can contain `b`. |

## Approach
Compute the smallest number of repetitions needed using the ceiling of `|b| / |a|`. Check if `b` is a substring of that repeated string; if not, check one extra repetition to handle overlap.

```text
FUNCTION repeatedStringMatch(a, b):
    SET lenA ← LENGTH(a)
    SET lenB ← LENGTH(b)
    SET times ← CEIL(lenB / lenA)
    SET repeated ← a REPEAT times
    IF b IS SUBSTRING OF repeated:
        RETURN times
    SET repeatedExtra ← repeated + a
    IF b IS SUBSTRING OF repeatedExtra:
        RETURN times + 1
    RETURN -1
```

## Walkthrough
For `a = "abcd"`, `b = "cdabcdab"`:
| Step | repeated | Check | Result |
|------|----------|-------|--------|
| times = ceil(8/4) = 2 | `"abcdabcd"` | `b` not in `repeated` | continue |
| repeatedExtra = `"abcdabcd" + "abcd"` = `"abcdabcdabcd"` | `b` in `repeatedExtra` | return 3 |

## Complexity Analysis
- **Time:** O(n + m) where n = |a|, m = |b|, due to substring checks.
- **Space:** O(n * times) for the constructed string, at most O(m + n).

## Follow-Up Questions
1. How would you solve the problem without constructing the repeated string explicitly?
2. Can you use rolling hash (Rabin‑Karp) to improve the substring check?
3. How would you handle Unicode characters where length may differ from byte count?

## Key Takeaway
The answer is either the ceiling of the length ratio or one more repetition to cover possible overlap, allowing a simple O(n+m) solution.