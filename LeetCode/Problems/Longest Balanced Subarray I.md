# 3719. Longest Balanced Subarray I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-balanced-subarray-i](https://leetcode.com/problems/longest-balanced-subarray-i)
**Companies:** Amazon, Bloomberg, Google, Intuit

---

## 1. Problem Description

Find the longest subarray with equal count of two distinct elements.

---

## 2. Approach: Balance Hash Map — O(n) ✅

```
FUNCTION longestBalanced(nums):
    balance = 0; first = {0: -1}; maxLen = 0
    FOR i, num IN enumerate(nums):
        balance += 1 IF num == val1 ELSE -1
        IF balance IN first:
            maxLen = MAX(maxLen, i - first[balance])
        ELSE:
            first[balance] = i
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Map one value to +1 and another to -1. Track running balance. Same balance at two indices → equal counts between them. Store first occurrence of each balance.
