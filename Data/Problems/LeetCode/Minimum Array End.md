# 3133. Minimum Array End

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-array-end](https://leetcode.com/problems/minimum-array-end)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

You are given two integers `n` and `x`. You have to construct an array of **positive** integers `nums` of size `n` where for every `0 <= i < n - 1`, `nums[i + 1]` is **greater than** `nums[i]`, and the result of the bitwise `AND` operation between all elements of `nums` is `x`.

Return the **minimum** possible value of `nums[n - 1]`.

**Constraints:**
- `1 ≤ n, x ≤ 10^8`

## Examples

```
Example 1:
  Input: n = 3, x = 4
  Output: 6
  Explanation: nums can be [4,5,6] and its last element is 6.
```

```
Example 2:
  Input: n = 2, x = 7
  Output: 15
  Explanation: nums can be [7,15] and its last element is 15.
```

## Approach

**Algorithm:** Bit-Filling (embed counter into zero-bits of `x`)

For each bit position where `x` has a `0`, we can choose to set it or not. To obtain the smallest possible maximum element, we fill those zero-bits with the binary representation of `n-1` (the smallest number that provides `n-1` distinct values when combined with the fixed bits of `x`).

```text
FUNCTION minEnd(n, x):
    result ← x               // keep all 1-bits of x
    bitIdx ← 0               // index in binary of (n-1)
    val ← n - 1
    FOR b ← 0 TO 63 DO
        IF (x AND (1 << b)) = 0 THEN
            // zero-bit position, may take bit from val
            IF (val AND (1 << bitIdx)) ≠ 0 THEN
                result ← result OR (1 << b)
            END IF
            bitIdx ← bitIdx + 1
        END IF
    END FOR
    RETURN result
```

## Walkthrough

| Step | `b` (bit) | `x` bit | `val` bit | Action | `result` after step |
|------|----------|--------|----------|--------|----------------------|
| 1    | 0        | 0      | 1        | set bit 0 in result | `result = x OR 1`
| 2    | 1        | 1      | –        | keep as is | unchanged |
| 3    | 2        | 0      | 0        | leave bit 2 cleared | unchanged |
| …    | …        | …      | …        | …      | … |

After all zero-bits are processed, `result` equals the minimal possible last element.

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(64)** – constant time over 64 bit positions |
| Space  | **O(1)** – only a few scalar variables |

## Follow-Up Questions

1. How would the solution change if the array must be strictly increasing?
2. What if each element has an associated cost and we want the minimum total cost?
3. Can the method be extended to handle a required bitwise OR instead of AND?

## Key Takeaway

By embedding the count `n-1` into the zero-bit positions of `x`, we obtain the smallest possible maximum element while preserving the required overall AND.
