# 2272. Substring With Largest Variance

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/substring-with-largest-variance](https://leetcode.com/problems/substring-with-largest-variance)
**Companies:** Amazon

---

## Problem Description
For a given string `s`, the **variance** of a substring is defined as the difference between the number of occurrences of two distinct characters `a` and `b` within that substring (i.e., `count(a) - count(b)`). The order of `a` and `b` matters; variance can be negative. Find the maximum variance among all substrings of `s`. Return that maximum value.

## Examples
- **Input:** `s = "aababbb"`
  **Output:** `3`
  **Explanation:** Substring `"abbbb"` has `count('b') = 4` and `count('a') = 1`, variance `4-1 = 3`.
- **Input:** `s = "abcde"`
  **Output:** `0`
  **Explanation:** Any two‑character substring has equal counts or only one character, giving variance `0`.

## Approach
The problem can be solved by a variant of Kadane’s algorithm applied to every ordered pair of distinct characters `(a, b)`. Treat each character as:
- `+1` if it equals `a`
- `-1` if it equals `b`
- `0` otherwise (ignored)
Run Kadane to find the maximum subarray sum, but ensure at least one `b` is included by resetting the current sum when it becomes negative and tracking whether a `b` has been seen.
Repeat the process for both orders `(a, b)` and `(b, a)` and for all 26×25 pairs.

```text
FUNCTION MaxVariance(s):
    SET maxVar ← 0
    FOR each distinct pair (char1, char2) IN letters:
        // forward pass
        SET cur ← 0
        SET hasChar2 ← false
        FOR ch IN s:
            IF ch = char1:
                SET cur ← cur + 1
            ELSE IF ch = char2:
                SET cur ← cur - 1
                SET hasChar2 ← true
            // ignore other chars
            IF hasChar2 AND cur > maxVar:
                SET maxVar ← cur
            IF cur < 0:
                SET cur ← 0
                SET hasChar2 ← false
        // reverse pass to handle cases where char2 appears before char1
        SET cur ← 0
        SET hasChar2 ← false
        FOR ch IN REVERSED(s):
            IF ch = char1:
                SET cur ← cur + 1
            ELSE IF ch = char2:
                SET cur ← cur - 1
                SET hasChar2 ← true
            IF hasChar2 AND cur > maxVar:
                SET maxVar ← cur
            IF cur < 0:
                SET cur ← 0
                SET hasChar2 ← false
    RETURN maxVar
```

## Walkthrough
Consider pair `(a, b)` on `"aababbb"` (forward pass):
| Index | Char | cur | hasChar2 | maxVar |
|-------|------|-----|----------|--------|
| 0 | a | 1 | false | 0 |
| 1 | a | 2 | false | 0 |
| 2 | b | 1 | true | 1 |
| 3 | a | 2 | true | 2 |
| 4 | b | 1 | true | 2 |
| 5 | b | 0 | true | 2 |
| 6 | b | -1 → reset to 0, hasChar2 false |
After reverse pass, the maximum observed is `3`.

## Complexity Analysis
- **Time:** O(26² · n) ≈ O(n) for each of the 650 character pairs.
- **Space:** O(1) extra space.

## Follow-Up Questions
- How would the solution change if the alphabet size were large (e.g., Unicode characters)?
- Can you extend the algorithm to return the substring achieving the maximum variance?
- What modifications are needed if variance is defined as absolute difference `|count(a)-count(b)|`?

## Key Takeaway
Treating character counts as a signed array and applying Kadane’s algorithm for each ordered pair efficiently yields the maximum variance in linear time per pair.
