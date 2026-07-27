# 781. Rabbits in Forest

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rabbits-in-forest](https://leetcode.com/problems/rabbits-in-forest)
**Companies:** Amazon, Bloomberg, Cars24, Dp World, Google, Meta, Microsoft, Wish, Zepto

---

## Approach: Greedy Counting — O(n) ✅

```
FUNCTION numRabbits(answers):
    count = Counter(answers)
    total = 0

    FOR ans, freq IN count.items():
        groupSize = ans + 1
        groups = ceil(freq / groupSize)
        total += groups * groupSize

    RETURN total
```

If a rabbit says "k", there are k+1 rabbits of that color. Group them optimally.
