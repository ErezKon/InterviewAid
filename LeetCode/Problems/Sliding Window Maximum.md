# 239. Sliding Window Maximum

**Difficulty:** 🔴 Hard
**Acceptance:** 46.5%
**LeetCode:** [https://leetcode.com/problems/sliding-window-maximum](https://leetcode.com/problems/sliding-window-maximum)
**Companies:** Adobe, Agoda, Amazon, Apple, Aurora, Autodesk, Blinkit, Bloomberg, Bookingcom, Cisco, Citadel, Coupang, De Shaw, Doordash, Expedia, Gameskraft, Gojek, Goldman Sachs, Google, Ibm, Jpmorgan, Juspay, Line, Makemytrip, Meta, Microsoft, Mongodb, Nutanix, Nvidia, Oracle, Palo Alto Networks, Phonepe, Roblox, Salesforce, Servicenow, Sprinklr, Tcs, Tiktok, Uber, Visa, Wayfair, Yandex, Zenefits, Zepto, Zeta, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Brute Force — O(n·k)](#3-approach-1-brute-force--onk)
4. [Approach 2: Monotonic Deque — O(n) ✅](#4-approach-2-monotonic-deque--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

You are given an array of integers `nums`. There is a sliding window of size `k` which moves from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.

Return the **max** value in the sliding window at each position.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `-10⁴ <= nums[i] <= 10⁴`
- `1 <= k <= nums.length`

---

## 2. Examples

```
Example 1:
  Input:  nums = [1,3,-1,-3,5,3,6,7], k = 3
  Output: [3,3,5,5,6,7]

  Window position              Max
  ---------------             -----
  [1  3  -1] -3  5  3  6  7    3
   1 [3  -1  -3] 5  3  6  7    3
   1  3 [-1  -3  5] 3  6  7    5
   1  3  -1 [-3  5  3] 6  7    5
   1  3  -1  -3 [5  3  6] 7    6
   1  3  -1  -3  5 [3  6  7]   7
```

---

## 3. Approach 1: Brute Force — O(n·k)

For each window position, scan all k elements for the max.

```
FUNCTION maxSlidingWindow(nums, k):
    result = []
    FOR i ← 0 TO n - k:
        result.ADD(MAX(nums[i..i+k-1]))
    RETURN result
```

---

## 4. Approach 2: Monotonic Deque — O(n) ✅

### Key Insight

Maintain a **monotonically decreasing deque** of indices. The front of the deque always holds the index of the current maximum. Before adding a new element, remove all smaller elements from the back (they can never be the maximum while the new element is in the window).

### Pseudocode

```
FUNCTION maxSlidingWindow(nums, k):

    deque = empty deque (stores indices)
    result = []

    FOR i ← 0 TO n - 1:

        // Remove indices outside the window
        WHILE deque is not empty AND deque.front() <= i - k:
            deque.POP_FRONT()

        // Remove indices of elements smaller than nums[i]
        // (they will never be the max while nums[i] is in window)
        WHILE deque is not empty AND nums[deque.back()] <= nums[i]:
            deque.POP_BACK()

        deque.PUSH_BACK(i)

        // Window is fully formed when i >= k - 1
        IF i >= k - 1:
            result.ADD(nums[deque.front()])

    RETURN result
```

### Invariant

The deque is always **monotonically decreasing** in terms of the values at its stored indices. `deque.front()` is always the index of the maximum in the current window.

---

## 5. Walkthrough

```
nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3

i=0: deque=[]    → push 0       → deque=[0]          (window not full)
i=1: nums[0]=1 < nums[1]=3 → pop 0, push 1 → deque=[1]   (window not full)
i=2: nums[1]=3 > nums[2]=-1 → push 2 → deque=[1,2]  → max=nums[1]=3
i=3: push 3 → deque=[1,2,3]                           → max=nums[1]=3
i=4: front=1, 1 <= 4-3=1 → pop front → deque=[2,3]
     nums[3]=-3 < 5, pop; nums[2]=-1 < 5, pop → deque=[]
     push 4 → deque=[4]                               → max=nums[4]=5
i=5: nums[4]=5 > 3 → push 5 → deque=[4,5]            → max=nums[4]=5
i=6: nums[5]=3 < 6, pop; nums[4]=5 < 6, pop → deque=[]
     push 6 → deque=[6]                               → max=nums[6]=6
i=7: nums[6]=6 < 7, pop → deque=[]
     push 7 → deque=[7]                               → max=nums[7]=7

Result: [3, 3, 5, 5, 6, 7] ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute Force | O(n·k) | O(1) |
| **Monotonic Deque** | **O(n)** | **O(k)** |

Each element is pushed and popped at most once → amortized O(1) per element.

---

## 7. Follow-Up Questions

### 7.1 Sliding Window Minimum?

Same approach — maintain a **monotonically increasing** deque instead.

### 7.2 What about using a max-heap?

A max-heap gives O(n log n): push each element, but you need lazy deletion (mark removed but don't actually remove until it's at the top). Less efficient than the deque approach.

### 7.3 What if k is dynamic (variable window size)?

The deque still works — just change the eviction condition to use the dynamic window boundary instead of `i - k`.

### 7.4 Longest Subarray with Max - Min ≤ threshold?

Use **two deques** (one for max, one for min) with a sliding window. Expand right, shrink left when the condition is violated.

---

## Key Takeaway

> The **monotonic deque** is the go-to structure for sliding window min/max problems. It maintains candidates in sorted order and evicts stale entries from the front and dominated entries from the back, achieving amortized O(1) per operation.
