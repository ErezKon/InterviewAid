# 1313. Decompress Run-Length Encoded List

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/decompress-run-length-encoded-list](https://leetcode.com/problems/decompress-run-length-encoded-list)
**Companies:** Google

---

## Problem Description

We are given a list `nums` of integers representing a list compressed with run-length encoding.

Consider each adjacent pair of elements `[freq, val] = [nums[2*i], nums[2*i+1]]` (with `i >= 0`). For each such pair, there are `freq` elements with value `val` concatenated in a sublist. Concatenate all the sublists from left to right to generate the decompressed list.

Return the decompressed list.

**Constraints:**

- `2 <= nums.length <= 100`
- `nums.length % 2 == 0`
- `1 <= nums[i] <= 100`

## Examples

```
Example 1:
  Input: nums = [1,2,3,4]
  Output: [2,4,4,4]
  Explanation: The first pair [1,2] means we have freq = 1 and val = 2 so we generate the array [2].
  The second pair [3,4] means we have freq = 3 and val = 4 so we generate [4,4,4].
  At the end the concatenation [2] + [4,4,4] is [2,4,4,4].
```

```
Example 2:
  Input: nums = [1,1,2,3]
  Output: [1,3,3]
```

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