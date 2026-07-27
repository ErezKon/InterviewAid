# 2760. Longest Even Odd Subarray With Threshold

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-even-odd-subarray-with-threshold](https://leetcode.com/problems/longest-even-odd-subarray-with-threshold)
**Companies:** Meta

---

## 1. Problem Description

Find the longest subarray starting with an even number, alternating even/odd, where all elements ≤ `threshold`.

---

## 2. Approach: Linear Scan — O(n) ✅

```
FUNCTION longestAlternatingSubarray(nums, threshold):
    maxLen = 0; i = 0
    WHILE i < len(nums):
        IF nums[i] % 2 == 0 AND nums[i] <= threshold:
            j = i
            WHILE j + 1 < len(nums) AND nums[j+1] % 2 != nums[j] % 2 AND nums[j+1] <= threshold:
                j += 1
            maxLen = MAX(maxLen, j - i + 1)
            i = j + 1
        ELSE:
            i += 1
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Find starting even elements, extend while alternating parity and under threshold. Skip past the subarray after measuring it.
