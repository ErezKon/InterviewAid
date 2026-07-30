# 2155. All Divisions With the Highest Score of a Binary Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/all-divisions-with-the-highest-score-of-a-binary-array](https://leetcode.com/problems/all-divisions-with-the-highest-score-of-a-binary-array)
**Companies:** Google

---

## 1. Problem Description

Given a binary array `nums`, for each index `i` (0 to n), compute the **division score**: number of `0`s in `nums[0..i-1]` + number of `1`s in `nums[i..n-1]`. Return all indices with the **highest** score.

**Constraints:**
- `n == nums.length`
- `1 ≤ n ≤ 10⁵`

---

## 2. Examples

**Example 1:**
```
Input: nums = [0,0,1,0]
Output: [2,4]
Explanation:
- Split at i = 2: left part [0,0] has 2 zeros, right part [1,0] has 1 one → score = 3.
- Split at i = 4: left part [0,0,1,0] has 3 zeros, right part [] has 0 ones → score = 3.
Both achieve the maximum score.
```

**Example 2:**
```
Input: nums = [0,0,0]
Output: [3]
Explanation: All zeros on the left give a score of 3 at i = 3, which is maximal.
```

---

## 3. Approach

**Algorithm:** Prefix Count (single‑pass)

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

## 6. Follow‑Up Questions

- How would the solution change if the array contained integers other than 0/1?
- Can you extend the approach to return the split index with the **second** highest score?
- What if we need to support updates to the array (changing a value) and still answer queries efficiently?

---

## Key Takeaway

> Single‑pass prefix counting: maintain running counts of zeros‑left and ones‑right. No need for actual prefix arrays — just two counters.
