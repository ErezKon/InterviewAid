# 170. Two Sum III - Data structure design

**Difficulty:** 🟢 Easy
**Companies:** Amazon, Linkedin

---

## Problem Description
Design a class `TwoSum` that supports two operations:
1. `add(number)`: Add the integer `number` to an internal data structure.
2. `find(value)`: Return `true` if there exists any pair of numbers whose sum equals `value`, otherwise return `false`.
Both operations may be called multiple times.

## Examples
**Example 1:**
```
TwoSum ts = new TwoSum();
ts.add(1);
ts.add(3);
ts.add(5);
ts.find(4); // returns true (1 + 3)
ts.find(7); // returns false
```

**Example 2:**
```
TwoSum ts = new TwoSum();
ts.add(2);
ts.add(2);
ts.find(4); // returns true (2 + 2)
```

## Approach
Maintain a hash map `counter` that records the frequency of each added number. For `find(value)`, iterate over the keys `num` in the map and compute the complement `comp = value - num`. If `comp` differs from `num`, check if `comp` exists in the map. If `comp` equals `num`, ensure the frequency of `num` is at least 2.

## Walkthrough
| Step | Operation | Counter state |
|------|-----------|----------------|
| 1 | add(1) | {1:1}
| 2 | add(3) | {1:1,3:1}
| 3 | add(5) | {1:1,3:1,5:1}
| 4 | find(4) | check 1→comp=3 (exists) → return true |
| 5 | find(7) | check 1→comp=6 (no), 3→comp=4 (no), 5→comp=2 (no) → return false |

## Complexity Analysis
- **add:** `O(1)` time, `O(1)` extra space per call.
- **find:** `O(m)` time where `m` is the number of distinct keys in the map; `O(1)` extra space.

## Follow‑Up Questions
1. How would you improve `find` to `O(1)` average time?
2. Can you support deletion of a number while keeping both operations efficient?
3. What changes are needed if the data structure must handle a stream of queries with limited memory?

## Key Takeaway
Storing frequencies in a hash map enables constant‑time addition and a simple linear scan for pair‑sum queries, balancing simplicity and efficiency.
