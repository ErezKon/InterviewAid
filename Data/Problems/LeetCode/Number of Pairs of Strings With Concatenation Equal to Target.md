# 2023. Number of Pairs of Strings With Concatenation Equal to Target

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-pairs-of-strings-with-concatenation-equal-to-target](https://leetcode.com/problems/number-of-pairs-of-strings-with-concatenation-equal-to-target)
**Companies:** Apple, Capital One

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Hash Map of Prefixes — O(n · L)](#2-approach)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given an array of **digit** strings `nums` and a **digit** string `target`, return *the number of pairs of indices *`(i, j)`* (where *`i != j`*) such that the **concatenation** of *`nums[i] + nums[j]`* equals *`target`.

**Constraints:**
- `2 <= nums.length <= 100`
- `1 <= nums[i].length <= 100`
- `2 <= target.length <= 100`
- `nums[i]` and `target` consist of digits.
- `nums[i]` and `target` do not have leading zeros.

---

## 2. Approach: Hash Map of Prefixes — O(n · L) ✅

```text
FUNCTION numOfPairs(nums, target):
    SET count ← Counter(nums)
    SET result ← 0
    FOR num IN nums:
        IF target.startswith(num):
            SET suffix ← target[len(num):]
            SET result ← result + count[suffix]
            IF num == suffix:
                SET result ← result - 1    // cannot pair with itself
    RETURN result
```

---

## 3. Examples

**Example 1:**
```
Input: nums = ["777","7","77","77"], target = "7777"
Output: 4
Explanation: Valid pairs are:
- (0, 1): "777" + "7"
- (1, 0): "7" + "777"
- (2, 3): "77" + "77"
- (3, 2): "77" + "77"
```

**Example 2:**
```
Input: nums = ["123","4","12","34"], target = "1234"
Output: 2
Explanation: Valid pairs are:
- (0, 1): "123" + "4"
- (2, 3): "12" + "34"
```

**Example 3:**
```
Input: nums = ["1","1","1"], target = "11"
Output: 6
Explanation: Valid pairs are:
- (0, 1): "1" + "1"
- (1, 0): "1" + "1"
- (0, 2): "1" + "1"
- (2, 0): "1" + "1"
- (1, 2): "1" + "1"
- (2, 1): "1" + "1"
```

---

## 4. Walkthrough

Consider Example 1:
| Step | num | target.startswith(num)? | suffix | count[suffix] | result |
|------|-----|--------------------------|--------|---------------|--------|
| 1 | "ab" | Yes | "c" | 1 ("c" appears once) | 1 |
| 2 | "c" | Yes | "ab" | 1 ("ab" appears once) | 2 |
| 3 | "abc" | No ("abc" is not a proper prefix) | — | — | 2 |
| 4 | "bc" | No | — | — | 2 |
The final result is 2.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · L) where L = target length |
| **Space** | O(n) |

---

## 6. Key Takeaway

> **Check if a string is a prefix of the target, then look up the remaining suffix in a counter.** Handle self‑pairing edge case.
