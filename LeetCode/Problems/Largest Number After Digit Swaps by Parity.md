# 2231. Largest Number After Digit Swaps by Parity

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-number-after-digit-swaps-by-parity](https://leetcode.com/problems/largest-number-after-digit-swaps-by-parity)
**Companies:** Bloomberg, Google, Ibm, Salesforce, Zscaler

---

## 1. Problem Description

Swap any two digits with the same parity (both even or both odd) any number of times. Return the largest possible number.

---

## 2. Approach: Sort by Parity Group — O(n log n) ✅

```
FUNCTION largestInteger(num):
    digits = list(str(num))
    evens = sorted([d for d in digits if int(d) % 2 == 0], reverse=True)
    odds = sorted([d for d in digits if int(d) % 2 == 1], reverse=True)
    ei = oi = 0
    result = []
    FOR d IN digits:
        IF int(d) % 2 == 0: result.ADD(evens[ei]); ei += 1
        ELSE: result.ADD(odds[oi]); oi += 1
    RETURN int(JOIN(result))
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## 3. Key Takeaway

> Even digits can be rearranged among even positions, odd among odd positions. Sort each group descending and fill back into their original parity slots.
