# 2364. Count Number of Bad Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-number-of-bad-pairs](https://leetcode.com/problems/count-number-of-bad-pairs)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

```
FUNCTION countBadPairs(nums):
    // Bad pair: j - i != nums[j] - nums[i] → nums[i]-i != nums[j]-j
    // Count good pairs, subtract from total
    count = Counter()
    good = 0
    FOR i, num IN enumerate(nums):
        key = num - i
        good += count[key]
        count[key] += 1
    total = len(nums) * (len(nums) - 1) / 2
    RETURN total - good
```
