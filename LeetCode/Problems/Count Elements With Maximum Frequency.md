# 3005. Count Elements With Maximum Frequency

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-elements-with-maximum-frequency](https://leetcode.com/problems/count-elements-with-maximum-frequency)
**Companies:** Amazon, Bloomberg, Capgemini, Cred, Google, Meta, Microsoft, Walmart Labs

---

```
FUNCTION maxFrequencyElements(nums):
    count = Counter(nums)
    maxFreq = MAX(count.values())
    RETURN SUM(f for f in count.values() if f == maxFreq)
```
