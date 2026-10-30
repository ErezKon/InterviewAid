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

There are several cards **arranged in a row**, and each card has an associated number of points. The points are given in the integer array `cardPoints`.

In one step, you can take one card from the beginning or from the end of the row. You have to take exactly `k` cards.

Your score is the sum of the points of the cards you have taken.

Given the integer array `cardPoints` and the integer `k`, return the *maximum score* you can obtain.

**Constraints:**
- `1 <= cardPoints.length <= 10^5`
- `1 <= cardPoints[i] <= 10^4`
- `1 <= k <= cardPoints.length`

---

## Examples

```
Example 1:
  Input: cardPoints = [1,2,3,4,5,6,1], k = 3
  Output: 12
  Explanation: After the first step, your score will always be 1. However, choosing the rightmost card first will
    maximize your total score. The optimal strategy is to take the three cards on the right, giving a final score of 1 + 6 + 5 = 12.
```

```
Example 2:
  Input: cardPoints = [2,2,2], k = 2
  Output: 4
  Explanation: Regardless of which two cards you take, your score will always be 4.
```

```
Example 3:
  Input: cardPoints = [9,7,7,9,7,7,9], k = 7
  Output: 55
  Explanation: You have to take all the cards. Your score is the sum of points of all cards.
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
