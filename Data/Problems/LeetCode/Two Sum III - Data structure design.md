# 170. Two Sum III - Data structure design

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/two-sum-iii-data-structure-design](https://leetcode.com/problems/two-sum-iii-data-structure-design)
**Companies:** Amazon, Linkedin

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py).*

Design a data structure that accepts a stream of integers and checks if it has a pair of integers that sum up to a particular value.

Implement the `TwoSum` class:

- `TwoSum()` Initializes the `TwoSum` object, with an empty array initially.
- `void add(int number)` Adds `number` to the data structure.
- `boolean find(int value)` Returns `true` if there exists any pair of numbers whose sum is equal to `value`, otherwise, it returns `false`.

**Constraints:**
- `-10^5 <= number <= 10^5`
- `-2^31 <= value <= 2^31 - 1`
- At most `10^4` calls will be made to `add` and `find`.

## Examples

**Example 1:**
```
Input
["TwoSum", "add", "add", "add", "find", "find"]
[[], [1], [3], [5], [4], [7]]
Output
[null, null, null, null, true, false]

Explanation
TwoSum twoSum = new TwoSum();
twoSum.add(1);   // [] --> [1]
twoSum.add(3);   // [1] --> [1,3]
twoSum.add(5);   // [1,3] --> [1,3,5]
twoSum.find(4);  // 1 + 3 = 4, return true
twoSum.find(7);  // No two integers sum up to 7, return false
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
