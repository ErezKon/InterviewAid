# 3037. Find Pattern in Infinite Stream II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-pattern-in-infinite-stream-ii](https://leetcode.com/problems/find-pattern-in-infinite-stream-ii)
**Companies:** Uber

---

## Problem Description
Given an infinite stream of integers, determine whether there exists a pattern of length `k` that repeats indefinitely. The stream can be queried for the next integer at any time, and you must report `true` as soon as a repeating pattern is detected, otherwise continue reading.

## Examples
| Stream (first 10 values) | k | Output |
|--------------------------|---|--------|
| 1, 2, 3, 1, 2, 3, …      | 3 | true   |
| 4, 5, 6, 7, 8, …         | 2 | false  |
*Explanation*: In the first example the sequence `1,2,3` repeats; in the second no length‑2 pattern repeats.

## Approach
**Algorithm**: Rolling Hash (Rabin‑Karp) with a sliding window of size `k`.
1. Compute hash of the first `k` elements.
2. For each subsequent element, update the hash by removing the oldest value and adding the new one.
3. Compare the current hash with the stored pattern hash; if they match, verify the actual values to avoid collisions.
4. If verification succeeds, return `true`.
5. Continue indefinitely otherwise.

```text
FUNCTION FindPattern(stream, k):
    SET base ← 101
    SET mod ← 1_000_000_007
    SET patternHash ← 0
    SET windowHash ← 0
    SET power ← 1 // base^(k-1) % mod
    // Build initial window
    FOR i ← 0 TO k-1:
        SET val ← stream.NEXT()
        SET patternHash ← (patternHash * base + val) % mod
        SET windowHash ← (windowHash * base + val) % mod
        IF i < k-1:
            SET power ← (power * base) % mod
    // Slide through stream
    WHILE TRUE:
        SET nextVal ← stream.NEXT()
        // Remove oldest value and add new one
        SET windowHash ← (windowHash - oldest * power) % mod
        SET windowHash ← (windowHash * base + nextVal) % mod
        IF windowHash = patternHash:
            IF VERIFY_PATTERN(stream, k):
                RETURN true
        // shift oldest value pointer
        UPDATE oldest to next in window
    RETURN false
```

## Walkthrough
Consider the stream `1,2,3,1,2,3,…` with `k = 3`.
| Step | Window values | Window hash | Action |
|------|---------------|-------------|--------|
| Init | 1,2,3         | H₁          | Store as pattern |
| 1    | 2,3,1         | H₂          | H₂ ≠ H₁ |
| 2    | 3,1,2         | H₃          | H₃ ≠ H₁ |
| 3    | 1,2,3         | H₁          | Hash matches → verify → true |

## Complexity Analysis
- **Time**: O(N) where N is the number of elements read until detection.
- **Space**: O(k) for storing the current window.

## Follow-Up Questions
1. How would you adapt the solution for multiple possible pattern lengths?
2. Can you design a solution that works with limited memory, e.g., O(1) extra space?
3. How would you handle streams where elements arrive out of order?

## Key Takeaway
Rolling hash enables constant‑time comparison of consecutive windows, making it possible to detect repeating patterns in an infinite stream efficiently.
