# 763. Partition Labels

**Difficulty:** 🟡 Medium
**Acceptance:** 80.0%
**LeetCode:** [https://leetcode.com/problems/partition-labels](https://leetcode.com/problems/partition-labels)
**Companies:** Amazon, Barclays, Bloomberg, Google, Ibm, Inmobi, Linkedin, Meta, Microsoft

---

## 1. Problem Description

Partition string `s` into as many parts as possible so each letter appears in at most one part. Return partition sizes.

---

## 2. Approach: Greedy — O(n) ✅

```
FUNCTION partitionLabels(s):
    lastIndex = {}
    FOR i, char IN enumerate(s):
        lastIndex[char] = i

    result = []
    start = 0
    end = 0

    FOR i ← 0 TO len(s) - 1:
        end = MAX(end, lastIndex[s[i]])
        IF i == end:
            result.ADD(end - start + 1)
            start = end + 1

    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(1) (26 chars) |

---

## Key Takeaway

> Precompute each character's last occurrence. Extend the current partition's end to include all occurrences of each character within it. Split when the current index reaches the partition end.
