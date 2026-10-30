# 686. Repeated String Match

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/repeated-string-match](https://leetcode.com/problems/repeated-string-match)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Problem Description

Given two strings `a` and `b`, return *the minimum number of times you should repeat string* `a` *so that string* `b` *is a substring of it*. If it is impossible for `b` to be a substring of `a` after repeating it, return `-1`.

**Notice:** string `"abc"` repeated 0 times is `""`, repeated 1 time is `"abc"` and repeated 2 times is `"abcabc"`.

**Constraints:**
- `1 <= a.length, b.length <= 10^4`
- `a` and `b` consist of lowercase English letters.

## Examples

**Example 1:**
```
Input: a = "abcd", b = "cdabcdab"
Output: 3
Explanation: We return 3 because by repeating a three times "abcdabcdabcd", b is a substring of it.
```

**Example 2:**
```
Input: a = "a", b = "aa"
Output: 2
```

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