# 3747. Count Distinct Integers After Removing Zeros

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-distinct-integers-after-removing-zeros](https://leetcode.com/problems/count-distinct-integers-after-removing-zeros)
**Companies:** Google

---

## 1. Problem Description

Given an array of positive integers, for each number remove all zeros from its digits, then count the total number of distinct resulting integers.

---

## 2. Approach: Transform + Set — O(n × d) ✅

```
FUNCTION countDistinct(nums):
    seen = set()
    FOR num IN nums:
        stripped = int("".join(ch for ch in str(num) if ch != '0'))
        seen.ADD(stripped)
    RETURN len(seen)
```

| Time | Space |
|------|-------|
| O(n × d) where d = max digits | O(n) |

---

## Key Takeaway

> Remove zeros by filtering digit characters, convert back to int, and collect in a set for distinct count.
