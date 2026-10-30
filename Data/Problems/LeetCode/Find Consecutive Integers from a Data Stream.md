# 2526. Find Consecutive Integers from a Data Stream

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-consecutive-integers-from-a-data-stream](https://leetcode.com/problems/find-consecutive-integers-from-a-data-stream)
**Companies:** Intel

---

## Problem Description

For a stream of integers, implement a data structure that checks if the last `k` integers parsed in the stream are **equal** to `value`.

Implement the **DataStream** class:

- `DataStream(int value, int k)` Initializes the object with an empty integer stream and the two integers `value` and `k`.
- `boolean consec(int num)` Adds `num` to the stream of integers. Returns `true` if the last `k` integers are equal to `value`, and `false` otherwise. If there are less than `k` integers, the condition does not hold true, so returns `false`.

**Constraints:**

- `1 <= value, num <= 10^9`
- `1 <= k <= 10^5`
- At most `10^5` calls will be made to `consec`.

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

```
Example 1:
  Input:
  ["DataStream", "consec", "consec", "consec", "consec"]
  [[4, 3], [4], [4], [4], [3]]
  Output:
  [null, false, false, true, false]
  Explanation:
  DataStream dataStream = new DataStream(4, 3); //value = 4, k = 3
  dataStream.consec(4); // Only 1 integer is parsed, so returns False.
  dataStream.consec(4); // Only 2 integers are parsed.
                        // Since 2 is less than k, returns False.
  dataStream.consec(4); // The 3 integers parsed are all equal to value, so returns True.
  dataStream.consec(3); // The last k integers parsed in the stream are [4,4,3].
                        // Since 3 is not equal to value, it returns False.
```

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