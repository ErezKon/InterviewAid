# 1538. Guess the Majority in a Hidden Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/guess-the-majority-in-a-hidden-array](https://leetcode.com/problems/guess-the-majority-in-a-hidden-array)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

We have an integer array `nums`, where all the integers in `nums` are **0** or **1**. You will not be given direct access to the array, instead, you will have an **API** `ArrayReader` which have the following functions:

- `int query(int a, int b, int c, int d)`: where `0 <= a < b < c < d < ArrayReader.length()`. The function returns the distribution of the value of the 4 elements and returns:
  - **4**: if the values of the 4 elements are the same (0 or 1).
  - **2**: if three elements have a value equal to 0 and one element has value equal to 1 or vice versa.
  - **0**: if two element have a value equal to 0 and two elements have a value equal to 1.
- `int length()`: Returns the size of the array.

You are allowed to call `query()` **2 * n times** at most where n is equal to `ArrayReader.length()`.

Return **any** index of the most frequent value in `nums`, in case of tie, return -1.

**Constraints:**
- `5 <= nums.length <= 10^5`
- `0 <= nums[i] <= 1`

**Follow up:** What is the minimum number of calls needed to find the majority element?

---

## 2. Examples

```
Example 1:
  Input: nums = [0,0,1,0,1,1,1,1]
  Output: 5
  Explanation: The following calls to the API
  reader.length() // returns 8 because there are 8 elements in the hidden array.
  reader.query(0,1,2,3) // returns 2 this is a query that compares the elements nums[0], nums[1], nums[2], nums[3]
  // Three elements have a value equal to 0 and one element has value equal to 1 or viceversa.
  reader.query(4,5,6,7) // returns 4 because nums[4], nums[5], nums[6], nums[7] have the same value.
  we can infer that the most frequent value is found in the last 4 elements.
  Index 2, 4, 6, 7 is also a correct answer.
```
```
Example 2:
  Input: nums = [0,0,1,1,0]
  Output: 0
```
```
Example 3:
  Input: nums = [1,0,1,0,1,0,1,0]
  Output: -1
```

---

## 3. Approach

```
FUNCTION guessMajority(reader):
    baseline = query(0,1,2,3)
    sameCount = 0
    diffCount = 0
    reference = 3
    FOR i FROM 4 TO n-1:
        IF query(0,1,2,i) == baseline:
            // arr[i] == arr[reference]
            sameCount += 1
        ELSE:
            diffCount += 1
    // Determine which group is majority using counts and baseline
    IF sameCount > diffCount:
        RETURN reference   // majority element is at reference index
    ELSE:
        // Find any index that differed from reference
        FOR i FROM 4 TO n-1:
            IF query(0,1,2,i) != baseline:
                RETURN i
    RETURN -1   // no majority
```

---

## 4. Walkthrough

Assume hidden array length `5` and baseline query `query(0,1,2,3) = 0`.

1. Compare `query(0,1,2,4)`. If result equals baseline (`0`), then `arr[4]` matches `arr[3]`; otherwise it differs.
2. Count how many indices match the reference (`arr[3]`). Suppose `sameCount = 2`, `diffCount = 1`.
3. Since `sameCount > diffCount`, the majority bit is the one at the reference index, so return index `3`.

---

## 5. Complexity Analysis

- **Time:** `O(n)` – one query per element after the first four.
- **Space:** `O(1)` – only counters and a few variables.

---

## 6. Follow-Up Questions

- How would the algorithm change if the query returned the exact count of `1`s instead of the majority?
- Can the method be extended to arrays with more than two possible values?
- What is the minimum number of queries required in the worst case?

---

## 7. Key Takeaway

> Clever use of overlapping 4‑element queries lets you compare each element to a reference, achieving `O(n)` queries to locate the majority.
