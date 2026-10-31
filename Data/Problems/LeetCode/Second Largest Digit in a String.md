# 1796. Second Largest Digit in a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/second-largest-digit-in-a-string](https://leetcode.com/problems/second-largest-digit-in-a-string)
**Companies:** Google, Softwire

---

## Problem Description

Given an alphanumeric string `s`, return *the **second largest** numerical digit that appears in *`s`*, or *`-1`* if it does not exist*.

An **alphanumeric**** **string is a string consisting of lowercase English letters and digits.

**Constraints:**
- `1 <= s.length <= 500`
- `s` consists of only lowercase English letters and digits.

---

## Examples

**Example 1:**
```
Input: s = "dfa12321afd"
Output: 2
Explanation: The digits that appear in s are [1, 2, 3]. The second largest digit is 2.
```

**Example 2:**
```
Input: s = "abc1111"
Output: -1
Explanation: The digits that appear in s are [1]. There is no second largest digit.
```

---

## Approach

```
FUNCTION secondLargestDigit(s):
    // Collect unique digit characters
    SET digits ← EMPTY SET
    FOR ch IN s:
        IF ch IS DIGIT:
            ADD ch TO digits
    IF SIZE(digits) < 2:
        RETURN -1
    // Convert to integers and sort descending
    LIST sortedDigits ← SORT(digits, DESCENDING)
    RETURN INTEGER(sortedDigits[1])
```

---

## Walkthrough

**Example:** `"dfa12321"`
1. Iterate characters, collect digits → `{1,2,3}`.
2. Set size is 3 ≥ 2, continue.
3. Sort descending → `[3,2,1]`.
4. Return the second element `2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` where `n` is the length of the string (single pass plus sorting at most 10 digits, effectively constant).
- **Space Complexity:** `O(1)` because the set holds at most 10 distinct digits.

---

## Follow-Up Questions

1. How would you modify the solution to return the *k*-th largest digit?
2. Can you solve the problem without sorting, using only constant-time operations?
3. How would you adapt the algorithm for Unicode digit characters?

---

## Key Takeaway

> Collect unique digits into a set, then pick the second largest. Since there are only 10 possible digits, this is effectively `O(1)` space.
