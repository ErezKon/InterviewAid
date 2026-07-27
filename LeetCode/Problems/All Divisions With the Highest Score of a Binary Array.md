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

## 2. Key Insight

> Precompute total ones. Scan left to right: zeros-left increases when `nums[i]==0`, ones-right decreases when `nums[i]==1`. Track the max score and collect all indices achieving it.

---

## 3. Approach: Prefix Count — O(n) ✅

```
FUNCTION maxScoreIndices(nums):
    onesRight = SUM(nums)
    zerosLeft = 0
    maxScore = onesRight
    result = [0]

    FOR i ← 0 TO n-1:
        IF nums[i] == 0: zerosLeft += 1
        ELSE: onesRight -= 1
        score = zerosLeft + onesRight
        IF score > maxScore:
            maxScore = score
            result = [i + 1]
        ELSE IF score == maxScore:
            result.ADD(i + 1)

    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(1) extra |

---

## Key Takeaway

> Single-pass prefix counting: maintain running counts of zeros-left and ones-right. No need for actual prefix arrays — just two counters.
