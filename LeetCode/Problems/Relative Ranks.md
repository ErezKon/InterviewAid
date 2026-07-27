# 506. Relative Ranks

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/relative-ranks](https://leetcode.com/problems/relative-ranks)
**Companies:** Amazon, Bloomberg, Electronic Arts, Google, Microsoft

---

```
FUNCTION findRelativeRanks(score):
    sorted_idx = sorted(range(len(score)), key=lambda i: -score[i])
    medals = ["Gold Medal", "Silver Medal", "Bronze Medal"]
    result = [""] * len(score)
    FOR rank, idx IN enumerate(sorted_idx):
        result[idx] = medals[rank] IF rank < 3 ELSE str(rank + 1)
    RETURN result
```
