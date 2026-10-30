# 2094. Finding 3-Digit Even Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/finding-3-digit-even-numbers](https://leetcode.com/problems/finding-3-digit-even-numbers)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Enumerate All 3-digit Even Numbers — O(1) ✅](#4-approach-enumerate-all-3-digit-even-numbers---o1-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given an integer array `digits`, where each element is a digit. The array may contain duplicates.

You need to find **all** the **unique** integers that follow the given requirements:

- The integer consists of the **concatenation** of **three** elements from `digits` in **any** arbitrary order.
- The integer does not have **leading zeros**.
- The integer is **even**.

For example, if the given `digits` were `[1, 2, 3]`, integers `132` and `312` follow the requirements.

Return *a **sorted** array of the unique integers.*

**Constraints:**
- `3 <= digits.length <= 100`
- `0 <= digits[i] <= 9`

---

## 2. Examples

**Example 1:**
```
Input: digits = [2,1,3,0]
Output: [102,120,130,132,210,230,302,310,312,320]
Explanation: All the possible integers that follow the requirements are in the output array.
Notice that there are no odd integers or integers with leading zeros.
```

**Example 2:**
```
Input: digits = [2,2,8,8,2]
Output: [222,228,282,288,822,828,882]
Explanation: The same digit can be used as many times as it appears in digits.
In this example, the digit 8 is used twice each time in 288, 828, and 882.
```

**Example 3:**
```
Input: digits = [3,7,5]
Output: []
Explanation: No even integers can be formed using the given digits.
```

---

## 3. Key Insight

> Instead of permuting indices, iterate all 3‑digit even numbers (100‑998, step 2) and check if each can be formed from the available digits.

---

## 4. Approach: Enumerate All 3-digit Even Numbers — O(1) ✅

```text
FUNCTION findEvenNumbers(digits):
    // Count frequency of each digit
    freq ← ARRAY[10] OF 0
    FOR d IN digits:
        INCREMENT freq[d]
    result ← []
    // Enumerate every even 3‑digit number
    FOR num FROM 100 TO 998 STEP 2:
        hundreds ← num / 100
        tens ← (num / 10) % 10
        ones ← num % 10
        // Build a temporary copy of frequencies
        temp ← COPY(freq)
        IF temp[hundreds] == 0: CONTINUE
        DECREMENT temp[hundreds]
        IF temp[tens] == 0: CONTINUE
        DECREMENT temp[tens]
        IF temp[ones] == 0: CONTINUE
        // All digits available → add to result
        APPEND num TO result
    RETURN result
```

---

## 5. Walkthrough

**Example:** `digits = [1,2,3,0]`
1. Frequency array: `{0:1,1:1,2:1,3:1, others:0}`.
2. Enumerate even numbers:
   - `num = 102`: hundreds=1 (available), tens=0 (available), ones=2 (available) → add `102`.
   - `num = 104`: ones=4 not in freq → skip.
   - Continue until `998`.
3. Collected numbers match the output list in the example.

---

## 6. Complexity Analysis

- **Time:** O(1) – constant 450 even numbers are checked regardless of input size.
- **Space:** O(1) – frequency array of size 10 and result list.

---

## 7. Follow-Up Questions

- How would you adapt the solution if the length of the numbers to form were variable (e.g., 4‑digit numbers)?
- Can the approach be extended to generate numbers with additional constraints such as being divisible by 3?
- What if the input digits could be reused unlimited times?

---

## 8. Key Takeaway

> Enumerating the bounded set of possible even numbers and validating each against digit frequencies yields a simple O(1) solution.
