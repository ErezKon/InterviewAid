# 2526. Find Consecutive Integers from a Data Stream

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-consecutive-integers-from-a-data-stream](https://leetcode.com/problems/find-consecutive-integers-from-a-data-stream)
**Companies:** Intel

---

## Problem Description

Design a data stream class that checks if the last `k` integers parsed are all equal to `value`.

---

## Approach: Counter — O(1) per operation ✅

```
CLASS DataStream:
    INIT(value, k):
        self.value = value; self.k = k; self.count = 0

    FUNCTION consec(num):
        IF num == self.value: self.count += 1
        ELSE: self.count = 0
        RETURN self.count >= self.k
```

---

## Key Takeaway

> **Track consecutive count of the target value. Reset on mismatch. O(1) per call, no need to store the stream.**
