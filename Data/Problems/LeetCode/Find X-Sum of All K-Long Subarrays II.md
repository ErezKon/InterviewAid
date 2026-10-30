# 3321. Find X-Sum of All K-Long Subarrays II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-ii](https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-ii)
**Companies:** Bloomberg, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sliding Window + Two Sorted Sets — O(n log n) ✅](#3-approach-sliding-window--two-sorted-sets)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given an array `nums` of `n` integers and two integers `k` and `x`.

The **x-sum** of an array is calculated by the following procedure:

- Count the occurrences of all elements in the array.
- Keep only the occurrences of the top `x` most frequent elements. If two elements have the same number of occurrences, the element with the **bigger** value is considered more frequent.
- Calculate the sum of the resulting array.

**Note** that if an array has less than `x` distinct elements, its **x-sum** is the sum of the array.

Return an integer array `answer` of length `n - k + 1` where `answer[i]` is the **x-sum** of the subarray `nums[i..i + k - 1]`.

**Constraints:**
- `nums.length == n`
- `1 <= n <= 10^5`
- `1 <= nums[i] <= 10^9`
- `1 <= x <= k <= nums.length`

**Official examples:**
```
Example 1:
  Input: nums = [1,1,2,2,3,4,2,3], k = 6, x = 2
  Output: [6,10,12]
  Explanation:
  - For subarray [1, 1, 2, 2, 3, 4], only elements 1 and 2 will be kept in the resulting array. Hence, answer[0] = 1 + 1 + 2 + 2.
  - For subarray [1, 2, 2, 3, 4, 2], only elements 2 and 4 will be kept in the resulting array. Hence, answer[1] = 2 + 2 + 2 + 4. Note that 4 is kept in the array since it is bigger than 3 and 1 which occur the same number of times.
  - For subarray [2, 2, 3, 4, 2, 3], only elements 2 and 3 are kept in the resulting array. Hence, answer[2] = 2 + 2 + 2 + 3 + 3.

Example 2:
  Input: nums = [3,8,7,8,7,5], k = 2, x = 2
  Output: [11,15,15,15,12]
  Explanation: Since k == x, answer[i] is equal to the sum of the subarray nums[i..i + k - 1].
```

---

## 2. Key Insight

> Maintain two sorted sets: `top` (the x most frequent elements) and `rest` (the remaining). Track the running sum of the `top` set. When the window slides, update frequencies and rebalance between `top` and `rest`.

---

## 3. Approach: Sliding Window + Two Sorted Sets — O(n log n) ✅

```text
FUNCTION findXSum(nums, k, x):
    top ← ORDERED_SET()          // holds up to x elements with highest (freq, value)
    rest ← ORDERED_SET()         // all other elements
    freqMap ← MAP()
    topSum ← 0

    // initialise first window
    FOR i ← 0 TO k-1 DO
        val ← nums[i]
        freqMap[val] ← freqMap.get(val, 0) + 1
    END FOR
    // move elements into top / rest based on frequencies
    FOR (val, f) IN freqMap DO
        INSERT (f, val) INTO rest
    END FOR
    REBALANCE()

    result ← []
    APPEND topSum TO result

    // slide the window
    FOR i ← k TO n-1 DO
        // remove outgoing element
        outVal ← nums[i - k]
        oldFreq ← freqMap[outVal]
        REMOVE (oldFreq, outVal) FROM (IF (outVal IN top) THEN top ELSE rest)
        newFreq ← oldFreq - 1
        IF newFreq = 0 THEN
            DELETE freqMap[outVal]
        ELSE
            freqMap[outVal] ← newFreq
            INSERT (newFreq, outVal) INTO rest
        END IF
        // add incoming element
        inVal ← nums[i]
        newFreq ← freqMap.get(inVal, 0) + 1
        freqMap[inVal] ← newFreq
        INSERT (newFreq, inVal) INTO rest
        // rebalance sets so that top holds the x highest (freq, value)
        REBALANCE()
        APPEND topSum TO result
    END FOR
    RETURN result

FUNCTION REBALANCE():
    // ensure top size ≤ x and contains the largest (freq, value) pairs
    WHILE SIZE(top) < x AND NOT IS_EMPTY(rest) DO
        maxElem ← EXTRACT_MAX(rest)          // highest (freq, value)
        INSERT maxElem INTO top
        topSum ← topSum + maxElem.freq * maxElem.val
    END WHILE
    WHILE SIZE(top) > x DO
        minElem ← EXTRACT_MIN(top)           // lowest in top
        REMOVE minElem FROM top
        INSERT minElem INTO rest
        topSum ← topSum - minElem.freq * minElem.val
    END WHILE
    // if an element in rest now outranks the smallest in top, swap
    WHILE NOT IS_EMPTY(rest) AND NOT IS_EMPTY(top) AND MAX(rest) > MIN(top) DO
        high ← EXTRACT_MAX(rest)
        low  ← EXTRACT_MIN(top)
        INSERT high INTO top
        INSERT low  INTO rest
        topSum ← topSum + high.freq * high.val - low.freq * low.val
    END WHILE
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — sorted‑set operations per slide |
| **Space** | O(n) |

---

## 5. Examples

**Example 1:**
```
nums = [1,2,2,3,3], k = 3, x = 2
```
- Window 0‑2: frequencies {1:1,2:2} → top‑2 sum = 1*1 + 2*2 = 5
- Window 1‑3: {2:2,3:1} → 2*2 + 3*1 = 7
- Window 2‑4: {2:1,3:2} → 3*2 + 2*1 = 8
Output: `[5,7,8]`

**Example 2:**
```
nums = [4,4,4,4], k = 2, x = 1
```
- Every window has element 4 with frequency 2 → sum = 4*2 = 8
Output: `[8,8,8]`

---

## 6. Walkthrough

Step‑by‑step for the first example (k=3, x=2):
| Step | Action | top (freq,val) | topSum |
|------|--------|----------------|-------|
| Init | Build freqMap for first 3 elems | top = {(2,2),(1,1)} | 5 |
| Slide i=3 | Remove 1, add 3 → freqMap {2:2,3:1} | rebalance keeps top {(2,2),(1,3)} | 7 |
| Slide i=4 | Remove 2, add 3 → freqMap {2:1,3:2} | top becomes {(2,3),(1,2)} | 8 |

---

## 7. Follow-Up Questions
- How would you modify the data structures to support updates where `x` changes between windows?
- Can the solution be adapted to return the actual top‑x elements instead of just the sum?
- What if the tie‑breaking rule prefers smaller values; how does the ordering change?

---

## 8. Key Takeaway

> Maintaining two ordered sets—one for the current top‑x frequent elements and one for the rest—allows O(log n) updates per slide, turning a naïve O(n·k) approach into an O(n log n) solution suitable for large inputs.
