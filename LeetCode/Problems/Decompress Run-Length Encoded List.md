# 1313. Decompress Run-Length Encoded List

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/decompress-run-length-encoded-list](https://leetcode.com/problems/decompress-run-length-encoded-list)
**Companies:** Google

---

## Problem Description

Given pairs `[freq, val]` in a flat array, produce the decompressed list where each `val` appears `freq` times.

## Examples

| nums | output |
|---|---|
| `[1,2,3,4]` | `[2,4,4,4]` |
| `[1,1,2,3]` | `[1,3,3]` |
| `[2,5]` | `[5,5]` |

*Explanation*: For the first example, `1` occurrence of `2` and `3` occurrences of `4` produce `[2,4,4,4]`.

---

## Approach

```
FUNCTION decompressRLElist(nums):
    result ← []
    FOR i ← 0 TO LENGTH(nums)-1 STEP 2:
        freq ← nums[i]
        val ← nums[i+1]
        FOR j ← 1 TO freq:
            result.APPEND(val)
    RETURN result
```

---

## Walkthrough

**Example 1** – `nums = [1,2,3,4]`
1. Initialize empty `result`.
2. Iterate with `i = 0`: `freq = 1`, `val = 2`. Append `2` once → `result = [2]`.
3. Next `i = 2`: `freq = 3`, `val = 4`. Append `4` three times → `result = [2,4,4,4]`.
4. End of loop, return `[2,4,4,4]`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(output length) |
| **Space** | O(output length) |

---

## Follow-Up Questions

1. How would you modify the algorithm to perform the decompression in-place if the input array had enough extra space?
2. Can you stream the output without storing the entire decompressed list in memory?
3. How would you handle negative frequencies or invalid input?

---

## Key Takeaway

> **RLE decompression: iterate over frequency‑value pairs and append the value the specified number of times. Simple simulation yields the full list.**