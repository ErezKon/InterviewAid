# 2597. The Number of Beautiful Subsets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-number-of-beautiful-subsets](https://leetcode.com/problems/the-number-of-beautiful-subsets)
**Companies:** Amazon, Bloomberg, Google, Infosys

---

```
FUNCTION beautifulSubsets(nums, k):
    count = [0]
    FUNCTION backtrack(idx, freq):
        IF idx == len(nums):
            count[0] += 1; RETURN
        backtrack(idx + 1, freq)    // skip
        IF freq[nums[idx] - k] == 0 AND freq[nums[idx] + k] == 0:
            freq[nums[idx]] += 1
            backtrack(idx + 1, freq)
            freq[nums[idx]] -= 1
    backtrack(0, Counter())
    RETURN count[0] - 1    // exclude empty set
```
