# 1423. Maximum Points You Can Obtain from Cards

**Difficulty:** 🟡 Medium
**Acceptance:** 55.0%
**LeetCode:** [https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards](https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards)
**Companies:** Amazon, Bloomberg, De Shaw, Expedia, Flipkart, Google, Meta, Microsoft, Phonepe, Sprinklr, Tiktok, Uber

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `cardPoints` and integer `k`, you take exactly `k` cards from the beginning or end. Return the maximum points.

**Constraints:**
- `1 <= cardPoints.length <= 10^5`
- `1 <= k <= cardPoints.length`

---

## Examples

**Example 1:**
```
Input:  cardPoints = [1,2,3,4,5,6,1], k = 3
Output: 12
Explanation: Take 1 from left, 6 and 1 from right: 1+6+1? No — take right 3: 5+6+1=12.
```

---

## Key Insight

> Taking k cards from ends = leaving **n-k contiguous cards** in the middle. **Minimize the middle window sum** → maximize the score. Classic problem inversion.

---

## Approach: Sliding Window (minimize middle) — O(n) ✅

```
FUNCTION maxScore(cardPoints, k)
    n ← len(cardPoints)
    windowSize ← n - k
    windowSum ← SUM(cardPoints[0..windowSize-1])
    minWindowSum ← windowSum
    totalSum ← SUM(cardPoints)

    FOR i ← windowSize TO n - 1 DO
        windowSum ← windowSum + cardPoints[i] - cardPoints[i - windowSize]
        minWindowSum ← MIN(minWindowSum, windowSum)

    RETURN totalSum - minWindowSum
END FUNCTION
```

### Alternative: Direct approach

```
FUNCTION maxScore(cardPoints, k)
    sum ← SUM(cardPoints[0..k-1])
    maxSum ← sum
    FOR i ← 0 TO k - 1 DO
        sum ← sum - cardPoints[k-1-i] + cardPoints[n-1-i]
        maxSum ← MAX(maxSum, sum)
    RETURN maxSum
END FUNCTION
```

---

## Walkthrough

```
cardPoints = [1,2,3,4,5,6,1], k = 3, windowSize = 4
totalSum = 22
```

| Window         | Sum | minWindowSum |
|----------------|-----|-------------|
| [1,2,3,4]      | 10  | 10          |
| [2,3,4,5]      | 14  | 10          |
| [3,4,5,6]      | 18  | 10          |
| [4,5,6,1]      | 16  | 10          |

Answer: 22 - 10 = **12** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass |
| Space  | **O(1)** — constant |

---

## Follow-Up Questions

1. **Why invert the problem?**
   Picking from both ends is hard to window over. The complement (middle subarray) is contiguous → easy sliding window.

2. **When does the direct approach work better?**
   When k is small relative to n — only k iterations needed.

---

## Key Takeaway

> **Problem inversion** — reframe "pick from ends" as "minimize the remaining middle window." Classic sliding window technique.
