# 2155. All Divisions With the Highest Score of a Binary Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/all-divisions-with-the-highest-score-of-a-binary-array](https://leetcode.com/problems/all-divisions-with-the-highest-score-of-a-binary-array)
**Companies:** Google

---

## 1. Problem Description

You are given a **0-indexed** binary array `nums` of length `n`. `nums` can be divided at index `i` (where `0 <= i <= n`) into two arrays (possibly empty) `numsleft` and `numsright`:

- `numsleft` has all the elements of `nums` between index `0` and `i - 1` **(inclusive)**, while `numsright` has all the elements of nums between index `i` and `n - 1` **(inclusive)**.
- If `i == 0`, `numsleft` is **empty**, while `numsright` has all the elements of `nums`.
- If `i == n`, `numsleft` has all the elements of nums, while `numsright` is **empty**.

The **division score** of an index `i` is the **sum** of the number of `0`'s in `numsleft` and the number of `1`'s in `numsright`.

Return ***all distinct indices** that have the **highest** possible **division score***. You may return the answer in **any order**.

**Constraints:**
- `n == nums.length`
- `1 ≤ n ≤ 10⁵`
- `nums[i]` is either `0` or `1`.

---

## 2. Examples

```
Example 1:
  Input: nums = [0,0,1,0]
  Output: [2,4]
  Explanation: Division at index
  - 0: numsleft is []. numsright is [0,0,1,0]. The score is 0 + 1 = 1.
  - 1: numsleft is [0]. numsright is [0,1,0]. The score is 1 + 1 = 2.
  - 2: numsleft is [0,0]. numsright is [1,0]. The score is 2 + 1 = 3.
  - 3: numsleft is [0,0,1]. numsright is [0]. The score is 2 + 0 = 2.
  - 4: numsleft is [0,0,1,0]. numsright is []. The score is 3 + 0 = 3.
  Indices 2 and 4 both have the highest possible division score 3.
  Note the answer [4,2] would also be accepted.
```
```
Example 2:
  Input: nums = [0,0,0]
  Output: [3]
  Explanation: Division at index
  - 0: numsleft is []. numsright is [0,0,0]. The score is 0 + 0 = 0.
  - 1: numsleft is [0]. numsright is [0,0]. The score is 1 + 0 = 1.
  - 2: numsleft is [0,0]. numsright is [0]. The score is 2 + 0 = 2.
  - 3: numsleft is [0,0,0]. numsright is []. The score is 3 + 0 = 3.
  Only index 3 has the highest possible division score 3.
```
```
Example 3:
  Input: nums = [1,1]
  Output: [0]
  Explanation: Division at index
  - 0: numsleft is []. numsright is [1,1]. The score is 0 + 2 = 2.
  - 1: numsleft is [1]. numsright is [1]. The score is 0 + 1 = 1.
  - 2: numsleft is [1,1]. numsright is []. The score is 0 + 0 = 0.
  Only index 0 has the highest possible division score 2.
```

---

## 3. Approach

**Algorithm:** Prefix Count (single-pass)

```text
FUNCTION maxScoreIndices(nums):
    // total number of 1s in the whole array
    SET onesRight ← SUM(nums)
    SET zerosLeft ← 0
    SET maxScore ← onesRight
    SET result ← [0]

    FOR i ← 0 TO LENGTH(nums) - 1:
        IF nums[i] == 0:
            SET zerosLeft ← zerosLeft + 1
        ELSE:
            SET onesRight ← onesRight - 1
        SET score ← zerosLeft + onesRight
        IF score > maxScore:
            SET maxScore ← score
            SET result ← [i + 1]
        ELSE IF score == maxScore:
            APPEND i + 1 TO result
    RETURN result
```

---

## 4. Walkthrough

Consider `nums = [0,0,1,0]`.
| i | nums[i] | zerosLeft | onesRight (after update) | score = zerosLeft + onesRight | result |
|---|---------|-----------|--------------------------|------------------------------|--------|
| 0 | 0 | 1 | 1 | 2 | – |
| 1 | 0 | 2 | 1 | 3 → new max, result = [2] |
| 2 | 1 | 2 | 0 | 2 | – |
| 3 | 0 | 3 | 0 | 3 → equals max, result = [2,4] |

The final `result` `[2,4]` matches the expected output.

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(n) – single pass through the array |
| Space  | O(1) extra – only a few counters and the output list |

---

## 6. Follow-Up Questions

- How would the solution change if the array contained integers other than 0/1?
- Can you extend the approach to return the split index with the **second** highest score?
- What if we need to support updates to the array (changing a value) and still answer queries efficiently?

---

## Key Takeaway

> Single-pass prefix counting: maintain running counts of zeros-left and ones-right. No need for actual prefix arrays — just two counters.
