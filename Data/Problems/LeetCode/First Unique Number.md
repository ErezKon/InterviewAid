# 1429. First Unique Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/first-unique-number](https://leetcode.com/problems/first-unique-number)
**Companies:** Amazon, Google, Microsoft, Tomtom, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: OrderedDict — O(1) amortized ✅](#3-approach-ordereddict--o1-amortized-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You have a queue of integers, you need to retrieve the first unique integer in the queue.

Implement the `FirstUnique` class:

- `FirstUnique(int[] nums)` Initializes the object with the numbers in the queue.
- `int showFirstUnique()` returns the value of **the first unique** integer of the queue, and returns **-1** if there is no such integer.
- `void add(int value)` insert value to the queue.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^8`
- `1 <= value <= 10^8`
- At most `50000` calls will be made to `showFirstUnique` and `add`.

---

## 2. Key Insight

> Use an `OrderedDict` to maintain insertion order of unique elements. When a duplicate is added, remove it from the dict and mark it. The first key in the OrderedDict is always the first unique.

---

## 3. Approach: OrderedDict — O(1) amortized ✅

```text
CLASS FirstUnique:
    CONSTRUCTOR(nums):
        order ← OrderedDict()
        duplicates ← SET()
        FOR num IN nums DO
            CALL add(num)

    FUNCTION showFirstUnique():
        FOR key IN order DO
            RETURN key
        RETURN -1

    FUNCTION add(value):
        IF value IN duplicates THEN RETURN
        IF value IN order THEN
            DELETE order[value]
            duplicates.ADD(value)
        ELSE:
            order[value] ← true
```

---

## 4. Examples

**Example 1:**
```
Input: ["FirstUnique","showFirstUnique","add","showFirstUnique","add","showFirstUnique","add","showFirstUnique"]
[[[2,3,5]],[],[5],[],[2],[],[3],[]]
Output: [null,2,null,2,null,3,null,-1]
Explanation: FirstUnique firstUnique = new FirstUnique([2,3,5]);
firstUnique.showFirstUnique(); // return 2
firstUnique.add(5);            // the queue is now [2,3,5,5]
firstUnique.showFirstUnique(); // return 2
firstUnique.add(2);            // the queue is now [2,3,5,5,2]
firstUnique.showFirstUnique(); // return 3
firstUnique.add(3);            // the queue is now [2,3,5,5,2,3]
firstUnique.showFirstUnique(); // return -1
```

**Example 2:**
```
Input: ["FirstUnique","showFirstUnique","add","add","add","add","add","showFirstUnique"]
[[[7,7,7,7,7,7]],[],[7],[3],[3],[7],[17],[]]
Output: [null,-1,null,null,null,null,null,17]
Explanation: FirstUnique firstUnique = new FirstUnique([7,7,7,7,7,7]);
firstUnique.showFirstUnique(); // return -1
firstUnique.add(7);            // the queue is now [7,7,7,7,7,7,7]
firstUnique.add(3);            // the queue is now [7,7,7,7,7,7,7,3]
firstUnique.add(3);            // the queue is now [7,7,7,7,7,7,7,3,3]
firstUnique.add(7);            // the queue is now [7,7,7,7,7,7,7,3,3,7]
firstUnique.add(17);           // the queue is now [7,7,7,7,7,7,7,3,3,7,17]
firstUnique.showFirstUnique(); // return 17
```

**Example 3:**
```
Input: ["FirstUnique","showFirstUnique","add","showFirstUnique"]
[[[809]],[],[809],[]]
Output: [null,809,null,-1]
Explanation: FirstUnique firstUnique = new FirstUnique([809]);
firstUnique.showFirstUnique(); // return 809
firstUnique.add(809);          // the queue is now [809,809]
firstUnique.showFirstUnique(); // return -1
```

---

## 5. Walkthrough

1. Initialize with `[2,3,5]` → order = {2,3,5}, duplicates = {}.
2. `showFirstUnique()` returns 2 (first key).
3. `add(5)`: 5 already in order → remove 5, add to duplicates.
4. `showFirstUnique()` now returns 2.
5. `add(2)`: remove 2, add to duplicates.
6. `showFirstUnique()` returns 3.
7. `add(3)`: remove 3, add to duplicates.
8. `showFirstUnique()` returns -1 (no unique left).

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) amortized per operation |
| **Space** | O(n) |

---

## 7. Key Takeaway

> **OrderedDict** maintains insertion order for unique elements. Duplicates are removed and tracked in a set, keeping the first unique always at the front.
