# 1588. Sum of All Odd Length Subarrays

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-all-odd-length-subarrays](https://leetcode.com/problems/sum-of-all-odd-length-subarrays)
**Companies:** Amazon, Google, Linkedin

---

```
FUNCTION sumOddLengthSubarrays(arr):
    n = len(arr); total = 0
    FOR i, num IN enumerate(arr):
        // Number of subarrays containing arr[i]
        left = i + 1; right = n - i
        totalSub = left * right
        oddSub = (totalSub + 1) // 2
        total += num * oddSub
    RETURN total
```
