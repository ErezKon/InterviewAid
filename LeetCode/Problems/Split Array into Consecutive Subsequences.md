# 659. Split Array into Consecutive Subsequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-array-into-consecutive-subsequences](https://leetcode.com/problems/split-array-into-consecutive-subsequences)
**Companies:** Google, Phonepe

---

## Approach: Greedy — O(n) ✅

```
FUNCTION isPossible(nums):
    freq = Counter(nums)
    appendable = Counter()    // tracks open subsequences ending at key

    FOR num IN nums:
        IF freq[num] == 0: CONTINUE
        freq[num] -= 1

        IF appendable[num] > 0:
            appendable[num] -= 1
            appendable[num + 1] += 1
        ELSE IF freq[num + 1] > 0 AND freq[num + 2] > 0:
            freq[num + 1] -= 1
            freq[num + 2] -= 1
            appendable[num + 3] += 1
        ELSE:
            RETURN false

    RETURN true
```

Greedily append to existing subsequences or start new ones of length ≥ 3.
