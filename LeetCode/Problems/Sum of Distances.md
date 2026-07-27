# 2615. Sum of Distances

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-distances](https://leetcode.com/problems/sum-of-distances)
**Companies:** Amazon, Bny Mellon, Google, Meta, Microsoft

---

```
FUNCTION distance(nums):
    groups = defaultdict(list)
    FOR i, num IN enumerate(nums):
        groups[num].ADD(i)

    result = [0] * len(nums)
    FOR indices IN groups.values():
        n = len(indices)
        prefixSum = [0] * (n + 1)
        FOR i: prefixSum[i+1] = prefixSum[i] + indices[i]

        FOR i, idx IN enumerate(indices):
            leftSum = idx * i - prefixSum[i]
            rightSum = (prefixSum[n] - prefixSum[i+1]) - idx * (n - i - 1)
            result[idx] = leftSum + rightSum

    RETURN result
```
