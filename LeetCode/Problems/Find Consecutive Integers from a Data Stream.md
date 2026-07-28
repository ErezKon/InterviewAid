# 2526. Find Consecutive Integers from a Data Stream

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-consecutive-integers-from-a-data-stream](https://leetcode.com/problems/find-consecutive-integers-from-a-data-stream)
**Companies:** Intel

---

## Problem Description

Design a data stream class that checks if the last `k` integers parsed are all equal to `value`.

---

## Approach: Counter — O(1) per operation ✅

```text
CLASS DataStream:
    INIT(value, k):
        self.value ← value
        self.k ← k
        self.count ← 0

    FUNCTION consec(num):
        IF num == self.value:
            self.count ← self.count + 1
        ELSE:
            self.count ← 0
        RETURN self.count >= self.k
```

---

## Examples

| value | k | stream inputs | Output sequence |
|-------|---|---------------|-----------------|
| 5 | 3 | `[5,5,5,1,5,5,5]` | `[false, false, true, false, false, false, true]` |
| 2 | 2 | `[2,3,2,2]` | `[false, false, false, true]` |

---

## Walkthrough

1. Initialize `DataStream(5,3)`. `count = 0`.
2. Call `consec(5)`: `count=1` → `1 >= 3`? false.
3. Call `consec(5)`: `count=2` → false.
4. Call `consec(5)`: `count=3` → true (first three are consecutive 5s).
5. Call `consec(1)`: mismatch, reset `count=0` → false.
6. Call `consec(5)`: `count=1` → false.
7. Call `consec(5)`: `count=2` → false.
8. Call `consec(5)`: `count=3` → true.

---

## Complexity Analysis

- **Time:** O(1) per `consec` call – only a constant number of operations.
- **Space:** O(1) – stores only three integers (`value`, `k`, `count`).

---

## Follow-Up Questions

- How would you modify the class to support queries for the last `k` integers being any arbitrary sequence, not just a single repeated value?
- Can you extend the solution to handle multiple concurrent queries with different `k` and `value` parameters efficiently?
- What changes are needed if the stream is extremely large and you must support rolling back the last operation?

---

## Key Takeaway

> **Maintain a running count of consecutive target values and reset on mismatch. This yields O(1) time and O(1) space per query.**