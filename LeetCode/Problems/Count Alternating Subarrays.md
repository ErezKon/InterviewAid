# 3101. Count Alternating Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-alternating-subarrays](https://leetcode.com/problems/count-alternating-subarrays)
**Companies:** Capital One

---

## 1. Problem Description

Given a binary array `nums`, count the number of subarrays where elements alternate (0,1,0,1... or 1,0,1,0...).

---

## 2. Key Insight

> Track the length of the current alternating run. Each position contributes `runLength` new alternating subarrays ending at that position.

---

## 3. Approach: Running Count — O(n) ✅

```
FUNCTION countAlternatingSubarrays(nums):
    count = 1
    result = 1
    FOR i FROM 1 TO len(nums) - 1:
        IF nums[i] != nums[i-1]:
            count += 1
        ELSE:
            count = 1
        result += count
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> For contiguous subarray counting with a property, maintain a running length. An alternating run of length `k` contributes `k` new subarrays at each extension.
