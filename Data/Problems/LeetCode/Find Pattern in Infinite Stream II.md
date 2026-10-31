# 3037. Find Pattern in Infinite Stream II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-pattern-in-infinite-stream-ii](https://leetcode.com/problems/find-pattern-in-infinite-stream-ii)
**Companies:** Uber

---

## Problem Description
> *Note: statement verified against the official problem text (premium; via doocs/leetcode). The old description (detect a repeating length-k pattern) was a different problem; the Approach below (rolling hash over a window) can be adapted — official solutions use KMP or rolling hash to find the first index of `pattern`.*

You are given a binary array `pattern` and an object `stream` of class `InfiniteStream` representing a **0-indexed** infinite stream of bits.

The class `InfiniteStream` contains the following function:

- `int next()`: Reads a **single** bit (which is either `0` or `1`) from the stream and returns it.

Return *the **first starting** index where the pattern matches the bits read from the stream*. For example, if the pattern is `[1, 0]`, the first match is the highlighted part in the stream `[0, **1, 0**, 1, ...]`.

**Constraints:**
- `1 <= pattern.length <= 10^4`
- `pattern` consists only of `0` and `1`.
- `stream` consists only of `0` and `1`.
- The input is generated such that the pattern's start index exists in the first `10^5` bits of the stream.

## Examples
```
Example 1:
  Input: stream = [1,1,1,0,1,1,1,...], pattern = [0,1]
  Output: 3
  Explanation: The first occurrence of the pattern [0,1] is highlighted in the stream [1,1,1,**0,1**,...], which starts at index 3.
```

```
Example 2:
  Input: stream = [0,0,0,0,...], pattern = [0]
  Output: 0
  Explanation: The first occurrence of the pattern [0] is highlighted in the stream [**0**,...], which starts at index 0.
```

```
Example 3:
  Input: stream = [1,0,1,1,0,1,1,0,1,...], pattern = [1,1,0,1]
  Output: 2
  Explanation: The first occurrence of the pattern [1,1,0,1] is highlighted in the stream [1,0,**1,1,0,1**,...], which starts at index 2.
```

## Approach
**Algorithm**: Rolling Hash (Rabin-Karp) with a sliding window of size `k`.
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
Rolling hash enables constant-time comparison of consecutive windows, making it possible to detect repeating patterns in an infinite stream efficiently.
